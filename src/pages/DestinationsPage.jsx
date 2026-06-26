import { useState } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/data'
import { useLang } from '../context/AppContext'

const categories = ['All', 'Hill Station', 'Heritage', 'UNESCO Heritage', 'Spiritual', 'Coastal', 'Ancient City', 'Wildlife']

export default function DestinationsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const { t } = useLang()

  const filtered = destinations.filter(d => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.region.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2', paddingTop: '80px' }}>
      {/* Page Hero */}
      <div className="bg-grid" style={{ padding: '60px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 400, height: 400, background: 'radial-gradient(circle,rgba(20,184,166,0.2),transparent)', top: '-20%', right: '-5%' }} />
        <div className="blob" style={{ width: 300, height: 300, background: 'radial-gradient(circle,rgba(245,158,11,0.18),transparent)', bottom: '-20%', left: '-5%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '99px', background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)', fontSize: '0.78rem', fontWeight: 600, color: '#0d9488', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            🗺️ {t('destPageTag')}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#1c1917', marginBottom: '14px' }}>
            {t('destPageTitle')}
          </h1>
          <p style={{ color: '#78716c', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 28px', lineHeight: 1.7 }}>
            {destinations.length} incredible places across Tamil Nadu waiting to be explored.
          </p>
          {/* Search */}
          <div style={{ maxWidth: '420px', margin: '0 auto', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: '99px', border: '1.5px solid rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', fontSize: '0.9rem', color: '#1c1917', outline: 'none', fontFamily: "'Outfit',sans-serif", boxSizing: 'border-box', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', padding: '32px 0 36px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 20px', borderRadius: '99px', border: activeCategory === cat ? 'none' : '1.5px solid rgba(0,0,0,0.12)', background: activeCategory === cat ? 'linear-gradient(135deg,#0d9488,#f59e0b)' : 'rgba(255,255,255,0.75)', color: activeCategory === cat ? '#fff' : '#44403c', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.25s', boxShadow: activeCategory === cat ? '0 4px 16px rgba(13,148,136,0.3)' : 'none', fontFamily: "'Outfit',sans-serif" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ color: '#78716c', fontSize: '0.85rem', marginBottom: '24px' }}>
          Showing <strong style={{ color: '#0d9488' }}>{filtered.length}</strong> destination{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
            <p style={{ color: '#78716c', fontSize: '1rem' }}>No destinations found. Try a different search.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(310px,1fr))', gap: '24px' }}>
            {filtered.map(dest => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.id}`}
                style={{ textDecoration: 'none', display: 'block', borderRadius: '24px', overflow: 'hidden', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 28px 64px rgba(0,0,0,0.13)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                <div className="glass" style={{ padding: '28px', border: `1.5px solid ${dest.borderColor}`, borderRadius: '24px', height: '100%', background: dest.gradient }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ fontSize: '2.6rem' }}>{dest.emoji}</div>
                    <span style={{ padding: '4px 12px', borderRadius: '99px', background: dest.accentLight, color: dest.accent, fontSize: '0.7rem', fontWeight: 600 }}>{dest.category}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{dest.region}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: '#1c1917', marginBottom: '4px' }}>{dest.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: dest.accent, fontWeight: 600, marginBottom: '10px' }}>{dest.tagline}</div>
                  <p style={{ fontSize: '0.85rem', color: '#78716c', lineHeight: 1.65, marginBottom: '16px' }}>{dest.description.slice(0,110)}...</p>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#78716c', borderTop: `1px solid ${dest.borderColor}`, paddingTop: '14px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>🗓 {dest.bestTime}</span>
                    <span style={{ color: dest.accent, fontWeight: 700 }}>View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
