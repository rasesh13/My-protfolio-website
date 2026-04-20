import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa'

const knowledgeBase = {
  about: {
    keywords: ['who are you', 'about', 'tell me about yourself', 'rasesh'],
    response: "👋 I'm Rasesh, a Full-Stack Developer passionate about building beautiful digital experiences and solving real-world problems with code."
  },
  skills: {
    keywords: ['skills', 'technologies', 'tech stack', 'what do you know', 'languages'],
    response: "💻 Frontend: React, Tailwind CSS, Framer Motion\n🔧 Backend: Node.js, Express.js, MongoDB\n🛠️ Tools: Git, Docker, REST APIs, VS Code"
  },
  projects: {
    keywords: ['projects', 'built', 'portfolio', 'work', 'showcase'],
    response: "🚀 Recent Projects:\n• E-commerce Platform\n• AI-Powered Chatbot\n• 3D Interactive Portfolio\n• Analytics Dashboard\n• Real-time Collaboration Tool"
  },
  experience: {
    keywords: ['experience', 'achievements', 'background', 'hackathon', 'awards'],
    response: "🏆 Experience:\n• Won multiple hackathons\n• Built apps for 10,000+ users\n• 50+ open-source contributions\n• 3+ years in full-stack development"
  },
  contact: {
    keywords: ['contact', 'reach', 'email', 'phone', 'connect', 'linkedin', 'github'],
    response: "📧 Let's connect!\n• Email: raseshvarshney82@gmail.com\n• LinkedIn: linkedin.com/in/rasesh\n• GitHub: github.com/rasesh13\n• Twitter: @rasesh_dev"
  },
  default: {
    keywords: [],
    response: "😊 I'm here to help! Ask me about my skills, projects, experience, or how to contact me."
  }
}

const generateResponse = (input) => {
  const text = input.toLowerCase().trim()
  if (!text) return knowledgeBase.default.response
  
  for (const [key, data] of Object.entries(knowledgeBase)) {
    if (key !== 'default' && data.keywords.some(keyword => text.includes(keyword))) {
      return data.response
    }
  }
  return knowledgeBase.default.response
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hi! 👋 I'm Rasesh's AI assistant. Ask me anything about my skills, projects, or how to reach me!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!input.trim() || loading) return

    const userText = input.trim()
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: userText
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: generateResponse(userText)
      }
      setMessages(prev => [...prev, botResponse])
      setLoading(false)
    }, 500)
  }

  return (
    <div 
      data-chatbot-wrapper 
      style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 99999, pointerEvents: 'none' }}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      {/* Chat Button - AI Orb */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
          zIndex: 99999,
          padding: 0,
          boxShadow: 'none',
        }}
      >
        {/* Animated backdrop glow on hover */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent)',
            zIndex: -1,
          }}
        />
        
        {/* AI Orb Icon - Larger and more visible */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: isOpen ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'linear-gradient(135deg, #06b6d4, #00d9ff)',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
        }}>
          <FaRobot
            style={{
              width: '40px',
              height: '40px',
              color: '#ffffff',
              pointerEvents: 'auto',
            }}
          />
        </div>
        
        {/* Notification dot when closed */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              background: 'linear-gradient(135deg, #ff3b30, #ff6b6b)',
              borderRadius: '50%',
              top: '-4px',
              right: '-4px',
              boxShadow: '0 0 12px rgba(255, 59, 48, 0.9)',
              border: '2px solid rgba(15, 23, 42, 0.95)',
            }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-chatbot-window
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
            onMouseUp={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
            onTouchStart={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
            onTouchEnd={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '24px',
              width: '384px',
              height: '500px',
              borderRadius: '20px',
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'blur(10px)',
              pointerEvents: 'auto',
              zIndex: 9998,
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'auto',
              }}
            >
              <div>
                <h3 style={{ margin: 0, color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                  Rasesh's AI
                </h3>
                <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '12px' }}>
                  💚 Always online
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '18px',
                  pointerEvents: 'auto',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.background = 'rgba(255,255,255,0.3)')}
                onMouseLeave={(e) => (e.target.style.background = 'rgba(255,255,255,0.2)')}
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                pointerEvents: 'auto',
              }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    pointerEvents: 'auto',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      lineHeight: '1.4',
                      background:
                        msg.type === 'user'
                          ? 'linear-gradient(135deg, #06b6d4, #0ea5e9)'
                          : 'rgba(51, 65, 85, 0.6)',
                      color: 'white',
                      border: msg.type === 'user' ? 'none' : '1px solid rgba(6, 182, 212, 0.2)',
                      wordWrap: 'break-word',
                      pointerEvents: 'auto',
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: '4px', padding: '12px', pointerEvents: 'auto' }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#06b6d4',
                        pointerEvents: 'auto',
                      }}
                    />
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              style={{
                padding: '12px',
                borderTop: '1px solid rgba(6, 182, 212, 0.2)',
                display: 'flex',
                gap: '8px',
                pointerEvents: 'auto',
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation()
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    if (input.trim() && !loading) {
                      handleSubmit(e)
                    }
                  }
                }}
                placeholder="Ask me..."
                disabled={loading}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  pointerEvents: 'auto',
                  cursor: 'text',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(6, 182, 212, 0.5)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(6, 182, 212, 0.2)')}
              />
              <button
                type="button"
                disabled={loading || !input.trim()}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (input.trim() && !loading) {
                    handleSubmit(e)
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
                  border: 'none',
                  color: 'white',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: loading || !input.trim() ? 0.6 : 1,
                  pointerEvents: 'auto',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!loading && input.trim()) {
                    e.target.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.5)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = 'none'
                }}
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
