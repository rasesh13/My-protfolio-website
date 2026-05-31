import express from 'express'
import { body, validationResult } from 'express-validator'
import {
  getAllProjects,
  getProjectById,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
  incrementProjectViews,
} from '../controllers/projectController.js'

const router = express.Router()

// Validation middleware
const validateProject = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('image')
    .trim()
    .notEmpty().withMessage('Image URL is required'),
  body('technologies')
    .isArray().withMessage('Technologies must be an array'),
  body('category')
    .isIn(['web', 'mobile', 'fullstack', 'ai', 'other'])
    .withMessage('Invalid category'),
]

// Error handler middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// GET /api/projects - Get all projects
router.get('/', getAllProjects)

// GET /api/projects/featured - Get featured projects
router.get('/featured', getFeaturedProjects)

// GET /api/projects/:id - Get single project
router.get('/:id', getProjectById)

// POST /api/projects - Create project (admin only)
router.post('/', validateProject, handleValidationErrors, createProject)

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id', validateProject, handleValidationErrors, updateProject)

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id', deleteProject)

// PUT /api/projects/:id/views - Increment project views
router.put('/:id/views', incrementProjectViews)

export default router
