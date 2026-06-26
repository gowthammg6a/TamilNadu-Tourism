import { Link } from 'react-router-dom'
import { experiences } from '../data/data'
import { useLang } from '../context/AppContext'

export default function ExperiencesPage() {
  const { t } = useLang()
  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9', paddingTop: '80px' }}>
      {/* Hero */}
      <div className="bg-grid" style={{ padding: '60px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 350, height: 350, background: 'radial-gradient(circle,rgba(124,58,237,0.2),transparent)', top: '-15%', right: '-3%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '99px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', fontSize: '0.78rem', fontWeight: 600, color: '#7c3aed', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('expPageTag')}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#1c1917', marginBottom: '14px' }}>
            {t('expPageTitle')}
          </h1>
          <p style={{ color: '#78716c', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            From spiritual temple trails to wild safaris — Tamil Nadu has an experience for every kind of traveller.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '24px' }}>
          {experiences.map(exp => (
            <div
              key={exp.id}
              className="glass"
              style={{ borderRadius: '24px', padding: '28px', border: '1.5px solid rgba(255,255,255,0.9)', cursor: 'default', transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s, background 0.35s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.12)'; e.currentTarget.style.background = exp.bg }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.background = 'rgba(255,255,255,0.55)' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: 54, height: 54, borderRadius: '16px', flexShrink: 0, background: exp.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1.5px solid rgba(0,0,0,0.06)' }}>{exp.icon}</div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#1c1917', marginBottom: '4px', fontFamily: "'Outfit',sans-serif" }}>{exp.title}</h3>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {exp.tags.map(tag => (
                      <span key={tag} style={{ padding: '2px 8px', borderRadius: '99px', background: `${exp.accent}18`, color: exp.accent, fontSize: '0.68rem', fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.87rem', color: '#78716c', lineHeight: 1.7, marginBottom: '18px' }}>{exp.desc}</p>
              <div style={{ borderTop: `1.5px solid ${exp.accent}22`, paddingTop: '14px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#44403c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Featured Experiences</div>
                {exp.highlights.map(h => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: exp.accent, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8rem', color: '#44403c', fontWeight: 500 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: '#1c1917', marginBottom: '12px' }}>{t('expCta')}</h3>
          <p style={{ color: '#78716c', marginBottom: '24px' }}>Let us help plan the perfect itinerary for your travel style.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none', padding: '13px 32px', borderRadius: '99px', color: '#fff', fontWeight: 700 }}>Plan My Experience ✈️</Link>
            <Link to="/destinations" style={{ textDecoration: 'none', padding: '13px 32px', borderRadius: '99px', color: '#0d9488', fontWeight: 600, background: 'rgba(13,148,136,0.08)', border: '1.5px solid rgba(13,148,136,0.3)' }}>Browse Destinations 🗺️</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
