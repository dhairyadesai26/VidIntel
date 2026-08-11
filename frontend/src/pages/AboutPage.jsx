import { Link } from 'react-router-dom';
import { Video, Code2, Cpu, Database, Globe, Layers, Zap, ArrowRight, GitBranch } from 'lucide-react';

const techStack = [
  { icon: '⚛️',  name: 'React 19',      sub: 'Frontend UI',           color: 'chip-cyan' },
  { icon: '⚡',  name: 'Vite 8',        sub: 'Build Tool',            color: 'chip-amber' },
  { icon: '🐍',  name: 'FastAPI',        sub: 'Backend API',           color: 'chip-emerald' },
  { icon: '🎙️', name: 'Groq & Sarvam',   sub: 'Transcription APIs',    color: 'chip-indigo' },
  { icon: '🦜',  name: 'LangChain',     sub: 'RAG Orchestration',     color: 'chip-rose' },
  { icon: '🗄️', name: 'ChromaDB',      sub: 'Vector Store',          color: 'chip-amber' },
  { icon: '🤖',  name: 'Mistral AI',    sub: 'Summarization & Chat',  color: 'chip-indigo' },
  { icon: '📡',  name: 'SSE Streaming', sub: 'Real-time Progress',    color: 'chip-cyan' },
];

const values = [
  { icon: <Zap size={20} />,     title: 'Speed First',      desc: 'We obsess over latency. Processing should feel instant, not slow.' },
  { icon: <Globe size={20} />,   title: 'Accessible AI',    desc: 'Powerful AI should not require a PhD. Simple UX, deep capability.' },
  { icon: <Layers size={20} />,  title: 'Open & Transparent', desc: 'Built on open-source tools. No black boxes. You own your data.' },
  { icon: <Code2 size={20} />,   title: 'Developer Friendly', desc: 'Clean APIs, modular architecture. Easy to extend and self-host.' },
];

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <div className="container">

        {/* Header */}
        <div className="page-header animate-fade-in">
          <div className="section-label">
            <Video size={13} /> Our Mission
          </div>
          <h1>Built to make <span className="text-gradient">video intelligence</span> accessible</h1>
          <p>VidIntel was born from a simple frustration: meetings are full of insights that disappear the moment the recording ends.</p>
        </div>

        {/* Mission text */}
        <div className="glass-panel animate-fade-in-d1" style={{ padding: '2.5rem 3rem', maxWidth: 780, margin: '0 auto 5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>🚀</div>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
            We built VidIntel to give everyone — from solo creators to enterprise teams — a way to instantly extract the value buried inside any video. No more rewatching. No more lost action items. No more "What did they decide again?"
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem' }}>
            The entire system is powered by cutting edge AI: Groq Whisper & Sarvam AI for transcription, LangChain for RAG, and ChromaDB for vector search. Fast, accurate, and scalable.
          </p>
        </div>

        {/* Values */}
        <div className="section-sm">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <div className="section-label"><Cpu size={13} /> Our Values</div>
            <h2 className="section-title">What we believe in</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <div
                key={i}
                className="feature-card animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="feature-icon" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--primary)' }}>
                  {v.icon}
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" style={{ margin: '4rem 0' }} />

        {/* Tech Stack */}
        <div className="section-sm">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <div className="section-label"><Database size={13} /> Under the Hood</div>
            <h2 className="section-title">The <span className="text-gradient">tech stack</span></h2>
            <p className="section-subtitle">Built on proven, open-source foundations.</p>
          </div>
          <div className="tech-stack-grid animate-fade-in">
            {techStack.map((t, i) => (
              <div key={i} className="tech-item">
                <div className="tech-icon">{t.icon}</div>
                <div className="tech-name">{t.name}</div>
                <div className="tech-sub">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" style={{ margin: '4rem 0' }} />

        {/* Architecture diagram (textual) */}
        <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '1.375rem', marginBottom: '2rem', textAlign: 'center' }}>
            Pipeline Architecture
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0' }}>
            {[
              { label: 'Video URL\nor File Upload', icon: '📥', color: 'var(--accent-cyan)' },
              { label: 'Audio\nExtraction', icon: '🎙️', color: 'var(--primary)' },
              { label: 'Groq & Sarvam\nTranscription', icon: '📝', color: 'var(--accent-amber)' },
              { label: 'LLM\nAnalysis', icon: '🧠', color: 'var(--secondary)' },
              { label: 'Vector\nIndexing', icon: '🗄️', color: 'var(--accent-emerald)' },
              { label: 'RAG\nChat', icon: '💬', color: 'var(--primary-hover)' },
            ].map((step, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '1rem 0.75rem' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: `${step.color}20`,
                    border: `2px solid ${step.color}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.375rem', margin: '0 auto 0.625rem',
                  }}>
                    {step.icon}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'pre', lineHeight: 1.4, textAlign: 'center' }}>{step.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: '0 0.25rem', marginBottom: '1.5rem' }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section" style={{ marginBottom: '2rem' }}>
          <h2>Want to contribute or self-host?</h2>
          <p>VidIntel is open-source and designed to be self-hostable. Star us on GitHub or just try the app now.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" id="about-github-btn" className="btn btn-ghost btn-large" target="_blank" rel="noopener noreferrer">
            <GitBranch size={18} /> View on GitHub
            </a>
            <Link to="/app" id="about-launch-btn" className="btn btn-primary btn-large">
              Launch App <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
