import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import contactRoutes from './routes/contact.js'
import chatbotRoutes from './routes/chatbot.js'
import projectRoutes from './routes/projects.js'
import { getAllMessages } from './utils/messageStore.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://frontend-three-orcin-18.vercel.app',
      'https://frontend-i2mkaay1k-rasesh13s-projects.vercel.app'
    ]
    
    // Allow requests with no origin (like from curl requests or server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api', chatbotRoutes)
app.use('/api/projects', projectRoutes)

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Test endpoint (for debugging)
app.post('/api/test', (req, res) => {
  try {
    console.log('Test endpoint called')
    console.log('Request body:', req.body)
    console.log('Environment check:', {
      hasMongoUri: !!process.env.MONGODB_URI,
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPassword: !!process.env.EMAIL_PASSWORD,
      nodeEnv: process.env.NODE_ENV
    })
    
    res.json({
      success: true,
      message: 'Test successful - API is responding',
      received: req.body,
      serverInfo: {
        timestamp: new Date(),
        environment: process.env.NODE_ENV || 'development',
        hasRequiredEnv: {
          mongodb: !!process.env.MONGODB_URI,
          email: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
        }
      }
    })
  } catch (error) {
    console.error('Test error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Test email endpoint - send test email to verify configuration
const testEmailHandler = async (req, res) => {
  try {
    console.log('\n🧪 TEST EMAIL ENDPOINT CALLED')
    
    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(400).json({
        success: false,
        error: 'Email credentials not configured',
        missing: {
          emailUser: !process.env.EMAIL_USER,
          emailPassword: !process.env.EMAIL_PASSWORD
        }
      })
    }

    // Import nodemailer here to test
    const nodemailer = (await import('nodemailer')).default
    
    console.log('Creating email transporter...')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const testEmail = process.env.EMAIL_USER
    
    console.log('Sending test email to:', testEmail)
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: testEmail,
      subject: '🧪 Portfolio Test Email - Configuration Verified',
      html: `
        <h2>✅ Test Email Successful!</h2>
        <p>Your email configuration is working correctly on Vercel.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
      `,
    })

    console.log('✅ Test email sent! Message ID:', result.messageId)
    
    res.json({
      success: true,
      message: 'Test email sent successfully!',
      email: testEmail,
      messageId: result.messageId,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Test email failed:', error.message)
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      command: error.command
    })
  }
}

// Support both GET and POST
app.get('/api/test-email', testEmailHandler)
app.post('/api/test-email', testEmailHandler)

// Get all submitted messages (admin endpoint - for verification)
app.get('/api/messages', (req, res) => {
  try {
    const messages = getAllMessages()
    console.log(`📨 Retrieved ${messages.length} messages`)
    res.json({
      success: true,
      count: messages.length,
      messages: messages.map(m => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        timestamp: m.timestamp,
        source: m.source
      }))
    })
  } catch (error) {
    console.error('Get messages error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      contact: '/api/contact',
      chatbot: '/api/chat',
      projects: '/api/projects',
      health: '/health'
    }
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
})

// Export for Vercel serverless
export default app

// Start server locally only
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`)
    console.log(`📚 API Documentation: http://localhost:${PORT}`)
    console.log(`🏥 Health Check: http://localhost:${PORT}/health`)
  })
}
