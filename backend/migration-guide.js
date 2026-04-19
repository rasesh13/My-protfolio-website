#!/usr/bin/env node

/**
 * COMPLETE RENDER MIGRATION AUTOMATION
 * One command to handle the entire migration process
 * 
 * Phase 1: GitHub Push ✅ (already done)
 * Phase 2: Render Deployment (manual via dashboard)
 * Phase 3: Frontend Update (automated)
 * Phase 4: Verification (automated)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

console.log('\n' + '█'.repeat(70))
console.log('█' + ' '.repeat(68) + '█')
console.log('█' + '  ⚡ RENDER MIGRATION - COMPLETE AUTOMATION GUIDE'.padEnd(69) + '█')
console.log('█' + ' '.repeat(68) + '█')
console.log('█'.repeat(70) + '\n')

// Phase 1
console.log('╔' + '═'.repeat(68) + '╗')
console.log('║ PHASE 1: GitHub Push ' + '█'.repeat(35) + ' ✅ DONE' + ' '.repeat(0) + '║')
console.log('╚' + '═'.repeat(68) + '╝')
console.log(`
✅ Code has been pushed to GitHub
   Repository: https://github.com/rasesh13/My-protfolio-website
   Branch: main
   Files: render.yaml, RENDER_DEPLOYMENT.md, render-setup.js, update-frontend.js
\n`)

// Phase 2
console.log('╔' + '═'.repeat(68) + '╗')
console.log('║ PHASE 2: Render Deployment ' + '█'.repeat(26) + ' ⏳ MANUAL' + ' '.repeat(3) + '║')
console.log('╚' + '═'.repeat(68) + '╝')

const deploymentSteps = `
📋 RENDER DEPLOYMENT STEPS (Copy & Paste Ready)

1️⃣  VISIT RENDER DASHBOARD
   https://render.com/dashboard

2️⃣  SIGN UP / SIGN IN
   • Use GitHub account (recommended)
   • Authorize Render access

3️⃣  CREATE WEB SERVICE
   • Click "New +" button (top right)
   • Select "Web Service"
   • Connect account → Select GitHub
   • Choose "My-protfolio-website" repository
   • Click "Connect"

4️⃣  CONFIGURE SERVICE
   Field                    Value
   ─────────────────────────────────────────
   Name                     portfolio-backend
   Branch                   main
   Root Directory           backend
   Build Command            npm install
   Start Command            npm start
   Environment              Node
   Plan                     Free
   Region                   Oregon (or closest)

5️⃣  ADD ENVIRONMENT VARIABLES (Click "Advanced")
   
   Add each one:
   
   Key: NODE_ENV
   Value: production
   
   Key: PORT
   Value: 5000
   
   Key: MONGODB_URI
   Value: mongodb+srv://raseshvarshney82_db_user:Yuga8ajJwiF9NTul@cluster0.3oo80at.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
   
   Key: EMAIL_USER
   Value: raseshvarshney82@gmail.com
   
   Key: EMAIL_PASSWORD
   Value: nluiozutoqqaqmcq

6️⃣  DEPLOY
   • Click "Create Web Service"
   • Wait 2-3 minutes for deployment
   • You'll see green "Live" status when complete

7️⃣  GET YOUR URL
   • After deployment, copy the URL from top:
   • Format: https://portfolio-backend-xxxx.onrender.com
   • SAVE THIS URL ⚠️

8️⃣  TEST DEPLOYMENT
   • Open: https://portfolio-backend-xxxx.onrender.com/health
   • Should show: { "status": "Server is running!", ... }

✏️  COPY YOUR RENDER URL HERE:
   ┌─────────────────────────────────────────────┐
   │ https://portfolio-backend-__________________ │
   └─────────────────────────────────────────────┘

⏱️  TIME: ~8 minutes (5 min setup + 2-3 min deploy)
`

console.log(deploymentSteps)

// Phase 3
console.log('╔' + '═'.repeat(68) + '╗')
console.log('║ PHASE 3: Frontend Update ' + '█'.repeat(29) + ' 🤖 AUTO' + ' '.repeat(4) + '║')
console.log('╚' + '═'.repeat(68) + '╝')

const frontendSteps = `
🔄 ONCE YOU HAVE YOUR RENDER URL, RUN THIS COMMAND:

   node update-frontend.js https://portfolio-backend-xxxx.onrender.com
   
   Replace "xxxx" with your actual Render URL

This will:
   ✅ Update frontend/src/config/api.js
   ✅ Show you the exact changes made
   ✅ Print next steps for final deployment
`

console.log(frontendSteps)

// Phase 4
console.log('╔' + '═'.repeat(68) + '╗')
console.log('║ PHASE 4: Final Verification ' + '█'.repeat(27) + ' 🤖 AUTO' + ' '.repeat(3) + '║')
console.log('╚' + '═'.repeat(68) + '╝')

const verificationSteps = `
✔️  FINAL STEPS (After frontend update):

1. Commit frontend changes:
   cd ..
   git add frontend/src/config/api.js
   git commit -m "Update backend URL to Render"

2. Push to GitHub:
   git push origin main

3. Redeploy frontend on Vercel:
   • https://vercel.com/dashboard
   • Click "portfolio" (frontend)
   • Click "Redeploy" button
   • Wait for deployment (2-3 minutes)

4. DELETE OLD VERCEL BACKEND:
   • https://vercel.com/dashboard
   • Click "backend" project
   • Settings → Danger Zone → Delete Project
   • Confirm deletion

5. TEST EVERYTHING:
   • Visit: https://frontend-three-orcin-18.vercel.app
   • Fill contact form
   • Should see: "Message sent successfully!"
   • Check email inbox for confirmation

✅ DONE! Backend is now on Render (24/7 always-on) 🎉
`

console.log(verificationSteps)

// Summary
console.log('╔' + '═'.repeat(68) + '╗')
console.log('║ SUMMARY' + ' '.repeat(61) + '║')
console.log('╚' + '═'.repeat(68) + '╝')

const summary = `
📊 WHAT'S HAPPENING:

  BEFORE (Current):
  ├─ Frontend: Vercel (always-on) ✅
  └─ Backend: Vercel (cold-starts, times out)

  AFTER (New):
  ├─ Frontend: Vercel (always-on) ✅
  └─ Backend: Render (always-on, 24/7) ✅ NEW!

🎯 BENEFITS:
  ✅ Backend never sleeps (no cold-starts)
  ✅ Contact form works instantly
  ✅ Emails send reliably
  ✅ Your portfolio works 24/7 regardless of laptop state
  ✅ Free tier is sufficient for your traffic

⏱️  TOTAL TIME: ~15-20 minutes
  • 5 min: Render dashboard setup
  • 2-3 min: Deployment on Render
  • 2-3 min: Frontend update and redeploy
  • 5 min: Testing and cleanup

📞 SUPPORT:
  Render Docs: https://render.com/docs
  Backend Health: https://portfolio-backend-xxxx.onrender.com/health
  GitHub: https://github.com/rasesh13/My-protfolio-website
`

console.log(summary)

// Create a todo checklist
const checklist = `
═══════════════════════════════════════════════════════════════
                    DEPLOYMENT CHECKLIST
═══════════════════════════════════════════════════════════════

📋 PHASE 1: GitHub Push
  ✅ Code committed
  ✅ Code pushed to GitHub

📋 PHASE 2: Render Deployment (DO THIS IN BROWSER)
  ☐ Go to https://render.com/dashboard
  ☐ Sign in with GitHub
  ☐ Create Web Service
  ☐ Configure with values above
  ☐ Add environment variables
  ☐ Click "Create Web Service"
  ☐ Wait for "Live" status (green)
  ☐ Copy your Render URL
  ☐ Test: /health endpoint returns data

📋 PHASE 3: Frontend Update (RUN THE COMMAND)
  ☐ Run: node update-frontend.js https://your-render-url.onrender.com
  ☐ Commit: git add frontend/src/config/api.js
  ☐ Commit: git commit -m "Update backend URL to Render"
  ☐ Push: git push origin main

📋 PHASE 4: Redeploy & Cleanup
  ☐ Redeploy frontend on Vercel
  ☐ Delete old Vercel backend project
  ☐ Test contact form on frontend
  ☐ Check email inbox for confirmation

✅ DONE!
═══════════════════════════════════════════════════════════════
`

console.log(checklist)

console.log('█'.repeat(70))
console.log('\n👉 START HERE: https://render.com/dashboard\n')
console.log('📧 Questions? See RENDER_DEPLOYMENT_STEPS.md\n')
console.log('█'.repeat(70) + '\n')
