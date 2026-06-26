import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef(null)
  const isHover = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const onEnter = () => {
      isHover.current = true
      dot.style.transform = 'translate(-50%,-50%) scale(1.8)'
      dot.style.background = 'rgba(13,148,136,0.9)'
      ringEl.style.width = '48px'
      ringEl.style.height = '48px'
      ringEl.style.borderColor = 'rgba(13,148,136,0.6)'
    }
    const onLeave = () => {
      isHover.current = false
      dot.style.transform = 'translate(-50%,-50%) scale(1)'
      dot.style.background = 'rgba(255,255,255,0.92)'
      ringEl.style.width = '32px'
      ringEl.style.height = '32px'
      ringEl.style.borderColor = 'rgba(255,255,255,0.5)'
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top = ring.current.y + 'px'
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,[role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a,button,[role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div ref={dotRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 99999,
        width: 8, height: 8, borderRadius: '50%',
        background: 'rgba(255,255,255,0.92)',
        transform: 'translate(-50%,-50%)',
        transition: 'transform 0.15s ease, background 0.2s ease',
        mixBlendMode: 'difference',
        boxShadow: '0 0 8px rgba(255,255,255,0.5)',
        left: -20, top: -20,
      }} />
      {/* Outer ring */}
      <div ref={ringRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 99998,
        width: 32, height: 32, borderRadius: '50%',
        border: '1.5px solid rgba(255,255,255,0.5)',
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
        backdropFilter: 'invert(8%)',
        left: -20, top: -20,
      }} />
      <style>{`* { cursor: none !important; }`}</style>
    </>
  )
}
