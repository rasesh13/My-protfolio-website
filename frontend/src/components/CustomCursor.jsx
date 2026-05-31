import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  useEffect(() => {
    // Remove custom cursor - use normal browser cursor
    document.documentElement.style.cursor = 'auto'
    document.body.style.cursor = 'auto'
  }, [])

  return (
    <>
      <style>{`
        * { 
          cursor: auto !important; 
        }
      `}</style>
    </>
  )
}
