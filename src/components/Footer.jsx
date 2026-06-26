import { Link } from 'react-router-dom'
import { useTheme } from '../context/AppContext'

const footerLinks = {
  Destinations: [
    { label: 'Ooty', to: '/destinations/ooty' },
    { label: 'Thanjavur', to: '/destinations/thanjavur' },
    { label: 'Mahabalipuram', to: '/destinations/mahabalipuram' },
    { label: 'Rameshwaram', to: '/destinations/rameshwaram' },
    { label: 'Kanyakumari', to: '/destinations/kanyakumari' },
    { label: 'Madurai', to: '/destinations/madurai' },
    { label: 'Kodaikanal', to: '/destinations/kodaikanal' },
  ],
  Explore: [
    { label: '🎯 Experiences', to: '/experiences' },
    { label: '📸 Gallery', to: '/gallery' },
    { label: '🗓️ Travel Planner', to: '/planner' },
    { label: '🏷️ Tour Packages', to: '/packages' },
    { label: '📰 Travel Blog', to: '/blog' },
    { label: '⭐ My Bookmarks', to: '/bookmarks' },
  ],
  Company: [
    { label: '🌏 About Tamil Nadu', to: '/about' },
    { label: '📩 Plan Your Trip', to: '/contact' },
    { label: '📋 All Destinations', to: '/destinations' },
    { label: '💬 Contact Us', to: '/contact' },
  ],
}

export default function Footer() {
  const { dark } = useTheme()
  const bg = dark
    ? 'linear-gradient(180deg,#080a0e 0%,#03040a 100%)'
    : 'linear-gradient(180deg,#1c1917 0%,#0c0a09 100%)'

  return (
    <footer style={{ background: bg, color: '#d6d3d1', padding: '72px 0 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(20,184,166,0.5),rgba(245,158,11,0.5),transparent)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }} className="footer-grid">

          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏛️</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>Tamil Nadu</div>
                <div style={{ fontSize: '0.68rem', color: '#0d9488', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tourism</div>
              </div>
            </Link>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: '#a8a29e', maxWidth: '240px', marginBottom: '20px' }}>
              Discover the timeless beauty of Tamil Nadu — where ancient traditions meet breathtaking landscapes.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              {['🌐', '📘', '📸', '🐦'].map((icon, i) => (
                <button key={i} style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#a8a29e', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(13,148,136,0.2)'; e.currentTarget.style.borderColor = 'rgba(13,148,136,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >{icon}</button>
              ))}
            </div>
            {/* Admin secret link */}
            <Link to="/admin" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
            >Admin</Link>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontWeight: 700, fontSize: '0.82rem', color: '#fff', marginBottom: '16px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{title}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {links.map(link => (
                  <li key={link.label} style={{ marginBottom: '10px' }}>
                    <Link to={link.to} style={{ textDecoration: 'none', color: '#a8a29e', fontSize: '0.83rem', transition: 'color 0.2s', display: 'inline-block' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#14b8a6'}
                      onMouseLeave={e => e.currentTarget.style.color = '#a8a29e'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginBottom: '36px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '4px' }}>✉️ Stay in the Loop</div>
            <div style={{ fontSize: '0.8rem', color: '#a8a29e' }}>Travel tips, guides and exclusive offers — straight to your inbox.</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flex: 1, maxWidth: '380px' }}>
            <input type="email" placeholder="your@email.com"
              style={{ flex: 1, padding: '10px 16px', borderRadius: '99px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '0.83rem', outline: 'none', fontFamily: "'Outfit',sans-serif" }}
            />
            <button style={{ padding: '10px 20px', borderRadius: '99px', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', color: '#fff', fontWeight: 700, fontSize: '0.83rem', border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", whiteSpace: 'nowrap' }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '0.78rem', color: '#78716c' }}>© 2025 Tamil Nadu Tourism. Crafted with ❤️ | Created by <span style={{ color: '#14b8a6', fontWeight: 600 }}>Gowtham M G</span></p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(item => (
              <Link key={item} to="/contact" style={{ fontSize: '0.75rem', color: '#78716c', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#14b8a6'}
                onMouseLeave={e => e.currentTarget.style.color = '#78716c'}
              >{item}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr !important;}}
        @media(max-width:500px){.footer-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </footer>
  )
}
