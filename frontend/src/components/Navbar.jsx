import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Video, Menu, X, ExternalLink } from 'lucide-react';

const navLinks = [
  { to: '/',           label: 'Home' },
  { to: '/features',   label: 'Features' },
  { to: '/how-to-use', label: 'How It Works' },
  { to: '/faq',        label: 'FAQ' },
  { to: '/about',      label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <Video size={18} color="white" />
            </div>
            <span>
              Vid<span className="text-gradient">Intel</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="navbar-cta">
            <Link to="/app" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
              Launch App <ExternalLink size={14} />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} color="white" /> : <Menu size={22} color="white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <Link
          to="/app"
          className="btn btn-primary"
          style={{ marginTop: '0.75rem', justifyContent: 'center' }}
          onClick={() => setMenuOpen(false)}
        >
          Launch App
        </Link>
      </div>
    </>
  );
}
