import { useState, useRef, useEffect } from 'react';
import { Link, ArrowRight, Loader2, Video, FileText, CheckCircle, HelpCircle, Upload, MessageSquare } from 'lucide-react';

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
            placeholder="Paste YouTube URL or video link…"
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

  const Card = ({ title, icon, children }) => (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
        <div style={{ background: 'rgba(99,102,241,0.1)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', color: 'var(--primary)' }}>
          {icon}
        </div>
        <h3 style={{ margin: 0, fontSize: '1rem' }}>{title}</h3>
      </div>
      <div style={{ color: 'var(--text-muted)', whiteSpace: 'pre-wrap', flex: 1, overflowY: 'auto', fontSize: '0.9rem', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.75rem', textAlign: 'center' }}>{data.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <Card title="Summary"        icon={<FileText size={20} />}>{data.summary}</Card>
        <Card title="Action Items"   icon={<CheckCircle size={20} />}>{data.action_items}</Card>
        <Card title="Key Decisions"  icon={<Video size={20} />}>{data.key_decisions}</Card>
        <Card title="Open Questions" icon={<HelpCircle size={20} />}>{data.open_questions}</Card>
      </div>
    </div>
  );
};

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Hey! I\'ve analyzed the video. Ask me anything about its content, action items, or specific moments.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:8000/api/chat', {
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

  return (
    <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: 560, marginTop: '1.5rem' }}>
      {/* Header */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 9, height: 9, background: 'var(--accent-emerald)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent-emerald)' }} />
        <MessageSquare size={16} style={{ color: 'var(--primary)' }} />
        <h3 style={{ margin: 0, fontSize: '0.9375rem' }}>Chat with Video</h3>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
            border: msg.role === 'user' ? 'none' : '1px solid var(--glass-border)',
            padding: '0.875rem 1rem',
            borderRadius: 'var(--radius-md)',
            borderBottomRightRadius: msg.role === 'user' ? 4 : 'var(--radius-md)',
            borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 'var(--radius-md)',
            maxWidth: '80%',
            fontSize: '0.9rem',
          }}>
            <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>{msg.content}</p>
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '6px', alignItems: 'center' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-muted)', display: 'inline-block', animation: `float 1s ${i*0.2}s ease-in-out infinite` }} />
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            id="chat-input"
            type="text"
            className="input-field"
            placeholder="Ask anything about the video…"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isTyping}
            style={{ borderRadius: 'var(--radius-full)' }}
          />
          <button
            id="chat-send-btn"
            type="submit"
            className="btn-primary"
            style={{ borderRadius: 'var(--radius-full)', padding: '0 1.25rem', flexShrink: 0 }}
            disabled={isTyping || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

/* ── Main AppPage ── */
export default function AppPage() {
  const [appState, setAppState] = useState('idle'); // idle | processing | complete | error
  const [progressMsg, setProgressMsg] = useState('');
  const [currentStep, setCurrentStep] = useState('');
  const [resultData, setResultData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleProcess = async ({ type, payload }) => {
    setAppState('processing');
    setProgressMsg('Connecting to server…');
    setErrorMsg('');

    try {
      const formData = new FormData();
      if (type === 'url')  formData.append('source_url', payload);
      if (type === 'file') formData.append('file', payload);
      formData.append('language', 'english');

      const response = await fetch('http://localhost:8000/api/process', { method: 'POST', body: formData });
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
          <p>Paste a YouTube URL or upload a local audio/video file to get started.</p>
        </div>

        {/* IDLE — Input */}
        {appState === 'idle' && (
          <div className="animate-fade-in" style={{ maxWidth: 680, margin: '0 auto' }}>
            <HeroInput onSubmit={handleProcess} isLoading={false} />
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Supports YouTube, MP4, MP3, WAV, M4A, and more.
            </p>
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
