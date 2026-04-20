import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      // ZERO DELAY - direct instant update
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`
        cursorRef.current.style.opacity = '1'
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
        dotRef.current.style.opacity = '0.6'
      }
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
      if (dotRef.current) dotRef.current.style.opacity = '0.6'
    }

    // Passive listener = NO delay, NO blocking
    window.addEventListener('mousemove', handleMouseMove, { passive: true, capture: false })
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
        * { 
          cursor: none !important; 
        }
        
        [data-chatbot-wrapper],
        [data-chatbot-wrapper] *,
        [data-chatbot-window],
        [data-chatbot-window] * { 
          cursor: auto !important; 
        }
        
        input, textarea, button, a, [role="button"] { 
          cursor: auto !important; 
        }
      `}</style>

      {/* Cursor Ring - INSTANT, NO TRANSITIONS */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '30px',
          height: '30px',
          border: '2px solid #00d9ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99997,
          boxShadow: '0 0 15px rgba(0, 217, 255, 0.5)',
          opacity: 0,
          willChange: 'transform',
          WebkitWillChange: 'transform'
        }}
      />

      {/* Cursor Dot - INSTANT, NO TRANSITIONS */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          background: '#00d9ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          boxShadow: '0 0 8px rgba(0, 217, 255, 0.8)',
          opacity: 0,
          willChange: 'transform',
          WebkitWillChange: 'transform'
        }}
      />
    </>
  )
}
