import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme, useLang } from '../context/AppContext'

const blogs = [
  {
    id: 'top10-temples',
    emoji: '🏛️',
    category: 'Heritage',
    categoryColor: '#d97706',
    title: 'Top 10 Temples You Must Visit in Tamil Nadu',
    excerpt: 'From the soaring gopurams of Meenakshi Amman to the majestic Brihadeeswarar, these temples are architectural masterpieces that will leave you speechless.',
    readTime: '6 min read',
    date: 'June 20, 2025',
    author: 'Ravi Kumar',
    authorEmoji: '✍️',
    tags: ['Temples', 'Heritage', 'Architecture'],
    color: '#d97706',
    bg: 'linear-gradient(135deg,#fef3c7,#fde68a)',
    featured: true,
  },
  {
    id: 'ooty-travel-guide',
    emoji: '🌿',
    category: 'Hill Stations',
    categoryColor: '#16a34a',
    title: 'The Ultimate Ooty Travel Guide 2025',
    excerpt: 'Everything you need to know about visiting the Queen of Hill Stations — best time, top spots, local food, and hidden gems most tourists miss.',
    readTime: '8 min read',
    date: 'June 15, 2025',
    author: 'Priya Nair',
    authorEmoji: '✍️',
    tags: ['Ooty', 'Hills', 'Travel Guide'],
    color: '#16a34a',
    bg: 'linear-gradient(135deg,#dcfce7,#bbf7d0)',
    featured: false,
  },
  {
    id: 'chettinad-food',
    emoji: '🍛',
    category: 'Food & Culture',
    categoryColor: '#e11d48',
    title: 'A Foodie\'s Guide to Chettinad Cuisine',
    excerpt: 'The aromatic spices of Chettinad cooking have conquered the world\'s palates. Here\'s where to eat the most authentic Chettinad meals and what to order.',
    readTime: '5 min read',
    date: 'June 10, 2025',
    author: 'Meena Selvam',
    authorEmoji: '✍️',
    tags: ['Food', 'Chettinad', 'Culture'],
    color: '#e11d48',
    bg: 'linear-gradient(135deg,#ffe4e6,#fecdd3)',
    featured: false,
  },
  {
    id: 'kanyakumari-sunrise',
    emoji: '🌅',
    category: 'Destinations',
    categoryColor: '#0369a1',
    title: 'Watching the Sunrise at Kanyakumari: A Complete Guide',
    excerpt: 'Where three seas meet and the sun rises in a spectacular blaze of gold. Here\'s how to have the perfect Kanyakumari sunrise experience.',
    readTime: '4 min read',
    date: 'June 5, 2025',
    author: 'Arun Sekar',
    authorEmoji: '✍️',
    tags: ['Kanyakumari', 'Sunrise', 'Coastal'],
    color: '#0369a1',
    bg: 'linear-gradient(135deg,#dbeafe,#bae6fd)',
    featured: false,
  },
  {
    id: 'wildlife-mudumalai',
    emoji: '🐘',
    category: 'Wildlife',
    categoryColor: '#b45309',
    title: 'Safari at Mudumalai: What to Expect',
    excerpt: 'Spot wild elephants, leopards, and hundreds of bird species in one of India\'s most biodiverse tiger reserves. Here\'s your complete safari guide.',
    readTime: '7 min read',
    date: 'May 28, 2025',
    author: 'Deepak Raj',
    authorEmoji: '✍️',
    tags: ['Wildlife', 'Safari', 'Nature'],
    color: '#b45309',
    bg: 'linear-gradient(135deg,#fff7ed,#fed7aa)',
    featured: false,
  },
  {
    id: 'pongal-festival',
    emoji: '🎉',
    category: 'Festivals',
    categoryColor: '#7c3aed',
    title: 'Experiencing Pongal: Tamil Nadu\'s Harvest Festival',
    excerpt: 'Pongal is the most important Tamil festival — a four-day celebration of gratitude, joy, and tradition. If you can visit in January, this is unmissable.',
    readTime: '5 min read',
    date: 'May 20, 2025',
    author: 'Kavitha Murali',
    authorEmoji: '✍️',
    tags: ['Pongal', 'Festival', 'Culture'],
    color: '#7c3aed',
    bg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)',
    featured: false,
  },
]

export default function BlogPage() {
  const { dark } = useTheme()
  const { t } = useLang()
  const [activeTag, setActiveTag] = useState('All')
  const allTags = ['All', 'Heritage', 'Hill Stations', 'Food & Culture', 'Destinations', 'Wildlife', 'Festivals']

  const filtered = activeTag === 'All' ? blogs : blogs.filter(b => b.category === activeTag)
  const featured = blogs.find(b => b.featured)
  const rest = filtered.filter(b => !b.featured || activeTag !== 'All')

  return (
    <div style={{ minHeight: '100vh', background: dark ? '#0f1117' : '#f8f6f2', paddingTop: '80px' }}>
      {/* Hero */}
      <div className="bg-grid" style={{ padding: '60px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 350, height: 350, background: 'radial-gradient(circle,rgba(124,58,237,0.18),transparent)', top: '-15%', right: '-3%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '99px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', fontSize: '0.78rem', fontWeight: 600, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            {t('blogTag')}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: dark ? '#f1f5f9' : '#1c1917', marginBottom: '14px' }}>
            {t('blogTitle')}
          </h1>
          <p style={{ color: dark ? '#94a3b8' : '#78716c', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Expert guides, hidden gems, local food, festivals, and everything you need to know before your trip.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px' }}>
          {allTags.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              style={{ padding: '7px 18px', borderRadius: '99px', border: activeTag === tag ? 'none' : `1.5px solid ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`, background: activeTag === tag ? 'linear-gradient(135deg,#7c3aed,#0d9488)' : dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)', color: activeTag === tag ? '#fff' : dark ? '#94a3b8' : '#44403c', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.25s', fontFamily: "'Outfit',sans-serif" }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {activeTag === 'All' && featured && (
          <div className="glass" style={{ borderRadius: '24px', border: `2px solid ${featured.color}25`, background: featured.bg, marginBottom: '32px', overflow: 'hidden', transition: 'transform 0.3s', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            <div style={{ padding: '36px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' }} className="featured-grid">
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', alignItems: 'center' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '99px', background: '#7c3aed', color: '#fff', fontSize: '0.68rem', fontWeight: 700 }}>⭐ FEATURED</span>
                  <span style={{ padding: '3px 10px', borderRadius: '99px', background: `${featured.color}20`, color: featured.color, fontSize: '0.68rem', fontWeight: 700 }}>{featured.category}</span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.3rem,3vw,2rem)', color: '#1c1917', marginBottom: '12px', lineHeight: 1.3 }}>{featured.title}</h2>
                <p style={{ color: '#78716c', lineHeight: 1.75, marginBottom: '18px', fontSize: '0.92rem' }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.78rem', color: '#78716c' }}>
                  <span>{featured.authorEmoji} {featured.author}</span>
                  <span>📅 {featured.date}</span>
                  <span>⏱ {featured.readTime}</span>
                </div>
              </div>
              <div style={{ fontSize: '6rem', opacity: 0.8 }}>{featured.emoji}</div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '22px' }}>
          {rest.map(blog => (
            <div key={blog.id} className="glass"
              style={{ borderRadius: '22px', border: `1.5px solid ${blog.color}20`, overflow: 'hidden', transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              {/* Header */}
              <div style={{ background: blog.bg, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ padding: '3px 10px', borderRadius: '99px', background: `${blog.color}25`, color: blog.color, fontSize: '0.7rem', fontWeight: 700 }}>{blog.category}</span>
                <div style={{ fontSize: '2.5rem' }}>{blog.emoji}</div>
              </div>
              {/* Body */}
              <div style={{ padding: '20px 22px 22px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: dark ? '#f1f5f9' : '#1c1917', marginBottom: '8px', lineHeight: 1.4 }}>{blog.title}</h3>
                <p style={{ fontSize: '0.83rem', color: dark ? '#94a3b8' : '#78716c', lineHeight: 1.65, marginBottom: '14px' }}>{blog.excerpt.slice(0, 100)}...</p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  {blog.tags.map(tag => (
                    <span key={tag} style={{ padding: '2px 8px', borderRadius: '6px', background: `${blog.color}12`, color: blog.color, fontSize: '0.68rem', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: dark ? '#64748b' : '#78716c', borderTop: `1px solid ${blog.color}15`, paddingTop: '12px' }}>
                  <span>{blog.authorEmoji} {blog.author} · {blog.readTime}</span>
                  <span style={{ color: blog.color, fontWeight: 700 }}>Read →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <div className="glass" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', padding: '44px 52px', borderRadius: '28px', border: '1.5px solid rgba(255,255,255,0.8)', maxWidth: '520px', width: '100%' }}>
            <div style={{ fontSize: '3rem', marginBottom: '14px' }}>📬</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', color: dark ? '#f1f5f9' : '#1c1917', marginBottom: '10px' }}>{t('blogNewsletter')}</h3>
            <p style={{ color: dark ? '#94a3b8' : '#78716c', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '20px' }}>New articles, travel tips and exclusive offers — every week.</p>
            <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '380px' }}>
              <input type="email" placeholder="your@email.com"
                style={{ flex: 1, padding: '11px 16px', borderRadius: '99px', border: '1.5px solid rgba(0,0,0,0.1)', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.9)', color: dark ? '#f1f5f9' : '#1c1917', fontSize: '0.88rem', outline: 'none', fontFamily: "'Outfit',sans-serif" }}
              />
              <button className="btn-primary" style={{ padding: '11px 20px', borderRadius: '99px', color: '#fff', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", whiteSpace: 'nowrap' }}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:600px){.featured-grid{grid-template-columns:1fr !important;} .featured-grid > div:last-child{display:none;}}`}</style>
    </div>
  )
}
