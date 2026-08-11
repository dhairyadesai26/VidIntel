import { Link } from 'react-router-dom';
import {
  Mic, FileText, CheckSquare, Key, MessageSquare, Globe,
  Brain, Shield, Zap, Clock, Layers, Search, ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: <Mic size={24} />,
    color: 'var(--primary-hover)',
    bg: 'rgba(99,102,241,0.12)',
    title: 'Groq Whisper & Sarvam AI',
    desc: 'Industry-leading accuracy with Groq Whisper API for English, and Sarvam AI specifically optimized for flawless Hinglish transcription.',
    chip: { label: 'AI Powered', cls: 'chip-indigo' },
  },
  {
    icon: <Brain size={24} />,
    color: 'var(--accent-cyan)',
    bg: 'rgba(6,182,212,0.12)',
    title: 'Smart Summarization',
    desc: 'LLM-powered summaries that capture the essence of any meeting or video — not just bullet points, but true understanding.',
    chip: { label: 'LLM', cls: 'chip-cyan' },
  },
  {
    icon: <CheckSquare size={24} />,
    color: 'var(--accent-emerald)',
    bg: 'rgba(16,185,129,0.12)',
    title: 'Action Item Extraction',
    desc: 'Never miss a task again. Automatically identifies and lists every action item, owner, and deadline mentioned.',
    chip: { label: 'Productivity', cls: 'chip-emerald' },
  },
  {
    icon: <Key size={24} />,
    color: 'var(--accent-amber)',
    bg: 'rgba(245,158,11,0.12)',
    title: 'Key Decision Tracking',
    desc: 'Automatically surfaces every important decision made during a meeting, so your team is always aligned.',
    chip: { label: 'Insights', cls: 'chip-amber' },
  },
  {
    icon: <MessageSquare size={24} />,
    color: 'var(--secondary)',
    bg: 'rgba(236,72,153,0.12)',
    title: 'RAG-Powered Chat',
    desc: 'Ask any question about your video using Retrieval-Augmented Generation. Get cited, accurate answers in seconds.',
    chip: { label: 'RAG', cls: 'chip-rose' },
  },
  {
    icon: <Globe size={24} />,
    color: 'var(--accent-cyan)',
    bg: 'rgba(6,182,212,0.12)',
    title: 'Multi-Language Support',
    desc: 'Transcribe and understand videos in 50+ languages. Perfect for international teams and global content.',
    chip: { label: '50+ Languages', cls: 'chip-cyan' },
  },
  {
    icon: <Zap size={24} />,
    color: 'var(--accent-amber)',
    bg: 'rgba(245,158,11,0.12)',
    title: 'Real-Time Streaming',
    desc: 'See progress live as your video is downloaded, transcribed, analyzed, and indexed — step by step.',
    chip: { label: 'Live Updates', cls: 'chip-amber' },
  },
  {
    icon: <FileText size={24} />,
    color: 'var(--primary-hover)',
    bg: 'rgba(99,102,241,0.12)',
    title: 'Full Transcript Access',
    desc: 'Access the complete raw transcript alongside every AI-generated insight. Full context, always.',
    chip: { label: 'Transparency', cls: 'chip-indigo' },
  },
  {
    icon: <Shield size={24} />,
    color: 'var(--accent-emerald)',
    bg: 'rgba(16,185,129,0.12)',
    title: 'Local Processing',
    desc: 'Your content stays on your server. No third-party cloud uploads for the core pipeline. Privacy first.',
    chip: { label: 'Privacy', cls: 'chip-emerald' },
  },
];

const highlights = [
  { icon: <Layers size={20} />,  title: 'Full Pipeline',    desc: 'End-to-end: download → transcribe → analyze → index → chat.' },
  { icon: <Clock size={20} />,   title: 'Fast Processing',  desc: 'Most videos fully analyzed in under 2 minutes.' },
  { icon: <Search size={20} />,  title: 'Semantic Search',  desc: 'Vector-based search so answers are always contextually accurate.' },
];

export default function FeaturesPage() {
  return (
    <div className="page-wrapper">
      <div className="container">

        {/* Header */}
        <div className="page-header animate-fade-in">
          <div className="section-label">
            <Zap size={13} /> Full Feature Set
          </div>
          <h1>Everything you need to understand <span className="text-gradient">any video</span></h1>
          <p>A complete AI pipeline — from raw video to actionable insights — all in one place.</p>
        </div>

        {/* Highlight strip */}
        <div
          className="animate-fade-in-d1 glass-panel"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0', marginBottom: '4rem', overflow: 'hidden' }}
        >
          {highlights.map((h, i) => (
            <div
              key={i}
              style={{
                padding: '1.75rem',
                borderRight: i < highlights.length - 1 ? '1px solid var(--glass-border)' : 'none',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }}>{h.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.9375rem' }}>{h.title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card animate-fade-in"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div className="feature-icon" style={{ background: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <span className={`chip ${f.chip.cls}`}>{f.chip.label}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cta-section animate-fade-in" style={{ margin: '5rem 0 2rem' }}>
          <h2>Ready to experience all of this?</h2>
          <p>Try it free — no sign-up, no credit card.</p>
          <Link to="/app" id="features-cta-btn" className="btn btn-primary btn-large">
            Launch the App <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
}
