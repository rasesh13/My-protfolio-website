import { useEffect, useState } from 'react'

export function useMousePosition() {
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to 0-1 range
      setMouseX(e.clientX / window.innerWidth)
      setMouseY(e.clientY / window.innerHeight)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return { mouseX, mouseY }
}
