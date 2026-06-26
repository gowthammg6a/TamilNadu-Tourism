const stats = [
  { icon: '🏛️', num: '37,000+', label: 'Ancient Temples', color: '#d97706' },
  { icon: '🌊', num: '1,076 km', label: 'Coastline', color: '#0369a1' },
  { icon: '🌿', num: '17', label: 'Wildlife Sanctuaries', color: '#16a34a' },
  { icon: '🎭', num: '2000+', label: 'Art Forms', color: '#7c3aed' },
  { icon: '🌍', num: '5', label: 'UNESCO World Heritage Sites', color: '#e11d48' },
  { icon: '🍽️', num: '200+', label: 'Unique Cuisines', color: '#0d9488' },
]

const highlights = [
  {
    icon: '🕉️',
    title: 'Spiritual Heritage',
    desc: 'Home to some of India\'s most sacred temples, Tamil Nadu\'s Dravidian architecture is unparalleled in its grandeur and intricacy.',
  },
  {
    icon: '🎨',
    title: 'Art & Culture',
    desc: 'Bharatanatyam, Carnatic music, Tanjore paintings — a living cultural legacy that continues to inspire the world.',
  },
  {
    icon: '🌿',
    title: 'Natural Wonders',
    desc: 'From the Nilgiri Biosphere to pristine beaches, Tamil Nadu\'s natural diversity is a treasure trove of experiences.',
  },
  {
    icon: '🍛',
    title: 'Culinary Traditions',
    desc: 'Chettinad spices, fresh seafood, filter coffee — Tamil Nadu\'s cuisine is a sensory adventure like no other.',
  },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #f8f6f2 0%, #fff9f0 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 16px', borderRadius: '99px',
            background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)',
            fontSize: '0.78rem', fontWeight: 600, color: '#0d9488',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            🌏 About the State
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1c1917', marginBottom: '20px',
          }}>
            The Land of <span className="gradient-text">Ancient Wonders</span>
          </h2>
          <p style={{ color: '#78716c', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
            Tamil Nadu, the southernmost state of peninsular India, is a land where every stone has a story,
            every temple holds centuries of devotion, and every landscape inspires awe.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '20px',
          marginBottom: '72px',
        }}>
          {stats.map(s => (
            <div
              key={s.label}
              className="glass stat-card"
              style={{
                padding: '24px 20px',
                borderRadius: '20px',
                textAlign: 'center',
                border: '1.5px solid rgba(255,255,255,0.8)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{s.icon}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: s.color, marginBottom: '4px' }}>
                {s.num}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#78716c', fontWeight: 500, lineHeight: 1.3 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="about-grid">
          {/* Left: Text */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#1c1917', marginBottom: '16px' }}>
              A Civilization That Never Forgot Its Roots
            </h3>
            <p style={{ color: '#78716c', lineHeight: 1.8, marginBottom: '16px', fontSize: '0.95rem' }}>
              Tamil Nadu is one of the oldest living civilizations on Earth. The Tamil language, over 2,000 years old, is one of the few classical languages still spoken as a mother tongue today.
            </p>
            <p style={{ color: '#78716c', lineHeight: 1.8, marginBottom: '24px', fontSize: '0.95rem' }}>
              From the Pallava cave temples of Mahabalipuram to the soaring gopurams of Madurai, from the serene Nilgiri hills to the spiritual shores of Rameswaram — the state offers an unmatched journey through time and beauty.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Safe for families', 'Year-round travel', 'Rich cuisine', 'Warm hospitality'].map(tag => (
                <span key={tag} style={{
                  padding: '6px 14px', borderRadius: '99px',
                  background: 'rgba(13,148,136,0.1)', color: '#0d9488',
                  fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(13,148,136,0.2)',
                }}>
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Highlight Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {highlights.map(h => (
              <div
                key={h.title}
                className="glass"
                style={{
                  padding: '20px',
                  borderRadius: '18px',
                  border: '1.5px solid rgba(255,255,255,0.8)',
                  transition: 'transform 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{h.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1c1917', marginBottom: '6px' }}>{h.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#78716c', lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
