import express from 'express'
import { 
  handleChatMessage, 
  getChatHistory, 
  getChatStats, 
  submitChatFeedback 
} from '../controllers/chatbotController.js'

const router = express.Router()

// POST /api/chat - Handle chatbot messages
router.post('/chat', handleChatMessage)

// GET /api/chat/history - Get chat history (admin only)
router.get('/chat/history', getChatHistory)

// GET /api/chat/stats - Get chat statistics (admin only)
router.get('/chat/stats', getChatStats)

// PUT /api/chat/:id/feedback - Submit chat feedback
router.put('/chat/:id/feedback', submitChatFeedback)

export default router
