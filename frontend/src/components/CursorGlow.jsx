import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Large glow circle */}
      <motion.div
        animate={isVisible ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 0.1 }}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '100px',
          height: '100px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        className="rounded-full bg-gradient-glow blur-3xl"
      />

      {/* Small follower circle */}
      <motion.div
        animate={isVisible ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '60px',
          height: '60px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        className="rounded-full bg-blue-glow blur-2xl"
      />
    </>
  )
}
