<div align="center">
  <img src="https://img.icons8.com/nolan/96/video.png" alt="VidIntel Logo" width="80" />
  <h1>VidIntel 🧠🎥</h1>
  <p><strong>AI-Powered Video Intelligence — Extract insights from any video in seconds.</strong></p>
  <p>Built with ❤️ by Dhairya</p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#installation">Installation</a> •
    <a href="#deployment">Deployment</a>
  </p>
</div>

---

## 📖 Overview

**VidIntel** is a full-stack, production-ready AI application that transforms long, tedious videos and meeting recordings into actionable knowledge. 

Instead of re-watching hours of footage, you can simply drop a YouTube link or upload a local file. Within seconds, VidIntel will transcribe the audio, generate executive summaries, extract key decisions, compile action items, and allow you to **chat directly with your video** to retrieve precise, context-aware answers.

Designed with a sleek, responsive, glassmorphism dark-mode UI, VidIntel feels like a premium SaaS product from day one.

---

## ✨ Key Features

- **📺 Universal Input**: Supports both public YouTube URLs and direct file uploads (MP4, MP3, WAV, M4A).
- **🎙️ Lightning Fast Transcription**: Uses the **Groq Whisper API** for blazing-fast English transcription and the **Sarvam AI API** for native Hinglish support.
- **⚡ Smart Summarization**: Leverages the **Mistral AI** LLM to generate concise executive summaries.
- **🎯 Action Item Extraction**: Automatically pulls out "Next Steps", key decisions, and open questions from meeting contexts.
- **💬 RAG Video Chat**: Embeds transcripts via the **Mistral Embeddings API** into a **ChromaDB** Vector Database, allowing you to seamlessly chat with the video. 
- **💾 History & Cloud Sync**: Powered by **Appwrite**, all your previous video analyses and transcripts are saved securely and accessible anytime via the History Dashboard.
- **🎨 Premium UI/UX**: Built with React 19 and Vite. Features a custom dark-mode design system, CSS glassmorphism, micro-animations, and smooth routing via React Router v6.

---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework**: React 19 + Vite
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS (Premium Dark Mode, Glassmorphism, CSS Variables)
- **Icons**: Lucide React
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI (Python)
- **Audio Processing**: `yt-dlp` & `imageio-ffmpeg` (Cross-platform)
- **Transcription**: Groq API (Whisper), Sarvam AI API
- **AI & LLM**: LangChain, Mistral AI (`mistral-small-latest`)
- **Vector Search / RAG**: ChromaDB, Mistral Embeddings
- **Database**: Appwrite (Cloud DB for history)
- **Deployment**: Render

---

## 🚀 Local Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (3.11+)

### 1. Clone the repository
```bash
git clone https://github.com/dhairyadesai26/VidIntel.git
cd VidIntel
```

### 2. Backend Setup
Create a virtual environment and install dependencies:
```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory with your API keys:
```env
MISTRAL_API_KEY="your_mistral_api_key_here"
GROQ_API_KEY="your_groq_api_key_here"
SARVAM_API_KEY="your_sarvam_api_key_here"

# Appwrite Cloud Database Credentials
APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
APPWRITE_PROJECT_ID="your_project_id"
APPWRITE_API_KEY="your_api_key"
```

Start the FastAPI server:
```bash
python api.py
```
*The API will be available at `http://localhost:10000` (or the port specified in your environment).*

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory (optional for local, required for prod):
```env
VITE_API_URL="http://localhost:10000"
```

Start the React development server:
```bash
npm run dev
```
*The web app will be available at `http://localhost:5173`.*

---

## ☁️ Deployment

### Backend (Render)
1. Push your code to GitHub.
2. Create a new **Web Service** on [Render](https://render.com).
3. Connect your GitHub repository.
4. Set the **Root Directory** to `backend`.
5. Set the **Build Command** to `pip install -r requirements.txt`.
6. Set the **Start Command** to `python api.py`.
7. Add all the environment variables from your `.env` file into the Render dashboard.
8. Click **Deploy**. Render will automatically use Python 3.11 thanks to the `.python-version` file.

### Frontend (Vercel)
1. Create a new Project on [Vercel](https://vercel.com).
2. Connect your GitHub repository.
3. Set the **Root Directory** to `frontend`.
4. In Environment Variables, add `VITE_API_URL` pointing to your deployed Render URL (e.g., `https://your-backend.onrender.com`).
5. Click **Deploy**.

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
