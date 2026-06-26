import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f6f2', textAlign: 'center', padding: '24px', paddingTop: '80px' }}>
      {/* Blobs */}
      <div className="blob" style={{ width: 350, height: 350, background: 'radial-gradient(circle,rgba(13,148,136,0.18),transparent)', top: '5%', right: '5%', position: 'fixed' }} />
      <div className="blob" style={{ width: 280, height: 280, background: 'radial-gradient(circle,rgba(245,158,11,0.15),transparent)', bottom: '5%', left: '5%', position: 'fixed', animationDelay: '3s' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '6rem', marginBottom: '8px', animation: 'floatA 4s ease-in-out infinite' }}>🗺️</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(4rem,10vw,8rem)', fontWeight: 800, color: '#e7e5e4', lineHeight: 1, marginBottom: '0' }}>404</h1>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#1c1917', marginBottom: '12px', marginTop: '-8px' }}>
          Destination Not Found!
        </h2>
        <p style={{ color: '#78716c', fontSize: '1rem', maxWidth: '400px', lineHeight: 1.75, marginBottom: '32px' }}>
          Looks like this page went on a trip without us. Let's get you back to exploring Tamil Nadu!
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none', padding: '13px 32px', borderRadius: '99px', color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
            🏠 Back to Home
          </Link>
          <Link to="/destinations" style={{ textDecoration: 'none', padding: '13px 32px', borderRadius: '99px', color: '#0d9488', fontWeight: 600, fontSize: '0.95rem', background: 'rgba(13,148,136,0.08)', border: '1.5px solid rgba(13,148,136,0.3)' }}>
            🗺️ Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  )
}
