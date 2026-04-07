import Chatbot from '../models/Chatbot.js'

// Knowledge base about the portfolio
const knowledgeBase = {
  about: {
    keywords: ['who are you', 'about rasesh', 'tell me about', 'background', 'introduce', 'yourself'],
    response: "I'm Rasesh, a Full-Stack Developer with expertise in building modern web applications using React, Node.js, and various other technologies. I'm passionate about creating beautiful, functional, and user-friendly digital experiences. I love solving complex problems and continuously learning new technologies!"
  },

  skills: {
    keywords: ['skills', 'what do you know', 'technologies', 'tech stack', 'expertise', 'programming languages', 'frameworks'],
    response: "I'm proficient in:\n\n**Frontend:** React, Tailwind CSS, Framer Motion, JavaScript, TypeScript\n**Backend:** Node.js, Express.js, MongoDB, PostgreSQL\n**Tools:** Git, Docker, REST APIs, WebSockets\n**Other:** UI/UX Design, Responsive Design, Performance Optimization\n\nI continuously learn and adapt to new technologies!"
  },

  projects: {
    keywords: ['projects', 'portfolio', 'what have you built', 'showcase', 'work', 'examples'],
    response: "I've built several impressive projects including:\n\n🚀 **Full-Stack E-commerce Platform** - Integrated payment system with real-time inventory\n💻 **AI-Powered Chatbot** - 500+ users in beta (like this one!)\n🎮 **3D Interactive Website** - Advanced animations and Framer Motion effects\n📊 **Analytics Dashboard** - Real-time data visualization\n\nEach project showcases different aspects of my skills!"
  },

  experience: {
    keywords: ['experience', 'achievements', 'hackathon', 'work history', 'background', 'accomplishments'],
    response: "Here are my key achievements:\n\n🏆 **Hackathon Finalist** (Innovit 2026) - Built AI chatbot with 500+ users\n🚀 **Full-Stack Developer** - Created platforms serving 10,000+ users\n💻 **Open Source Contributor** - 50+ merged pull requests\n🎯 **Freelance Developer** - Completed 20+ projects with 100% client satisfaction\n\nI'm always looking for new challenges!"
  },

  contact: {
    keywords: ['contact', 'reach out', 'email', 'connect', 'how to contact', 'get in touch', 'message', 'social'],
    response: "You can reach me through:\n\n📧 **Email:** rasesh@example.com\n💼 **LinkedIn:** linkedin.com/in/rasesh\n🐙 **GitHub:** github.com/rasesh\n📱 **Twitter:** @rasesh_dev\n\nI'd love to hear from you! Feel free to reach out for collaborations or inquiries."
  },

  services: {
    keywords: ['services', 'offer', 'do you offer', 'what can you', 'help with', 'provide', 'build'],
    response: "I offer:\n\n✨ **Web Development** - Full-stack applications with modern tech\n🎨 **UI/UX Design** - Beautiful and functional interfaces\n📱 **Responsive Design** - Works perfectly on all devices\n⚡ **Performance Optimization** - Fast loading and smooth interactions\n🔧 **Consulting** - Tech stack advice and architecture planning\n\nLet me know what you need!"
  },

  howitsmade: {
    keywords: ['how is this made', 'built with', 'technology stack', 'frontend tech', 'backend tech', 'this website', 'this portfolio'],
    response: "This portfolio website is built with:\n\n**Frontend:**\n• React.js - UI framework\n• Tailwind CSS - Styling\n• Framer Motion - Animations\n• Vite - Build tool\n\n**Backend:**\n• Node.js & Express - Server\n• REST API - Communication\n• This AI Chatbot - Rule-based system\n\n**Database:**\n• MongoDB - Data storage\n\n**Hosted on:** Production-ready setup! 🚀"
  },

  interests: {
    keywords: ['interests', 'hobbies', 'what do you like', 'passion', 'interested in'],
    response: "I'm passionate about:\n\n💡 **Innovation** - Creating new solutions and exploring emerging technologies\n🎨 **Design** - Beautiful UIs and smooth animations\n🧠 **AI/ML** - Machine learning and artificial intelligence\n🌐 **Web3** - Blockchain and decentralized applications\n📚 **Learning** - Always exploring new technologies and frameworks\n🤝 **Collaboration** - Working with talented teams\n\nWhat about you?"
  },

  pricing: {
    keywords: ['price', 'cost', 'rate', 'how much', 'charge', 'cost for'],
    response: "Pricing varies based on project scope and requirements. I offer:\n\n💼 **Project-based pricing** - For well-defined projects\n⏱️ **Hourly rate** - For ongoing or consulting work\n📦 **Package deals** - For multiple projects\n\nLet's discuss your specific needs! Feel free to reach out via email or contact form."
  },

  availability: {
    keywords: ['available', 'hire', 'looking for work', 'freelance', 'open to', 'collaboration', 'open positions'],
    response: "I'm currently open to:\n\n✅ **Full-time opportunities** with innovative companies\n✅ **Freelance projects** from startups and established businesses\n✅ **Collaborations** on exciting tech projects\n✅ **Consulting** for technical guidance\n\nI'm selective about projects to ensure quality work. Contact me with details!"
  },

  default: {
    keywords: [],
    response: "That's a great question! 🤔\n\nYou can ask me about:\n• My skills and experience\n• Projects I've built\n• How to contact me\n• Technologies I use\n• My achievements and interests\n\nFeel free to ask anything specific!"
  }
}

/**
 * Generate chatbot response from knowledge base
 */
export const generateChatbotResponse = (userMessage) => {
  const message = userMessage.toLowerCase().trim()

  for (const [key, data] of Object.entries(knowledgeBase)) {
    if (key === 'default') continue

    const hasMatch = data.keywords.some(keyword => message.includes(keyword))
    if (hasMatch) {
      return data.response
    }
  }

  for (const [key, data] of Object.entries(knowledgeBase)) {
    if (key === 'default') continue

    const hasPartialMatch = data.keywords.some(keyword =>
      message.includes(keyword.split(' ')[0])
    )
    if (hasPartialMatch) {
      return data.response
    }
  }

  return knowledgeBase.default.response
}

/**
 * Handle chatbot message
 * POST /api/chat
 */
export const handleChatMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body
    const ipAddress = req.ip

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        reply: 'Please send a valid message.',
      })
    }

    const userMessage = message.trim()
    const botResponse = generateChatbotResponse(userMessage)

    // Save conversation to MongoDB
    const conversation = new Chatbot({
      userMessage,
      botResponse,
      ipAddress,
      sessionId: sessionId || null,
      category: categorizeMessage(userMessage),
    })

    await conversation.save()

    res.json({
      success: true,
      reply: botResponse,
      timestamp: new Date(),
      conversationId: conversation._id,
    })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({
      success: false,
      reply: 'Sorry, something went wrong. Please try again!',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Categorize message based on keywords
 */
const categorizeMessage = (message) => {
  const msg = message.toLowerCase()

  if (['skill', 'technology', 'tech', 'framework'].some(k => msg.includes(k))) return 'skills'
  if (['project', 'built', 'work', 'example'].some(k => msg.includes(k))) return 'projects'
  if (['contact', 'email', 'reach', 'message'].some(k => msg.includes(k))) return 'contact'
  if (['about', 'who', 'background'].some(k => msg.includes(k))) return 'about'

  return 'other'
}

/**
 * Get chat history (admin only)
 * GET /api/chat/history
 */
export const getChatHistory = async (req, res) => {
  try {
    const { sessionId, limit = 50, page = 1 } = req.query

    let query = {}
    if (sessionId) {
      query.sessionId = sessionId
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const conversations = await Chatbot.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)

    const total = await Chatbot.countDocuments(query)

    res.json({
      success: true,
      data: conversations,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    })
  } catch (error) {
    console.error('Get chat history error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chat history',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Get chat statistics (admin only)
 * GET /api/chat/stats
 */
export const getChatStats = async (req, res) => {
  try {
    const total = await Chatbot.countDocuments()
    const perCategory = await Chatbot.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ])

    const helpful = await Chatbot.countDocuments({ isHelpful: true })
    const notHelpful = await Chatbot.countDocuments({ isHelpful: false })

    res.json({
      success: true,
      stats: {
        total,
        helpful,
        notHelpful,
        neutralOrRate: total - helpful - notHelpful,
        byCategory: perCategory,
      },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chat statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Mark conversation as helpful/unhelpful
 * PUT /api/chat/:id/feedback
 */
export const submitChatFeedback = async (req, res) => {
  try {
    const { isHelpful } = req.body

    if (typeof isHelpful !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isHelpful must be a boolean',
      })
    }

    const conversation = await Chatbot.findByIdAndUpdate(
      req.params.id,
      { isHelpful },
      { new: true }
    )

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found',
      })
    }

    res.json({
      success: true,
      message: 'Feedback submitted successfully',
      data: conversation,
    })
  } catch (error) {
    console.error('Submit feedback error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}
