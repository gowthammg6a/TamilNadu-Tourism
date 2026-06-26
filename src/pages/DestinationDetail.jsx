import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { destinations } from '../data/data'
import { useBookmarks, useTheme } from '../context/AppContext'

const sampleReviews = [
  { name: 'Ramesh K.', rating: 5, date: 'June 2025', text: 'Absolutely breathtaking! The architecture here is unlike anything I have seen. A must-visit for every Indian.' },
  { name: 'Sarah M.', rating: 5, date: 'May 2025', text: 'Visited during our honeymoon. The place is magical — serene, beautiful, and full of history.' },
  { name: 'Arjun V.', rating: 4, date: 'April 2025', text: 'Wonderful experience. Go early morning to avoid crowds. The local guide was excellent!' },
]

export default function DestinationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dest = destinations.find(d => d.id === id)
  const { isBookmarked, toggle: toggleBookmark } = useBookmarks()
  const { dark } = useTheme()
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, text: '' })
  const [reviews, setReviews] = useState(sampleReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const bookmarked = dest ? isBookmarked(dest.id) : false

  if (!dest) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', gap: '16px' }}>
      <div style={{ fontSize: '4rem' }}>🗺️</div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", color: '#1c1917' }}>Destination Not Found</h2>
      <Link to="/destinations" style={{ padding: '12px 28px', borderRadius: '99px', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>← Back to Destinations</Link>
    </div>
  )

  // Nearby destinations (same category or just others)
  const related = destinations.filter(d => d.id !== dest.id).slice(0, 3)

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2', paddingTop: '80px' }}>
      {/* Hero Banner */}
      <div style={{ background: dest.gradient, padding: '60px 24px 48px', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 400, height: 400, background: `radial-gradient(circle,${dest.accent}30,transparent)`, top: '-20%', right: '-5%' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <button onClick={() => navigate(-1)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '99px', background: 'rgba(255,255,255,0.7)', border: `1.5px solid ${dest.borderColor}`, color: dest.accent, fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>
              ← Back
            </button>
            <button onClick={() => toggleBookmark(dest.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '99px', background: bookmarked ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.7)', border: `1.5px solid ${bookmarked ? 'rgba(245,158,11,0.5)' : dest.borderColor}`, color: bookmarked ? '#d97706' : '#78716c', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", transition: 'all 0.25s' }}>
              {bookmarked ? '⭐ Saved' : '☆ Save'}
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '5rem', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))' }}>{dest.emoji}</div>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '99px', background: dest.accentLight, color: dest.accent, fontSize: '0.75rem', fontWeight: 600, marginBottom: '10px' }}>{dest.category}</span>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: '#1c1917', marginBottom: '6px' }}>{dest.name}</h1>
              <p style={{ color: dest.accent, fontWeight: 600, fontSize: '1.1rem', marginBottom: '8px' }}>{dest.tagline}</p>
              <p style={{ color: '#78716c', fontSize: '0.85rem' }}>📍 {dest.region} &nbsp;|&nbsp; 📏 {dest.distance}</p>
            </div>
            {/* Quick Info Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '160px' }}>
              {[
                { icon: '🗓', label: 'Best Time', val: dest.bestTime },
                { icon: '🌡️', label: 'Temperature', val: dest.temp },
                { icon: '🏨', label: 'Ideal Stay', val: dest.stay },
                { icon: '⭐', label: 'Rating', val: `${dest.rating} / 5` },
              ].map(b => (
                <div key={b.label} className="glass" style={{ padding: '10px 14px', borderRadius: '12px', border: `1px solid ${dest.borderColor}` }}>
                  <div style={{ fontSize: '0.65rem', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{b.icon} {b.label}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1c1917' }}>{b.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }} className="detail-grid">

          {/* Left Column */}
          <div>
            {/* About */}
            <div className="glass" style={{ padding: '28px', borderRadius: '20px', border: `1.5px solid ${dest.borderColor}`, marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', color: '#1c1917', marginBottom: '14px' }}>About {dest.name}</h2>
              <p style={{ color: '#78716c', lineHeight: 1.8, fontSize: '0.95rem' }}>{dest.description}</p>
            </div>

            {/* Top Spots */}
            <div className="glass" style={{ padding: '28px', borderRadius: '20px', border: `1.5px solid ${dest.borderColor}`, marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: '#1c1917', marginBottom: '18px' }}>📍 Top Spots to Visit</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '10px' }}>
                {dest.topSpots.map((spot, i) => (
                  <div key={spot} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', background: dest.accentLight, border: `1px solid ${dest.borderColor}` }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: dest.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ fontSize: '0.83rem', color: '#1c1917', fontWeight: 500 }}>{spot}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="glass" style={{ padding: '28px', borderRadius: '20px', border: `1.5px solid ${dest.borderColor}`, marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: '#1c1917', marginBottom: '18px' }}>💡 Insider Travel Tips</h2>
              {dest.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '14px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <span style={{ color: dest.accent, fontSize: '1rem', flexShrink: 0 }}>✦</span>
                  <p style={{ fontSize: '0.88rem', color: '#44403c', lineHeight: 1.65, margin: 0 }}>{tip}</p>
                </div>
              ))}
            </div>

            {/* Nearby */}
            <div className="glass" style={{ padding: '28px', borderRadius: '20px', border: `1.5px solid ${dest.borderColor}` }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: '#1c1917', marginBottom: '16px' }}>📍 Nearby Attractions</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {dest.nearbyAttractions.map(attr => (
                  <span key={attr} style={{ padding: '7px 16px', borderRadius: '99px', background: dest.accentLight, color: dest.accent, fontSize: '0.82rem', fontWeight: 600, border: `1px solid ${dest.borderColor}` }}>{attr}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Plan CTA */}
            <div style={{ padding: '28px', borderRadius: '20px', background: `linear-gradient(135deg, ${dest.accent}15, ${dest.accent}05)`, border: `1.5px solid ${dest.borderColor}` }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', color: '#1c1917', marginBottom: '10px' }}>Plan Your Visit</h3>
              <p style={{ fontSize: '0.83rem', color: '#78716c', lineHeight: 1.65, marginBottom: '18px' }}>
                Ready to experience {dest.name}? Get in touch and we'll create a perfect itinerary for you.
              </p>
              <Link to="/contact" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '12px', borderRadius: '12px', background: `linear-gradient(135deg, ${dest.accent}, #f59e0b)`, color: '#fff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>
                Plan My Trip ✈️
              </Link>
              <Link to="/destinations" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.7)', color: '#44403c', fontWeight: 600, fontSize: '0.85rem', border: '1.5px solid rgba(0,0,0,0.1)' }}>
                ← All Destinations
              </Link>
            </div>

            {/* Best Time card */}
            <div className="glass" style={{ padding: '20px', borderRadius: '20px', border: `1.5px solid ${dest.borderColor}` }}>
              <h4 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '10px', fontSize: '0.9rem' }}>🗓 Best Time to Visit</h4>
              <div style={{ padding: '10px 16px', borderRadius: '10px', background: dest.accentLight, color: dest.accent, fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
                {dest.bestTime}
              </div>
            </div>

            {/* Related */}
            <div>
              <h4 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '12px', fontSize: '0.9rem' }}>🌟 Other Destinations</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {related.map(r => (
                  <Link key={r.id} to={`/destinations/${r.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '14px', background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.85)', transition: 'transform 0.25s', backdropFilter: 'blur(8px)' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''}
                  >
                    <span style={{ fontSize: '1.6rem' }}>{r.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1c1917' }}>{r.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#78716c' }}>{r.region}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: r.accent, fontSize: '0.8rem' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 40px' }}>
        <div className="glass" style={{ padding: '28px', borderRadius: '20px', border: `1.5px solid ${dest.borderColor}`, marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: dark ? '#f1f5f9' : '#1c1917' }}>⭐ Traveller Reviews ({reviews.length})</h2>
            <button onClick={() => setShowReviewForm(!showReviewForm)}
              style={{ padding: '8px 18px', borderRadius: '99px', background: `linear-gradient(135deg,${dest.accent},#f59e0b)`, color: '#fff', fontWeight: 700, fontSize: '0.82rem', border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>
              {showReviewForm ? '✕ Cancel' : '+ Write Review'}
            </button>
          </div>

          {showReviewForm && (
            <div style={{ padding: '20px', borderRadius: '14px', background: 'rgba(13,148,136,0.06)', border: `1px solid ${dest.borderColor}`, marginBottom: '20px' }}>
              <h4 style={{ fontWeight: 700, color: dark ? '#f1f5f9' : '#1c1917', marginBottom: '14px', fontSize: '0.9rem' }}>Share Your Experience</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }} className="review-grid">
                <input placeholder="Your name" value={reviewForm.name} onChange={e => setReviewForm({...reviewForm, name: e.target.value})}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', outline: 'none', fontFamily: "'Outfit',sans-serif", color: '#1c1917' }} />
                <select value={reviewForm.rating} onChange={e => setReviewForm({...reviewForm, rating: Number(e.target.value)})}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', outline: 'none', fontFamily: "'Outfit',sans-serif", color: '#1c1917' }}>
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} {'⭐'.repeat(r)}</option>)}
                </select>
              </div>
              <textarea rows={3} placeholder="Tell others about your experience..." value={reviewForm.text} onChange={e => setReviewForm({...reviewForm, text: e.target.value})}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', outline: 'none', fontFamily: "'Outfit',sans-serif", resize: 'vertical', boxSizing: 'border-box', marginBottom: '12px', color: '#1c1917' }} />
              <button onClick={() => {
                if (!reviewForm.name || !reviewForm.text) return
                setReviews([{ ...reviewForm, date: 'Just now' }, ...reviews])
                setReviewForm({ name: '', rating: 5, text: '' })
                setShowReviewForm(false)
              }} style={{ padding: '10px 24px', borderRadius: '99px', background: `linear-gradient(135deg,${dest.accent},#f59e0b)`, color: '#fff', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>
                Submit Review ✓
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg,${dest.accent},#f59e0b)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.78rem' }}>{r.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: dark ? '#f1f5f9' : '#1c1917' }}>{r.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#78716c' }}>{r.date}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>{'⭐'.repeat(r.rating)}</div>
                </div>
                <p style={{ fontSize: '0.83rem', color: '#78716c', lineHeight: 1.65, margin: 0 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="glass" style={{ padding: '24px', borderRadius: '20px', border: `1.5px solid ${dest.borderColor}`, marginBottom: '48px' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', color: dark ? '#f1f5f9' : '#1c1917', marginBottom: '16px' }}>🗺️ Location Map</h2>
          <div style={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${dest.borderColor}` }}>
            <iframe
              title={`${dest.name} Map`}
              width="100%"
              height="320"
              style={{ border: 'none', display: 'block' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(dest.name + ', Tamil Nadu, India')}&output=embed`}
            />
          </div>
          <div style={{ marginTop: '10px', textAlign: 'right' }}>
            <a href={`https://www.google.com/maps/search/${encodeURIComponent(dest.name + ', Tamil Nadu, India')}`}
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.8rem', color: dest.accent, fontWeight: 600, textDecoration: 'none' }}>
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) { .detail-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 500px) { .review-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
