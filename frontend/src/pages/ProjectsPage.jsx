import { motion } from 'framer-motion'
import Projects from '../components/Projects'

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export default function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <section className="w-full pt-32 px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-center mb-6"
              variants={itemVariants}
            >
              <span className="bg-gradient-glow bg-clip-text text-transparent">My Projects</span>
            </motion.h1>
            <motion.div
              className="w-24 h-1 mx-auto bg-gradient-glow rounded-full mb-6"
              variants={itemVariants}
            />
            <motion.p
              className="text-center text-slate-300 max-w-2xl mx-auto text-lg"
              variants={itemVariants}
            >
              A showcase of my recent work, from concept to deployment. Each project represents my expertise in full-stack development and problem-solving.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
      <Projects />
    </motion.div>
  )
}
