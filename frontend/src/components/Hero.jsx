import { motion } from 'framer-motion'
import { useEffect, useState, Suspense } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import MagneticButton from './MagneticButton'
import HeroScene from './HeroScene'

const words = [
  'Full-Stack Developer',
  'Problem Solver',
  'Startup Builder',
  'Tech Enthusiast',
  'Hackathon Finalist',
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const { scrollY } = useScroll()
  const parallax = useTransform(scrollY, [0, 500], [0, 100])

  useEffect(() => {
    const handleType = () => {
      const word = words[index]
      setDisplayText(
        isDeleting
          ? word.substring(0, displayText.length - 1)
          : word.substring(0, displayText.length + 1)
      )

      if (!isDeleting && displayText === word) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % words.length)
      }
    }

    const timer = setTimeout(handleType, isDeleting ? 100 : 150)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, index])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="hero"
      className="min-h-screen w-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* 3D Canvas Background - Fixed full screen behind UI */}
      <div 
        className="fixed top-0 left-0 w-full h-screen hidden lg:block"
        style={{
          zIndex: 0, 
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 text-slate-500">
            Initializing 3D...
          </div>
        }>
          <HeroScene scrollY={scrollY} debug={false} />
        </Suspense>
      </div>

      {/* Subtle gradient overlay for text contrast */}
      <div 
        className="absolute inset-0 hidden lg:block"
        style={{
          zIndex: 1,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 20, 25, 0.3) 100%)',
        }}
      />

      {/* Soft vignette for polish */}
      <div 
        className="absolute inset-0"
        style={{
          zIndex: 1,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.2) 100%)',
        }}
      />

      {/* Minimal animated accents */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 left-10 w-72 h-72 bg-slate-600/5 rounded-full blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl text-center lg:text-left pointer-events-auto"
      >
        {/* Main headline - premium styling */}
        <motion.div variants={itemVariants}>
          <div className="mb-2 text-sm font-semibold tracking-widest text-slate-400 uppercase">
            Welcome to my portfolio
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent block">
              {words[index].split(' ')[0]}
            </span>
            <span className="text-slate-100">
              {displayText}
              <span className="animate-pulse ml-2">|</span>
            </span>
          </h1>
        </motion.div>

        {/* Sophisticated divider */}
        <motion.div
          variants={itemVariants}
          className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mb-8 rounded-full"
        />

        {/* Tagline - elegant */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-300 mb-6 font-light leading-relaxed"
        >
          Crafting elegant, high-performance digital experiences
        </motion.p>

        {/* Description - minimal and focused */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-slate-400 mb-12 max-w-xl leading-relaxed font-light"
        >
          Full-stack engineer building scalable systems, beautiful interfaces, and products that solve real problems.
        </motion.p>

        {/* CTA Buttons - Glassmorphic Premium */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center lg:justify-start flex-wrap"
        >
          <RouterLink to="/projects">
            <MagneticButton
              className="group px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 text-base relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                boxShadow: '0 8px 32px rgba(14, 165, 233, 0.2)',
              }}
              whileHover={{
                boxShadow: '0 12px 48px rgba(14, 165, 233, 0.4)',
              }}
            >
              View My Work
            </MagneticButton>
          </RouterLink>
          <RouterLink to="/contact">
            <MagneticButton
              className="group px-8 py-3 text-slate-300 font-semibold rounded-lg transition-all duration-300 text-base relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(6, 182, 212, 0.4)',
              }}
              whileHover={{
                background: 'rgba(6, 182, 212, 0.1)',
                boxShadow: '0 8px 32px rgba(6, 182, 212, 0.2)',
              }}
            >
              Get In Touch
            </MagneticButton>
          </RouterLink>
        </motion.div>

        {/* Minimal scroll indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="mt-20 flex flex-col items-center lg:items-start gap-3"
        >
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Scroll to explore</p>
          <svg className="w-5 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

