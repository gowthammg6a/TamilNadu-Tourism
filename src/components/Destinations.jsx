import { useState } from 'react'

const destinations = [
  {
    id: 'ooty',
    emoji: '🌿',
    name: 'Ooty',
    region: 'Nilgiri Hills',
    tagline: 'Queen of Hill Stations',
    description: 'Lush tea gardens, misty mountains, and the iconic Nilgiri Mountain Railway weave a tapestry of natural splendour.',
    bestTime: 'April – June & Sept – Nov',
    topSpots: ['Ooty Lake', 'Botanical Gardens', 'Doddabetta Peak', 'Tea Factory'],
    category: 'Hill Station',
    accent: '#0d9488',
    accentLight: 'rgba(13,148,136,0.12)',
    gradient: 'linear-gradient(135deg, #e0f7f4 0%, #b2f0e8 100%)',
    borderColor: 'rgba(13,148,136,0.25)',
    distance: '547 km from Chennai',
  },
  {
    id: 'thanjavur',
    emoji: '🏛️',
    name: 'Thanjavur',
    region: 'Cauvery Delta',
    tagline: 'City of the Big Temple',
    description: 'Home to the majestic Brihadeeswarar Temple, a UNESCO World Heritage marvel built in 1010 CE by Raja Raja Chola.',
    bestTime: 'Oct – Feb',
    topSpots: ['Brihadeeswarar Temple', 'Thanjavur Palace', 'Art Gallery', 'Sivaganga Park'],
    category: 'Heritage',
    accent: '#d97706',
    accentLight: 'rgba(217,119,6,0.12)',
    gradient: 'linear-gradient(135deg, #fef9ec 0%, #fde68a 100%)',
    borderColor: 'rgba(217,119,6,0.25)',
    distance: '344 km from Chennai',
  },
  {
    id: 'mahabalipuram',
    emoji: '🌊',
    name: 'Mahabalipuram',
    region: 'East Coast',
    tagline: 'Shore Temple City',
    description: 'Ancient rock-cut temples and bas-reliefs by the Bay of Bengal, built by the Pallava dynasty in the 7th century.',
    bestTime: 'Nov – Feb',
    topSpots: ['Shore Temple', "Arjuna's Penance", 'Pancha Rathas', 'Tiger Cave'],
    category: 'UNESCO Heritage',
    accent: '#7c3aed',
    accentLight: 'rgba(124,58,237,0.12)',
    gradient: 'linear-gradient(135deg, #f3f0ff 0%, #ddd6fe 100%)',
    borderColor: 'rgba(124,58,237,0.25)',
    distance: '58 km from Chennai',
  },
  {
    id: 'rameshwaram',
    emoji: '🕌',
    name: 'Rameshwaram',
    region: 'Pamban Island',
    tagline: 'Spiritual Island Paradise',
    description: 'One of India\'s most sacred pilgrimage sites, connected to the mainland by the iconic Pamban Bridge over turquoise waters.',
    bestTime: 'Oct – April',
    topSpots: ['Ramanathaswamy Temple', 'Pamban Bridge', 'Dhanushkodi', 'Agni Theertham'],
    category: 'Spiritual',
    accent: '#e11d48',
    accentLight: 'rgba(225,29,72,0.10)',
    gradient: 'linear-gradient(135deg, #fff1f4 0%, #fecdd3 100%)',
    borderColor: 'rgba(225,29,72,0.25)',
    distance: '573 km from Chennai',
  },
  {
    id: 'kanyakumari',
    emoji: '🌅',
    name: 'Kanyakumari',
    region: 'Southernmost Tip',
    tagline: "India's Land's End",
    description: 'Where three seas converge — the Arabian Sea, Bay of Bengal, and Indian Ocean — creating nature\'s most spectacular sunrises.',
    bestTime: 'Oct – March',
    topSpots: ['Vivekananda Rock Memorial', 'Thiruvalluvar Statue', 'Kanyakumari Temple', 'Sunset Point'],
    category: 'Coastal',
    accent: '#0369a1',
    accentLight: 'rgba(3,105,161,0.12)',
    gradient: 'linear-gradient(135deg, #eff8ff 0%, #bae6fd 100%)',
    borderColor: 'rgba(3,105,161,0.25)',
    distance: '696 km from Chennai',
  },
  {
    id: 'madurai',
    emoji: '🌺',
    name: 'Madurai',
    region: 'South Tamil Nadu',
    tagline: 'City of the Temple',
    description: 'The ancient city of Madurai thrives around the breathtaking Meenakshi Amman Temple with its iconic colorful gopurams.',
    bestTime: 'Oct – March',
    topSpots: ['Meenakshi Amman Temple', 'Thirumalai Nayak Palace', 'Gandhi Museum', 'Alagar Hills'],
    category: 'Ancient City',
    accent: '#16a34a',
    accentLight: 'rgba(22,163,74,0.12)',
    gradient: 'linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)',
    borderColor: 'rgba(22,163,74,0.25)',
    distance: '462 km from Chennai',
  },
  {
    id: 'kodaikanal',
    emoji: '🌸',
    name: 'Kodaikanal',
    region: 'Palani Hills',
    tagline: 'Princess of Hill Stations',
    description: 'Perched at 2133m, Kodaikanal enchants with its star-shaped lake, stunning forests, and breathtaking valley views.',
    bestTime: 'April – June',
    topSpots: ['Kodai Lake', 'Coaker\'s Walk', 'Pillar Rocks', 'Silver Cascade'],
    category: 'Hill Station',
    accent: '#0d9488',
    accentLight: 'rgba(13,148,136,0.10)',
    gradient: 'linear-gradient(135deg, #f0fdfa 0%, #99f6e4 100%)',
    borderColor: 'rgba(13,148,136,0.25)',
    distance: '468 km from Chennai',
  },
  {
    id: 'yelagiri',
    emoji: '⛰️',
    name: 'Yelagiri',
    region: 'Vellore District',
    tagline: 'Hidden Hill Gem',
    description: 'A serene paradise with orchards, rose gardens and a sparkling lake, perfect for trekking and peaceful retreats.',
    bestTime: 'Nov – Feb',
    topSpots: ['Yelagiri Lake', 'Swamimalai Hills', 'Jalagamparai Waterfalls', 'Punganur Lake'],
    category: 'Hill Station',
    accent: '#b45309',
    accentLight: 'rgba(180,83,9,0.10)',
    gradient: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
    borderColor: 'rgba(180,83,9,0.25)',
    distance: '178 km from Chennai',
  },
  {
    id: 'rameswaram',
    emoji: '🦜',
    name: 'Mudumalai',
    region: 'Nilgiri Biosphere',
    tagline: 'Wildlife Sanctuary',
    description: 'A treasure trove of biodiversity — spot elephants, tigers, leopards and exotic birds in their natural habitat.',
    bestTime: 'Oct – May',
    topSpots: ['Elephant Camp', 'Moyar River', 'Theppakadu', 'Nilgiri Tahr'],
    category: 'Wildlife',
    accent: '#4d7c0f',
    accentLight: 'rgba(77,124,15,0.12)',
    gradient: 'linear-gradient(135deg, #f7fee7 0%, #d9f99d 100%)',
    borderColor: 'rgba(77,124,15,0.25)',
    distance: '554 km from Chennai',
  },
]

const categories = ['All', 'Hill Station', 'Heritage', 'UNESCO Heritage', 'Spiritual', 'Coastal', 'Ancient City', 'Wildlife']

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredCard, setHoveredCard] = useState(null)

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter(d => d.category === activeCategory)

  return (
    <section id="destinations" className="bg-grid" style={{ padding: '100px 0 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 16px', borderRadius: '99px',
            background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)',
            fontSize: '0.78rem', fontWeight: 600, color: '#d97706',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            🗺️ Explore the State
          </div>
          <h2 className="section-title" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1c1917', display: 'block', marginBottom: '16px',
          }}>
            Top Destinations
          </h2>
          <p style={{ color: '#78716c', fontSize: '1.05rem', maxWidth: '540px', margin: '24px auto 0', lineHeight: 1.7 }}>
            From misty hill stations to ancient temple cities — each destination tells a story thousands of years in the making.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '99px',
                border: activeCategory === cat ? 'none' : '1.5px solid rgba(0,0,0,0.12)',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, #0d9488, #f59e0b)'
                  : 'rgba(255,255,255,0.7)',
                color: activeCategory === cat ? '#fff' : '#44403c',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(8px)',
                boxShadow: activeCategory === cat ? '0 4px 16px rgba(13,148,136,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {filtered.map(dest => (
            <div
              key={dest.id}
              className="dest-card glass"
              onMouseEnter={() => setHoveredCard(dest.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === dest.id ? dest.gradient : 'rgba(255,255,255,0.6)',
                border: `1.5px solid ${hoveredCard === dest.id ? dest.borderColor : 'rgba(255,255,255,0.8)'}`,
                padding: '28px',
                transition: 'background 0.4s ease, border 0.4s ease',
              }}
            >
              {/* Card Top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ fontSize: '2.6rem' }}>{dest.emoji}</div>
                <span style={{
                  padding: '4px 12px', borderRadius: '99px',
                  background: dest.accentLight, color: dest.accent,
                  fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.04em',
                }}>
                  {dest.category}
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: 500, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {dest.region}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#1c1917', marginBottom: '4px' }}>
                {dest.name}
              </h3>
              <div style={{ fontSize: '0.82rem', color: dest.accent, fontWeight: 600, marginBottom: '12px' }}>
                {dest.tagline}
              </div>
              <p style={{ fontSize: '0.88rem', color: '#78716c', lineHeight: 1.65, marginBottom: '16px' }}>
                {dest.description}
              </p>

              {/* Hover reveal details */}
              <div className="card-details">
                <div style={{
                  borderTop: `1.5px solid ${dest.borderColor}`,
                  paddingTop: '16px', marginTop: '4px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: dest.accent, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      🗓 Best Time to Visit
                    </span>
                  </div>
                  <div style={{
                    padding: '6px 14px', background: dest.accentLight, borderRadius: '8px',
                    fontSize: '0.83rem', color: dest.accent, fontWeight: 600, marginBottom: '12px',
                    display: 'inline-block'
                  }}>
                    {dest.bestTime}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#44403c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                    📍 Top Spots
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {dest.topSpots.map(spot => (
                      <span key={spot} style={{
                        padding: '3px 10px', borderRadius: '6px',
                        background: 'rgba(255,255,255,0.7)', border: `1px solid ${dest.borderColor}`,
                        fontSize: '0.75rem', color: '#44403c', fontWeight: 500,
                      }}>
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <span style={{ fontSize: '0.73rem', color: '#78716c' }}>📏 {dest.distance}</span>
                <button style={{
                  background: 'none', border: `1.5px solid ${dest.accent}`,
                  color: dest.accent, padding: '5px 14px', borderRadius: '99px',
                  fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = dest.accent; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = dest.accent }}
                >
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
