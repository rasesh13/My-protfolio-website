import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

console.log('🧪 LOCAL EMAIL TEST\n')
console.log('📋 Configuration:')
console.log('  - Email User:', process.env.EMAIL_USER)
console.log('  - Has Password:', process.env.EMAIL_PASSWORD ? '✅ YES' : '❌ NO')
console.log('  - Password Length:', process.env.EMAIL_PASSWORD?.length)
console.log('')

async function testEmail() {
  try {
    console.log('1️⃣ Creating Nodemailer transporter...')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      logger: true,
      debug: true
    })
    console.log('✅ Transporter created\n')

    console.log('2️⃣ Verifying SMTP connection...')
    await transporter.verify()
    console.log('✅ SMTP connection verified!\n')

    console.log('3️⃣ Sending test email...')
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email - Portfolio Contact Form',
      html: `
        <h2>Email Configuration Test</h2>
        <p>If you received this email, your Gmail + Nodemailer setup is working correctly! ✅</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `
    })
    console.log('✅ Email sent successfully!')
    console.log('   Message ID:', result.messageId)
    console.log('\n📧 Check your inbox for the test email!\n')

  } catch (error) {
    console.error('❌ ERROR OCCURRED:')
    console.error('   Message:', error.message)
    console.error('   Code:', error.code)
    console.error('   Command:', error.command)
    console.error('   Response:', error.response)
    console.error('\n💡 TROUBLESHOOTING:')
    console.error('   - Verify EMAIL_USER and EMAIL_PASSWORD in .env.local')
    console.error('   - Check if 2FA is enabled on Gmail')
    console.error('   - Verify app password has no spaces')
    console.error('   - Check if "Less Secure Apps" setting affects this')
  }
}

testEmail()
