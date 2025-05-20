# Curr AI Agent 🤖💬

**Curr AI Agent** is an intelligent web application that allows users to upload PDF and PowerPoint (.pptx) documents and interact with their content through an AI-powered chat interface. Ask questions about your documents, get summaries, and find specific information quickly and efficiently.

Powered by Google's Gemini large language model and built with Python (Flask) and modern web technologies.

-----

## ✨ Features

  * **Document Upload:** Supports uploading **.pdf** and **.pptx** files.
  * **Cloud Storage:** Securely uploads and temporarily stores documents on **Cloudinary** for processing.
  * **AI-Powered Chat:** Engage in a conversation with your uploaded document.
      * Ask general questions ("What is this document about?").
      * Query specific pages or slides ("What does slide 3 say?").
      * Request summaries.
  * **Intelligent Text Extraction:** Parses text content from both PDF and PowerPoint files.
  * **Contextual Understanding:** The AI is provided with relevant context from the document to answer questions accurately.
  * **Responsive UI:**
      * **Glassmorphic design** for a modern look and feel.
      * Chat interface with user and AI (favicon) avatars.
      * Responsive layout for different screen sizes.
  * **Persistent Sessions:** Remembers the active document even if the page is reloaded (using Redis-based Flask-Session backend).

-----

## 🛠️ Tech Stack

  * **Backend:**
      * Python 3.x
      * Flask (Web framework)
      * Flask-Session (Server-side session management - Redis backend)
      * Redis Cloud (Session store)
      * Google Generative AI SDK (`google-generativeai` for Gemini API)
      * Cloudinary Python SDK (`cloudinary` for file uploads)
      * `python-pptx` (For parsing .pptx files)
      * `PyPDF2` (For parsing .pdf files)
      * `python-dotenv` (For managing environment variables)
      * `requests` (For HTTP requests, e.g., downloading from Cloudinary)
  * **Frontend:**
      * HTML5
      * CSS3 (with Flexbox and Grid for layout)
      * JavaScript (Vanilla JS for DOM manipulation and API calls)
  * **Cloud Services:**
      * Google Gemini API (For the AI chat model)
      * Cloudinary (For cloud-based file storage and delivery)
      * Redis Cloud (For persistent server-side session management)
  * **Development:**
      * Flask Development Server
      * Virtual Environment (`venv`)

-----

## ⚙️ Setup and Installation

Follow these steps to get the project running locally:

1.  **Clone the Repository:**

    ```bash
    git clone <your-repository-url>
    cd Curr_Ai_Agent
    ```

2.  **Create and Activate a Virtual Environment:**

    ```bash
    python -m venv venv
    # On Windows:
    venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    ```

3.  **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

    *(See "Creating `requirements.txt`" below if you don't have one)*

4.  **Set Up Environment Variables:**
    Create a `.env` file in the project root directory (`Curr_Ai_Agent/`) and add your API keys and secret keys:

    ```env
    FLASK_SECRET_KEY=your_super_strong_random_flask_secret_key_here
    GOOGLE_API_KEY=your_google_gemini_api_key_here

    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    REDIS_URL=redis://default:<your_redis_password>@<your_redis_host>:<port>
    ```

      * Replace placeholders with your actual keys.
      * **Important:** Ensure `.env` is listed in your `.gitignore` file to prevent committing secrets.

5.  **Run the Application:**

    ```bash
    python app.py
    ```

    The application will typically be available at `http://127.0.0.1:5000/` or `http://localhost:5000/`.

### Creating `requirements.txt`

If you don't have one, your `requirements.txt` file should include at least:

```txt
Flask
Flask-Session
python-dotenv
google-generativeai
cloudinary
python-pptx
PyPDF2
requests
redis
Werkzeug
# gunicorn # Add if deploying with Gunicorn
```

You can generate it from your active virtual environment after installing all packages:

```bash
pip freeze > requirements.txt
```

-----

## 🚀 How to Use

1.  Open the web application in your browser.
2.  Click on the "Select a .pptx or .pdf file to begin" area or the input field to choose a document.
3.  Click the "**Upload & Process**" button.
4.  Wait for the status message to indicate successful processing.
5.  Click the chat icon (usually in the bottom right corner) to open the chat window.
6.  Type your questions about the document into the chat input and press Enter or click the send button.
7.  The AI will respond based on the content of your uploaded document.
8.  To chat about a new document, simply upload another file. The context will switch to the new document.

-----

## 📄 Environment Variables (Recap)

Ensure these are set in your `.env` file for local development or as environment variables in your deployment environment:

  * `FLASK_SECRET_KEY`: A long, random, and secret string for Flask session security.
  * `GOOGLE_API_KEY`: Your API key for the Google Gemini API.
  * `CLOUDINARY_CLOUD_NAME`: Your Cloudinary account's cloud name.
  * `CLOUDINARY_API_KEY`: Your Cloudinary API key.
  * `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
  * `REDIS_URL`: Your Redis connection URL for Flask-Session.

-----

## 📁 Project Structure (Simplified)

```
Curr_Ai_Agent/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (GITIGNORED!)
├── static/
│   ├── css/style.css      # Stylesheets
│   ├── js/script.js       # Frontend JavaScript
│   └── img/               # Favicon, background image
│       ├── favicon.ico
│       └── bg.jpg
├── templates/
│   └── index.html         # Main HTML page
└── flask_session/         # Redis manages this in production (optional fallback)
```

-----

## 🔮 Future Enhancements / To-Do

  * **More Robust Text Extraction:** Explore `pdfplumber` for PDFs for potentially better layout preservation.
  * **Advanced RAG (Retrieval Augmented Generation):** For very large documents, implement vector embeddings and semantic search to retrieve only the most relevant chunks for the LLM.
  * **Streaming Responses:** Show AI responses as they are generated.
  * **Chat History:** Persist chat history within a session.
  * **User Accounts:** Add user authentication.
  * **Loading Indicators:** More elaborate loading indicators.
  * **Production Session Backend:** Redis is now used for Flask-Session.
  * **Testing:** Add unit and integration tests.
  * **Cloudinary File Management:** Option to delete files from Cloudinary after processing or based on a policy.
  * **More File Types:** Support for .doc, .docx, .txt.

-----

## 🤝 Contributing

(If this were an open-source project, you would add contribution guidelines here.)

-----

## 📜 License

(Specify a license like MIT or Apache 2.0 if you plan to share this. For personal projects, this can be omitted or state "Proprietary".)

Thank you for checking out Curr AI Agent!
