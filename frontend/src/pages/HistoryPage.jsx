import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Video, ArrowRight, Loader2 } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const res = await fetch(`${API_BASE_URL}/api/history`);
        if (!res.ok) throw new Error('Failed to fetch history');
        const data = await res.json();
        setHistory(data.history || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="app-hero" style={{ paddingBottom: '2rem' }}>
          <div className="section-label">
            <Clock size={13} /> Past Analyses
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Your <span className="text-gradient">History</span></h1>
          <p>Review previously processed videos and audio files.</p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader2 className="spinner" size={32} style={{ color: 'var(--primary)' }} />
          </div>
        ) : error ? (
          <div className="glass-panel text-center" style={{ padding: '2rem', borderColor: 'var(--accent-rose)' }}>
            <p style={{ color: 'var(--accent-rose)' }}>Error: {error}</p>
          </div>
        ) : history.length === 0 ? (
          <div className="glass-panel text-center" style={{ padding: '4rem 2rem' }}>
            <Video size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>No history found</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>You haven't processed any videos yet.</p>
            <Link to="/app" className="btn btn-primary">Process a Video</Link>
          </div>
        ) : (
          <div className="features-grid" style={{ marginBottom: '4rem' }}>
            {history.map((item, i) => (
              <div key={item.id} className="feature-card animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1, marginBottom: '1.5rem' }}>
                  {item.summary || "No summary available."}
                </p>
                <Link to={`/app?id=${item.id}`} className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  View Analysis <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
