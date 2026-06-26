import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const ADMIN_PASSWORD = 'admin@tnt2025'
const STATUS_OPTIONS = ['New', 'Contacted', 'Closed']
const STATUS_COLORS = { New: '#e11d48', Contacted: '#d97706', Closed: '#16a34a' }
const STATUS_BG = { New: 'rgba(225,29,72,0.1)', Contacted: 'rgba(217,119,6,0.1)', Closed: 'rgba(22,163,74,0.1)' }

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('tnt_admin') === 'true')
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState(false)

  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterDest, setFilterDest] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [selected, setSelected] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [notification, setNotification] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState(null)
  const [activeTab, setActiveTab] = useState('enquiries') // 'enquiries' | 'charts'
  const [notes, setNotes] = useState(() => { try { return JSON.parse(localStorage.getItem('tnt_notes') || '{}') } catch { return {} } })
  const [noteInput, setNoteInput] = useState('')
  const prevCountRef = useRef(0)

  const login = () => {
    if (pwInput === ADMIN_PASSWORD) {
      sessionStorage.setItem('tnt_admin', 'true')
      setAuthed(true)
    } else {
      setPwError(true)
      setTimeout(() => setPwError(false), 2000)
    }
  }
  const logout = () => { sessionStorage.removeItem('tnt_admin'); setAuthed(false) }

  const showNotif = (msg, type = 'success') => {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 3500)
  }

  const fetchEnquiries = async (silent = false) => {
    if (!silent) setLoading(true)
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) {
      // Real-time new enquiry detection
      if (prevCountRef.current > 0 && data.length > prevCountRef.current) {
        const newCount = data.length - prevCountRef.current
        showNotif(`🔔 ${newCount} new enquir${newCount > 1 ? 'ies' : 'y'} received!`, 'new')
      }
      prevCountRef.current = data.length
      setEnquiries(data)
    }
    if (!silent) setLoading(false)
  }

  // Real-time polling every 30s
  useEffect(() => {
    if (!authed) return
    fetchEnquiries()
    const interval = setInterval(() => fetchEnquiries(true), 30000)
    return () => clearInterval(interval)
  }, [authed])

  const updateStatus = async (id, status) => {
    setUpdatingStatus(id)
    const { error } = await supabase.from('enquiries').update({ status }).eq('id', id)
    if (!error) {
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e))
      if (selected?.id === id) setSelected(prev => ({ ...prev, status }))
      showNotif(`✅ Status updated to "${status}"`)
    }
    setUpdatingStatus(null)
  }

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return
    setDeleting(id)
    const { error } = await supabase.from('enquiries').delete().eq('id', id)
    if (!error) {
      setEnquiries(prev => prev.filter(e => e.id !== id))
      if (selected?.id === id) setSelected(null)
      showNotif('🗑️ Enquiry deleted successfully')
    }
    setDeleting(null)
  }

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Destination', 'Travellers', 'Dates', 'Status', 'Message', 'Received At']
    const rows = filtered.map(e => [
      e.name, e.email, e.phone || '', e.destination || '', e.people || '',
      e.dates || '', e.status || 'New', (e.message || '').replace(/,/g, ';'),
      new Date(e.created_at).toLocaleString('en-IN'),
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tnt-enquiries-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showNotif('📥 CSV exported successfully!')
  }

  const destinations = ['All', ...new Set(enquiries.map(e => e.destination).filter(Boolean))]

  const filtered = enquiries.filter(e => {
    const matchSearch = [e.name, e.email, e.phone, e.message].join(' ').toLowerCase().includes(search.toLowerCase())
    const matchDest = filterDest === 'All' || e.destination === filterDest
    const matchStatus = filterStatus === 'All' || (e.status || 'New') === filterStatus
    return matchSearch && matchDest && matchStatus
  })

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => !e.status || e.status === 'New').length,
    contacted: enquiries.filter(e => e.status === 'Contacted').length,
    closed: enquiries.filter(e => e.status === 'Closed').length,
    today: enquiries.filter(e => new Date(e.created_at).toDateString() === new Date().toDateString()).length,
    topDest: (() => {
      const counts = {}
      enquiries.forEach(e => { if (e.destination) counts[e.destination] = (counts[e.destination] || 0) + 1 })
      return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
    })(),
  }

  // ── Login ──
  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f6f2' }}>
      <div className="glass-strong" style={{ padding: '52px 44px', borderRadius: '28px', border: '1.5px solid rgba(255,255,255,0.9)', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
        <div style={{ width: 64, height: 64, borderRadius: '18px', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 20px' }}>🔐</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: '#1c1917', marginBottom: '6px' }}>Admin Login</h2>
        <p style={{ color: '#78716c', fontSize: '0.85rem', marginBottom: '28px' }}>Tamil Nadu Tourism Dashboard</p>
        <input type="password" placeholder="Enter admin password" value={pwInput}
          onChange={e => setPwInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width: '100%', padding: '13px 18px', borderRadius: '12px', boxSizing: 'border-box', border: pwError ? '1.5px solid #e11d48' : '1.5px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', color: '#1c1917', outline: 'none', fontFamily: "'Outfit',sans-serif", marginBottom: '8px' }}
        />
        {pwError && <p style={{ color: '#e11d48', fontSize: '0.78rem', marginBottom: '8px', textAlign: 'left' }}>❌ Incorrect password</p>}
        <button onClick={login} className="btn-primary" style={{ width: '100%', padding: '13px', borderRadius: '12px', color: '#fff', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", marginTop: '8px' }}>
          Login →
        </button>
        <Link to="/" style={{ display: 'block', marginTop: '16px', fontSize: '0.82rem', color: '#78716c', textDecoration: 'none' }}>← Back to website</Link>
      </div>
    </div>
  )

  // ── Dashboard ──
  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f4' }}>
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 999,
          padding: '14px 20px', borderRadius: '14px',
          background: notification.type === 'new' ? '#1c1917' : '#fff',
          color: notification.type === 'new' ? '#fff' : '#1c1917',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          border: '1px solid rgba(255,255,255,0.2)',
          fontWeight: 600, fontSize: '0.88rem',
          animation: 'fadeInUp 0.3s ease',
          maxWidth: '320px',
        }}>{notification.msg}</div>
      )}

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 38, height: 38, borderRadius: '10px', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🏛️</div>
          <div>
            <div style={{ fontWeight: 700, color: '#1c1917', fontSize: '0.95rem' }}>Admin Dashboard</div>
            <div style={{ fontSize: '0.7rem', color: '#78716c' }}>Tamil Nadu Tourism · Auto-refresh every 30s</div>
          </div>
          {stats.new > 0 && (
            <div style={{ padding: '3px 10px', borderRadius: '99px', background: '#e11d48', color: '#fff', fontSize: '0.72rem', fontWeight: 700 }}>
              {stats.new} New
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => fetchEnquiries()} style={{ padding: '7px 14px', borderRadius: '99px', background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)', color: '#0d9488', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>🔄 Refresh</button>
          <button onClick={exportCSV} style={{ padding: '7px 14px', borderRadius: '99px', background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.25)', color: '#16a34a', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>📥 Export CSV</button>
          <Link to="/" style={{ padding: '7px 14px', borderRadius: '99px', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)', color: '#44403c', fontWeight: 600, fontSize: '0.78rem', textDecoration: 'none' }}>🌐 View Site</Link>
          <button onClick={logout} style={{ padding: '7px 14px', borderRadius: '99px', background: 'rgba(225,29,72,0.08)', border: '1px solid rgba(225,29,72,0.2)', color: '#e11d48', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>🔓 Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px 60px' }}>
        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {[['enquiries','📋 Enquiries'],['charts','📊 Charts & Analytics']].map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: '9px 20px', borderRadius: '99px', border: 'none', background: activeTab === tab ? 'linear-gradient(135deg,#0d9488,#f59e0b)' : '#fff', color: activeTab === tab ? '#fff' : '#44403c', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", boxShadow: activeTab === tab ? '0 4px 14px rgba(13,148,136,0.3)' : '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.25s' }}>
              {label}
            </button>
          ))}
        </div>

        {/* ── CHARTS TAB ── */}
        {activeTab === 'charts' && (() => {
          // Destination distribution
          const destCounts = {}
          enquiries.forEach(e => { if (e.destination) destCounts[e.destination] = (destCounts[e.destination] || 0) + 1 })
          const destEntries = Object.entries(destCounts).sort((a,b) => b[1]-a[1]).slice(0,7)
          const maxDest = destEntries[0]?.[1] || 1

          // Status distribution
          const statusCounts = { New: 0, Contacted: 0, Closed: 0 }
          enquiries.forEach(e => { statusCounts[e.status || 'New']++ })

          // Last 7 days trend
          const last7 = Array.from({length:7}, (_,i) => {
            const d = new Date(); d.setDate(d.getDate() - (6-i))
            const label = d.toLocaleDateString('en-IN', {weekday:'short'})
            const count = enquiries.filter(e => new Date(e.created_at).toDateString() === d.toDateString()).length
            return { label, count }
          })
          const maxDay = Math.max(...last7.map(d => d.count), 1)

          return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="charts-grid">
              {/* Daily trend */}
              <div style={{ background: '#fff', borderRadius: '18px', padding: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontWeight: 700, color: '#1c1917', fontSize: '0.95rem', marginBottom: '20px' }}>📈 Last 7 Days</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '140px' }}>
                  {last7.map((d,i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0d9488' }}>{d.count > 0 ? d.count : ''}</div>
                      <div style={{ width: '100%', borderRadius: '6px 6px 0 0', background: d.count > 0 ? 'linear-gradient(180deg,#0d9488,#14b8a6)' : 'rgba(0,0,0,0.06)', height: `${Math.max((d.count/maxDay)*100, 6)}%`, transition: 'height 0.6s ease', minHeight: '6px' }} />
                      <div style={{ fontSize: '0.68rem', color: '#78716c', fontWeight: 500 }}>{d.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status pie-like */}
              <div style={{ background: '#fff', borderRadius: '18px', padding: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontWeight: 700, color: '#1c1917', fontSize: '0.95rem', marginBottom: '20px' }}>🎯 Status Breakdown</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <div key={status}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: STATUS_COLORS[status] }}>{status}</span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1c1917' }}>{count} ({stats.total > 0 ? Math.round(count/stats.total*100) : 0}%)</span>
                      </div>
                      <div style={{ height: 10, borderRadius: '99px', background: '#f1f5f4', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: '99px', background: STATUS_COLORS[status], width: `${stats.total > 0 ? (count/stats.total)*100 : 0}%`, transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top destinations bar chart */}
              <div style={{ background: '#fff', borderRadius: '18px', padding: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', gridColumn: 'span 2' }} className="dest-chart">
                <h3 style={{ fontWeight: 700, color: '#1c1917', fontSize: '0.95rem', marginBottom: '20px' }}>🏆 Top Destinations by Enquiries</h3>
                {destEntries.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#78716c' }}>No destination data yet</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {destEntries.map(([dest, count], i) => (
                      <div key={dest}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1c1917' }}>#{i+1} {dest}</span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0d9488' }}>{count} enquir{count>1?'ies':'y'}</span>
                        </div>
                        <div style={{ height: 10, borderRadius: '99px', background: '#f1f5f4', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: '99px', background: `linear-gradient(90deg,#0d9488,#f59e0b)`, width: `${(count/maxDest)*100}%`, transition: 'width 0.8s ease' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })()}

        {/* ── ENQUIRIES TAB ── */}
        {activeTab === 'enquiries' && <>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '14px', marginBottom: '22px' }}>
          {[
            { icon: '📋', label: 'Total', val: stats.total, color: '#0d9488', bg: 'rgba(13,148,136,0.1)' },
            { icon: '🔴', label: 'New', val: stats.new, color: '#e11d48', bg: 'rgba(225,29,72,0.08)' },
            { icon: '🟡', label: 'Contacted', val: stats.contacted, color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
            { icon: '🟢', label: 'Closed', val: stats.closed, color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
            { icon: '📅', label: 'Today', val: stats.today, color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
            { icon: '🏆', label: 'Top Dest.', val: stats.topDest, color: '#b45309', bg: 'rgba(180,83,9,0.1)', small: true },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '16px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', marginBottom: '10px' }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: s.small ? '1rem' : '1.8rem', color: s.color, marginBottom: '2px' }}>{s.val}</div>
              <div style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center', background: '#fff', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem' }}>🔍</span>
            <input type="text" placeholder="Search name, email, message..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 10px 8px 32px', borderRadius: '99px', border: '1.5px solid rgba(0,0,0,0.1)', background: '#f8f6f2', fontSize: '0.83rem', color: '#1c1917', outline: 'none', fontFamily: "'Outfit',sans-serif", boxSizing: 'border-box' }}
            />
          </div>
          <select value={filterDest} onChange={e => setFilterDest(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: '99px', border: '1.5px solid rgba(0,0,0,0.1)', background: '#f8f6f2', fontSize: '0.83rem', color: '#1c1917', outline: 'none', fontFamily: "'Outfit',sans-serif" }}>
            {destinations.map(d => <option key={d} value={d}>{d === 'All' ? '🗺️ All Destinations' : d}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: '99px', border: '1.5px solid rgba(0,0,0,0.1)', background: '#f8f6f2', fontSize: '0.83rem', color: '#1c1917', outline: 'none', fontFamily: "'Outfit',sans-serif" }}>
            <option value="All">🔵 All Status</option>
            <option value="New">🔴 New</option>
            <option value="Contacted">🟡 Contacted</option>
            <option value="Closed">🟢 Closed</option>
          </select>
          <span style={{ fontSize: '0.78rem', color: '#78716c', whiteSpace: 'nowrap' }}>
            <strong style={{ color: '#0d9488' }}>{filtered.length}</strong> / {enquiries.length}
          </span>
        </div>

        {/* Table + Detail */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '18px' }}>
          {/* Table */}
          <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 700, color: '#1c1917', fontSize: '0.95rem' }}>📋 Enquiries</h3>
              {loading && <span style={{ fontSize: '0.75rem', color: '#0d9488' }}>⏳ Loading...</span>}
            </div>

            {loading ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
                <p style={{ color: '#78716c' }}>Loading enquiries from Supabase...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📭</div>
                <p style={{ color: '#78716c', fontWeight: 500 }}>No enquiries found.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
                  <thead>
                    <tr style={{ background: '#f8f6f2' }}>
                      {['#', 'Name', 'Email', 'Destination', 'Status', 'Travellers', 'Received', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontWeight: 700, color: '#44403c', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((enq, i) => {
                      const status = enq.status || 'New'
                      return (
                        <tr key={enq.id} onClick={() => setSelected(selected?.id === enq.id ? null : enq)}
                          style={{ borderTop: '1px solid rgba(0,0,0,0.04)', cursor: 'pointer', background: selected?.id === enq.id ? 'rgba(13,148,136,0.05)' : i % 2 === 0 ? '#fff' : '#fafaf9', transition: 'background 0.15s' }}
                          onMouseEnter={e => { if (selected?.id !== enq.id) e.currentTarget.style.background = '#f0fdf9' }}
                          onMouseLeave={e => { if (selected?.id !== enq.id) e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafaf9' }}
                        >
                          <td style={{ padding: '10px 14px', color: '#78716c', fontWeight: 600, fontSize: '0.75rem' }}>{filtered.length - i}</td>
                          <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1c1917', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0 }}>
                                {enq.name?.charAt(0).toUpperCase()}
                              </div>
                              {enq.name}
                            </div>
                          </td>
                          <td style={{ padding: '10px 14px', color: '#0369a1' }}>{enq.email}</td>
                          <td style={{ padding: '10px 14px' }}>
                            {enq.destination
                              ? <span style={{ padding: '2px 8px', borderRadius: '99px', background: 'rgba(13,148,136,0.1)', color: '#0d9488', fontWeight: 600, fontSize: '0.72rem' }}>{enq.destination}</span>
                              : <span style={{ color: '#d6d3d1' }}>—</span>}
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <select
                              value={status}
                              onClick={e => e.stopPropagation()}
                              onChange={e => { e.stopPropagation(); updateStatus(enq.id, e.target.value) }}
                              disabled={updatingStatus === enq.id}
                              style={{ padding: '3px 8px', borderRadius: '8px', border: 'none', background: STATUS_BG[status], color: STATUS_COLORS[status], fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", outline: 'none' }}
                            >
                              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                          <td style={{ padding: '10px 14px', color: '#78716c' }}>{enq.people || '—'}</td>
                          <td style={{ padding: '10px 14px', color: '#78716c', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>
                            {new Date(enq.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                            <br />
                            <span style={{ color: '#a8a29e' }}>{new Date(enq.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <button onClick={e => { e.stopPropagation(); setSelected(selected?.id === enq.id ? null : enq) }}
                                style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(13,148,136,0.1)', border: 'none', color: '#0d9488', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>👁</button>
                              <button onClick={e => { e.stopPropagation(); deleteEnquiry(enq.id) }} disabled={deleting === enq.id}
                                style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(225,29,72,0.08)', border: 'none', color: '#e11d48', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif", opacity: deleting === enq.id ? 0.6 : 1 }}>
                                {deleting === enq.id ? '...' : '🗑'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', alignSelf: 'start', position: 'sticky', top: '80px' }}>
              <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg,rgba(13,148,136,0.07),rgba(245,158,11,0.04))' }}>
                <h3 style={{ fontWeight: 700, color: '#1c1917', fontSize: '0.9rem' }}>📄 Enquiry Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#78716c' }}>✕</button>
              </div>
              <div style={{ padding: '18px' }}>
                {/* Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', padding: '12px', borderRadius: '12px', background: 'rgba(13,148,136,0.05)' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>
                    {selected.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1c1917' }}>{selected.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#78716c' }}>{new Date(selected.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                </div>

                {/* Status Changer */}
                <div style={{ marginBottom: '14px', padding: '12px', borderRadius: '12px', background: '#f8f6f2' }}>
                  <div style={{ fontSize: '0.68rem', color: '#78716c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Update Status</div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {STATUS_OPTIONS.map(s => (
                      <button key={s} onClick={() => updateStatus(selected.id, s)}
                        style={{ flex: 1, padding: '6px 4px', borderRadius: '8px', border: (selected.status || 'New') === s ? 'none' : '1.5px solid rgba(0,0,0,0.1)', background: (selected.status || 'New') === s ? STATUS_COLORS[s] : '#fff', color: (selected.status || 'New') === s ? '#fff' : STATUS_COLORS[s], fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", transition: 'all 0.2s' }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                {[
                  { icon: '📧', label: 'Email', val: selected.email },
                  { icon: '📞', label: 'Phone', val: selected.phone || 'Not provided' },
                  { icon: '🗺️', label: 'Destination', val: selected.destination || 'Not specified' },
                  { icon: '👥', label: 'Travellers', val: selected.people || 'Not specified' },
                  { icon: '📅', label: 'Travel Dates', val: selected.dates || 'Not specified' },
                ].map(d => (
                  <div key={d.label} style={{ display: 'flex', gap: '8px', marginBottom: '10px', padding: '9px 12px', borderRadius: '10px', background: '#f8f6f2' }}>
                    <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{d.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.62rem', color: '#78716c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.label}</div>
                      <div style={{ fontSize: '0.82rem', color: '#1c1917', fontWeight: 500, marginTop: '1px' }}>{d.val}</div>
                    </div>
                  </div>
                ))}

                {selected.message && (
                  <div style={{ padding: '12px', borderRadius: '10px', background: '#f0fdf9', border: '1px solid rgba(13,148,136,0.2)', marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.62rem', color: '#0d9488', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>💬 Message</div>
                    <p style={{ fontSize: '0.82rem', color: '#44403c', lineHeight: 1.65, margin: 0 }}>{selected.message}</p>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <a href={`mailto:${selected.email}?subject=Your Tamil Nadu Travel Enquiry&body=Dear ${selected.name},%0A%0AThank you for your enquiry about ${selected.destination || 'Tamil Nadu'}!`}
                    style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '10px', borderRadius: '10px', background: 'linear-gradient(135deg,#0d9488,#f59e0b)', color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>
                    📧 Reply via Email
                  </a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`}
                      style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '10px', borderRadius: '10px', background: 'rgba(22,163,74,0.1)', color: '#16a34a', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(22,163,74,0.25)' }}>
                      📞 Call {selected.phone}
                    </a>
                  )}
                  {selected.phone && (
                    <a href={`https://wa.me/${selected.phone.replace(/[^0-9]/g,'')}?text=${encodeURIComponent(`Hi ${selected.name}! Thank you for your enquiry about Tamil Nadu tourism.`)}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '10px', borderRadius: '10px', background: 'rgba(37,211,102,0.1)', color: '#16a34a', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(37,211,102,0.3)' }}>
                      💬 WhatsApp
                    </a>
                  )}
                  <button onClick={() => deleteEnquiry(selected.id)}
                    style={{ padding: '9px', borderRadius: '10px', background: 'rgba(225,29,72,0.06)', color: '#e11d48', fontWeight: 600, fontSize: '0.82rem', border: '1px solid rgba(225,29,72,0.15)', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>
                    🗑 Delete Enquiry
                  </button>
                  {/* Notes Section */}
                  <div style={{ marginTop: '10px', padding: '14px', borderRadius: '12px', background: '#fffbeb', border: '1px solid rgba(245,158,11,0.25)' }}>
                    <div style={{ fontSize: '0.68rem', color: '#d97706', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>📝 Private Notes</div>
                    {notes[selected.id] && (
                      <p style={{ fontSize: '0.8rem', color: '#44403c', lineHeight: 1.6, marginBottom: '8px', padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.7)' }}>{notes[selected.id]}</p>
                    )}
                    <textarea rows={2} placeholder="Add private note..." value={noteInput}
                      onChange={e => setNoteInput(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(255,255,255,0.9)', fontSize: '0.78rem', outline: 'none', fontFamily: "'Outfit',sans-serif", resize: 'none', boxSizing: 'border-box', marginBottom: '6px', color: '#1c1917' }}
                    />
                    <button onClick={() => {
                      const updated = { ...notes, [selected.id]: noteInput }
                      setNotes(updated)
                      localStorage.setItem('tnt_notes', JSON.stringify(updated))
                      setNoteInput('')
                      showNotif('📝 Note saved!')
                    }} style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)', color: '#d97706', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </>}
      </div>
      <style>{`
        @media(max-width:700px){.charts-grid{grid-template-columns:1fr !important;} .dest-chart{grid-column:span 1 !important;}}
      `}</style>
    </div>
  )
}
