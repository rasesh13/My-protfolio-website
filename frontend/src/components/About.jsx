import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import GlassCard from './GlassCard'
import AnimatedSection from './AnimatedSection'


export default function About() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const stats = [
    { label: 'Projects Completed', value: '20+' },
    { label: 'Hackathons', value: '5+' },
    { label: 'Tech Stack', value: '10+' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center relative"
    >
      <AnimatedSection className="max-w-6xl w-full" threshold={0.2}>
        {({ itemVariants }) => (
          <>
            {/* Cinematic heading */}
            <motion.div
              variants={itemVariants}
              className="mb-20 text-center"
            >
              <motion.p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
                My Journey
              </motion.p>
              <h2 className="text-5xl md:text-7xl font-black">
                <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <div className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Personal Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center relative"
          >
            {/* Glowing background */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-40"
            />

            {/* Personal Photo - Glassmorphic */}
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                zIndex: 2,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                boxShadow: '0 12px 48px rgba(6, 182, 212, 0.2)',
              }}
            >
              <img
                src="/images/profile.jpg"
                alt="Rasesh"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay gradient on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(14, 165, 233, 0.3))',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Right: Text with animations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-lg text-slate-300 mb-6 leading-relaxed font-light"
            >
              <span className="text-cyan-300 font-semibold">I'm a versatile developer</span> with experience across multiple programming languages and tech stacks.
              I enjoy working on challenging problems and turning ideas into functional, scalable products.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-slate-300 mb-6 leading-relaxed font-light"
            >
              Whether it's building rapid prototypes in hackathons or developing full-fledged applications,
              I focus on writing <span className="text-blue-300 font-semibold">clean, efficient code</span> and creating user-centric solutions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-300 mb-8 leading-relaxed font-light"
            >
              I'm passionate about <span className="text-cyan-300 font-semibold">technology, startups, and innovation</span>, constantly exploring new tools to stay ahead.
              My goal is to contribute to impactful projects and build scalable solutions.
            </motion.p>

            {/* Stats Grid - Glassmorphic */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              variants={containerVariants}
            >
              {stats.map((stat, idx) => (
                <GlassCard key={idx} delay={idx * 0.1} className="p-6 text-center">
                  <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400 mt-2 group-hover:text-slate-300 transition">
                    {stat.label}
                  </p>
                </GlassCard>
              ))}
            </motion.div>
          </motion.div>
            </div>
          </>
        )}
      </AnimatedSection>
    </section>
  )
}
