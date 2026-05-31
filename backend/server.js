import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contact.js'
import chatbotRoutes from './routes/chatbot.js'
import projectRoutes from './routes/projects.js'
import connectDB from './config/database.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://my-protfolio-website-delta.vercel.app', /\.vercel\.app$/],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}))

// Middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`)
  next()
})

// Connect DB
connectDB().catch(err => console.error('DB:', err.message))

// Routes
app.get('/health', (req, res) => res.json({ ok: true }))
app.get('/warmup', (req, res) => res.json({ ok: true, message: 'Backend warmed up' }))
app.get('/', (req, res) => res.json({ message: 'API' }))
app.use('/api/contact', contactRoutes)
app.use('/api/chat', chatbotRoutes)
app.use('/api/projects', projectRoutes)

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }))

// Only listen if not on Vercel
if (process.env.VERCEL !== '1' && !process.env.RAILWAY_ENVIRONMENT_NAME) {
  app.listen(PORT, () => console.log(`✅ Server on :${PORT}`))
}

export default app
