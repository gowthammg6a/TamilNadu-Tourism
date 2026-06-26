const heroCards = [
  {
    id: 'ooty',
    emoji: '🌿',
    title: 'Ooty',
    subtitle: 'Queen of Hill Stations',
    tag: 'Hill Station',
    tagColor: '#0d9488',
    tagBg: 'rgba(13,148,136,0.12)',
    accentColor: '#0d9488',
    floatClass: 'float-a',
    gradient: 'linear-gradient(135deg, rgba(13,148,136,0.18), rgba(255,255,255,0.6))',
    style: { top: '15%', left: '5%' },
  },
  {
    id: 'thanjavur',
    emoji: '🏛️',
    title: 'Thanjavur',
    subtitle: 'City of Temples',
    tag: 'Heritage',
    tagColor: '#d97706',
    tagBg: 'rgba(217,119,6,0.12)',
    accentColor: '#d97706',
    floatClass: 'float-b',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(255,255,255,0.6))',
    style: { top: '10%', right: '6%' },
  },
  {
    id: 'mahabalipuram',
    emoji: '🌊',
    title: 'Mahabalipuram',
    subtitle: 'Shore of Wonders',
    tag: 'UNESCO',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.12)',
    accentColor: '#7c3aed',
    floatClass: 'float-c',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(255,255,255,0.6))',
    style: { bottom: '22%', left: '3%' },
  },
  {
    id: 'rameshwaram',
    emoji: '🕌',
    title: 'Rameshwaram',
    subtitle: 'Island of Divinity',
    tag: 'Spiritual',
    tagColor: '#e11d48',
    tagBg: 'rgba(225,29,72,0.10)',
    accentColor: '#e11d48',
    floatClass: 'float-d',
    gradient: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(255,255,255,0.6))',
    style: { bottom: '20%', right: '4%' },
  },
  {
    id: 'kanyakumari',
    emoji: '🌅',
    title: 'Kanyakumari',
    subtitle: 'Land\'s End Beauty',
    tag: 'Coastal',
    tagColor: '#0369a1',
    tagBg: 'rgba(3,105,161,0.12)',
    accentColor: '#0369a1',
    floatClass: 'float-e',
    gradient: 'linear-gradient(135deg, rgba(3,105,161,0.15), rgba(255,255,255,0.6))',
    style: { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' },
  },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-grid"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Background blobs */}
      <div className="blob" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(20,184,166,0.3), transparent)', top: '-10%', right: '-5%' }} />
      <div className="blob" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(245,158,11,0.25), transparent)', bottom: '-5%', left: '-5%', animationDelay: '3s' }} />
      <div className="blob" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(244,63,94,0.2), transparent)', top: '40%', left: '35%', animationDelay: '1.5s' }} />

      {/* Floating Cards */}
      {heroCards.map(card => (
        <div
          key={card.id}
          className={`glass ${card.floatClass}`}
          style={{
            position: 'absolute',
            ...card.style,
            borderRadius: '20px',
            padding: '16px 20px',
            minWidth: '160px',
            maxWidth: '180px',
            background: card.gradient,
            cursor: 'default',
            zIndex: 2,
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '6px' }}>{card.emoji}</div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1c1917', fontFamily: "'Outfit', sans-serif" }}>{card.title}</div>
          <div style={{ fontSize: '0.72rem', color: '#78716c', marginBottom: '8px' }}>{card.subtitle}</div>
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: '99px',
            background: card.tagBg, color: card.tagColor,
            fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.04em'
          }}>
            {card.tag}
          </span>
          {/* Glow dot */}
          <div style={{
            position: 'absolute', top: '12px', right: '12px',
            width: 8, height: 8, borderRadius: '50%',
            background: card.accentColor, boxShadow: `0 0 8px ${card.accentColor}`,
          }} />
        </div>
      ))}

      {/* Center Hero Text */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 3, padding: '0 24px', maxWidth: '680px' }}>
        <div className="fade-up-1" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 18px', borderRadius: '99px',
          background: 'rgba(13,148,136,0.1)',
          border: '1px solid rgba(13,148,136,0.25)',
          marginBottom: '24px',
          fontSize: '0.82rem', fontWeight: 600, color: '#0d9488',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          <span>✨</span> Discover India's Cultural Gem
        </div>

        <h1
          className="fade-up-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            color: '#1c1917',
            marginBottom: '20px',
          }}
        >
          Explore{' '}
          <span className="gradient-text">Tamil Nadu</span>
        </h1>

        <p
          className="fade-up-3"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#78716c',
            lineHeight: 1.7,
            marginBottom: '36px',
            maxWidth: '520px',
            margin: '0 auto 36px',
          }}
        >
          Where ancient temples touch the sky, emerald hills breathe serenity,
          and golden shores meet timeless traditions.
        </p>

        <div className="fade-up-4" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#destinations"
            className="btn-primary"
            style={{
              textDecoration: 'none',
              padding: '14px 32px',
              borderRadius: '99px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}
          >
            Explore Destinations <span>→</span>
          </a>
          <a
            href="#about"
            className="btn-outline"
            style={{
              textDecoration: 'none',
              padding: '14px 32px',
              borderRadius: '99px',
              color: '#44403c',
              fontWeight: 600,
              fontSize: '0.95rem',
              background: 'rgba(255,255,255,0.6)',
            }}
          >
            Learn More
          </a>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '52px', flexWrap: 'wrap' }}>
          {[
            { num: '37,000+', label: 'Temples' },
            { num: '1,076 km', label: 'Coastline' },
            { num: '5 UNESCO', label: 'World Heritage' },
            { num: '4000+', label: 'Years of History' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.4rem', color: '#1c1917' }}>{s.num}</div>
              <div style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        zIndex: 3,
      }}>
        <div style={{ fontSize: '0.7rem', color: '#78716c', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</div>
        <div style={{
          width: 24, height: 38, border: '2px solid rgba(120,113,108,0.4)',
          borderRadius: '99px', display: 'flex', justifyContent: 'center', paddingTop: '6px',
        }}>
          <div style={{
            width: 4, height: 8, background: '#0d9488', borderRadius: '99px',
            animation: 'floatA 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  )
}
