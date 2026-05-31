import express from 'express'
import { 
  handleChatMessage, 
  getChatHistory, 
  getChatStats, 
  submitChatFeedback 
} from '../controllers/chatbotController.js'

const router = express.Router()

// POST / - Handle chatbot messages
router.post('/', handleChatMessage)

// GET /history - Get chat history
router.get('/history', getChatHistory)

// GET /stats - Get chat statistics
router.get('/stats', getChatStats)

// PUT /:id/feedback - Submit chat feedback
router.put('/:id/feedback', submitChatFeedback)

export default router
