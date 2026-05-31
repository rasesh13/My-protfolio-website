import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

export default function Experience() {

  const experiences = [
    {
      title: 'Hackathon Finalist - Innovit 2026',
      description: 'Built AI-powered chatbot reaching 500+ users. Finalist in Innovit 2026 hackathon.',
      date: '2026',
      icon: '🏆',
    },
    {
      title: 'Full-Stack Developer Project',
      description: 'Developed E-commerce platform serving 10,000+ users with integrated payment system.',
      date: '2023',
      icon: '🚀',
    },
    {
      title: 'Open Source Contributor',
      description: 'Contributed to multiple open-source projects with 50+ merged pull requests.',
      date: '2022',
      icon: '💻',
    },
    {
      title: 'Freelance Developer',
      description: 'Completed 20+ projects for startup clients with 100% satisfaction rating.',
      date: '2021',
      icon: '🎯',
    },
  ]

  return (
    <section id="experience" className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center relative">
      <AnimatedSection className="max-w-4xl w-full" threshold={0.2}>
        {({ itemVariants }) => (
          <>
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <motion.p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
                My Journey
              </motion.p>
              <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent mb-6">
                Experience & Achievements
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <motion.div
                variants={itemVariants}
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-blue-400 to-cyan-400 origin-top"
              />

              {/* Timeline Items */}
              <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`relative flex gap-8 md:gap-0 md:flex-${idx % 2 === 0 ? 'row' : 'row-reverse'}`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.3, boxShadow: '0 0 30px rgba(6, 182, 212, 1)' }}
                    className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-4 border-slate-900 shadow-glow transition"
                  />
                </div>

                {/* Content */}
                <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)',
                    }}
                    className="p-6 bg-gradient-dark rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 transition group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                        className="text-4xl"
                      >
                        {exp.icon}
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="text-sm text-cyan-400 font-bold bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/30 group-hover:bg-cyan-400/20 transition"
                      >
                        {exp.date}
                      </motion.span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition">
                      {exp.title}
                    </h3>
                    <p className="text-slate-400 group-hover:text-slate-300 transition">{exp.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
              </div>
            </div>
          </>
        )}
      </AnimatedSection>
    </section>
  )
}
