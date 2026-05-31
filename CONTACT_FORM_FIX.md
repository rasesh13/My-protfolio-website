# 🔧 Fix Contact Form on Render - Complete Guide

## ✅ Issues Fixed

### 1. Frontend URL Configuration ✅
- **Issue**: Frontend was hardcoded to `http://localhost:5000`
- **Fix**: Updated to use environment variable `VITE_API_URL`
- **File**: `frontend/.env` → `https://my-protfolio-website-uh8o.onrender.com`

### 2. Contact Component ✅
- **Issue**: Contact.jsx had hardcoded localhost URL
- **Fix**: Updated to use `VITE_API_URL` environment variable
- **File**: `frontend/src/components/Contact.jsx`

### 3. Backend CORS ✅
- **Issue**: CORS might be rejecting frontend requests
- **Fix**: Updated CORS configuration with better debugging
- **File**: `backend/server.js`

---

## 📋 Render Environment Variables Setup

### Add These to Your Render Backend Dashboard:

1. **Go to Render Dashboard** → Your Backend Service
2. **Settings** → **Environment**
3. **Add these variables:**

```
NODE_ENV=production
PORT=3001
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=raseshvarshney@gmail.com
EMAIL_PASSWORD=lgdwqlyurwyeycca
FRONTEND_URL=https://your-frontend-url.vercel.app (or wherever frontend is deployed)
```

### Critical: EMAIL_PASSWORD
The app password is already configured:
- **EMAIL_USER**: `raseshvarshney@gmail.com`
- **EMAIL_PASSWORD**: `lgdwqlyurwyeycca`

⚠️ Make sure these are exactly copied (16 characters, no spaces)

---

## 🚀 What to Do Now

### Step 1: Update Frontend .env
✅ Already done! File updated to:
```
VITE_API_URL=https://my-protfolio-website-uh8o.onrender.com
```

### Step 2: Rebuild & Deploy Frontend
If frontend is on Vercel/Netlify:
```bash
cd frontend
npm run build
# Push to GitHub to trigger auto-deploy
git add .
git commit -m "Fix contact form API URL for production"
git push
```

Or manually redeploy in your frontend hosting dashboard.

### Step 3: Verify Render Environment Variables
1. Log into [Render Dashboard](https://dashboard.render.com)
2. Select your backend service
3. Go to **Settings** → **Environment**
4. Verify all variables are present:
   - `NODE_ENV=production`
   - `EMAIL_USER=raseshvarshney@gmail.com`
   - `EMAIL_PASSWORD=lgdwqlyurwyeycca`
   - `MONGODB_URI=<your_uri>`
   - `FRONTEND_URL=<your_frontend_url>`

### Step 4: Test the API
```bash
# Test health endpoint
curl https://my-protfolio-website-uh8o.onrender.com/health

# Should return:
# {
#   "status": "Server is running!",
#   "timestamp": "2026-05-31T...",
#   "environment": "production"
# }
```

### Step 5: Test Contact Form
1. Go to your frontend website
2. Scroll to Contact section
3. Fill out the form with:
   - Name: Test Name
   - Email: your@email.com
   - Subject: Test Subject
   - Message: This is a test message
4. Click Send
5. Check email inbox (might be in spam)

---

## 🐛 Troubleshooting Contact Form

### Issue: "Failed to send message" Error

**Cause 1: API URL not correct**
```bash
# Check browser console (F12) for the actual URL being called
# It should show: https://my-protfolio-website-uh8o.onrender.com/api/contact
```

**Cause 2: CORS Error**
- ✅ Fixed in backend/server.js
- Redeploy backend service on Render

**Cause 3: Email credentials wrong**
- Verify in Render environment variables
- Email: `raseshvarshney@gmail.com`
- Password: `lgdwqlyurwyeycca` (exactly as shown)

**Cause 4: MongoDB not accessible**
- Check `MONGODB_URI` in Render environment
- Verify database is running and accessible

---

## 🔍 How to Debug

### Check Backend Logs
1. Go to **Render Dashboard**
2. Select your backend service
3. Click **Logs** tab
4. Try submitting contact form
5. Look for error messages

**Expected logs for successful submission:**
```
✅ Emails sent successfully
POST /api/contact 201
```

**If you see errors:**
- `❌ Email sending failed` → Email configuration issue
- `CORS Error` → Frontend URL not in allowed origins
- `Connection refused` → Backend not running

---

## 📧 Gmail App Password Verification

The configured password should be 16 characters (without spaces):
`lgdwqlyurwyeycca`

If it's not working:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Look for "App passwords"
3. Generate a new one for "Mail" + "Windows Computer"
4. Copy the 16-character password
5. Update `EMAIL_PASSWORD` in Render

---

## ✨ Summary of Changes

| File | Change | Status |
|------|--------|--------|
| `frontend/.env` | Updated API URL | ✅ Done |
| `frontend/src/components/Contact.jsx` | Use env var | ✅ Done |
| `backend/server.js` | Improved CORS | ✅ Done |
| `backend/.env` | Email config | ✅ Ready |
| Render Dashboard | Add env vars | ⏳ You need to do |

---

## 🎯 Next Steps (In Order)

1. [ ] Push changes to GitHub
   ```bash
   git add .
   git commit -m "Fix contact form for production"
   git push
   ```

2. [ ] Wait for frontend to redeploy automatically (if on Vercel/Netlify)

3. [ ] Go to Render Dashboard and add environment variables

4. [ ] Test the contact form at your deployed frontend

5. [ ] Verify email arrives in your inbox

---

## 💡 Pro Tips

- **Render free tier**: Apps spin down after 15 min of inactivity (takes ~30s to restart)
- **Email delivery**: Check spam folder if email doesn't arrive
- **Cold start**: First request might be slow (spinning up)
- **HTTPS**: Make sure to use `https://` not `http://` in frontend

---

**Status**: 🚀 Ready for testing!  
**Frontend Fix**: ✅ Complete  
**Backend Fix**: ✅ Complete  
**Render Config**: ⏳ Pending your action

Test your contact form now! 📧
