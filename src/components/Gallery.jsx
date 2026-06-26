const galleryItems = [
  { emoji: '🏛️', label: 'Brihadeeswarar Temple', sub: 'Thanjavur', color: '#d97706', bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', span: 'col-span-2' },
  { emoji: '🌅', label: 'Kanyakumari Sunrise', sub: 'Kanyakumari', color: '#0369a1', bg: 'linear-gradient(135deg, #dbeafe, #bae6fd)', span: '' },
  { emoji: '🌿', label: 'Nilgiri Tea Gardens', sub: 'Ooty', color: '#16a34a', bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', span: '' },
  { emoji: '🕌', label: 'Meenakshi Temple', sub: 'Madurai', color: '#e11d48', bg: 'linear-gradient(135deg, #ffe4e6, #fecdd3)', span: '' },
  { emoji: '🌊', label: 'Shore Temple', sub: 'Mahabalipuram', color: '#7c3aed', bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', span: 'col-span-2' },
  { emoji: '🦜', label: 'Mudumalai Forest', sub: 'Wildlife', color: '#4d7c0f', bg: 'linear-gradient(135deg, #ecfccb, #d9f99d)', span: '' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="bg-grid" style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 16px', borderRadius: '99px',
            background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)',
            fontSize: '0.78rem', fontWeight: 600, color: '#e11d48',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            📸 Visual Journey
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1c1917', marginBottom: '16px',
          }}>
            Picture Tamil Nadu
          </h2>
          <p style={{ color: '#78716c', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Every corner of this magnificent state is a postcard waiting to be written.
          </p>
        </div>

        {/* Masonry-style Gallery */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '200px',
          gap: '16px',
        }}>
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="gallery-item glass"
              style={{
                gridColumn: item.span === 'col-span-2' ? 'span 2' : 'span 1',
                background: item.bg,
                border: '1.5px solid rgba(255,255,255,0.85)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background pattern */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.5,
              }} />

              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: item.span ? '4rem' : '3rem', marginBottom: '12px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}>
                  {item.emoji}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: item.span ? '1.25rem' : '1rem', color: '#1c1917', marginBottom: '4px' }}>
                  {item.label}
                </div>
                <div style={{
                  display: 'inline-block', padding: '3px 12px', borderRadius: '99px',
                  background: `${item.color}20`, color: item.color,
                  fontSize: '0.72rem', fontWeight: 600,
                }}>
                  {item.sub}
                </div>
              </div>

              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(135deg, ${item.color}15, transparent)`,
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0'}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <div
            className="glass-strong"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 56px',
              borderRadius: '28px',
              border: '1.5px solid rgba(255,255,255,0.9)',
              maxWidth: '560px',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✈️</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#1c1917', marginBottom: '12px' }}>
              Ready to Explore Tamil Nadu?
            </h3>
            <p style={{ color: '#78716c', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Start planning your dream journey today. Tamil Nadu awaits with open arms and a thousand stories.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                className="btn-primary"
                style={{
                  padding: '13px 32px', borderRadius: '99px',
                  color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                  border: 'none', cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Plan My Trip 🗺️
              </button>
              <button
                className="btn-outline"
                style={{
                  padding: '13px 32px', borderRadius: '99px',
                  color: '#44403c', fontWeight: 600, fontSize: '0.95rem',
                  background: 'rgba(255,255,255,0.7)', cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Download Guide 📥
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
