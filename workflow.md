# GITAM Chatbot Project Workflow

This project is a MERN stack application with a Python NLP service.

## Prerequisites
1.  **Node.js** installed.
2.  **Python 3.9+** installed.
3.  **MongoDB** installed and running locally.

## Project Structure
-   `client/`: React Frontend (Vite)
-   `server/`: Node.js Express Backend
-   `nlp/`: Python FastAPI NLP Service

## Step 1: Setup Backend (Node.js)
1.  Navigate to `server` folder:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Ensure MongoDB is running.
4.  Start the server:
    ```bash
    node index.js
    ```
    *Server runs on http://localhost:5000*

## Step 2: Setup NLP Service (Python)
1.  Navigate to `nlp` folder:
    ```bash
    cd nlp
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Important**: Open `nlp/.env` and add your Google Gemini API Key:
    ```
    GEMINI_API_KEY=your_actual_key_here
    ```
4.  Start the service:
    ```bash
    python main.py
    ```
    *Service runs on http://localhost:8000*

## Step 3: Setup Frontend (React)
1.  Navigate to `client` folder:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    *Client runs on http://localhost:8080 (or similar)*

## Usage
1.  **Guest Chat**: Go to the login page. On the right side, there is an "Admission Assistant" chat. This works without login.
2.  **Student Login**:
    *   Sign Up as a student.
    *   Login to access the Student Dashboard.
    *   Use the "AI Student Assistant" chat.
3.  **Admin Login**:
    *   Manually register a user via Sign Up.
    *   In MongoDB, update that user's role to 'admin' (since registration defaults to 'student').
    *   Login to access Admin Dashboard.
    *   Go to "Knowledge Base" to Add/Edit queries.
    *   Go to "Unanswered Queries" to see questions the bot missed and convert them to Knowledge Base entries.

## Dataset
-   The file `nlp/dataset.json` contains the initial knowledge base.
-   When you add queries in the Admin Dashboard, they are saved to MongoDB.
-   *Note*: To make the Python service use the *MongoDB* data instead of just the JSON file, you would need to fetch data from MongoDB in Python. Currently, the Python service uses `dataset.json`.
-   **Integration**: The Admin "Resolve" feature identifies unanswered queries. To sync MongoDB changes to the Python service's in-memory dataset, you might need to restart the Python service or implement a fetch-from-db logic in `nlp/main.py`.

## Connecting Knowledge Base
Currently, `nlp/main.py` reads from `dataset.json`.
To make it dynamic (read from MongoDB):
1.  Install `pymongo` in `nlp`.
2.  Modify `nlp/main.py` to connect to MongoDB and load `queries` collection instead of `dataset.json`.
