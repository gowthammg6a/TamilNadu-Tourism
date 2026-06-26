import { Link } from 'react-router-dom'
import { useBookmarks, useTheme, useLang } from '../context/AppContext'
import { destinations } from '../data/data'

export default function BookmarksPage() {
  const { bookmarks, toggle } = useBookmarks()
  const { dark } = useTheme()
  const { t } = useLang()
  const saved = destinations.filter(d => bookmarks.includes(d.id))

  return (
    <div style={{ minHeight: '100vh', background: dark ? '#0f1117' : '#f8f6f2', paddingTop: '80px' }}>
      <div className="bg-grid" style={{ padding: '60px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '99px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', fontSize: '0.78rem', fontWeight: 600, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            {t('bookmarksTag')}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3rem)', color: dark ? '#f1f5f9' : '#1c1917', marginBottom: '14px' }}>{t('bookmarksTitle')}</h1>
          <p style={{ color: dark ? '#94a3b8' : '#78716c', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>
            {saved.length === 0 ? 'No saved destinations yet. Explore and click ⭐ to bookmark!' : `You have ${saved.length} saved destination${saved.length > 1 ? 's' : ''}.`}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px' }}>
        {saved.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⭐</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', color: dark ? '#f1f5f9' : '#1c1917', marginBottom: '12px' }}>No Bookmarks Yet</h3>
            <Link to="/destinations" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 28px', borderRadius: '99px', color: '#fff', fontWeight: 700, display: 'inline-block', marginTop: '8px' }}>Explore Destinations →</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '22px' }}>
            {saved.map(dest => (
              <div key={dest.id} className="glass" style={{ borderRadius: '22px', padding: '24px', border: `1.5px solid ${dest.borderColor}`, background: dest.gradient, position: 'relative', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <button onClick={() => toggle(dest.id)} title="Remove bookmark"
                  style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⭐</button>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{dest.emoji}</div>
                <div style={{ fontSize: '0.7rem', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{dest.region}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', color: '#1c1917', marginBottom: '6px' }}>{dest.name}</h3>
                <p style={{ fontSize: '0.82rem', color: '#78716c', lineHeight: 1.6, marginBottom: '14px' }}>{dest.description.slice(0, 90)}...</p>
                <Link to={`/destinations/${dest.id}`} style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 18px', borderRadius: '99px', background: `${dest.accent}18`, color: dest.accent, fontWeight: 700, fontSize: '0.82rem', border: `1px solid ${dest.borderColor}` }}>View Details →</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
