const experiences = [
  {
    id: 'temples',
    icon: '🏛️',
    title: 'Temple Trails',
    desc: 'Walk through corridors of towering gopurams, witness evening aarti rituals, and feel the divine energy of thousand-year-old shrines.',
    tags: ['Spiritual', 'Architecture', 'Culture'],
    accent: '#d97706',
    bg: 'linear-gradient(135deg, #fef9ec, #fef3c7)',
    highlights: ['Brihadeeswarar, Thanjavur', 'Meenakshi, Madurai', 'Ramanathaswamy, Rameshwaram', 'Nataraja, Chidambaram'],
  },
  {
    id: 'beaches',
    icon: '🌊',
    title: 'Coastal Escapes',
    desc: 'Discover pristine shores stretching 1,076 km — from Marina Beach to the serene backwaters of Pichavaram mangroves.',
    tags: ['Beach', 'Nature', 'Relaxation'],
    accent: '#0369a1',
    bg: 'linear-gradient(135deg, #eff8ff, #dbeafe)',
    highlights: ['Marina Beach, Chennai', 'Rameswaram Coast', 'Kanyakumari Shores', 'Pichavaram Mangroves'],
  },
  {
    id: 'hills',
    icon: '🌿',
    title: 'Hill Retreats',
    desc: 'Breathe in crisp mountain air, sip Nilgiri tea at sunrise, and trek through lush forests teeming with exotic flora and fauna.',
    tags: ['Nature', 'Trekking', 'Tea'],
    accent: '#16a34a',
    bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    highlights: ['Nilgiri Mountain Railway', 'Ooty Botanical Gardens', 'Kodaikanal Lake Trek', 'Mudumalai Safari'],
  },
  {
    id: 'food',
    icon: '🍛',
    title: 'Culinary Journeys',
    desc: 'Savour the fiery Chettinad curries, crispy dosas, fresh seafood on banana leaf, and the legendary south Indian filter coffee.',
    tags: ['Food', 'Culture', 'Local'],
    accent: '#e11d48',
    bg: 'linear-gradient(135deg, #fff1f4, #ffe4e6)',
    highlights: ['Chettinad Cuisine', 'Chennai Street Food', 'Banana Leaf Meals', 'Filter Coffee Ritual'],
  },
  {
    id: 'arts',
    icon: '🎭',
    title: 'Art & Festivals',
    desc: 'Experience Bharatanatyam performances, Pongal celebrations, Tanjore painting workshops, and the colors of Karthigai Deepam.',
    tags: ['Culture', 'Festivals', 'Dance'],
    accent: '#7c3aed',
    bg: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
    highlights: ['Bharatanatyam Dance', 'Pongal Festival', 'Karthigai Deepam', 'Tanjore Paintings'],
  },
  {
    id: 'wildlife',
    icon: '🐘',
    title: 'Wildlife Safari',
    desc: 'Track wild elephants at Mudumalai, spot leopards in Anamalai, and marvel at rare Nilgiri Tahrs in their natural habitat.',
    tags: ['Wildlife', 'Nature', 'Adventure'],
    accent: '#4d7c0f',
    bg: 'linear-gradient(135deg, #f7fee7, #ecfccb)',
    highlights: ['Mudumalai Tiger Reserve', 'Anamalai Wildlife', 'Guindy National Park', 'Point Calimere Sanctuary'],
  },
]

export default function Experiences() {
  return (
    <section id="experiences" style={{ padding: '100px 0', background: '#fafaf9' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 16px', borderRadius: '99px',
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)',
            fontSize: '0.78rem', fontWeight: 600, color: '#7c3aed',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            🎯 What To Do
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1c1917', marginBottom: '16px',
          }}>
            Unforgettable Experiences
          </h2>
          <p style={{ color: '#78716c', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Every journey to Tamil Nadu is unique — choose your adventure from our curated travel experiences.
          </p>
        </div>

        {/* Experience Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {experiences.map(exp => (
            <div
              key={exp.id}
              className="glass"
              style={{
                borderRadius: '24px',
                padding: '28px',
                border: '1.5px solid rgba(255,255,255,0.9)',
                cursor: 'pointer',
                transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, background 0.35s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)'
                e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.12)'
                e.currentTarget.style.background = exp.bg
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = ''
                e.currentTarget.style.background = 'rgba(255,255,255,0.55)'
              }}
            >
              {/* Icon & Title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: 54, height: 54, borderRadius: '16px', flexShrink: 0,
                  background: exp.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', border: `1.5px solid rgba(0,0,0,0.06)`,
                }}>
                  {exp.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.15rem', color: '#1c1917', marginBottom: '4px' }}>
                    {exp.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {exp.tags.map(tag => (
                      <span key={tag} style={{
                        padding: '2px 8px', borderRadius: '99px',
                        background: `${exp.accent}18`, color: exp.accent,
                        fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.04em',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.87rem', color: '#78716c', lineHeight: 1.7, marginBottom: '18px' }}>
                {exp.desc}
              </p>

              {/* Highlights */}
              <div>
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
      </div>
    </section>
  )
}
