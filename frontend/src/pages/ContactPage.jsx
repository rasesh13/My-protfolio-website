import { motion } from 'framer-motion'
import Contact from '../components/Contact'

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

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <section className="w-full pt-32 px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              <span className="bg-gradient-glow bg-clip-text text-transparent">Get In Touch</span>
            </motion.h1>
            <motion.div
              className="w-24 h-1 mx-auto bg-gradient-glow rounded-full mb-6"
              variants={itemVariants}
            />
            <motion.p
              className="text-slate-300 text-lg"
              variants={itemVariants}
            >
              I'd love to hear from you! Let's connect and explore opportunities together.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
      <Contact />
    </motion.div>
  )
}
