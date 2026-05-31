import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Navigation items for different pages/sections
  const navItems = [
    { name: 'Home', path: '/', external: true },
    { name: 'Projects', path: '/projects', external: true },
    { name: 'Contact', path: '/contact', external: true },
  ]

  // Smooth scroll sections (only on home page)
  const scrollSections = [
    { name: 'About', link: 'about' },
    { name: 'Skills', link: 'skills' },
    { name: 'Experience', link: 'experience' },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
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
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed top-0 w-full z-50 backdrop-blur-xl"
      style={{
        background: 'rgba(15, 20, 25, 0.3)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <RouterLink to="/">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer relative group flex items-center gap-2"
          >
            <div
              className="absolute inset-0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300 -z-10"
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              }}
            />
            <img 
              src="/images/logo.png" 
              alt="Rasesh Logo" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent relative">
              Rasesh.dev
            </h1>
          </motion.div>
        </RouterLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-1 items-center">
          {/* Page navigation */}
          {navItems.map((item, idx) => (
            <RouterLink key={idx} to={item.path}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 text-slate-300 hover:text-cyan-300 transition rounded-lg group relative"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  }}
                />
                <span className="relative">{item.name}</span>
              </motion.div>
            </RouterLink>
          ))}

          {/* Smooth scroll sections (only on home page) */}
          {location.pathname === '/' && (
            <>
              {scrollSections.map((section, idx) => (
                <ScrollLink
                  key={idx}
                  to={section.link}
                  spy
                  smooth
                  duration={500}
                  className="cursor-pointer"
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 text-slate-300 hover:text-cyan-300 transition rounded-lg group relative"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                      }}
                    />
                    <span className="relative">{section.name}</span>
                  </motion.div>
                </ScrollLink>
              ))}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-cyan-300 hover:text-cyan-200 transition"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden px-4 py-6 backdrop-blur-xl border-b"
          style={{
            background: 'rgba(15, 20, 25, 0.4)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          <div className="space-y-2">
            {/* Page navigation */}
            {navItems.map((item, idx) => (
              <RouterLink key={idx} to={item.path} onClick={() => setMenuOpen(false)}>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="py-2 px-4 text-slate-300 hover:text-cyan-300 rounded-lg transition group relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-15 transition duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                    }}
                  />
                  <span className="relative">{item.name}</span>
                </motion.div>
              </RouterLink>
            ))}

            {/* Smooth scroll sections */}
            {location.pathname === '/' && (
              <>
                {scrollSections.map((section, idx) => (
                  <ScrollLink
                    key={idx}
                    to={section.link}
                    spy
                    smooth
                    duration={500}
                    onClick={() => setMenuOpen(false)}
                    className="block cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="py-2 px-4 text-slate-300 hover:text-cyan-300 rounded-lg transition group relative"
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-15 transition duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                        }}
                      />
                      <span className="relative">{section.name}</span>
                    </motion.div>
                  </ScrollLink>
                ))}
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
