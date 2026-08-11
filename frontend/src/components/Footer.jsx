import { Link } from 'react-router-dom';
import { Video, GitBranch, Share2, Globe, Heart } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features',     to: '/features' },
    { label: 'How It Works', to: '/how-to-use' },
    { label: 'FAQ',          to: '/faq' },
    { label: 'Launch App',   to: '/app' },
  ],
  Company: [
    { label: 'About',        to: '/about' },
    { label: 'Blog',         to: '/about' },
    { label: 'Careers',      to: '/about' },
  ],
  Tech: [
    { label: 'FastAPI',      href: 'https://fastapi.tiangolo.com' },
    { label: 'React',        href: 'https://react.dev' },
    { label: 'Groq Whisper',      href: 'https://groq.com' },
    { label: 'Sarvam AI',         href: 'https://www.sarvam.ai' },
    { label: 'LangChain',    href: 'https://langchain.com' },
  ],
};

const techBadges = ['React', 'FastAPI', 'Groq & Sarvam', 'LangChain', 'Vite'];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="navbar-logo-icon" style={{ width: 32, height: 32 }}>
              <Video size={16} color="white" />
            </div>
            <span>
              Vid<span className="text-gradient">Intel</span>
            </span>
          </div>
          <p>
            AI-powered video intelligence. Transcribe, summarize, and chat with any video or meeting recording in seconds.
          </p>
          {/* Social */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            {[
              { icon: GitBranch, href: '#', label: 'GitHub' },
              { icon: Share2,   href: '#', label: 'Twitter' },
              { icon: Globe,    href: '#', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: 36, height: 36,
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary-hover)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} className="footer-col">
            <h4>{heading}</h4>
            <ul>
              {links.map(link => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to}>{link.label}</Link>
                  ) : (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0 2rem' }} />
      <div className="footer-bottom">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          Built with <Heart size={14} style={{ color: 'var(--secondary)' }} fill="var(--secondary)" /> by Dhairya &nbsp;·&nbsp; © {new Date().getFullYear()}
        </span>
        <div className="tech-badges">
          {techBadges.map(t => <span key={t} className="tech-badge">{t}</span>)}
        </div>
      </div>
    </footer>
  );
}
