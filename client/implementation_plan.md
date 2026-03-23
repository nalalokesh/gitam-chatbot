# implementation_plan.md

## Project: AI Chatbot for Student Query Resolution (GITAM)

### Technology Stack
- **Frontend**: React (Vite) + Tailwind CSS + Shadcn UI (Existing, will be adapted)
- **Backend (API Gateway & Auth)**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **AI/NLP Service**: Python (FastAPI/Flask) + Google Gemini API
- **NLP Logic**: Custom Dataset Search (TF-IDF/Embeddings) + Fallback to Gemini

### Architecture
1.  **Client (`/client`)**: React Application.
    *   **Public**: Login Page with Guest Chat.
    *   **Student**: Dashboard, Chat Interface.
    *   **Admin**: Dashboard, Knowledge Base Management (CRUD), Unanswered Queries View.
2.  **Server (`/server`)**: Node.js Express Application.
    *   Auth Middleware (JWT).
    *   Routes: `/auth`, `/admin`, `/chat`.
    *   Communicates with Python Service for actual NLP processing.
3.  **NLP Service (`/nlp`)**: Python Application.
    *   Loads "College Dataset".
    *   Endpoint: `/predict` (Input: Query -> Output: Answer + Confidence).
    *   Logic:
        1.  Search local dataset (fast, accurate for college info).
        2.  If confidence < threshold, use Gemini API (general info).
        3.  If unknown, flag as "Unanswered".

### Step-by-Step Implementation

#### Phase 1: Structure & Setup
- [ ] Refactor existing folder: Move current contents to `/client`.
- [ ] Initialize `/server` (Node.js).
- [ ] Initialize `/nlp` (Python).

#### Phase 2: Backend (Node.js + MongoDB)
- [ ] Setup Express Server.
- [ ] Connect to MongoDB.
- [ ] Create Models: `User` (Student, Admin), `KnowledgeBase`, `UnansweredQuery`.
- [ ] Create Auth Routes (Login/Register).
- [ ] Create Admin Routes (CRUD Knowledge Base).

#### Phase 3: NLP Service (Python)
- [ ] Setup Python environment (virtualenv).
- [ ] Install dependencies: `flask`, `google-generativeai`, `scikit-learn`/`sentence-transformers`.
- [ ] Create searching logic (Cosine Similarity or Fuzzy Match on Dataset).
- [ ] Integrate Gemini API for fallback.
- [ ] Create API Endpoint to expose this logic.

#### Phase 4: Frontend Integration
- [ ] Update Login Page to include "Guest Chat".
- [ ] Build Chat Interface (connected to Node Backend -> Python).
- [ ] Build Admin Dashboard (Manage KB, Reply to Unanswered).

#### Phase 5: Polish
- [ ] Aesthetics (Animations, Glassmorphism).
- [ ] Testing & Validation.
