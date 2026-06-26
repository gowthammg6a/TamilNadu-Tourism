import { Link } from 'react-router-dom'
import { destinations } from '../data/data'
import { useLang } from '../context/AppContext'

const heroCards = destinations.slice(0, 5).map((d, i) => ({
  ...d,
  floatClass: ['float-a','float-b','float-c','float-d','float-e'][i],
  pos: [
    { top: '18%', left: '4%' },
    { top: '12%', right: '5%' },
    { bottom: '25%', left: '2%' },
    { bottom: '22%', right: '4%' },
    { top: '52%', left: '50%', transform: 'translate(-50%,-50%)' },
  ][i],
}))

export default function HomePage() {
  const { t } = useLang()
  return (
    <div>
      {/* ── Hero Section ── */}
      <section id="home" className="bg-grid" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '80px' }}>
        {/* Blobs */}
        <div className="blob" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(20,184,166,0.28), transparent)', top: '-8%', right: '-4%' }} />
        <div className="blob" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(245,158,11,0.22), transparent)', bottom: '-4%', left: '-4%', animationDelay: '3s' }} />
        <div className="blob" style={{ width: 280, height: 280, background: 'radial-gradient(circle, rgba(244,63,94,0.18), transparent)', top: '40%', left: '35%', animationDelay: '1.5s' }} />

        {/* Floating Destination Cards */}
        {heroCards.map(card => (
          <Link
            key={card.id}
            to={`/destinations/${card.id}`}
            className={`glass ${card.floatClass}`}
            style={{ position: 'absolute', ...card.pos, borderRadius: '20px', padding: '16px 20px', minWidth: '155px', maxWidth: '175px', background: card.gradient, textDecoration: 'none', zIndex: 2, display: 'block' }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '6px' }}>{card.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1c1917' }}>{card.name}</div>
            <div style={{ fontSize: '0.7rem', color: '#78716c', marginBottom: '8px' }}>{card.tagline}</div>
            <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '99px', background: card.accentLight, color: card.accent, fontSize: '0.66rem', fontWeight: 600 }}>{card.category}</span>
            <div style={{ position: 'absolute', top: '12px', right: '12px', width: 7, height: 7, borderRadius: '50%', background: card.accent, boxShadow: `0 0 8px ${card.accent}` }} />
          </Link>
        ))}

        {/* Center Text */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 3, padding: '0 24px', maxWidth: '680px' }}>
          <div className="fade-up-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '99px', background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)', marginBottom: '24px', fontSize: '0.8rem', fontWeight: 600, color: '#0d9488', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ✨ {t('heroTag')}
          </div>

          <h1 className="fade-up-2" style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 700, lineHeight: 1.08, color: '#1c1917', marginBottom: '20px' }}>
            {t('heroTitle')}
          </h1>

          <p className="fade-up-3" style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: '#78716c', lineHeight: 1.75, marginBottom: '36px', maxWidth: '520px', margin: '0 auto 36px' }}>
            Where ancient temples touch the sky, emerald hills breathe serenity, and golden shores meet timeless traditions.
          </p>

          <div className="fade-up-4" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/destinations" className="btn-primary" style={{ textDecoration: 'none', padding: '14px 32px', borderRadius: '99px', color: '#fff', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              {t('exploreBtn')} →
            </Link>
            <Link to="/about" className="btn-outline" style={{ textDecoration: 'none', padding: '14px 32px', borderRadius: '99px', color: '#44403c', fontWeight: 600, fontSize: '0.95rem', background: 'rgba(255,255,255,0.6)' }}>
              {t('learnMore')}
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '52px', flexWrap: 'wrap' }}>
            {[{ num: '37,000+', label: 'Temples' }, { num: '1,076 km', label: 'Coastline' }, { num: '5 UNESCO', label: 'World Heritage' }, { num: '4000+', label: 'Years History' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '1.4rem', color: '#1c1917' }}>{s.num}</div>
                <div style={{ fontSize: '0.73rem', color: '#78716c', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 3 }}>
          <span style={{ fontSize: '0.65rem', color: '#78716c', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 22, height: 36, border: '2px solid rgba(120,113,108,0.35)', borderRadius: '99px', display: 'flex', justifyContent: 'center', paddingTop: '5px' }}>
            <div style={{ width: 3, height: 7, background: '#0d9488', borderRadius: '99px', animation: 'floatA 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── Featured Destinations Strip ── */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: '#1c1917' }}>
              {t('featuredDest')}
            </h2>
            <Link to="/destinations" style={{ textDecoration: 'none', padding: '9px 22px', borderRadius: '99px', border: '1.5px solid rgba(13,148,136,0.4)', color: '#0d9488', fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.25s' }}>
              {t('viewAll')} →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '20px' }}>
            {destinations.slice(0,4).map(dest => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.id}`}
                style={{ textDecoration: 'none', borderRadius: '20px', overflow: 'hidden', display: 'block', transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 24px 56px rgba(0,0,0,0.13)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                <div className="glass" style={{ padding: '24px', border: `1.5px solid ${dest.borderColor}`, borderRadius: '20px', height: '100%' }}>
                  <div style={{ fontSize: '2.4rem', marginBottom: '12px' }}>{dest.emoji}</div>
                  <div style={{ fontSize: '0.72rem', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{dest.region}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.25rem', color: '#1c1917', marginBottom: '6px' }}>{dest.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: '#78716c', lineHeight: 1.6, marginBottom: '14px' }}>{dest.description.slice(0,100)}...</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ padding: '3px 12px', borderRadius: '99px', background: dest.accentLight, color: dest.accent, fontSize: '0.7rem', fontWeight: 600 }}>{dest.category}</span>
                    <span style={{ color: dest.accent, fontSize: '0.82rem', fontWeight: 700 }}>Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Tamil Nadu ── */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(180deg,#f8f6f2,#fff9f0)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', color: '#1c1917', marginBottom: '14px' }}>
            {t('whyTitle')}
          </h2>
          <p style={{ color: '#78716c', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.75 }}>
            A land of ancient wonders, vibrant culture, and natural beauty — all waiting for you.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '20px' }}>
            {[
              { icon: '🏛️', title: '37,000+ Temples', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
              { icon: '🌊', title: '1,076km Coastline', color: '#0369a1', bg: 'rgba(3,105,161,0.1)' },
              { icon: '🌿', title: 'Nilgiri Biosphere', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
              { icon: '🍛', title: 'World-class Cuisine', color: '#e11d48', bg: 'rgba(225,29,72,0.08)' },
              { icon: '🎭', title: '2000+ Art Forms', color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
              { icon: '🏆', title: '5 UNESCO Sites', color: '#0d9488', bg: 'rgba(13,148,136,0.1)' },
            ].map(item => (
              <div key={item.title} className="glass stat-card" style={{ padding: '28px 20px', borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.85)', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '16px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 12px' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1c1917' }}>{item.title}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '44px' }}>
            <Link to="/experiences" className="btn-primary" style={{ textDecoration: 'none', padding: '14px 36px', borderRadius: '99px', color: '#fff', fontWeight: 700, fontSize: '0.95rem', display: 'inline-block' }}>
              See All Experiences 🎯
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick CTA ── */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: '#fff' }}>
        <div className="glass-strong" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', padding: '48px 56px', borderRadius: '28px', border: '1.5px solid rgba(255,255,255,0.9)', maxWidth: '540px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '14px' }}>✈️</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.7rem', color: '#1c1917', marginBottom: '12px' }}>{t('ctaTitle')}</h3>
          <p style={{ color: '#78716c', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '24px' }}>
            Get in touch and we'll help craft your perfect Tamil Nadu itinerary.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none', padding: '13px 32px', borderRadius: '99px', color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
              Contact Us 📩
            </Link>
            <Link to="/gallery" style={{ textDecoration: 'none', padding: '13px 32px', borderRadius: '99px', color: '#44403c', fontWeight: 600, fontSize: '0.95rem', background: 'rgba(255,255,255,0.7)', border: '2px solid rgba(13,148,136,0.35)' }}>
              View Gallery 📸
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
