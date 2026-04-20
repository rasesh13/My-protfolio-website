import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        [data-chatbot-wrapper], [data-chatbot-wrapper] *, [data-chatbot-window], [data-chatbot-window] * { cursor: auto !important; }
        input, textarea, button, a, [role="button"] { cursor: auto !important; }
      `}</style>

      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          border: '2px solid white',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          marginLeft: '-10px',
          marginTop: '-10px',
          opacity: 0.8
        }}
      />
    </>
  )
}
