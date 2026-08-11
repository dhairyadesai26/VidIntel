import { Link } from 'react-router-dom';
import {
  ArrowRight, Zap, FileText, CheckSquare, MessageSquare,
  Globe, Brain, ChevronRight, Star, Users, Clock, Sparkles
} from 'lucide-react';

/* ── Mini feature preview cards ── */
const previewFeatures = [
  {
    icon: <Zap size={22} />,
    color: 'var(--accent-amber)',
    bg: 'rgba(245,158,11,0.12)',
    title: 'Instant Transcription',
    desc: 'Whisper-powered transcription in 50+ languages with speaker diarization.',
  },
  {
    icon: <Brain size={22} />,
    color: 'var(--primary-hover)',
    bg: 'rgba(99,102,241,0.12)',
    title: 'Smart Summarization',
    desc: 'AI-generated executive summaries, action items, and key decisions.',
  },
  {
    icon: <MessageSquare size={22} />,
    color: 'var(--accent-emerald)',
    bg: 'rgba(16,185,129,0.12)',
    title: 'Chat with Video',
    desc: 'Ask any question about your video and get instant, cited answers.',
  },
];

/* ── How it works mini-steps ── */
const miniSteps = [
  { num: '01', label: 'Paste a video URL or upload a file' },
  { num: '02', label: 'AI processes, transcribes & analyzes' },
  { num: '03', label: 'Explore insights & chat freely' },
];

/* ── Stats ── */
const stats = [
  { icon: <Zap size={18} />,   num: '< 2 min',  label: 'Avg. processing time' },
  { icon: <Globe size={18} />, num: '50+',      label: 'Supported languages' },
  { icon: <Star size={18} />,  num: '99%',      label: 'Transcription accuracy' },
  { icon: <Users size={18} />, num: '10k+',     label: 'Videos processed' },
];

export default function LandingPage() {
  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="hero-badge animate-fade-in">
            <Sparkles size={14} />
            Powered by Whisper AI &amp; LangChain RAG
          </div>

          <h1 className="animate-fade-in-d1">
            Unlock insights from<br />
            <span className="text-gradient">any video or meeting</span>
          </h1>

          <p className="animate-fade-in-d2">
            Transcribe, summarize, extract action items, and chat with your videos in seconds. Just paste a link or upload a file — no setup required.
          </p>

          <div className="hero-cta animate-fade-in-d3">
            <Link to="/app" id="hero-cta-launch" className="btn btn-primary btn-large">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link to="/features" className="btn btn-ghost btn-large">
              See Features <ChevronRight size={18} />
            </Link>
          </div>

          {/* Stats row */}
          <div className="hero-stats">
            {stats.map(({ icon, num, label }) => (
              <div key={label} className="hero-stat-item">
                <div className="stat-num">{num}</div>
                <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  {icon} {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── FEATURES PREVIEW ── */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <div className="section-label">
              <Sparkles size={13} /> Core Capabilities
            </div>
            <h2 className="section-title">Everything you need,<br /><span className="text-gradient">nothing you don't</span></h2>
            <p className="section-subtitle">Three pillars of AI-powered video understanding.</p>
          </div>

          <div className="features-grid animate-fade-in">
            {previewFeatures.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon" style={{ background: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/features" className="btn btn-ghost">
              View all features <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS MINI ── */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <div className="section-label">
              <Clock size={13} /> Quick Start
            </div>
            <h2 className="section-title">Up and running in <span className="text-gradient">3 steps</span></h2>
          </div>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            {/* Connector line */}
            <div style={{
              position: 'absolute',
              top: '2rem', left: '20%', right: '20%',
              height: '2px',
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              opacity: 0.25,
            }} />

            {miniSteps.map((s, i) => (
              <div
                key={i}
                className="animate-fade-in glass-panel"
                style={{
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  flex: '1 1 220px',
                  maxWidth: 280,
                  animationDelay: `${i * 0.12}s`,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  fontFamily: 'Outfit',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '1rem',
                }}>
                  {s.num}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/how-to-use" className="btn btn-ghost">
              Full guide <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TESTIMONIAL / SOCIAL PROOF ── */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <div className="section-label">
              <Star size={13} /> Loved by teams
            </div>
            <h2 className="section-title">Trusted by <span className="text-gradient">professionals</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {[
              { text: '"VidIntel saved our team 3 hours of note-taking per week. The action items are spot-on every time."', name: 'Sarah K.', role: 'Product Manager' },
              { text: '"I use it for every online tutorial. Being able to chat with the video content is a game-changer for learning."', name: 'Raj P.', role: 'Software Engineer' },
              { text: '"Finally an AI tool that actually understands context. The summaries are accurate and the Q&A is incredible."', name: 'Emma L.', role: 'Researcher' },
            ].map((t, i) => (
              <div key={i} className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="var(--accent-amber)" color="var(--accent-amber)" />
                  ))}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{t.text}</p>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div className="container">
        <div className="cta-section animate-fade-in">
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>
            <Zap size={13} /> Ready to try?
          </div>
          <h2>Start analyzing videos <span className="text-gradient">right now</span></h2>
          <p>No account needed. Just paste a URL and go.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/app" id="cta-bottom-launch" className="btn btn-primary btn-large">
              Launch App Free <ArrowRight size={18} />
            </Link>
            <Link to="/how-to-use" className="btn btn-ghost btn-large">
              See How It Works
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
