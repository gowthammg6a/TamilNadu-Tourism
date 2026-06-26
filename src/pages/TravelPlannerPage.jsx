import { Link } from 'react-router-dom'
import { useLang } from '../context/AppContext'

const months = [
  { month: 'Jan', emoji: '❄️', best: ['Kanyakumari', 'Rameshwaram', 'Mahabalipuram', 'Madurai'], type: 'Coastal & Heritage', color: '#0369a1', bg: 'rgba(3,105,161,0.1)' },
  { month: 'Feb', emoji: '🌸', best: ['Kodaikanal', 'Thanjavur', 'Madurai', 'Chennai'], type: 'Culture & Flowers', color: '#e11d48', bg: 'rgba(225,29,72,0.08)' },
  { month: 'Mar', emoji: '🌞', best: ['Mahabalipuram', 'Rameshwaram', 'Kanyakumari'], type: 'Beach & Coastal', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
  { month: 'Apr', emoji: '🌿', best: ['Ooty', 'Kodaikanal', 'Yelagiri', 'Kotagiri'], type: 'Hill Stations', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  { month: 'May', emoji: '🏔️', best: ['Ooty', 'Kodaikanal', 'Yelagiri', 'Coonoor'], type: 'Cool Hill Retreats', color: '#0d9488', bg: 'rgba(13,148,136,0.1)' },
  { month: 'Jun', emoji: '🌧️', best: ['Ooty', 'Kodaikanal'], type: 'Misty Monsoon', color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
  { month: 'Jul', emoji: '🌦️', best: ['Ooty', 'Kodaikanal', 'Yelagiri'], type: 'Green Landscapes', color: '#4d7c0f', bg: 'rgba(77,124,15,0.1)' },
  { month: 'Aug', emoji: '🐘', best: ['Mudumalai', 'Anamalai'], type: 'Wildlife Season', color: '#b45309', bg: 'rgba(180,83,9,0.1)' },
  { month: 'Sep', emoji: '🌈', best: ['Ooty', 'Kotagiri', 'Yelagiri'], type: 'Post-monsoon Beauty', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  { month: 'Oct', emoji: '🏛️', best: ['Thanjavur', 'Madurai', 'Rameshwaram', 'Kanyakumari'], type: 'Temple & Heritage', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
  { month: 'Nov', emoji: '🌊', best: ['Mahabalipuram', 'Marina Beach', 'Kanyakumari'], type: 'Coastal & Culture', color: '#0369a1', bg: 'rgba(3,105,161,0.1)' },
  { month: 'Dec', emoji: '🎉', best: ['All Destinations!', 'Chennai', 'Madurai', 'Ooty'], type: 'Peak Season — Everywhere!', color: '#e11d48', bg: 'rgba(225,29,72,0.08)' },
]

const destLinks = {
  'Ooty': '/destinations/ooty', 'Kodaikanal': '/destinations/kodaikanal',
  'Thanjavur': '/destinations/thanjavur', 'Mahabalipuram': '/destinations/mahabalipuram',
  'Rameshwaram': '/destinations/rameshwaram', 'Kanyakumari': '/destinations/kanyakumari',
  'Madurai': '/destinations/madurai', 'Mudumalai': '/destinations/mudumalai',
  'Yelagiri': '/destinations/yelagiri',
}

export default function TravelPlannerPage() {
  const { t } = useLang()
  const currentMonth = new Date().getMonth()

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2', paddingTop: '80px' }}>
      {/* Hero */}
      <div className="bg-grid" style={{ padding: '60px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 360, height: 360, background: 'radial-gradient(circle,rgba(13,148,136,0.2),transparent)', top: '-15%', right: '-3%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '99px', background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)', fontSize: '0.78rem', fontWeight: 600, color: '#0d9488', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('plannerTag')}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#1c1917', marginBottom: '14px' }}>
            {t('plannerTitle')}
          </h1>
          <p style={{ color: '#78716c', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Find the best time to visit every corner of Tamil Nadu — month by month, season by season.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Current Month Highlight */}
        <div style={{ background: `linear-gradient(135deg, ${months[currentMonth].bg.replace('0.1','0.15')}, rgba(255,255,255,0.8))`, border: `1.5px solid ${months[currentMonth].color}30`, borderRadius: '24px', padding: '28px 32px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '3.5rem' }}>{months[currentMonth].emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: months[currentMonth].color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{t('plannerBest')}</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', color: '#1c1917', marginBottom: '6px' }}>
              {months[currentMonth].month} — {months[currentMonth].type}
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {months[currentMonth].best.map(d => (
                <Link key={d} to={destLinks[d] || '/destinations'} style={{ textDecoration: 'none', padding: '5px 14px', borderRadius: '99px', background: `${months[currentMonth].color}18`, color: months[currentMonth].color, fontWeight: 600, fontSize: '0.82rem', border: `1px solid ${months[currentMonth].color}30` }}>
                  {d}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 24px', borderRadius: '99px', color: '#fff', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
            Plan This Month →
          </Link>
        </div>

        {/* Month Grid */}
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: '#1c1917', marginBottom: '24px' }}>{t('plannerAll')}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '18px' }}>
          {months.map((m, i) => (
            <div
              key={m.month}
              className="glass"
              style={{
                padding: '22px', borderRadius: '20px',
                border: i === currentMonth ? `2px solid ${m.color}` : '1.5px solid rgba(255,255,255,0.85)',
                background: i === currentMonth ? m.bg : 'rgba(255,255,255,0.6)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              {i === currentMonth && (
                <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '2px 8px', borderRadius: '99px', background: m.color, color: '#fff', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em' }}>NOW</div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ fontSize: '2rem' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1c1917' }}>{m.month}</div>
                  <div style={{ fontSize: '0.72rem', color: m.color, fontWeight: 600 }}>{m.type}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {m.best.map(d => (
                  <Link key={d} to={destLinks[d] || '/destinations'} style={{ textDecoration: 'none', padding: '3px 10px', borderRadius: '8px', background: m.bg, color: m.color, fontSize: '0.72rem', fontWeight: 600, border: `1px solid ${m.color}25`, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >{d}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.7rem', color: '#1c1917', marginBottom: '10px' }}>{t('plannerCta')}</h3>
          <p style={{ color: '#78716c', marginBottom: '22px' }}>Tell us your month and we'll craft the perfect Tamil Nadu itinerary.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none', padding: '13px 32px', borderRadius: '99px', color: '#fff', fontWeight: 700 }}>Plan My Trip ✈️</Link>
            <Link to="/destinations" style={{ textDecoration: 'none', padding: '13px 32px', borderRadius: '99px', color: '#0d9488', fontWeight: 600, background: 'rgba(13,148,136,0.08)', border: '1.5px solid rgba(13,148,136,0.3)' }}>All Destinations 🗺️</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
