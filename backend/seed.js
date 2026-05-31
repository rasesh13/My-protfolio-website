// Sample data to seed the database
// Run: node seed.js

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Project from './models/Project.js'

dotenv.config()

const projects = [
  {
    title: 'Full-Stack E-commerce Platform',
    description: 'A complete e-commerce platform built with React and Node.js. Features include product catalog, shopping cart, payment integration with Stripe, user authentication, order management, and admin dashboard. Includes real-time inventory tracking and email notifications.',
    shortDescription: 'Modern e-commerce solution with payment integration',
    image: 'https://imgs.search.brave.com/ecommerce-placeholder',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    category: 'fullstack',
    liveLink: 'https://ecommerce-demo.com',
    githubLink: 'https://github.com/rasesh/ecommerce',
    featured: true,
    year: 2024,
    status: 'active',
  },
  {
    title: 'AI-Powered Chatbot',
    description: 'An intelligent chatbot system built with Node.js and MongoDB. Features knowledge base management, conversation history, sentiment analysis, and user feedback system. Perfect for customer support and lead generation.',
    shortDescription: 'Smart chatbot with conversation tracking',
    image: 'https://imgs.search.brave.com/chatbot-placeholder',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JavaScript'],
    category: 'ai',
    liveLink: 'https://chatbot-demo.com',
    githubLink: 'https://github.com/rasesh/chatbot',
    featured: true,
    year: 2024,
    status: 'active',
  },
  {
    title: '3D Interactive Portfolio Website',
    description: 'An innovative portfolio website featuring 3D animations, Framer Motion effects, glassmorphism design, and particle backgrounds. Responsive design that looks amazing on all devices. Includes smooth scrolling, dark theme, and interactive components.',
    shortDescription: 'Modern portfolio with 3D animations',
    image: 'https://imgs.search.brave.com/portfolio-placeholder',
    technologies: ['React', 'Framer Motion', 'Three.js', 'Tailwind CSS', 'Vite'],
    category: 'web',
    liveLink: 'https://portfolio-3d.com',
    githubLink: 'https://github.com/rasesh/portfolio',
    featured: true,
    year: 2024,
    status: 'active',
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'A comprehensive analytics dashboard with real-time data visualization. Features interactive charts, graphs, data filtering, export functionality, and responsive design. Built with React and charting libraries for beautiful data representation.',
    shortDescription: 'Data visualization and analytics platform',
    image: 'https://imgs.search.brave.com/dashboard-placeholder',
    technologies: ['React', 'Chart.js', 'Redux', 'Tailwind CSS', 'API Integration'],
    category: 'web',
    liveLink: 'https://analytics-demo.com',
    githubLink: 'https://github.com/rasesh/analytics',
    featured: true,
    year: 2023,
    status: 'active',
  },
  {
    title: 'Mobile Weather App',
    description: 'A cross-platform mobile weather application built with React Native. Features real-time weather updates, location services, weather forecasts, and beautiful UI. Supports iOS and Android with offline functionality.',
    shortDescription: 'Cross-platform weather application',
    image: 'https://imgs.search.brave.com/weather-placeholder',
    technologies: ['React Native', 'JavaScript', 'Expo', 'Weather API'],
    category: 'mobile',
    liveLink: '',
    githubLink: 'https://github.com/rasesh/weather-app',
    featured: false,
    year: 2023,
    status: 'active',
  },
  {
    title: 'Social Media Clone',
    description: 'A full-featured social media platform mimicking Twitter/X. Includes user authentication, posts/tweets, likes, comments, infinite scrolling, real-time notifications, user profiles, and trending topics. Built with modern web technologies.',
    shortDescription: 'Full-featured social platform',
    image: 'https://imgs.search.brave.com/social-placeholder',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
    category: 'fullstack',
    liveLink: 'https://social-demo.com',
    githubLink: 'https://github.com/rasesh/social-media',
    featured: false,
    year: 2023,
    status: 'active',
  },
  {
    title: 'Task Management System',
    description: 'A collaborative task management application with real-time updates. Features project creation, task assignment, progress tracking, team collaboration, file attachments, and notification system. Built with modern tech stack.',
    shortDescription: 'Collaborative project management tool',
    image: 'https://imgs.search.brave.com/tasks-placeholder',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Redux Toolkit'],
    category: 'web',
    liveLink: 'https://taskmanager-demo.com',
    githubLink: 'https://github.com/rasesh/task-manager',
    featured: false,
    year: 2023,
    status: 'active',
  },
  {
    title: 'Video Streaming Platform',
    description: 'A Netflix-like video streaming platform with adaptive streaming, user authentication, watchlist, recommendations, and multi-quality support. Backend handles video encoding and content delivery.',
    shortDescription: 'Video streaming with recommendations',
    image: 'https://imgs.search.brave.com/streaming-placeholder',
    technologies: ['React', 'Node.js', 'MongoDB', 'FFmpeg', 'AWS S3'],
    category: 'fullstack',
    liveLink: '',
    githubLink: 'https://github.com/rasesh/video-platform',
    featured: false,
    year: 2023,
    status: 'active',
  },
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')

    console.log('✅ Connected to MongoDB')

    // Clear existing projects
    await Project.deleteMany({})
    console.log('🗑️  Cleared existing projects')

    // Insert sample projects
    const insertedProjects = await Project.insertMany(projects)
    console.log(`✅ Inserted ${insertedProjects.length} projects`)

    // Display summary
    console.log('\n📊 Projects Summary:')
    console.log(`Total: ${insertedProjects.length}`)
    console.log(`Featured: ${insertedProjects.filter(p => p.featured).length}`)
    console.log(`By Category:`)
    const categories = {}
    insertedProjects.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1
    })
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`  - ${cat}: ${count}`)
    })

    console.log('\n✨ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
