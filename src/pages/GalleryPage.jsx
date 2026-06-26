import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/AppContext'

const galleryItems = [
  {
    img: '/img_brihadeeswarar.png',
    label: 'Brihadeeswarar Temple',
    sub: 'Thanjavur',
    color: '#d97706',
    wide: true,
    link: '/destinations/thanjavur',
    category: 'Heritage'
  },
  {
    img: '/img_kanyakumari.png',
    label: 'Kanyakumari Sunrise',
    sub: 'Kanyakumari',
    color: '#0369a1',
    wide: false,
    link: '/destinations/kanyakumari',
    category: 'Coastal'
  },
  {
    img: '/img_ooty.png',
    label: 'Nilgiri Tea Gardens',
    sub: 'Ooty',
    color: '#16a34a',
    wide: false,
    link: '/destinations/ooty',
    category: 'Hill Station'
  },
  {
    img: '/img_meenakshi.png',
    label: 'Meenakshi Temple',
    sub: 'Madurai',
    color: '#e11d48',
    wide: false,
    link: '/destinations/madurai',
    category: 'Spiritual'
  },
  {
    img: '/img_mahabalipuram.png',
    label: 'Shore Temple',
    sub: 'Mahabalipuram',
    color: '#7c3aed',
    wide: true,
    link: '/destinations/mahabalipuram',
    category: 'UNESCO Heritage'
  },
  {
    img: '/img_mudumalai.png',
    label: 'Mudumalai Forest',
    sub: 'Wildlife',
    color: '#4d7c0f',
    wide: false,
    link: '/destinations/mudumalai',
    category: 'Wildlife'
  },
  {
    img: '/img_kodaikanal.png',
    label: 'Kodaikanal Lake',
    sub: 'Kodaikanal',
    color: '#0d9488',
    wide: false,
    link: '/destinations/kodaikanal',
    category: 'Hill Station'
  },
  {
    img: '/img_pamban.png',
    label: 'Pamban Bridge',
    sub: 'Rameshwaram',
    color: '#e11d48',
    wide: false,
    link: '/destinations/rameshwaram',
    category: 'Coastal'
  },
  {
    img: '/img_yelagiri.png',
    label: 'Yelagiri Hills',
    sub: 'Yelagiri',
    color: '#b45309',
    wide: false,
    link: '/destinations/yelagiri',
    category: 'Hill Station'
  },
]

export default function GalleryPage() {
  const { t } = useLang()
  const [lightbox, setLightbox] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2', paddingTop: '80px' }}>
      {/* Hero */}
      <div className="bg-grid" style={{ padding: '60px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(244,63,94,0.12),transparent)', top: '-15%', right: '-3%' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(13,148,136,0.14),transparent)', bottom: '-10%', left: '-3%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '99px', background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', fontSize: '0.78rem', fontWeight: 600, color: '#e11d48', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            📸 {t('galPageTag')}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#1c1917', marginBottom: '14px' }}>
            {t('galPageTitle')}
          </h1>
          <p style={{ color: '#78716c', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Every corner of this magnificent state is a postcard waiting to be written. Click any photo to view full screen.
          </p>
        </div>
      </div>

      {/* Masonry Photo Grid */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '32px 20px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '280px',
          gap: '12px',
        }} className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              onClick={() => setLightbox(item)}
              style={{
                gridColumn: item.wide ? 'span 2' : 'span 1',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                background: '#e7e5e4',
              }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.gallery-overlay').style.opacity = '1'
                e.currentTarget.querySelector('img').style.transform = 'scale(1.07)'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.gallery-overlay').style.opacity = '0'
                e.currentTarget.querySelector('img').style.transform = 'scale(1)'
              }}
            >
              <img
                src={item.img}
                alt={item.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
              />
              {/* Overlay */}
              <div className="gallery-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                opacity: 0, transition: 'opacity 0.35s ease',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '22px'
              }}>
                <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '99px', background: `${item.color}30`, border: `1px solid ${item.color}60`, color: item.color, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', width: 'fit-content' }}>
                  {item.category}
                </span>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: item.wide ? '1.3rem' : '1.05rem', color: '#fff', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '0.78rem', color: '#d1d5db' }}>📍 {item.sub}</div>
                <Link to={item.link} onClick={e => e.stopPropagation()}
                  style={{ display: 'inline-block', marginTop: '12px', padding: '6px 16px', borderRadius: '99px', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)', width: 'fit-content' }}>
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.93)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            padding: '20px',
          }}
        >
          <button onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: '20px', right: '24px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: 40, height: 40, fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }}>
            <img src={lightbox.img} alt={lightbox.label}
              style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '16px', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
            />
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', color: '#fff', fontWeight: 700 }}>{lightbox.label}</div>
              <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '4px' }}>📍 {lightbox.sub} · {lightbox.category}</div>
              <Link to={lightbox.link} onClick={() => setLightbox(null)}
                style={{ display: 'inline-block', marginTop: '14px', padding: '10px 24px', borderRadius: '99px', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', color: '#fff', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none' }}>
                Explore {lightbox.sub} →
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:768px){ .gallery-grid{ grid-template-columns:1fr 1fr !important; grid-auto-rows:200px !important; } }
        @media(max-width:480px){ .gallery-grid{ grid-template-columns:1fr !important; grid-auto-rows:220px !important; } .gallery-grid > div { grid-column: span 1 !important; } }
      `}</style>
    </div>
  )
}
