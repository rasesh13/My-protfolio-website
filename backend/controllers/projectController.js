import Project from '../models/Project.js'

/**
 * Get all projects with filtering and pagination
 * GET /api/projects
 */
export const getAllProjects = async (req, res) => {
  try {
    const { category, featured, status, limit = 10, page = 1, sort = '-createdAt' } = req.query

    let query = {}

    // Filter by category
    if (category) {
      query.category = category
    }

    // Filter by featured
    if (featured && featured.toLowerCase() === 'true') {
      query.featured = true
    }

    // Filter by status
    if (status) {
      query.status = status
    } else {
      query.status = 'active' // Default: show only active projects
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const projects = await Project.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .exec()

    const total = await Project.countDocuments(query)

    res.json({
      success: true,
      data: projects,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    })
  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Get featured projects
 * GET /api/projects/featured
 */
export const getFeaturedProjects = async (req, res) => {
  try {
    const { limit = 6 } = req.query

    const projects = await Project.find({ featured: true, status: 'active' })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))

    res.json({
      success: true,
      data: projects,
    })
  } catch (error) {
    console.error('Get featured projects error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured projects',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Get single project by ID
 * GET /api/projects/:id
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    res.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error('Get project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Create new project (admin only)
 * POST /api/projects
 */
export const createProject = async (req, res) => {
  try {
    const { title, description, shortDescription, image, images, technologies, category, liveLink, githubLink, featured, year } = req.body

    const project = new Project({
      title,
      description,
      shortDescription,
      image,
      images: images || [],
      technologies,
      category,
      liveLink,
      githubLink,
      featured: featured || false,
      year: year || new Date().getFullYear(),
    })

    const savedProject = await project.save()

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: savedProject,
    })
  } catch (error) {
    console.error('Create project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Update project (admin only)
 * PUT /api/projects/:id
 */
export const updateProject = async (req, res) => {
  try {
    const { title, description, shortDescription, image, images, technologies, category, liveLink, githubLink, featured, status, year } = req.body

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        shortDescription,
        image,
        images,
        technologies,
        category,
        liveLink,
        githubLink,
        featured,
        status,
        year,
      },
      { new: true, runValidators: true }
    )

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    })
  } catch (error) {
    console.error('Update project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Delete project (admin only)
 * DELETE /api/projects/:id
 */
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Increment project views
 * PUT /api/projects/:id/views
 */
export const incrementProjectViews = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    res.json({
      success: true,
      message: 'View count incremented',
      data: { views: project.views },
    })
  } catch (error) {
    console.error('Increment views error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to increment views',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}
