import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

const faqs = [
  {
    q: 'What types of videos and files does VidIntel support?',
    a: 'VidIntel supports public video URLs (like Instagram Reels, TikTok, Twitter), and local file uploads including MP4, MP3, WAV, M4A, OGG, and most common audio/video formats. As long as there is speech, the AI can process it.',
  },
  {
    q: 'How long does it take to process a video?',
    a: 'Processing time depends on video length. A 30-minute meeting typically takes around 1–2 minutes. The real-time progress tracker shows you each stage: downloading, transcribing, analyzing, extracting, and indexing. You can watch it happen live.',
  },
  {
    q: 'Is my video content private and secure?',
    a: 'Yes. The processing pipeline runs on your own server (locally or self-hosted). Audio files are processed in-memory and temporary downloads are stored only for the duration of the session. No video data is sent to third-party services beyond the AI model APIs you configure.',
  },
  {
    q: 'What languages are supported for transcription?',
    a: 'Groq Whisper API supports over 50 languages. Additionally, we have integrated Sarvam AI specifically for highly accurate Hinglish (Hindi + English) transcription. You can select your preferred language when processing.',
  },
  {
    q: 'How does the "Chat with Video" feature work?',
    a: 'After processing, the transcript is split into chunks and embedded into a vector database. When you ask a question, the system retrieves the most relevant chunks using semantic search (RAG — Retrieval-Augmented Generation) and feeds them to an LLM to generate an accurate, grounded answer.',
  },
  {
    q: 'Can I process multiple videos in one session?',
    a: 'You can process one video at a time. Each new video replaces the previous session\'s data. After analyzing a video, click "← Process another video" to start fresh. Multi-session support is on the roadmap.',
  },
  {
    q: 'What AI models does VidIntel use?',
    a: 'The transcription engine uses Groq Whisper API (for English) and Sarvam AI (for Hinglish). Summarization, extraction, and chat are powered by Mistral AI. The vector store uses LangChain with ChromaDB.',
  },
  {
    q: 'Does it work for podcasts, lectures, or interviews — not just meetings?',
    a: 'Absolutely. VidIntel works on any spoken-word content. Podcasts, online courses, Instagram tutorials, interviews, conference talks — if there\'s speech, it can be transcribed and analyzed.',
  },
  {
    q: 'Is there a video length limit?',
    a: 'There is no hard-coded limit, but very long videos (3+ hours) will take proportionally longer to process and require sufficient RAM/compute. For best performance, videos under 2 hours are ideal.',
  },
  {
    q: 'Can I export the transcript, summary, or action items?',
    a: 'Currently, you can copy content directly from the dashboard panels. A one-click export to PDF, Markdown, or Notion is planned for a future release.',
  },
];

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''} animate-fade-in`} style={{ animationDelay: `${index * 0.05}s` }}>
      <button
        id={`faq-item-${index}`}
        className="faq-question"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>{faq.q}</span>
        <div className="faq-chevron">
          <ChevronDown size={16} />
        </div>
      </button>
      <div className="faq-answer">
        <div className="faq-answer-inner">{faq.a}</div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="page-wrapper">
      <div className="container">

        {/* Header */}
        <div className="page-header animate-fade-in">
          <div className="section-label">
            <HelpCircle size={13} /> Common Questions
          </div>
          <h1>Frequently Asked <span className="text-gradient">Questions</span></h1>
          <p>Everything you need to know about VidIntel. Can't find your answer? Reach out anytime.</p>
        </div>

        {/* FAQ List */}
        <div className="faq-list" style={{ marginBottom: '5rem' }}>
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Still have questions panel */}
        <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤔</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Still have questions?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: 420, margin: '0 auto 2rem' }}>
            Open the app and try it out — most questions answer themselves once you see it in action.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/app" id="faq-launch-btn" className="btn btn-primary">
              Try the App <ArrowRight size={16} />
            </Link>
            <Link to="/how-to-use" className="btn btn-ghost">
              Read the Guide
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
