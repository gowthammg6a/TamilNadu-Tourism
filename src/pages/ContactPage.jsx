import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useLang } from '../context/AppContext'

const faqs = [
  { q: 'What is the best time to visit Tamil Nadu?', a: 'October to March is ideal for most destinations. Ooty and Kodaikanal are best in April–June. Avoid heavy monsoon months (July–September) for outdoor sightseeing.' },
  { q: 'How do I get around Tamil Nadu?', a: 'Tamil Nadu has excellent road, rail, and air connectivity. Chennai is the main hub. Local buses, taxis, and auto-rickshaws are available everywhere. Renting a cab is the most comfortable option.' },
  { q: 'Is Tamil Nadu safe for solo travellers?', a: 'Yes! Tamil Nadu is considered one of the safer states in India for solo travellers, including women. People are generally helpful and friendly to tourists.' },
  { q: 'What language do people speak?', a: 'Tamil is the primary language. English is widely understood in tourist areas, hotels, and restaurants. Hindi is less common compared to other states.' },
]

export default function ContactPage() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', dates: '', people: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: dbError } = await supabase
      .from('enquiries')
      .insert([{
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        destination: form.destination || null,
        people: form.people || null,
        dates: form.dates || null,
        message: form.message || null,
      }])

    setLoading(false)

    if (dbError) {
      setError('Something went wrong. Please try again. (' + dbError.message + ')')
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f6f2', padding: '80px 24px' }}>
      <div className="glass-strong" style={{ padding: '56px 48px', borderRadius: '28px', border: '1.5px solid rgba(255,255,255,0.9)', textAlign: 'center', maxWidth: '480px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: '#1c1917', marginBottom: '12px' }}>Thank You, {form.name}!</h2>
        <p style={{ color: '#78716c', lineHeight: 1.75, marginBottom: '28px' }}>
          Your travel enquiry has been saved! Our team will contact you within 24 hours to craft your perfect Tamil Nadu itinerary.
        </p>
        <div style={{ padding: '12px 20px', borderRadius: '14px', background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)', color: '#0d9488', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
          ✅ Enquiry saved to database successfully!
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 28px', borderRadius: '99px', color: '#fff', fontWeight: 700 }}>Back to Home</Link>
          <Link to="/destinations" style={{ textDecoration: 'none', padding: '12px 28px', borderRadius: '99px', color: '#0d9488', fontWeight: 600, background: 'rgba(13,148,136,0.08)', border: '1.5px solid rgba(13,148,136,0.3)' }}>Browse Destinations</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2', paddingTop: '80px' }}>
      {/* Hero */}
      <div className="bg-grid" style={{ padding: '60px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 320, height: 320, background: 'radial-gradient(circle,rgba(245,158,11,0.2),transparent)', top: '-15%', right: '-3%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '99px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', fontSize: '0.78rem', fontWeight: 600, color: '#d97706', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('contactPageTag')}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#1c1917', marginBottom: '14px' }}>{t('contactPageTitle')}</h1>
          <p style={{ color: '#78716c', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Tell us your dream Tamil Nadu itinerary and we'll make it happen.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '36px', alignItems: 'start' }} className="contact-grid">

          {/* Form */}
          <div className="glass" style={{ padding: '36px', borderRadius: '24px', border: '1.5px solid rgba(255,255,255,0.85)' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', color: '#1c1917', marginBottom: '8px' }}>{t('contactForm')}</h2>
            <p style={{ color: '#78716c', fontSize: '0.85rem', marginBottom: '24px' }}>Fill in the form — your enquiry will be saved and our team will contact you.</p>

            {error && (
              <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(225,29,72,0.08)', border: '1px solid rgba(225,29,72,0.25)', color: '#e11d48', fontSize: '0.83rem', marginBottom: '16px' }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Your full name', required: true },
                { label: 'Email Address *', key: 'email', type: 'email', placeholder: 'your@email.com', required: true },
                { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 99999 99999', required: false },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#44403c', marginBottom: '6px' }}>{field.label}</label>
                  <input
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', color: '#1c1917', outline: 'none', fontFamily: "'Outfit',sans-serif", boxSizing: 'border-box', transition: 'border 0.2s' }}
                    onFocus={e => e.target.style.border = '1.5px solid #0d9488'}
                    onBlur={e => e.target.style.border = '1.5px solid rgba(0,0,0,0.1)'}
                  />
                </div>
              ))}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#44403c', marginBottom: '6px' }}>Preferred Destination</label>
                  <select value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', color: '#1c1917', outline: 'none', fontFamily: "'Outfit',sans-serif", boxSizing: 'border-box' }}>
                    <option value="">Select...</option>
                    {['Ooty', 'Thanjavur', 'Mahabalipuram', 'Rameshwaram', 'Kanyakumari', 'Madurai', 'Kodaikanal', 'Mudumalai', 'Yelagiri', 'Full Tour'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#44403c', marginBottom: '6px' }}>No. of Travellers</label>
                  <select value={form.people} onChange={e => setForm({ ...form, people: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', color: '#1c1917', outline: 'none', fontFamily: "'Outfit',sans-serif", boxSizing: 'border-box' }}>
                    <option value="">Select...</option>
                    {['Solo (1)', 'Couple (2)', 'Small Group (3-5)', 'Family (6-10)', 'Large Group (10+)'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#44403c', marginBottom: '6px' }}>Travel Dates</label>
                <input type="text" placeholder="e.g. Jan 15 – Jan 22, 2025" value={form.dates} onChange={e => setForm({ ...form, dates: e.target.value })}
                  style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', color: '#1c1917', outline: 'none', fontFamily: "'Outfit',sans-serif", boxSizing: 'border-box', transition: 'border 0.2s' }}
                  onFocus={e => e.target.style.border = '1.5px solid #0d9488'}
                  onBlur={e => e.target.style.border = '1.5px solid rgba(0,0,0,0.1)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#44403c', marginBottom: '6px' }}>Your Message</label>
                <textarea rows={4} placeholder="Tell us about your travel preferences, budget, special requirements..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', color: '#1c1917', outline: 'none', fontFamily: "'Outfit',sans-serif", resize: 'vertical', boxSizing: 'border-box', transition: 'border 0.2s' }}
                  onFocus={e => e.target.style.border = '1.5px solid #0d9488'}
                  onBlur={e => e.target.style.border = '1.5px solid rgba(0,0,0,0.1)'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ padding: '14px', borderRadius: '12px', color: '#fff', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Outfit',sans-serif", marginTop: '4px', opacity: loading ? 0.75 : 1 }}
              >
                {loading ? '⏳ Sending...' : 'Send Enquiry ✈️'}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Contact Info */}
            <div className="glass" style={{ padding: '24px', borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.85)' }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', color: '#1c1917', marginBottom: '18px' }}>Contact Information</h3>
              {[
                { icon: '📍', label: 'Address', val: 'Tamil Nadu Tourism Corporation\nChennai – 600 002, Tamil Nadu, India' },
                { icon: '📞', label: 'Phone', val: '+91 98765 43210' },
                { icon: '📧', label: 'Email', val: 'info@tamilnadutourism.org' },
                { icon: '🕐', label: 'Hours', val: 'Mon–Sat: 9:00 AM – 6:00 PM' },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(13,148,136,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#78716c', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{c.label}</div>
                    <div style={{ fontSize: '0.83rem', color: '#1c1917', fontWeight: 500, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="glass" style={{ padding: '24px', borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.85)' }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', color: '#1c1917', marginBottom: '16px' }}>{t('faqTitle')}</h3>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '8px', padding: 0 }}>
                    <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#1c1917', lineHeight: 1.4 }}>{faq.q}</span>
                    <span style={{ color: '#0d9488', fontSize: '1.2rem', flexShrink: 0, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
                  </button>
                  {openFaq === i && (
                    <p style={{ fontSize: '0.82rem', color: '#78716c', lineHeight: 1.65, marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.04)' }}>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="glass" style={{ padding: '20px', borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.85)' }}>
              <h4 style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1c1917', marginBottom: '12px' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: '🗺️ Browse All Destinations', to: '/destinations' },
                  { label: '🎯 View Experiences', to: '/experiences' },
                  { label: '📸 Photo Gallery', to: '/gallery' },
                  { label: '🌏 About Tamil Nadu', to: '/about' },
                ].map(l => (
                  <Link key={l.to} to={l.to} style={{ textDecoration: 'none', padding: '9px 14px', borderRadius: '10px', background: 'rgba(13,148,136,0.07)', color: '#0d9488', fontSize: '0.83rem', fontWeight: 600, transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,148,136,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,148,136,0.07)'}
                  >{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:860px){.contact-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}
