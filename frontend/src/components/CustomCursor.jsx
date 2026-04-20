import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      // INSTANT cursor movement - no state, direct DOM
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
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
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
      window.removeEventListener('mouseenter', handleMouseEnter
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        
        /* CRITICAL: Show default cursor on chatbot */
        [data-chatbot-wrapper],
        [data-chatbot-wrapper] *,
        [data-chatbot-window],
        [data-chatbot-window] * {
          cursor: auto !important;
        }
        
        /* Ensure input field shows text cursor */
        [data-chatbot-wrapper] input,
        [data-chatbot-wrapper] textarea {
          cursor: text !important;
        }
        
        /* Ensure buttons show pointer cursor */
        [data-chatbot-wrapper] button {
          cursor: pointer !important;
        }
      `}</style>
      
      {isVisible && (
        <>
          {/* Outer ring */}
          <mhatbot always shows default cursor */
        [data-chatbot-wrapper],
        [data-chatbot-wrapper] *,
        [data-chatbot-window],
        [data-chatbot-window] * {
          cursor: auto !important;
        }
        
        input, textarea, button, a {
          cursor: autodius: '50%',
              backdropFilter: 'blur(2px)',
            }}
          />
          
          {/* Inner dot */}
          <motion.div
            ref={dotRef}
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: isHovering ? 0.5 : 1,
              opacity: isHovering ? 0.7 : 1,
            }}
            transition={{ type: 'spring', stiffness: 1200, damping: 15 }}
            className="fixed w-2 h-2 pointer-events-none z-[9999]"
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
              borderRadius: '50%',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
            }}
          />
        </>
      )}
    </>
  )
}
