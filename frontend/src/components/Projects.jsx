import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import Tilt from 'react-parallax-tilt'
import MagneticButton from './MagneticButton'
import GlassCard from './GlassCard'
import AnimatedSection from './AnimatedSection'
import heroBanner from '/images/hero-banner.png'

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const projects = [
    {
      id: 1,
      title: 'B2B E-Commerce Platform',
      description: 'Comprehensive guide to choosing the right B2B ecommerce platform. Explored modern solutions for enterprise-level commerce with payment integration, scalability, and advanced features.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
      imageUrl: 'https://www.iwdagency.com/cdn/shop/articles/eCommerce_Platform_Pic_1600x.jpg?v=1698957713',
      isImageUrl: true,
      liveLink: 'https://www.iwdagency.com/blogs/news/best-b2b-ecommerce-platforms',
      codeLink: 'https://github.com/rasesh13',
    },
    {
      id: 2,
      title: 'Social Media App',
      description: 'Real-time social networking platform with user authentication, post creation, likes, comments, and messaging features.',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
      image: '👥',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHiz7DIA5C0DYdBpPAKSxXbqzzyn1uE_MTg&s',
      isImageUrl: true,
      liveLink: 'https://demo.com',
      codeLink: 'https://github.com/rasesh13',
    },
    {
      id: 3,
      title: 'AI Chatbot',
      description: 'Intelligent chatbot powered by AI with natural language processing. Implemented context-aware responses and multi-language support.',
      tech: ['Python', 'OpenAI', 'Node.js', 'React'],
      image: '🤖',
      imageUrl: 'https://www.almawave.com/wp-content/uploads/2024/10/BLOG-CONVERSATION-STUDIO-3.webp',
      isImageUrl: true,
      liveLink: 'https://demo.com',
      codeLink: 'https://github.com/rasesh13',
    },
    {
      id: 4,
      title: 'Task Management System',
      description: 'Collaborative task management tool with real-time updates, team collaboration, project tracking, and analytics dashboard.',
      tech: ['React', 'Express', 'MongoDB', 'Socket.io'],
      image: '📋',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-iHITUUgecc4fOQRhOcZ_J2D6gsn-JixgtA&s',
      isImageUrl: true,
      liveLink: 'https://demo.com',
      codeLink: 'https://github.com/rasesh13',
    },
    {
      id: 5,
      title: 'Weather App',
      description: 'Real-time weather application with location-based forecasts, weather alerts, and beautiful UI with smooth animations.',
      tech: ['React', 'Weather API', 'Tailwind CSS', 'Framer Motion'],
      image: '☀️',
      imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/0*GJqID-iVs0NDF35M',
      isImageUrl: true,
      liveLink: 'https://demo.com',
      codeLink: 'https://github.com/rasesh13',
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Modern, interactive portfolio showcasing projects and skills. Built with cutting-edge technologies and smooth animations.',
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      image: '💼',
      imageUrl: heroBanner,
      isImageUrl: true,
      liveLink: 'https://demo.com',
      codeLink: 'https://github.com/rasesh13',
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
      id="projects"
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
                Showcase
              </motion.p>
              <h2 className="text-5xl md:text-7xl font-black">
                <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
                  Featured Projects
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
          {projects.map((project, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                scale={1.02}
                transitionSpeed={400}
                className="h-full"
              >
                <GlassCard className="group relative overflow-hidden h-full flex flex-col" delay={idx * 0.05}>
                  {/* Image/Icon Container */}
                  <div className="h-40 flex items-center justify-center text-6xl relative overflow-hidden mb-4 bg-gradient-to-br from-slate-800 to-slate-900">
                    {project.isImageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.innerHTML = '<span className="text-6xl">' + project.image + '</span>'
                        }}
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        className="transition-transform"
                      >
                        {project.image}
                      </motion.div>
                    )}
                    
                    {/* Overlay effect on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(6, 182, 212, 0.2))',
                        backdropFilter: 'blur(4px)',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, tidx) => (
                        <motion.span
                          key={tidx}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 text-cyan-400 text-xs rounded transition"
                          style={{
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <MagneticButton 
                        className="flex-1 px-3 py-2 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                          boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
                        }}
                      >
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 w-full justify-center"
                        >
                          <FaExternalLinkAlt className="text-xs" /> Live
                        </a>
                      </MagneticButton>
                      <MagneticButton 
                        className="flex-1 px-3 py-2 font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(10px)',
                          border: '1.5px solid rgba(6, 182, 212, 0.4)',
                          color: '#06b6d4',
                        }}
                      >
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 w-full justify-center"
                        >
                          <FaGithub className="text-xs" /> Code
                        </a>
                      </MagneticButton>
                    </div>
                  </div>
                </GlassCard>
              </Tilt>
            </motion.div>
          ))}
            </motion.div>
          </>
        )}
      </AnimatedSection>
    </section>
  )
}
