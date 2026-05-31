import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

export default function MagneticButton({ children, className = '', onClick }) {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const buttonRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    if (distance < 100) {
      setMousePos({
        x: (distanceX / distance) * 20,
        y: (distanceY / distance) * 20,
      })
    }
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
    setIsHovering(false)
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovering(true)}
      animate={{
        x: mousePos.x,
        y: mousePos.y,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 30px rgba(167, 139, 250, 0.8)',
      }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
