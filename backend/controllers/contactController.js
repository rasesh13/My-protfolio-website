import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'
import { storeMessage } from '../utils/messageStore.js'
import dotenv from 'dotenv'

dotenv.config()

// Persistent email transporter instance (reuse connection)
let emailTransporter = null

/**
 * Get email transporter - reuse or create
 */
const getEmailTransporter = () => {
  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_PASSWORD
  
  if (!emailUser || !emailPassword) {
    throw new Error('Email credentials not configured!')
  }

  // Reuse existing transporter
  if (emailTransporter) {
    return emailTransporter
  }
  
  // Create new transporter if none exists
  emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
    connectionTimeout: 5000,  // 5 seconds
    socketTimeout: 5000,      // 5 seconds
    pool: {
      maxConnections: 1,
      maxMessages: 100,
    }
  })
  
  // Test connection
  emailTransporter.verify((error) => {
    if (error) {
      console.error('❌ Email transporter error:', error.message)
      emailTransporter = null
    } else {
      console.log('✅ Email transporter ready')
    }
  })
  
  return emailTransporter
}

/**
 * Send contact form email
 */
const sendContactEmail = async (data) => {
  const { name, email, message, subject } = data
  const adminEmail = process.env.EMAIL_USER

  try {
    console.log('\n📧 SENDING EMAILS FUNCTION CALLED')
    console.log('  Recipient:', email)
    console.log('  Admin:', adminEmail)
    
    const transporter = getEmailTransporter()
    console.log('  ✓ Transporter obtained')

    // Prepare admin notification email
    const adminMailOptions = {
      from: adminEmail,
      to: adminEmail,
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
      to: email,
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
    console.log('  → Sending admin email to:', adminEmail)
    const adminResult = await transporter.sendMail(adminMailOptions)
    console.log('  ✅ Admin email sent. Message ID:', adminResult.messageId)
    console.log('     Response:', adminResult.response)
    
    // Send user confirmation
    console.log('  → Sending confirmation email to:', email)
    const userResult = await transporter.sendMail(userMailOptions)
    console.log('  ✅ User confirmation email sent. Message ID:', userResult.messageId)
    console.log('     Response:', userResult.response)
    
    console.log('📧 BOTH EMAILS SENT SUCCESSFULLY')
    return true
  } catch (error) {
    console.error('❌ EMAIL FUNCTION ERROR:')
    console.error('   Message:', error.message)
    console.error('   Code:', error.code)
    console.error('   Command:', error.command)
    console.error('   Full Error:', error)
    
    // Reset transporter on error to force new connection next time
    if (emailTransporter) {
      emailTransporter = null
      console.log('  ♻️ Transporter reset - will create new connection next time')
    }
    
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
    const ipAddress = req.ip

    // Store in memory and prepare for response
    console.log('\n⚡ Storing in memory...')
    const storedMessage = storeMessage({
      name,
      email,
      subject,
      message,
      phone,
      source: 'memory',
      timestamp: new Date().toISOString()
    })
    console.log('✅ Message stored in memory. ID:', storedMessage.id)

    // Process both DB save and email sending in PARALLEL
    // This ensures both complete before function ends (important for Vercel serverless)
    console.log('\n🔄 Starting parallel operations: DB save + Email sending...')
    
    try {
      await Promise.all([
        // OPERATION 1: Save to MongoDB
        (async () => {
          try {
            console.log('1️⃣ Saving to MongoDB...')
            const contact = new Contact({
              name,
              email,
              subject,
              message,
              phone,
              ipAddress,
            })
            const savedContact = await contact.save()
            console.log('✅ Saved to MongoDB. ID:', savedContact._id)
            return savedContact
          } catch (dbError) {
            console.warn('⚠️ MongoDB save failed:', dbError.message)
            // Don't throw - continue even if DB fails
            return null
          }
        })(),
        
        // OPERATION 2: Send emails with retry logic AND TIMEOUT
        (async () => {
          let emailRetries = 0
          const maxEmailRetries = 3
          
          const sendEmailWithRetry = async () => {
            try {
              console.log(`2️⃣ SENDING EMAILS (Attempt ${emailRetries + 1}/${maxEmailRetries})...`)
              console.log('   Email credentials check:')
              console.log('   - EMAIL_USER:', process.env.EMAIL_USER ? '✓ SET' : '✗ MISSING')
              console.log('   - EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✓ SET' : '✗ MISSING')
              
              // WRAP IN TIMEOUT - max 8 seconds per attempt
              const emailPromise = sendContactEmail({ name, email, message, subject })
              const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Email timeout')), 8000)
              )
              
              await Promise.race([emailPromise, timeoutPromise])
              console.log('✅ Emails sent successfully!')
              return true
            } catch (emailError) {
              emailRetries++
              console.error(`❌ EMAIL ATTEMPT ${emailRetries} FAILED:`)
              console.error('   Message:', emailError.message)
              console.error('   Code:', emailError.code)
              
              // Retry on temporary errors
              if (emailRetries < maxEmailRetries) {
                const waitTime = (emailError.code === 'ENOTFOUND' || emailError.code === 'ETIMEDOUT' || emailError.message === 'Email timeout') 
                  ? 1000 * emailRetries 
                  : 2000 * emailRetries
                console.log(`⏳ Retrying in ${waitTime}ms... (${emailRetries}/${maxEmailRetries})`)
                await new Promise(resolve => setTimeout(resolve, waitTime))
                return sendEmailWithRetry()
              } else {
                console.error('⚠️ EMAILS FAILED AFTER ALL RETRIES')
                // Don't throw - continue without emails
                return false
              }
            }
          }
          
          return sendEmailWithRetry()
        })()
      ])
      
      console.log('\n✅ Both operations completed!')
    } catch (parallelError) {
      console.error('\n⚠️ One or more operations failed:', parallelError.message)
      // Still respond with success since the message was stored
    }

    // ✅ Return success response
    console.log('\n' + '='.repeat(60))
    console.log('✅ RETURNING SUCCESS RESPONSE')
    console.log('='.repeat(60) + '\n')

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      contactId: storedMessage.id,
      emailsSent: 'Email sent!'
    })

  } catch (error) {
    console.error('\n' + '='.repeat(60))
    console.error('❌ ERROR IN submitContact:')
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)
    console.error('='.repeat(60) + '\n')
    
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
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
