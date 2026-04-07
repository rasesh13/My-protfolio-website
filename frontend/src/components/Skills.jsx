import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaReact, FaNode, FaPython, FaDatabase, FaGitAlt, FaFire } from 'react-icons/fa'
import { SiJavascript, SiTailwindcss, SiExpress, SiMongodb } from 'react-icons/si'
import Tilt3D from './Tilt3D'
import GlassCard from './GlassCard'
import AnimatedSection from './AnimatedSection'

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const skillCategories = [
    {
      title: 'Languages',
      skills: ['JavaScript', 'Python', 'C++', 'Java'],
      icon: SiJavascript,
    },
    {
      title: 'Frontend',
      skills: ['React', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
      icon: FaReact,
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Authentication'],
      icon: FaNode,
    },
    {
      title: 'Database',
      skills: ['MongoDB', 'MySQL', 'Firebase', 'SQL'],
      icon: FaDatabase,
    },
    {
      title: 'Tools & Tech',
      skills: ['Git/GitHub', 'VS Code', 'Vite', 'NPM/Yarn'],
      icon: FaGitAlt,
    },
    {
      title: 'Other',
      skills: ['DSA', 'System Design', 'APIs', 'Problem Solving'],
      icon: FaFire,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="skills"
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
                Technical Arsenal
              </motion.p>
              <h2 className="text-5xl md:text-7xl font-black">
                <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
                  Skills & Expertise
                </span>
              </h2>
              <div className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
          {skillCategories.map((category, idx) => {
            const Icon = category.icon
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Tilt3D className="h-full">
                  <GlassCard className="p-6 h-full" delay={idx * 0.05}>
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="p-4 rounded-xl group-hover:shadow-glow transition"
                        style={{
                          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                        }}
                      >
                        <Icon className="text-white text-2xl" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition">
                        {category.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sidx) => (
                        <motion.span
                          key={sidx}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1.5 text-cyan-400 text-sm rounded-full transition"
                          style={{
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </GlassCard>
                </Tilt3D>
              </motion.div>
            )
          })}
            </motion.div>
          </>
        )}
      </AnimatedSection>
    </section>
  )
}
