import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return {
    ref,
    scrollYProgress,
    // Common transforms
    opacity: useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]),
    y: useTransform(scrollYProgress, [0, 0.3, 1], [100, 0, 0]),
    scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]),
  }
}

export function useParallax(offset = 50) {
  const { scrollY } = useScroll()
  return useTransform(scrollY, [0, 1], [0, offset])
}
