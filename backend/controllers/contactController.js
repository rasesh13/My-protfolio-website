import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'
import { storeMessage } from '../utils/messageStore.js'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Get email transporter (create fresh each time to ensure env vars are loaded)
 */
const getEmailTransporter = () => {
  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_PASSWORD
  
  console.log('🔐 Email Configuration Check:')
  console.log('  - Email User:', emailUser ? emailUser.substring(0, 5) + '***' : '❌ NOT SET')
  console.log('  - Email Password:', emailPassword ? '✅ SET (' + emailPassword.length + ' chars)' : '❌ NOT SET')
  console.log('  - All env vars:', Object.keys(process.env).filter(k => k.includes('EMAIL') || k.includes('MONGODB')))
  
  if (!emailUser || !emailPassword) {
    console.error('❌ CRITICAL: Missing email credentials!')
    console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'EXISTS' : 'MISSING')
    console.error('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'EXISTS' : 'MISSING')
    throw new Error('Email credentials not configured! Check Vercel environment variables.')
  }
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
    logger: true,
    debug: true  // Enable detailed debugging
  })
  
  return transporter
}

/**
 * Send contact form email
 */
const sendContactEmail = async (data) => {
  const { name, email, message, subject } = data
  const adminEmail = process.env.EMAIL_USER

  try {
    console.log('\n📧 Starting email sending process...')
    console.log('   Admin email:', adminEmail ? adminEmail.substring(0, 5) + '***' : 'UNDEFINED')
    console.log('   User email:', email)
    console.log('   Subject:', subject)
    
    const transporter = getEmailTransporter()
    console.log('✅ Email transporter created successfully')

    // Prepare admin notification email
    const adminMailOptions = {
      from: adminEmail,
      to: adminEmail,  // Send to admin (yourself)
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #333;">📨 New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #999; font-size: 12px;">Received: ${new Date().toLocaleString()}</p>
        </div>
      `,
    }

    // Prepare user confirmation email
    const userMailOptions = {
      from: adminEmail,
      to: email,  // Send to the person who submitted
      subject: 'Thank You - Message Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #333;">Thank you for reaching out! 👋</h2>
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p>Best regards,<br><strong>Rasesh Varshney</strong></p>
        </div>
      `,
    }

    // Send admin notification
    console.log('📮 Sending notification email to admin...')
    try {
      const adminResult = await transporter.sendMail(adminMailOptions)
      console.log('✅ Admin notification sent! ID:', adminResult.messageId)
    } catch (adminEmailError) {
      console.error('❌ Failed to send admin notification:', adminEmailError.message)
      console.error('Error code:', adminEmailError.code)
      console.error('Response:', adminEmailError.response)
      throw adminEmailError
    }
    
    // Send user confirmation
    console.log('📮 Sending confirmation email to user...')
    try {
      const userResult = await transporter.sendMail(userMailOptions)
      console.log('✅ User confirmation sent! ID:', userResult.messageId)
    } catch (userEmailError) {
      console.error('❌ Failed to send user confirmation:', userEmailError.message)
      console.error('Error code:', userEmailError.code)
      // Don't fail completely if user email fails
      console.warn('⚠️ Proceeding even though user confirmation failed')
    }
    
    console.log('✅ Email sending completed!\n')
    return true
  } catch (error) {
    console.error('\n❌ EMAIL SENDING ERROR!')
    console.error('   Message:', error.message)
    console.error('   Code:', error.code)
    console.error('   Response:', error.response)
    console.error('   Command:', error.command)
    console.error('\n')
    
    // Even if email fails, we'll return a partial success since the message is stored
    throw error
  }
}

/**
 * Handle contact form submission
 * POST /api/contact
 */
export const submitContact = async (req, res) => {
  try {
    console.log('\n' + '='.repeat(60))
    console.log('📨 NEW CONTACT SUBMISSION')
    console.log('='.repeat(60))
    console.log('Form Data:', req.body)

    const { name, email, subject, message, phone } = req.body

    // Validate fields
    if (!name || !email || !subject || !message) {
      console.warn('❌ Validation failed - missing required fields')
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required',
      })
    }

    console.log('✅ Form validation passed')
    let savedContactId = null
    let emailsSent = false
    let errors = []

    // 1️⃣ STEP 1: Save to MongoDB
    try {
      console.log('\n1️⃣ SAVING TO MONGODB...')
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
      savedContactId = savedContact._id
      console.log('✅ Saved to MongoDB. ID:', savedContactId)
    } catch (dbError) {
      console.warn('⚠️ MONGODB FAILED:', dbError.message)
      errors.push('Database Save Failed: ' + dbError.message)
      // Continue anyway - we'll use memory fallback
    }

    // 2️⃣ STEP 2: Try to send emails
    try {
      console.log('\n2️⃣ SENDING EMAILS...')
      await sendContactEmail({ name, email, message, subject })
      emailsSent = true
      console.log('✅ Emails sent successfully')
    } catch (emailError) {
      console.error('❌ EMAIL SENDING FAILED!')
      console.error('   Error:', emailError.message)
      errors.push('Email Error: ' + emailError.message)
      // Continue - message was saved or will be in memory
    }

    // 3️⃣ STEP 3: Fallback to memory if needed
    if (!savedContactId) {
      console.log('\n3️⃣ USING MEMORY FALLBACK...')
      const storedMessage = storeMessage({
        name,
        email,
        subject,
        message,
        phone,
        source: 'memory_fallback',
        timestamp: new Date().toISOString()
      })
      console.log('✅ Message stored in memory. ID:', storedMessage.id)
    }

    // ✅ RETURN SUCCESS
    console.log('\n' + '='.repeat(60))
    console.log('✅ SUBMISSION PROCESSED SUCCESSFULLY')
    console.log('='.repeat(60) + '\n')

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      contactId: savedContactId,
      emailsSent: emailsSent,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('\n' + '❌'.repeat(30))
    console.error('CRITICAL ERROR IN CONTACT SUBMISSION')
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)
    console.error('❌'.repeat(30) + '\n')
    
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your submission. Please try again.',
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
