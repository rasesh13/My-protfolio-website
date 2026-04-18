import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './config/database.js'
import contactRoutes from './routes/contact.js'
import chatbotRoutes from './routes/chatbot.js'
import projectRoutes from './routes/projects.js'
import { getAllMessages } from './utils/messageStore.js'
import Contact from './models/Contact.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB as soon as server starts
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB during startup:', err.message)
})

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://frontend-three-orcin-18.vercel.app',
    'https://frontend-d3y6vaiao-rasesh13s-projects.vercel.app',
    'https://frontend-mm9t239dh-rasesh13s-projects.vercel.app',
    'https://frontend-5oyk8g3xk-rasesh13s-projects.vercel.app',
    'https://frontend-kupuyv0r8-rasesh13s-projects.vercel.app',
    'https://frontend-o7qtmxyoy-rasesh13s-projects.vercel.app',
    'https://frontend-64he5npe9-rasesh13s-projects.vercel.app',
    '*'
  ],
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200,
  exposedHeaders: ['Content-Length', 'X-JSON-Response']
}))

// Handle preflight requests explicitly
app.options('*', cors())
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

// Warmup endpoint - keeps serverless warm, initializes DB connection
app.get('/warmup', async (req, res) => {
  try {
    console.log('🔥 Warmup request received - keeping server warm')
    
    // Ensure MongoDB connection is active
    if (mongoose.connection.readyState !== 1) {
      console.log('⏳ MongoDB not connected, attempting connection...')
      await connectDB()
    }
    
    console.log('✅ Warmup complete - server is warm and ready')
    res.status(200).json({
      status: 'Warmup successful',
      timestamp: new Date(),
      message: 'Backend is warmed up and ready',
      mongooseState: mongoose.connection.readyState,
      database: mongoose.connection.name || 'not connected'
    })
  } catch (error) {
    console.error('⚠️ Warmup error:', error.message)
    res.status(200).json({
      status: 'Warmup partial',
      message: 'Server responding but database may be initializing',
      timestamp: new Date()
    })
  }
})

// TEST EMAIL ENDPOINT
const testEmailHandler = async (req, res) => {
  try {
    console.log('\n🧪 TEST EMAIL ENDPOINT CALLED')
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(400).json({
        success: false,
        error: 'Email credentials not configured'
      })
    }

    const nodemailer = (await import('nodemailer')).default
    
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
      subject: '🧪 Portfolio Test Email',
      html: `
        <h2>✅ Test Email Works!</h2>
        <p>Your email is configured and working.</p>
        <p>${new Date().toISOString()}</p>
      `,
    })

    console.log('✅ Test email sent! ID:', result.messageId)
    
    res.json({
      success: true,
      message: 'Test email sent!',
      messageId: result.messageId
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

// TEST EMAIL TO CUSTOM ADDRESS
app.post('/api/test-email-custom', async (req, res) => {
  try {
    const { recipientEmail } = req.body
    
    if (!recipientEmail) {
      return res.status(400).json({
        success: false,
        error: 'recipientEmail is required'
      })
    }
    
    console.log('\n🧪 SENDING TEST EMAIL TO:', recipientEmail)
    
    const emailUser = process.env.EMAIL_USER
    const emailPassword = process.env.EMAIL_PASSWORD
    
    if (!emailUser || !emailPassword) {
      return res.status(400).json({
        success: false,
        error: 'Email credentials not configured'
      })
    }
    
    const nodemailer = (await import('nodemailer')).default
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword,
      }
    })
    
    const result = await transporter.sendMail({
      from: emailUser,
      to: recipientEmail,
      subject: 'Test Email from Portfolio Backend',
      html: `
        <h2>✅ Test Email Delivered!</h2>
        <p>This is a test email sent to: <strong>${recipientEmail}</strong></p>
        <p>Your email configuration is working correctly.</p>
        <p>Sent: ${new Date().toLocaleString()}</p>
      `
    })
    
    console.log('✅ Test email sent to', recipientEmail, '- Message ID:', result.messageId)
    
    res.json({
      success: true,
      message: 'Test email sent!',
      recipientEmail,
      messageId: result.messageId
    })
    
  } catch (error) {
    console.error('❌ Error sending custom test email:', error.message)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

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

// Only start server if not on Vercel (Vercel will handle the serverless function)
if (process.env.VERCEL !== '1') {
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
}

// Export for Vercel serverless
export default app
