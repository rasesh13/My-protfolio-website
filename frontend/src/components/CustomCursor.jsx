import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Detect hover on interactive elements
    const handleInteractiveHover = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'INPUT' ||
        e.target.classList.contains('hover-cursor') ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('input') ||
        e.target.closest('[data-chatbot-wrapper]') ||
        e.target.closest('[data-chatbot-window]')
      ) {
        setIsHovering(true)
      }
    }

    const handleInteractiveLeave = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleInteractiveHover)
    window.addEventListener('mouseout', handleInteractiveLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleInteractiveHover)
      window.removeEventListener('mouseout', handleInteractiveLeave)
    }
  }, [])

  return (
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
          <motion.div
            ref={cursorRef}
            animate={{
              x: mousePosition.x - 24,
              y: mousePosition.y - 24,
              scale: isHovering ? 1.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 1200, damping: 15 }}
            className="fixed w-12 h-12 pointer-events-none z-[9999]"
            style={{
              border: '2px solid rgba(6, 182, 212, 0.5)',
              borderRadius: '50%',
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
