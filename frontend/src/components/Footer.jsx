import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import MagneticButton from './MagneticButton'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="w-full bg-darker/80 border-t border-purple-glow/20 backdrop-blur-md py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-glow rounded-full blur-3xl opacity-10"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-3xl font-bold bg-gradient-glow bg-clip-text text-transparent mb-3">
              Rasesh Varshney
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Full-Stack Developer | Problem Solver | Startup Builder
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Building impactful digital products with modern technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h4 className="text-lg font-bold text-slate-100 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Projects', 'Skills', 'Contact'].map((link, idx) => (
                <motion.a
                  key={idx}
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ x: 5, color: '#a78bfa' }}
                  className="text-slate-400 hover:text-purple-glow transition block"
                >
                  → {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h4 className="text-lg font-bold text-slate-100 mb-4">Connect</h4>
            <div className="flex gap-3">
              <MagneticButton className="p-3 bg-purple-glow/10 rounded-lg text-purple-glow hover:bg-purple-glow/20 hover:text-white transition">
                <a
                  href="https://github.com/rasesh13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <FaGithub size={20} />
                </a>
              </MagneticButton>
              <MagneticButton className="p-3 bg-purple-glow/10 rounded-lg text-purple-glow hover:bg-purple-glow/20 hover:text-white transition">
                <a
                  href="https://www.linkedin.com/in/rasesh-varshney-2364ab371"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <FaLinkedin size={20} />
                </a>
              </MagneticButton>
              <MagneticButton className="p-3 bg-purple-glow/10 rounded-lg text-purple-glow hover:bg-purple-glow/20 hover:text-white transition">
                <a
                  href="mailto:raseshvarshney@gmail.com"
                  className="flex items-center justify-center"
                >
                  <FaEnvelope size={20} />
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-purple-glow/50 to-transparent mb-8 origin-left"
        />

        {/* Bottom */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-sm text-center md:text-left"
          >
            © {currentYear} Rasesh Varshney. All rights reserved.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-purple-glow italic font-semibold text-center"
          >
            "I build solutions that make an impact." ✨
          </motion.p>

          <motion.a
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            href="#hero"
            className="p-2 rounded-lg bg-purple-glow/10 text-purple-glow hover:bg-purple-glow/20 transition"
            title="Back to top"
          >
            ↑
          </motion.a>
        </motion.div>
      </div>
    </footer>
  )
}
