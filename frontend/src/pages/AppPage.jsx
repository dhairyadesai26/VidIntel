import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link, ArrowRight, Loader2, Video, FileText, CheckCircle, HelpCircle, Upload, MessageSquare, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/* ── Sub-components ── */

const HeroInput = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) onSubmit({ type: 'url', payload: url });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) onSubmit({ type: 'file', payload: file });
  };

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flex: 1, gap: '0.75rem', minWidth: 0 }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
          <Link style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} size={18} />
          <input
            id="app-url-input"
            type="text"
            className="input-field"
            style={{ paddingLeft: '2.75rem' }}
            placeholder="Paste video URL (Instagram, TikTok, Twitter)…"
            value={url}
            onChange={e => setUrl(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button id="app-process-btn" type="submit" className="btn-primary" disabled={isLoading || !url.trim()}>
          {isLoading ? <Loader2 className="spinner" size={18} /> : <ArrowRight size={18} />}
          Analyze
        </button>
      </form>

      <div style={{ width: '1px', height: 36, background: 'var(--glass-border)', flexShrink: 0 }} />

      <button
        id="app-upload-btn"
        className="btn-ghost"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
        style={{ flexShrink: 0 }}
      >
        <Upload size={16} /> Upload File
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="audio/*,video/*"
        onChange={handleFileUpload}
      />
    </div>
  );
};

const ProgressView = ({ status, message }) => {
  const steps = ['downloading', 'transcribing', 'analyzing', 'extracting', 'indexing'];
  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '4rem', textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
      <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 2rem' }}>
        <div style={{ position: 'absolute', inset: 0, border: '4px solid var(--glass-border)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, border: '4px solid var(--primary)', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
        <Video size={28} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: 'var(--primary)' }} />
      </div>
      <h2 style={{ marginBottom: '0.5rem' }}>Processing Video</h2>
      <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '2rem' }}>{message}</p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {steps.map((step, i) => {
          const isActive = status === step;
          const isDone   = steps.indexOf(status) > i;
          return (
            <div key={i} style={{
              width: isActive ? 32 : 8,
              height: 8,
              borderRadius: 4,
              background: isDone ? 'var(--accent-emerald)' : isActive ? 'var(--primary)' : 'var(--glass-border)',
              transition: 'all 0.4s ease',
            }} />
          );
        })}
      </div>
    </div>
  );
};

const Dashboard = ({ data }) => {
  if (!data) return null;

  const Card = ({ title, icon, children, className = '' }) => (
    <div className={`glass-panel glass-hover ${className}`} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
        <div style={{ background: 'rgba(99,102,241,0.1)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', color: 'var(--primary)', boxShadow: '0 0 10px rgba(99,102,241,0.1)' }}>
          {icon}
        </div>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
      </div>
      <div className="markdown-content" style={{ flex: 1, overflowY: 'auto' }}>
        <ReactMarkdown>{children}</ReactMarkdown>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', fontWeight: '800' }}>
        <span className="text-gradient">{data.title || 'Video Analysis Complete'}</span>
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Full width Summary */}
        <Card title="Summary" icon={<FileText size={22} />} className="animate-fade-in-d1">
          {data.summary}
        </Card>
        
        {/* 3-Column Grid for the rest */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div className="animate-fade-in-d2" style={{ height: '100%' }}>
            <Card title="Action Items" icon={<CheckCircle size={22} />}>{data.action_items}</Card>
          </div>
          <div className="animate-fade-in-d3" style={{ height: '100%' }}>
            <Card title="Key Decisions" icon={<Video size={22} />}>{data.key_decisions}</Card>
          </div>
          <div className="animate-fade-in-d4" style={{ height: '100%' }}>
            <Card title="Open Questions" icon={<HelpCircle size={22} />}>{data.open_questions}</Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  const suggestedQuestions = [
    "What are the main takeaways?",
    "Can you summarize the action items?",
    "What decisions were made?",
    "Were there any unresolved questions?"
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const userMessage = text.trim();
    if (!userMessage) return;
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage, session_id: 'default' }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: res.ok ? data.answer : 'Sorry, an error occurred.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please ensure the backend is running.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="glass-panel animate-fade-in-d5" style={{ display: 'flex', flexDirection: 'column', height: 600, marginTop: '2rem', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.875rem', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ width: 10, height: 10, background: 'var(--accent-emerald)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-emerald)' }} />
        <MessageSquare size={18} style={{ color: 'var(--primary)' }} />
        <div>
          <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'Outfit, sans-serif' }}>AI Video Assistant</h3>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ask anything about the video content</p>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {messages.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1rem' }}>
              <Sparkles size={32} />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center' }}>How can I help you understand this video better?</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: 500 }}>
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  className="glass-hover"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)', color: 'var(--text-main)', fontSize: '0.875rem', cursor: 'pointer' }}
                  onClick={() => handleSend(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.role === 'user' ? 'user' : 'ai'} animate-message`} style={{ animationDelay: `${i === messages.length - 1 ? 0 : 0}ms` }}>
              <div className={`chat-avatar ${msg.role === 'user' ? 'user' : 'ai'}`}>
                {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
              </div>
              <div className="chat-bubble markdown-content">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
        
        {isTyping && (
          <div className="chat-message ai animate-message">
             <div className="chat-avatar ai">
                <Sparkles size={18} />
             </div>
             <div className="chat-bubble" style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '1.25rem 1.5rem' }}>
              {[0,1,2].map(i => (
                <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-main)', display: 'inline-block', animation: `float 1s ${i*0.2}s ease-in-out infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '1.25rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(2, 6, 23, 0.5)' }}>
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              id="chat-input"
              type="text"
              className="input-field"
              placeholder="Ask a question about the video..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isTyping}
              style={{ borderRadius: 'var(--radius-full)', padding: '1rem 1.5rem', background: 'var(--bg-base)', border: '1px solid var(--glass-border)', fontSize: '0.95rem' }}
            />
          </div>
          <button
            id="chat-send-btn"
            type="submit"
            className="btn-primary"
            style={{ borderRadius: 'var(--radius-full)', padding: '0 1.5rem', flexShrink: 0, boxShadow: '0 0 20px var(--primary-glow)' }}
            disabled={isTyping || !input.trim()}
          >
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

/* ── Main AppPage ── */
export default function AppPage() {
  const [searchParams] = useSearchParams();
  const [appState, setAppState] = useState('idle'); // idle | processing | complete | error
  const [progressMsg, setProgressMsg] = useState('');
  const [currentStep, setCurrentStep] = useState('');
  const [resultData, setResultData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      loadHistoryItem(id);
    }
  }, [searchParams]);

  const loadHistoryItem = async (id) => {
    setAppState('processing');
    setProgressMsg('Loading past analysis...');
    setCurrentStep('analyzing');
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/analysis/${id}`);
      if (!res.ok) throw new Error('Analysis not found');
      const data = await res.json();
      setResultData(data.analysis);
      setAppState('complete');
    } catch (err) {
      setAppState('error');
      setErrorMsg(err.message);
    }
  };

  const handleProcess = async ({ type, payload }) => {
    setAppState('processing');
    setProgressMsg('Connecting to server…');
    setErrorMsg('');

    try {
      const formData = new FormData();
      if (type === 'url')  formData.append('source_url', payload);
      if (type === 'file') formData.append('file', payload);
      formData.append('language', 'english');

      const response = await fetch(`${API_BASE_URL}/api/process`, { method: 'POST', body: formData });
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n\n')) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.status === 'error') { setAppState('error'); setErrorMsg(data.message); return; }
              if (data.status === 'complete') { setResultData(data.result); setAppState('complete'); return; }
              setCurrentStep(data.status);
              setProgressMsg(data.message);
            } catch { /* skip parse errors */ }
          }
        }
      }
    } catch (err) {
      setAppState('error');
      setErrorMsg(err.message || 'An unknown error occurred.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        {/* Page header */}
        <div className="app-hero">
          <div className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <Video size={13} /> Video Intelligence
          </div>
          <h1>Analyze Your <span className="text-gradient">Video</span></h1>
          <p>Paste a video URL or upload a local audio/video file to get started.</p>
        </div>

        {/* IDLE — Input */}
        {appState === 'idle' && (
          <div className="animate-fade-in" style={{ maxWidth: 680, margin: '0 auto' }}>
            <HeroInput onSubmit={handleProcess} isLoading={false} />
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Supports public video URLs, MP4, MP3, WAV, M4A, and more.
            </p>
            <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginTop: '1rem', fontSize: '0.85rem', textAlign: 'center', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
              <strong>Note:</strong> Direct YouTube URLs do not work due to server restrictions. For YouTube, please download the video/audio locally first, then use the <strong>Upload File</strong> button.
            </div>
          </div>
        )}

        {/* PROCESSING */}
        {appState === 'processing' && (
          <ProgressView status={currentStep} message={progressMsg} />
        )}

        {/* ERROR */}
        {appState === 'error' && (
          <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', textAlign: 'center', borderColor: 'rgba(244,63,94,0.3)', background: 'rgba(244,63,94,0.05)', maxWidth: 520, margin: '0 auto' }}>
            <h2 style={{ color: 'var(--accent-rose)', marginBottom: '0.75rem' }}>Processing Error</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{errorMsg}</p>
            <button id="error-retry-btn" className="btn-primary" onClick={() => setAppState('idle')}>
              Try Again
            </button>
          </div>
        )}

        {/* COMPLETE */}
        {appState === 'complete' && resultData && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.75rem' }}>
              <button
                id="process-another-btn"
                className="btn-ghost"
                onClick={() => { setAppState('idle'); setResultData(null); }}
              >
                ← Process another video
              </button>
            </div>
            <Dashboard data={resultData} />
            <ChatInterface />
          </div>
        )}

        {/* Bottom padding */}
        <div style={{ height: '4rem' }} />
      </div>
    </div>
  );
}
