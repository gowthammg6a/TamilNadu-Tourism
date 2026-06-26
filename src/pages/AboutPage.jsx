import { Link } from 'react-router-dom'
import { useLang } from '../context/AppContext'

export default function AboutPage() {
  const { t } = useLang()
  const stats = [
    { icon: '🏛️', num: '37,000+', label: 'Ancient Temples', color: '#d97706' },
    { icon: '🌊', num: '1,076 km', label: 'Coastline', color: '#0369a1' },
    { icon: '🌿', num: '17', label: 'Wildlife Sanctuaries', color: '#16a34a' },
    { icon: '🎭', num: '2000+', label: 'Art Forms', color: '#7c3aed' },
    { icon: '🌍', num: '5', label: 'UNESCO Heritage Sites', color: '#e11d48' },
    { icon: '🍽️', num: '200+', label: 'Unique Cuisines', color: '#0d9488' },
  ]
  const timeline = [
    { era: '300 BCE', event: 'Sangam Age — the golden age of Tamil literature and poetry begins.' },
    { era: '7th Century', event: 'Pallava dynasty builds the rock-cut temples of Mahabalipuram.' },
    { era: '1010 CE', event: 'Raja Raja Chola completes the magnificent Brihadeeswarar Temple in Thanjavur.' },
    { era: '14th Century', event: 'Vijayanagara Empire patronizes arts, architecture, and culture.' },
    { era: '17th Century', event: 'Nayak rulers build the iconic Meenakshi Temple towers in Madurai.' },
    { era: 'Present', event: 'Tamil Nadu is India\'s most visited state for heritage and culture tourism.' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2', paddingTop: '80px' }}>
      {/* Hero */}
      <div className="bg-grid" style={{ padding: '60px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 350, height: 350, background: 'radial-gradient(circle,rgba(13,148,136,0.2),transparent)', top: '-15%', right: '-3%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '99px', background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)', fontSize: '0.78rem', fontWeight: 600, color: '#0d9488', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('aboutPageTag')}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#1c1917', marginBottom: '14px' }}>
            {t('aboutPageTitle')}
          </h1>
          <p style={{ color: '#78716c', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
            A land where 4,000 years of civilization, breathtaking natural beauty, and vibrant culture come together in one extraordinary state.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '20px', marginBottom: '64px' }}>
          {stats.map(s => (
            <div key={s.label} className="glass stat-card" style={{ padding: '24px 20px', borderRadius: '20px', textAlign: 'center', border: '1.5px solid rgba(255,255,255,0.8)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: s.color, marginBottom: '4px' }}>{s.num}</div>
              <div style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '64px' }} className="about-cols">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.9rem', color: '#1c1917', marginBottom: '16px' }}>
              {t('aboutSection1')}
            </h2>
            <p style={{ color: '#78716c', lineHeight: 1.85, marginBottom: '16px', fontSize: '0.95rem' }}>
              Tamil Nadu is one of the oldest living civilizations on Earth. The Tamil language, over 2,000 years old, is one of the few classical languages still spoken as a mother tongue today by over 80 million people.
            </p>
            <p style={{ color: '#78716c', lineHeight: 1.85, marginBottom: '16px', fontSize: '0.95rem' }}>
              From the Pallava cave temples of Mahabalipuram to the soaring gopurams of Madurai, from the serene Nilgiri hills to the spiritual shores of Rameswaram, the state offers an unmatched journey through time and beauty.
            </p>
            <p style={{ color: '#78716c', lineHeight: 1.85, fontSize: '0.95rem' }}>
              Tamil Nadu is also India's most industrially advanced southern state, yet it maintains its cultural identity with remarkable pride — a testament to the resilience and richness of Tamil heritage.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { icon: '🕉️', title: 'Spiritual Heritage', desc: 'Home to some of India\'s most sacred temples with unparalleled Dravidian architecture.' },
              { icon: '🎨', title: 'Art & Culture', desc: 'Bharatanatyam, Carnatic music, Tanjore paintings — a living cultural legacy.' },
              { icon: '🌿', title: 'Natural Wonders', desc: 'From Nilgiri Biosphere to pristine beaches — a treasure trove of nature.' },
              { icon: '🍛', title: 'Culinary Traditions', desc: 'Chettinad spices, fresh seafood, filter coffee — a sensory adventure.' },
            ].map(h => (
              <div key={h.title} className="glass" style={{ padding: '20px', borderRadius: '18px', border: '1.5px solid rgba(255,255,255,0.8)', transition: 'transform 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{h.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1c1917', marginBottom: '6px' }}>{h.title}</div>
                <div style={{ fontSize: '0.76rem', color: '#78716c', lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="glass" style={{ padding: '36px', borderRadius: '24px', border: '1.5px solid rgba(255,255,255,0.85)', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.7rem', color: '#1c1917', marginBottom: '28px', textAlign: 'center' }}>
            {t('aboutTimeline')}
          </h2>
          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            <div style={{ position: 'absolute', left: '14px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg,#0d9488,#f59e0b,#e11d48)' }} />
            {timeline.map((t, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: '28px', paddingLeft: '16px' }}>
                <div style={{ position: 'absolute', left: '-33px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#0d9488', border: '2px solid #fff', boxShadow: '0 0 0 3px rgba(13,148,136,0.3)' }} />
                <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{t.era}</div>
                <div style={{ fontSize: '0.88rem', color: '#44403c', lineHeight: 1.65 }}>{t.event}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: '#1c1917', marginBottom: '10px' }}>{t('aboutCta')}</h3>
          <p style={{ color: '#78716c', marginBottom: '24px' }}>Discover the destinations that made Tamil Nadu famous across the world.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/destinations" className="btn-primary" style={{ textDecoration: 'none', padding: '13px 32px', borderRadius: '99px', color: '#fff', fontWeight: 700 }}>Explore Destinations 🗺️</Link>
            <Link to="/contact" style={{ textDecoration: 'none', padding: '13px 32px', borderRadius: '99px', color: '#0d9488', fontWeight: 600, background: 'rgba(13,148,136,0.08)', border: '1.5px solid rgba(13,148,136,0.3)' }}>Plan Your Visit ✈️</Link>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.about-cols{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}
