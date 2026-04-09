import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import contactRoutes from './routes/contact.js'
import chatbotRoutes from './routes/chatbot.js'
import projectRoutes from './routes/projects.js'
import { getAllMessages } from './utils/messageStore.js'
import Contact from './models/Contact.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({
  origin: '*',
  credentials: false,
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

// Get all contacts from MongoDB database with fallback to memory
app.get('/api/contacts-db', async (req, res) => {
  try {
    console.log('🗄️ Querying MongoDB for contacts...')
    
    // Set a timeout for MongoDB query (5 seconds)
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('MongoDB query timeout')), 5000)
    )
    
    const queryPromise = Contact.find()
    
    try {
      const contacts = await Promise.race([queryPromise, timeoutPromise])
      console.log(`✅ Found ${contacts.length} contacts in MongoDB`)
      
      return res.json({
        success: true,
        source: 'MongoDB Database',
        count: contacts.length,
        contacts: contacts.map(c => ({
          id: c._id,
          name: c.name,
          email: c.email,
          subject: c.subject,
          message: c.message,
          phone: c.phone,
          ipAddress: c.ipAddress,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt
        }))
      })
    } catch (dbTimeoutError) {
      console.warn('⚠️ MongoDB timeout or error, falling back to memory storage')
      console.warn('Error:', dbTimeoutError.message)
      
      // Fallback to in-memory message store
      const messages = getAllMessages()
      console.log(`📨 Retrieved ${messages.length} messages from memory`)
      
      return res.json({
        success: true,
        source: 'Memory Storage (Fallback)',
        warning: 'MongoDB temporarily unavailable - showing cached messages',
        count: messages.length,
        contacts: messages.map(m => ({
          id: m.id,
          name: m.name,
          email: m.email,
          subject: m.subject,
          message: m.message,
          phone: m.phone,
          timestamp: m.timestamp,
          source: m.source
        }))
      })
    }
  } catch (error) {
    console.error('❌ Critical error in contacts endpoint:', error.message)
    
    // Last resort: return memory storage
    try {
      const messages = getAllMessages()
      return res.json({
        success: true,
        source: 'Memory Storage (Emergency)',
        error: 'Database unavailable - showing cached messages only',
        count: messages.length,
        contacts: messages
      })
    } catch (memoryError) {
      return res.status(500).json({
        success: false,
        error: 'Unable to fetch contacts',
        message: error.message
      })
    }
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

// Start server
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`📚 API Documentation: http://localhost:${PORT}`)
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`)
  console.log(`📧 Environment: ${process.env.NODE_ENV || 'development'}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Gracefully shutting down...')
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})

// Export for Vercel serverless
export default app
