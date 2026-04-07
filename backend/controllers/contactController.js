import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'
import { storeMessage } from '../utils/messageStore.js'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Get email transporter (create fresh each time to ensure env vars are loaded)
 */
const getEmailTransporter = () => {
  console.log('🔐 Creating email transporter with:', {
    user: process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 5) + '***' : 'NOT SET',
    hasPassword: !!process.env.EMAIL_PASSWORD
  })
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

/**
 * Send contact form email
 */
const sendContactEmail = async (data) => {
  const { name, email, message } = data

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('⚠️ Email credentials not configured - skipping email')
    return
  }

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Contact from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  }

  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Message Received - Rasesh Varshney',
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>Hi ${name},</p>
      <p>I've received your message and will get back to you as soon as possible.</p>
      <p>Best regards,<br>Rasesh Varshney</p>
    `,
  }

  try {
    const transporter = getEmailTransporter()
    console.log('📮 Sending email to admin...')
    await transporter.sendMail(adminMailOptions)
    console.log('✅ Admin email sent to:', process.env.EMAIL_USER)
    
    console.log('📮 Sending confirmation email to user...')
    await transporter.sendMail(userMailOptions)
    console.log('✅ User email sent to:', email)
    
    console.log('✅ All emails sent successfully')
  } catch (error) {
    console.error('❌ Email sending failed:', error.message)
    throw error
  }
}

/**
 * Handle contact form submission
 * POST /api/contact
 */
export const submitContact = async (req, res) => {
  try {
    console.log('📨 Contact form received:', req.body)

    const { name, email, subject, message, phone } = req.body

    // Validate fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    // Log for debugging
    console.log('✅ Form validation passed')

    // Try to save to MongoDB if connected
    try {
      console.log('💾 Attempting to save contact to MongoDB...')
      const ipAddress = req.ip
      const contact = new Contact({
        name,
        email,
        subject,
        message,
        phone,
        ipAddress,
      })
      const savedContact = await contact.save()
      console.log('✅ Contact saved to MongoDB with ID:', savedContact._id)

      // Try to send email
      try {
        console.log('📧 Attempting to send emails...')
        await sendContactEmail({ name, email, message, subject })
        console.log('✅ Emails sent successfully')
      } catch (emailError) {
        console.warn('⚠️ Email sending failed (but contact was saved):', emailError.message)
      }

      return res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully!',
        contactId: savedContact._id,
      })
    } catch (dbError) {
      console.warn('⚠️ Database error:', dbError.message)
      // Store in memory as fallback
      const storedMessage = storeMessage({
        name,
        email,
        subject,
        message,
        phone,
        source: 'fallback_memory'
      })
      console.log('📝 Returning success with memory storage fallback')
      return res.status(201).json({
        success: true,
        message: 'Your message has been received. Thank you for reaching out!',
        messageId: storedMessage.id,
      })
    }
  } catch (error) {
    console.error('❌ Contact submission error:', error.message)
    console.error('Stack trace:', error.stack)
    return res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Get all contacts (admin only)
 * GET /api/contact
 */
export const getAllContacts = async (req, res) => {
  try {
    const { status, search, limit = 20, page = 1 } = req.query

    let query = {}

    // Filter by status
    if (status) {
      query.status = status
    }

    // Search in name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)

    const total = await Contact.countDocuments(query)

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Get single contact
 * GET /api/contact/:id
 */
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    // Mark as read
    contact.isRead = true
    await contact.save()

    res.json({
      success: true,
      data: contact,
    })
  } catch (error) {
    console.error('Get contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Update contact status
 * PUT /api/contact/:id
 */
export const updateContact = async (req, res) => {
  try {
    const { status } = req.body

    if (!['pending', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      })
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Update contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

/**
 * Delete contact
 * DELETE /api/contact/:id
 */
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully',
    })
  } catch (error) {
    console.error('Delete contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

export { sendContactEmail }
