import express from 'express'
import { body, validationResult } from 'express-validator'
import {
  submitContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js'

const router = express.Router()

// Validation middleware
const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .isEmail().withMessage('Valid email is required'),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 3 }).withMessage('Subject must be at least 3 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
]

// Error handler middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// POST /api/contact - Submit contact form
router.post('/', validateContactForm, handleValidationErrors, submitContact)

// GET /api/contact - Get all contacts (admin only)
router.get('/', getAllContacts)

// GET /api/contact/:id - Get single contact
router.get('/:id', getContact)

// PUT /api/contact/:id - Update contact status
router.put('/:id', updateContact)

// DELETE /api/contact/:id - Delete contact
router.delete('/:id', deleteContact)

export default router
