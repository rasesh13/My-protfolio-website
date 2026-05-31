import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import contactRoutes from './routes/contact.js'
import chatbotRoutes from './routes/chatbot.js'
import projectRoutes from './routes/projects.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean)
    
    // Log origin for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 CORS Origin:', origin, 'Allowed:', allowedOrigins)
    }
    
    // Allow requests without origin (mobile apps, Postman, etc.)
    if (!origin) {
      callback(null, true)
      return
    }
    
    // Check if origin is allowed
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else if (process.env.NODE_ENV === 'development') {
      // Allow all in development
      callback(null, true)
    } else {
      // Be more permissive in production for Render
      callback(null, true)
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

// Start server (development only)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`)
    console.log(`📚 API Documentation: http://localhost:${PORT}`)
    console.log(`🏥 Health Check: http://localhost:${PORT}/health`)
  })
}

// Export for Vercel serverless functions
export default app
