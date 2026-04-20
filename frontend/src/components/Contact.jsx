import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'
import MagneticButton from './MagneticButton'
import GlassCard from './GlassCard'
import AnimatedSection from './AnimatedSection'

export default function Contact() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // Auto navigate home after message is sent
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 3000) // Navigate after 3 seconds
      return () => clearTimeout(timer)
    }
  }, [submitted, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('🚀 Form submitted! Starting validation...')
    console.log('Form data:', formData)
    
    // Frontend validation before sending
    if (!formData.name || formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      console.error('❌ Validation failed: Name too short')
      return
    }
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address')
      console.error('❌ Validation failed: Invalid email')
      return
    }
    if (!formData.subject || formData.subject.trim().length < 2) {
      setError('Subject must be at least 2 characters')
      console.error('❌ Validation failed: Subject too short')
      return
    }
    if (!formData.message || formData.message.trim().length < 5) {
      setError('Message must be at least 5 characters')
      console.error('❌ Validation failed: Message too short')
      return
    }
    
    setError('')
    setLoading(true)
    console.log('✅ Frontend validation passed. Sending to backend...')
    console.log('📤 API Endpoint:', API_ENDPOINTS.CONTACT)
    
    let retries = 0
    const maxRetries = 5
    
    const attemptSubmit = async () => {
      try {
        console.log(`\n📤 Attempt ${retries + 1}/${maxRetries} to: ${API_ENDPOINTS.CONTACT}`)
        console.log('📦 Payload:', formData)
        
        const response = await axios.post(API_ENDPOINTS.CONTACT, formData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          timeout: 20000,
          withCredentials: false
        })
        
        console.log('✅ SUCCESS! Response:', response.data)
        
        if (response.data.success) {
          console.log('🎉 Form submitted successfully!')
          setSubmitted(true)
          setFormData({ name: '', email: '', subject: '', message: '' })
        } else {
          console.error('❌ Response success=false:', response.data)
          setError(response.data.message || 'Failed to send message. Please try again.')
        }
      } catch (error) {
        retries++
        
        console.error(`\n❌ ATTEMPT ${retries} FAILED:`)
        console.error('   Error Message:', error.message)
        console.error('   Error Code:', error.code)
        console.error('   Status:', error.response?.status)
        console.error('   Response:', error.response?.data)
        
        // Retry on timeout or network errors
        if (retries < maxRetries && (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.code === 'ENOTFOUND' || !error.response)) {
          const retryDelay = Math.min(1000 * retries, 3000)
          console.log(`⏳ Retrying in ${retryDelay}ms... (${retries}/${maxRetries})`)
          setTimeout(attemptSubmit, retryDelay)
          return
        }
        
        // Handle specific error types
        if (error.code === 'ECONNABORTED') {
          setError('⏱️ Request took too long. Please try again.')
        } else if (error.message === 'Network Error' || !error.response || error.code === 'ENOTFOUND') {
          setError(`🌐 Cannot reach backend (attempt ${retries}/${maxRetries}). Checking connection...`)
        } else if (error.response?.status === 400) {
          setError('Please fill all fields correctly:\n- Name: 2+ characters\n- Email: valid format\n- Subject: 2+ characters\n- Message: 5+ characters')
        } else if (error.response?.status === 500) {
          setError('Server error: ' + (error.response?.data?.message || 'Internal server error'))
        } else if (error.response?.status === 0) {
          setError('CORS error. Backend may be blocked.')
        } else {
          setError(error.response?.data?.message || 'Failed to send message: ' + error.message)
        }
      } finally {
        setLoading(false)
      }
    }
    
    attemptSubmit()
  }

  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', link: 'https://github.com/rasesh13', color: 'hover:text-white' },
    { icon: FaLinkedin, label: 'LinkedIn', link: 'https://www.linkedin.com/in/rasesh-varshney-2364ab371', color: 'hover:text-blue-400' },
    { icon: FaEnvelope, label: 'Email', link: 'mailto:raseshvarshney@gmail.com', color: 'hover:text-purple-glow' },
  ]

  return (
    <section id="contact" className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center relative">
      <AnimatedSection className="max-w-4xl w-full" threshold={0.2}>
        {({ itemVariants }) => (
          <>
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <motion.p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Let's Connect
              </motion.p>
              <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent mb-6">
                Contact Me
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto"
            >
              I'm always open to new opportunities and collaborations. Let's build something amazing together!
            </motion.p>

            <motion.div
              className="grid md:grid-cols-2 gap-12"
            >
              {/* Contact Form */}
              <motion.div
                variants={itemVariants}
              >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-300 mb-3 font-semibold">Name</label>
                <motion.input
                  whileFocus={{ 
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                    borderColor: 'rgba(6, 182, 212, 0.8)',
                  }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none transition"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1.5px solid rgba(6, 182, 212, 0.3)',
                  }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-3 font-semibold">Email</label>
                <motion.input
                  whileFocus={{ 
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                    borderColor: 'rgba(6, 182, 212, 0.8)',
                  }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none transition"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1.5px solid rgba(6, 182, 212, 0.3)',
                  }}
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-3 font-semibold">Subject</label>
                <motion.input
                  whileFocus={{ 
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                    borderColor: 'rgba(6, 182, 212, 0.8)',
                  }}
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none transition"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1.5px solid rgba(6, 182, 212, 0.3)',
                  }}
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-3 font-semibold">Message</label>
                <motion.textarea
                  whileFocus={{ 
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                    borderColor: 'rgba(6, 182, 212, 0.8)',
                  }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-5 py-3 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none transition resize-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1.5px solid rgba(6, 182, 212, 0.3)',
                  }}
                  placeholder="Your message"
                />
              </div>

              <MagneticButton
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 text-white font-bold rounded-lg disabled:opacity-50 transition text-lg"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  boxShadow: '0 8px 32px rgba(14, 165, 233, 0.3)',
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </MagneticButton>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 whitespace-pre-line text-sm"
                >
                  ⚠️ {error}
                </motion.div>
              )}

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400"
                >
                  ✅ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-slate-100 mb-8">Get In Touch</h3>

            <div className="space-y-6 mb-12">
              <motion.div 
                whileHover={{ x: 10 }} 
                className="flex items-center gap-3 p-4 rounded-xl transition"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  }}
                >
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a href="mailto:raseshvarshney@gmail.com" className="text-cyan-300 hover:text-cyan-200 transition font-semibold">
                    raseshvarshney@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10 }} 
                className="flex items-center gap-3 p-4 rounded-xl transition"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  }}
                >
                  <FaLinkedin className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-slate-300 font-semibold">India</p>
                </div>
              </motion.div>
            </div>

            <h4 className="text-xl font-bold text-slate-100 mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon
                return (
                  <MagneticButton
                    key={idx}
                    className="p-4 rounded-lg text-white transition hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                      boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
                    }}
                  >
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                    >
                      <Icon size={24} />
                    </a>
                  </MagneticButton>
                )
              })}
            </div>

            <motion.p
              variants={itemVariants}
              className="mt-12 text-lg italic text-purple-glow font-semibold text-center md:text-left"
            >
              "I don't just write code—I build solutions that make an impact."
            </motion.p>
          </motion.div>
        </motion.div>
          </>
        )}
      </AnimatedSection>
    </section>
  )
}
