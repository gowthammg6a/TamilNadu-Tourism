import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollTop}
      title="Back to top"
      style={{
        position: 'fixed',
        bottom: '88px',
        right: '24px',
        width: 46,
        height: 46,
        borderRadius: '50%',
        background: 'linear-gradient(135deg,#0d9488,#f59e0b)',
        border: 'none',
        color: '#fff',
        fontSize: '1.1rem',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(13,148,136,0.4)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
        fontFamily: "'Outfit',sans-serif",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'}
      onMouseLeave={e => e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)'}
    >
      ↑
    </button>
  )
}
