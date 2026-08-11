import { Link } from 'react-router-dom';
import { Link as LinkIcon, Upload, Cpu, BarChart2, MessageCircle, ArrowRight, CheckCircle, Info } from 'lucide-react';

const steps = [
  {
    icon: <LinkIcon size={22} />,
    color: 'var(--primary)',
    bg: 'rgba(99,102,241,0.12)',
    title: 'Paste a Video URL or Upload a File',
    desc: 'Navigate to the App page and paste any Instagram Reel, TikTok, Twitter, or public video link into the input box, or click "Upload File" to select a local audio/video file (MP4, MP3, WAV, M4A).',
    tips: [
      'Public video URLs (like Instagram Reels, TikTok, Twitter) work natively.',
      'Local files up to several hours are supported.',
      'Audio-only files (podcasts, interviews) work great too.',
    ],
  },
  {
    icon: <Cpu size={22} />,
    color: 'var(--accent-cyan)',
    bg: 'rgba(6,182,212,0.12)',
    title: 'AI Processes Your Video',
    desc: 'Hit "Analyze" and watch the real-time progress tracker. Our pipeline downloads (if needed), splits into chunks, transcribes using Groq Whisper API, then sends the transcript through LLM analysis.',
    tips: [
      'Average 1–2 minutes for a 1-hour video.',
      'You can see each stage: downloading, transcribing, analyzing, extracting, indexing.',
      'Do not close the tab during processing.',
    ],
  },
  {
    icon: <BarChart2 size={22} />,
    color: 'var(--accent-emerald)',
    bg: 'rgba(16,185,129,0.12)',
    title: 'Explore Your Insights Dashboard',
    desc: 'Once done, a dashboard appears with four panels: a concise Summary, Action Items, Key Decisions, and Open Questions — all extracted automatically.',
    tips: [
      'Each panel is scrollable for longer content.',
      'Action items are formatted as a ready-to-copy list.',
      'Scroll down to access the full transcript if needed.',
    ],
  },
  {
    icon: <MessageCircle size={22} />,
    color: 'var(--secondary)',
    bg: 'rgba(236,72,153,0.12)',
    title: 'Chat with Your Video',
    desc: 'Below the dashboard is a live AI chat. Ask any specific question — "What was the budget discussed?", "Who is responsible for the marketing plan?" — and get a precise, context-aware answer instantly.',
    tips: [
      'Ask follow-up questions naturally.',
      'The AI remembers the full video context.',
      'Works great for finding specific moments or quotes.',
    ],
  },
  {
    icon: <Upload size={22} />,
    color: 'var(--accent-amber)',
    bg: 'rgba(245,158,11,0.12)',
    title: 'Start a New Analysis Anytime',
    desc: 'Click "← Process another video" to return to the input screen and analyze a completely new video. Each analysis replaces the previous session.',
    tips: [
      'No limit on how many videos you analyze.',
      'Each new video creates a fresh AI chat context.',
    ],
  },
];

export default function HowToUsePage() {
  return (
    <div className="page-wrapper">
      <div className="container">

        {/* Header */}
        <div className="page-header animate-fade-in">
          <div className="section-label">
            <Info size={13} /> Step-by-Step Guide
          </div>
          <h1>How to use <span className="text-gradient">VidIntel</span></h1>
          <p>From zero to insights in under 5 minutes. Here's everything you need to know.</p>
        </div>

        {/* Steps */}
        <div className="steps-list" style={{ marginBottom: '5rem' }}>
          {steps.map((step, i) => (
            <div key={i} className="step-item animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="step-number" style={{ background: `linear-gradient(135deg, ${step.color}, ${step.bg.replace('0.12', '0.6')})` }}>
                {i + 1}
              </div>
              <div className="step-content" style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.625rem' }}>
                  <div style={{ background: step.bg, color: step.color, padding: '0.375rem', borderRadius: 'var(--radius-sm)', display: 'flex' }}>
                    {step.icon}
                  </div>
                  <h3 style={{ fontSize: '1.0625rem' }}>{step.title}</h3>
                </div>
                <p style={{ marginBottom: '1.25rem' }}>{step.desc}</p>

                {/* Tips */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {step.tips.map((tip, j) => (
                    <div key={j} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                      <CheckCircle size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick tips panel */}
        <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '1.375rem', marginBottom: '1.5rem' }}>
            💡 Pro Tips for Best Results
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { emoji: '🎯', title: 'Specific questions work best', text: 'Instead of "What was discussed?", ask "What deadline was set for the marketing campaign?"' },
              { emoji: '🌐', title: 'Use the language option', text: 'If your video is not in English, the pipeline handles multiple source languages automatically.' },
              { emoji: '📋', title: 'Copy action items directly', text: 'The action items panel is formatted for easy copying into Notion, Jira, or your task manager.' },
              { emoji: '🎙️', title: 'Audio quality matters', text: 'Clear audio produces better transcription. Avoid highly compressed or noisy recordings if possible.' },
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.875rem' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{tip.emoji}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.375rem' }}>{tip.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{tip.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section" style={{ marginBottom: '2rem' }}>
          <h2>Ready to try it yourself?</h2>
          <p>Jump straight into the app — no account required.</p>
          <Link to="/app" id="howto-cta-btn" className="btn btn-primary btn-large">
            Launch App Now <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
}
