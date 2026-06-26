import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/AppContext'

const getNavLinks = (t) => [
  { label: t('home'), to: '/' },
  { label: t('destinations'), to: '/destinations' },
  { label: t('experiences'), to: '/experiences' },
  { label: t('planner'), to: '/planner' },
  { label: t('gallery'), to: '/gallery' },
  { label: t('about'), to: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { lang, toggle: toggleLang, t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const navLinks = getNavLinks(t)

  const navBg = scrolled
    ? 'rgba(255,255,255,0.92)'
    : 'rgba(255,255,255,0.35)'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.4s ease',
      padding: scrolled ? '10px 0' : '18px 0',
      background: navBg,
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)'}`,
      boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.08)' : 'none',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{ width: 38, height: 38, borderRadius: '10px', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 4px 12px rgba(13,148,136,0.3)' }}>🏛️</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1c1917', lineHeight: 1.1 }}>Tamil Nadu</div>
            <div style={{ fontWeight: 400, fontSize: '0.68rem', color: '#0d9488', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tourism</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }} className="nav-desktop">
          {navLinks.map(link => {
            const active = location.pathname === link.to
            return (
              <Link key={link.label} to={link.to}
                style={{ textDecoration: 'none', color: active ? '#0d9488' : '#44403c', fontWeight: active ? 700 : 500, fontSize: '0.88rem', borderBottom: active ? '2px solid #0d9488' : '2px solid transparent', paddingBottom: '2px', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
              >{link.label}</Link>
            )
          })}

          {/* Lang Toggle */}
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => lang !== 'en' && toggleLang()}>EN</button>
            <button className={`lang-btn ${lang === 'ta' ? 'active' : ''}`} onClick={() => lang !== 'ta' && toggleLang()}>த</button>
          </div>

          <Link to="/contact"
            style={{ textDecoration: 'none', padding: '9px 20px', borderRadius: '99px', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', boxShadow: '0 4px 16px rgba(13,148,136,0.3)', whiteSpace: 'nowrap', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >{t('planTrip')} ✈️</Link>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger" aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'none', flexDirection: 'column', gap: '5px' }}>
          {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 24, height: 2, background: '#44403c', borderRadius: 2 }} />)}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ padding: '16px 24px 20px', borderTop: '1px solid rgba(0,0,0,0.06)', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navLinks.map(link => (
            <Link key={link.label} to={link.to} style={{ textDecoration: 'none', color: location.pathname === link.to ? '#0d9488' : '#44403c', fontWeight: location.pathname === link.to ? 700 : 500, fontSize: '1rem', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>{link.label}</Link>
          ))}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 0' }}>
            <div className="lang-toggle">
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => lang !== 'en' && toggleLang()}>EN</button>
              <button className={`lang-btn ${lang === 'ta' ? 'active' : ''}`} onClick={() => lang !== 'ta' && toggleLang()}>த</button>
            </div>
          </div>
          <Link to="/contact" style={{ textDecoration: 'none', padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', textAlign: 'center' }}>{t('planTrip')} ✈️</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 1000px) { .nav-desktop { display: none !important; } .nav-hamburger { display: flex !important; } }
      `}</style>
    </nav>
  )
}
