import { motion } from 'framer-motion'

export default function GlassCard({ 
  children, 
  className = '', 
  whileHover = true,
  delay = 0,
  ...props 
}) {
  const baseClasses = "rounded-2xl group relative overflow-hidden transition-all duration-300"
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={whileHover ? { scale: 1.02, y: -5 } : {}}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={`${baseClasses} ${className}`}
      style={glassStyle}
      {...props}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.1), transparent)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
