import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
import os
import json
import re
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import google.generativeai as genai
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

app = FastAPI()

# Global Variables
DATASET_PATH = "dataset.json"
dataset = []
questions = []
answers = []
vectorizer = None
tfidf_matrix = None

# NeDB File Path (Relative to nlp folder)
QUERIES_DB_PATH = os.path.join(os.path.dirname(__file__), "../server/data/queries.db")
FACULTY_DB_PATH = os.path.join(os.path.dirname(__file__), "../server/data/faculty_data.txt")

def load_dataset():
    global dataset, questions, answers, vectorizer, tfidf_matrix
    try:
        data_items = []

        # 1. Load Static JSON Dataset
        if os.path.exists(DATASET_PATH):
            with open(DATASET_PATH, "r") as f:
                data_items.extend(json.load(f))
        
        # 2. Load NeDB Data (JSON Lines format)
        if os.path.exists(QUERIES_DB_PATH):
            with open(QUERIES_DB_PATH, "r", encoding="utf-8") as f:
                for line in f:
                    try:
                        line = line.strip()
                        if line:
                            obj = json.loads(line)
                            # NeDB stores data closely to what we want
                            if "question" in obj and "answer" in obj:
                                data_items.append(obj)
                    except json.JSONDecodeError:
                        continue
        else:
             print(f"Warning: DB file not found at {QUERIES_DB_PATH}")

        # 3. Load Faculty Data (Text File)
        if os.path.exists(FACULTY_DB_PATH):
            try:
                with open(FACULTY_DB_PATH, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Split by regex looking for "1. Dr.", "2. Dr." etc.
                # using lookahead to keep the pattern in the following split result might be tricky with newlines.
                # Instead, we'll manually split or use re.split with capturing group and recombine, 
                # but since the structure is consistent, we can split by "\n\n" (double newline) or 
                # just assume lines starting with regex are headers.
                
                # Simpler approach: split by `\n` and group lines.
                lines = content.splitlines()
                current_block = []
                
                for line in lines:
                    # Check if line starts with valid number like "1.Name:", "2.Name:"
                    # The file format is consistently "Number.Name: Name"
                    if re.match(r'^\d+\.Name:', line.strip()):
                         if current_block:
                             # Process previous block
                             data_items.append(process_faculty_block(current_block))
                             current_block = []
                    current_block.append(line)
                
                # Append last block
                if current_block:
                    data_items.append(process_faculty_block(current_block))
                    
                print(f"Loaded Faculty Data from {FACULTY_DB_PATH}")
                
            except Exception as e:
                print(f"Error loading faculty data: {e}")
        else:
             print(f"Warning: Faculty file not found at {FACULTY_DB_PATH}")

        # Extract Q&A
        questions = [item["question"] for item in data_items if "question" in item]
        answers = [item["answer"] for item in data_items if "answer" in item]
        
        if questions:
            # Re-initialize vectorizer with new data
            vectorizer = TfidfVectorizer(stop_words='english').fit(questions)
            tfidf_matrix = vectorizer.transform(questions)
            print(f"Loaded {len(questions)} queries (Total).")
        else:
            vectorizer = None
            tfidf_matrix = None
            print("No queries found.")
            
    except Exception as e:
        print(f"Error loading dataset: {e}")

def process_faculty_block(lines):
    # Create a copy for display to remove the numbering
    display_lines = list(lines)
    if display_lines:
        # Remove numbering "153." from "153.Name: ..." -> "Name: ..."
        display_lines[0] = re.sub(r'^\d+\.', '', display_lines[0]).strip()
        
    block_text = "\n".join(display_lines).strip()
    first_line = lines[0].strip()
    
    # Extract name "1.Name: Dr. Name" -> "Dr. Name"
    # Matches "153.Name: Sri Hemanth..."
    name_match = re.search(r'^\d+\.Name:\s*(.*)', first_line, re.IGNORECASE)
    name = name_match.group(1).strip() if name_match else first_line
    
    # Extract details for keywords
    dept = "University"
    designation = "Faculty"
    
    for line in lines:
        if "Department" in line and ":" in line:
            dept = line.split(":", 1)[1].strip()
        if "Designation" in line and ":" in line:
            designation = line.split(":", 1)[1].strip()
            
    # Synthetic Question for Retrieval
    question = f"Who is {name}? Details of {name}. Contact number email of {name}. {designation} in {dept} department. Professor Faculty."
    
    return {
        "question": question,
        "answer": block_text
    }


load_dataset()

# Gemini Setup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
else:
    print("Warning: GEMINI_API_KEY not found in environment variables.")
    model = None

class QueryRequest(BaseModel):
    question: str
    is_guest: bool = False

@app.post("/predict")
async def predict(request: QueryRequest):
    query = request.question
    is_guest = request.is_guest
    
    # 0. Restriction Logic for Guests
    if is_guest:
        # Restricted topics for non-students
        restricted_keywords = ["exam result", "grade", "faculty", "professor", "timetable", "classwork", "schedule", "internal mark", "mid term", "attendance",
                               "phone", "email", "mobile", "contact", "room no", "room number", "faculty id", "designation" , "details"]
        if any(word in query.lower() for word in restricted_keywords):
             return {
                "answer": "I apologize, but I cannot provide information about exams, faculty details, schedules, or internal academic matters to guest users. Please log in with your student credentials to access this information.",
                "confidence": 1.0,
                "source": "restriction"
            }

    # 1. Search Local Knowledge Base (Retrieval)
    context = ""
    best_score = 0.0
    best_match_raw = None
    
    if vectorizer and tfidf_matrix is not None:
        query_vec = vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()
        
        # Get top 3 matches to provide broad context
        top_indices = similarities.argsort()[-3:][::-1] 
        best_score = similarities[top_indices[0]]

        # Content-based Privacy Check for Guests
        if is_guest and best_score > 0.3:
            potential_answer = answers[top_indices[0]]
            # Check if the Answer looks like Faculty Data (heuristic based on format)
            if "Faculty Id" in potential_answer or "Designation:" in potential_answer or "Room No:" in potential_answer:
                 return {
                    "answer": "I found the faculty details you are looking for, but I cannot display private information (Phone, Email, ID, Room No) to guest users. Please log in to view these details.",
                    "confidence": 1.0,
                    "source": "restriction_privacy"
                }
        
        relevant_answers = []
        for idx in top_indices:
            if similarities[idx] > 0.3: # Low threshold for context retrieval
                relevant_answers.append(answers[idx])
        
        if relevant_answers:
            context = "\n".join(relevant_answers)
            best_match_raw = answers[top_indices[0]]

    # Prepare Helpful Links (For Guests and Students)
    links_map = {
        "fee": "https://www.gitam.edu/admissions/fee-structure",
        "scholarship": "https://www.gitam.edu/fee-scholarship/student-scholarships",
        "admission": "https://apply.gitam.edu",
        "apply": "https://apply.gitam.edu",
        "course": "https://www.gitam.edu/academics",
        "program": "https://www.gitam.edu/academics",
        "campus": "https://www.gitam.edu/campus-life",
        "hostel": "https://www.gitam.edu/campus-life/accommodation",
        "accommodation": "https://www.gitam.edu/campus-life/accommodation",
        "transport": "https://www.gitam.edu/campus-life/transport",
        "bus": "https://www.gitam.edu/campus-life/transport",
        "placement": "https://www.gitam.edu/career-guidance-centre",
        "career": "https://www.gitam.edu/career-guidance-centre",
        "academic": "https://www.gitam.edu/academics",
        "result": "https://login.gitam.edu/student/login",
        "login": "https://login.gitam.edu/student/login"
    }

    found_links = set()
    for key, url in links_map.items():
        if key in query.lower():
            found_links.add(f"- [{key.title()} Info]({url})")
            
    links_text = ""
    if found_links:
        links_text = "\n\n**Helpful Links:**\n" + "\n".join(list(found_links))

    # 2. Generate Answer with Gemini (RAG)
    if model:
        try:
            if context:
                # RAG Prompt
                prompt = f"""
                You are a helpful AI assistant for GITAM University.
                
                Here is some verified internal information found in our database that might be relevant:
                ---
                {context}
                ---
                
                User Question: {query}
                
                Instructions:
                1. Use the internal information above to answer the question if applicable. 
                2. Combine multiple pieces of info if needed to give a complete answer.
                3. If the internal info is not relevant to the question, ignore it and answer from your general knowledge.
                4. Be polite, concise, and easy to understand.
                """
                source_label = "gemini_rag"
            else:
                # General Prompt
                prompt = f"""
                You are a helpful AI assistant for GITAM University.
                User Question: {query}
                
                Instructions:
                1. Answer politely and accurately from your general knowledge about GITAM University.
                2. If the question is about specific internal university matters (like specific grades, private schedules) that you don't know, politely say you don't have access to that information.
                3. If the user asks about admissions, fees, or general info, provide a detailed helpful answer.
                """
                source_label = "gemini_general"

            response = model.generate_content(prompt)
            clean_answer = response.text.strip()
            
            # Append source if derived from context
            if context:
                clean_answer += "\n\nSuccess Source: GITAM Internal Knowledge Base"
            
            # Append Links
            clean_answer += links_text

            return {
                "answer": clean_answer,
                "confidence": 0.9 if context else 0.7,
                "source": source_label
            }
            
        except Exception as e:
            print(f"Gemini extraction failed: {e}")
            # Fallback to Raw Local Data if Gemini fails
            if best_match_raw and best_score > 0.4:
                 return {
                    "answer": f"{best_match_raw}\n\nSuccess Source: GITAM Internal Database" + links_text,
                    "confidence": float(best_score),
                    "source": "dataset_fallback"
                 }
    
    # 3. Fallback if No Model or Model Failed & No Local Match
    if best_match_raw and best_score > 0.5:
         return {
            "answer": f"{best_match_raw}\n\nSuccess Source: GITAM Internal Database" + links_text,
            "confidence": float(best_score),
            "source": "dataset"
         }

    # 4. Unknown / Unanswered
    # If it is a Guest and we don't have info, we can suggest checking the website.
    default_msg = "I'm sorry, I don't have enough information to answer that accurately."
    if is_guest and found_links:
        default_msg = "I don't have the specific details right now, but you might find these links helpful:"
    elif is_guest:
        default_msg = "I'm sorry, I don't have that information. Please check the official GITAM website."

    return {
        "answer": default_msg + links_text,
        "confidence": 0.0,
        "source": "unknown"
    }

@app.post("/refresh")
async def refresh_dataset():
    load_dataset()
    return {"status": "Dataset reloaded"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
