import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
        cursorRef.current.style.opacity = '1'
      }
      if (dotRef.current) {
        dotRef.current.style.left = (e.clientX - 3) + 'px'
        dotRef.current.style.top = (e.clientY - 3) + 'px'
        dotRef.current.style.opacity = '0.5'
      }
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
      if (dotRef.current) dotRef.current.style.opacity = '0.5'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        [data-chatbot-wrapper], [data-chatbot-wrapper] *, [data-chatbot-window], [data-chatbot-window] * { cursor: auto !important; }
        input, textarea, button, a { cursor: auto !important; }
      `}</style>

      <div ref={dotRef} style={{ position: 'fixed', width: '6px', height: '6px', background: '#00d9ff', borderRadius: '50%', pointerEvents: 'none', zIndex: 99998, boxShadow: '0 0 10px rgba(0, 217, 255, 0.6)', transition: 'opacity 0.3s', opacity: 0 }} />
      
      <div ref={cursorRef} style={{ position: 'fixed', width: '30px', height: '30px', border: '2px solid #00d9ff', borderRadius: '50%', pointerEvents: 'none', zIndex: 99997, marginLeft: '-15px', marginTop: '-15px', boxShadow: '0 0 15px rgba(0, 217, 255, 0.4)', transition: 'opacity 0.3s', opacity: 0 }} />
    </>
  )
}
