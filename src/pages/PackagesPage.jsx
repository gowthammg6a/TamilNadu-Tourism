import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme, useLang } from '../context/AppContext'

const packages = [
  {
    id: 'heritage',
    emoji: '🏛️',
    name: 'Heritage Explorer',
    tagline: 'UNESCO & Ancient Temples',
    duration: '5 Days / 4 Nights',
    price: '₹12,999',
    originalPrice: '₹18,000',
    badge: 'Most Popular',
    badgeColor: '#0d9488',
    color: '#d97706',
    bg: 'linear-gradient(135deg,#fef3c7,#fde68a)',
    border: 'rgba(217,119,6,0.25)',
    includes: ['Thanjavur', 'Mahabalipuram', 'Madurai', 'Kanchipuram'],
    features: [
      '4-star hotel accommodation',
      'Air-conditioned transport',
      'Expert heritage guide',
      'All temple entry fees',
      'Daily breakfast & dinner',
      'Airport transfers',
    ],
    highlights: '5 UNESCO Sites · 12 Temples · 2 Museums',
  },
  {
    id: 'hills',
    emoji: '🌿',
    name: 'Hill Station Retreat',
    tagline: 'Tea Gardens & Mountain Air',
    duration: '4 Days / 3 Nights',
    price: '₹9,999',
    originalPrice: '₹14,500',
    badge: 'Best Value',
    badgeColor: '#16a34a',
    color: '#16a34a',
    bg: 'linear-gradient(135deg,#dcfce7,#bbf7d0)',
    border: 'rgba(22,163,74,0.25)',
    includes: ['Ooty', 'Kodaikanal', 'Coonoor', 'Yelagiri'],
    features: [
      '3-star hill resort stay',
      'Toy train ride (Ooty)',
      'Boat ride at Kodaikanal',
      'Tea factory visit',
      'All meals included',
      'Nature walk guide',
    ],
    highlights: '4 Hill Stations · Tea Garden Tour · Toy Train',
  },
  {
    id: 'coastal',
    emoji: '🌊',
    name: 'Coastal & Spiritual',
    tagline: 'Beaches, Temples & Sunrises',
    duration: '6 Days / 5 Nights',
    price: '₹15,999',
    originalPrice: '₹22,000',
    badge: 'Fan Favourite',
    badgeColor: '#7c3aed',
    color: '#0369a1',
    bg: 'linear-gradient(135deg,#dbeafe,#bae6fd)',
    border: 'rgba(3,105,161,0.25)',
    includes: ['Rameshwaram', 'Kanyakumari', 'Rameswaram', 'Madurai'],
    features: [
      'Beachside hotel rooms',
      'Pamban Bridge visit',
      'Kanyakumari sunrise boat',
      'Vivekananda Rock visit',
      'Meenakshi Temple tour',
      'All meals & transport',
    ],
    highlights: '3 Sacred Sites · 2 Beaches · 1 Sunrise Boat',
  },
  {
    id: 'wildlife',
    emoji: '🐘',
    name: 'Wildlife Adventure',
    tagline: 'Safaris & Forest Trails',
    duration: '3 Days / 2 Nights',
    price: '₹7,499',
    originalPrice: '₹11,000',
    badge: 'Adventure Pick',
    badgeColor: '#b45309',
    color: '#b45309',
    bg: 'linear-gradient(135deg,#fff7ed,#fed7aa)',
    border: 'rgba(180,83,9,0.25)',
    includes: ['Mudumalai', 'Anamalai', 'Ooty', 'Coimbatore'],
    features: [
      'Forest eco-lodge stay',
      'Morning jeep safari',
      'Elephant interaction',
      'Bird watching session',
      'Nature photography guide',
      'All meals in forest',
    ],
    highlights: '2 Wildlife Sanctuaries · Elephant Camp · Jeep Safari',
  },
  {
    id: 'luxury',
    emoji: '👑',
    name: 'Royal Tamil Nadu',
    tagline: 'Premium All-Inclusive Experience',
    duration: '8 Days / 7 Nights',
    price: '₹34,999',
    originalPrice: '₹50,000',
    badge: '⭐ Premium',
    badgeColor: '#e11d48',
    color: '#e11d48',
    bg: 'linear-gradient(135deg,#ffe4e6,#fecdd3)',
    border: 'rgba(225,29,72,0.25)',
    includes: ['All Major Destinations', 'Private Tours'],
    features: [
      '5-star luxury hotels',
      'Private chauffeur car',
      'Personal travel concierge',
      'All UNESCO sites',
      'Fine dining experiences',
      'Spa & wellness sessions',
      'Cultural dance show',
      'Flight bookings assistance',
    ],
    highlights: '7 Destinations · Private Guide · 5-Star Hotels',
  },
  {
    id: 'budget',
    emoji: '🎒',
    name: 'Backpacker Special',
    tagline: 'Maximum Tamil Nadu, Minimum Budget',
    duration: '7 Days / 6 Nights',
    price: '₹5,999',
    originalPrice: '₹9,000',
    badge: 'Budget Friendly',
    badgeColor: '#4d7c0f',
    color: '#4d7c0f',
    bg: 'linear-gradient(135deg,#ecfccb,#d9f99d)',
    border: 'rgba(77,124,15,0.25)',
    includes: ['Chennai', 'Mahabalipuram', 'Pondicherry', 'Thanjavur'],
    features: [
      'Clean budget accommodation',
      'Local bus & train travel',
      'Street food experiences',
      'Self-guided tour maps',
      'All major attractions',
      'Community travel group',
    ],
    highlights: '5 Cities · Local Transport · Authentic Food',
  },
]

export default function PackagesPage() {
  const { dark } = useTheme()
  const { t } = useLang()
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: dark ? '#0f1117' : '#f8f6f2', paddingTop: '80px' }}>
      {/* Hero */}
      <div className="bg-grid" style={{ padding: '60px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 360, height: 360, background: 'radial-gradient(circle,rgba(13,148,136,0.2),transparent)', top: '-15%', right: '-3%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '99px', background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.3)', fontSize: '0.78rem', fontWeight: 600, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            {t('packagesTag')}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: dark ? '#f1f5f9' : '#1c1917', marginBottom: '14px' }}>
            {t('packagesTitle')}
          </h1>
          <p style={{ color: dark ? '#94a3b8' : '#78716c', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Carefully crafted packages for every budget and travel style. All-inclusive, hassle-free Tamil Nadu experiences.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '24px' }}>
          {packages.map(pkg => (
            <div key={pkg.id} className="glass"
              style={{ borderRadius: '24px', border: `1.5px solid ${pkg.border}`, overflow: 'hidden', transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 28px 60px rgba(0,0,0,0.13)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              {/* Card Header */}
              <div style={{ background: pkg.bg, padding: '24px 24px 20px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '4px 12px', borderRadius: '99px', background: pkg.badgeColor, color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>{pkg.badge}</div>
                <div style={{ fontSize: '2.8rem', marginBottom: '10px' }}>{pkg.emoji}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', color: '#1c1917', marginBottom: '4px' }}>{pkg.name}</h3>
                <p style={{ color: pkg.color, fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>{pkg.tagline}</p>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1c1917' }}>{pkg.price}</span>
                    <span style={{ fontSize: '0.78rem', color: '#78716c' }}> / person</span>
                  </div>
                  <div style={{ textDecoration: 'line-through', color: '#a8a29e', fontSize: '0.88rem' }}>{pkg.originalPrice}</div>
                  <div style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(22,163,74,0.15)', color: '#16a34a', fontSize: '0.7rem', fontWeight: 700 }}>
                    {Math.round((1 - parseInt(pkg.price.replace(/[^0-9]/g,'')) / parseInt(pkg.originalPrice.replace(/[^0-9]/g,''))) * 100)}% OFF
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px 24px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.82rem', color: dark ? '#94a3b8' : '#78716c' }}>⏱ {pkg.duration}</span>
                  <span style={{ color: '#d6d3d1' }}>·</span>
                  <span style={{ fontSize: '0.78rem', color: pkg.color, fontWeight: 600 }}>{pkg.highlights}</span>
                </div>

                {/* Destinations */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {pkg.includes.map(dest => (
                    <span key={dest} style={{ padding: '3px 10px', borderRadius: '8px', background: `${pkg.color}15`, color: pkg.color, fontSize: '0.72rem', fontWeight: 600, border: `1px solid ${pkg.border}` }}>{dest}</span>
                  ))}
                </div>

                {/* Features - show/hide */}
                <div style={{ marginBottom: '18px' }}>
                  {(selected === pkg.id ? pkg.features : pkg.features.slice(0, 3)).map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: '#16a34a', fontSize: '0.75rem', flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: '0.82rem', color: dark ? '#94a3b8' : '#78716c' }}>{f}</span>
                    </div>
                  ))}
                  {pkg.features.length > 3 && (
                    <button onClick={() => setSelected(selected === pkg.id ? null : pkg.id)}
                      style={{ background: 'none', border: 'none', color: pkg.color, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: '4px 0', fontFamily: "'Outfit',sans-serif" }}>
                      {selected === pkg.id ? '▲ Show less' : `+ ${pkg.features.length - 3} more included`}
                    </button>
                  )}
                </div>

                <Link to="/contact"
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '12px', borderRadius: '12px', background: `linear-gradient(135deg,${pkg.color},#f59e0b)`, color: '#fff', fontWeight: 700, fontSize: '0.9rem', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >Book This Package →</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <div className="glass" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', padding: '44px 52px', borderRadius: '28px', border: '1.5px solid rgba(255,255,255,0.8)', maxWidth: '560px', width: '100%' }}>
            <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🎨</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', color: dark ? '#f1f5f9' : '#1c1917', marginBottom: '10px' }}>{t('customPkg')}</h3>
            <p style={{ color: dark ? '#94a3b8' : '#78716c', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '22px' }}>
              Want a custom itinerary? Tell us your dates, budget, and interests — we'll craft the perfect trip just for you.
            </p>
            <Link to="/contact" className="btn-primary"
              style={{ textDecoration: 'none', padding: '13px 36px', borderRadius: '99px', color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
              Request Custom Package 🗺️
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
