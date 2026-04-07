# Backend Setup Guide

Complete guide to set up and run your MongoDB-integrated portfolio backend.

## 📋 Prerequisites

- Node.js 14+ installed
- npm or yarn
- MongoDB account (free at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Gmail account with 2FA enabled (optional, for email feature)

## 🚀 Step-by-Step Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

**Installed Packages:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `nodemailer` - Email sending
- `express-validator` - Input validation
- `bcryptjs` - Password hashing (future use)
- `nodemon` - Auto-reload on changes (dev)

### Step 3: Create `.env` File

Create a new file named `.env` in the backend folder:

```bash
# Copy from .env.example
cp .env.example .env
```

Then edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Step 4: Get MongoDB Connection String

#### Option A: MongoDB Atlas (Recommended - Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create new project
4. Create cluster (free tier available)
5. Click "Connect" → "Drivers" → "Node.js"
6. Copy connection string
7. Replace `<username>` and `<password>` with actual credentials
8. Add to `.env` as `MONGODB_URI`

**CLI Quick Setup:**
```bash
# Connection string looks like:
mongodb+srv://username:password@cluster-name.mongodb.net/portfolio?retryWrites=true&w=majority
```

#### Option B: Local MongoDB

If running MongoDB locally:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**Install MongoDB locally:**
- Windows: [Download MongoDB](https://www.mongodb.com/try/download/community)
- Mac: `brew install mongodb-community`
- Linux: Follow [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

Then start MongoDB:
```bash
# Windows
net start MongoDB

# Mac/Linux
brew services start mongodb-community
# or
mongod
```

### Step 5: Configure Email (Optional)

For contact form emails to work:

1. **Enable Gmail 2-Factor Authentication**
   - Google Account → Security → Enable 2-Step Verification

2. **Generate App Password**
   - Go to [Google Account - App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password

3. **Add to `.env`**
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### Step 6: Verify Backend Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── Contact.js           # Contact messages
│   ├── Project.js           # Portfolio projects
│   └── Chatbot.js           # Chat conversations
├── controllers/
│   ├── contactController.js # Contact logic
│   ├── chatbotController.js # Chatbot logic
│   └── projectController.js # Project logic
├── routes/
│   ├── contact.js           # Contact endpoints
│   ├── chatbot.js           # Chat endpoints
│   └── projects.js          # Project endpoints
├── server.js                # Main server
├── package.json             # Dependencies
├── .env                     # Environment variables
├── .env.example             # Template
└── nodemon.json             # Dev settings
```

### Step 7: Run Development Server

```bash
npm run dev
```

**Expected Output:**
```
✅ Server running on http://localhost:5000
📚 API Documentation: http://localhost:5000
🏥 Health Check: http://localhost:5000/health
✅ MongoDB connected successfully
```

### Step 8: Test Backend

#### Test Health Endpoint (in browser or terminal)
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "Server is running!",
  "environment": "development"
}
```

#### Test Contact API
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the backend"
  }'
```

#### Test Chat API
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your skills?"}'
```

#### Test Projects API
```bash
curl http://localhost:5000/api/projects
```

### Step 9: Connect Frontend to Backend

In your frontend (React), update API calls:

```javascript
// src/services/api.js
const API_URL = 'http://localhost:5000'

export const submitContact = async (data) => {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const sendChatMessage = async (message) => {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  return response.json()
}

export const getProjects = async () => {
  const response = await fetch(`${API_URL}/api/projects`)
  return response.json()
}
```

### Step 10: Run Both Frontend & Backend

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📊 Database Models

### Automatic Collection Creation
Mongoose automatically creates collections when you submit data:

- `contacts` - Contact form submissions
- `projects` - Portfolio projects
- `chatbots` - Chat conversations

### MongoDB Compass (Visualize Data)

View your data locally:

1. Download [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
2. Connect to your MongoDB
3. Browse collections and documents

---

## 🔧 Common Issues & Solutions

### ❌ "ECONNREFUSED" - MongoDB Connection Failed

**Problem:** Can't connect to MongoDB

**Solutions:**
1. Check `MONGODB_URI` in `.env`
2. Verify MongoDB Atlas IP whitelist
   - Go to MongoDB Atlas → Network Access
   - Add your IP or 0.0.0.0/0 (less secure)
3. Check internet connection
4. Verify username/password in connection string

### ❌ "Gmail SMTP Error"

**Problem:** Emails not sending

**Solutions:**
1. Use App Password (NOT regular password)
2. Enable 2FA on Gmail
3. Check credentials in `.env`
4. Verify email sending is enabled

### ❌ "Port 5000 already in use"

**Problem:** Port already taken

**Solutions:**

Windows:
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Mac/Linux:
```bash
lsof -i :5000
kill -9 <PID>
```

Or use different port:
```env
PORT=5001
```

### ❌ "Cannot find module mongoose"

**Problem:** Dependencies not installed

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📈 Deploying to Production

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...@cluster.mongodb.net/portfolio
FRONTEND_URL=https://yoursite.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=app_password
```

### Deploy to Heroku

```bash
# Login
heroku login

# Create app
heroku create your-app-name

# Add environment variables
heroku config:set MONGODB_URI="your_connection_string"
heroku config:set EMAIL_USER="your_email"
heroku config:set EMAIL_PASSWORD="your_password"
heroku config:set FRONTEND_URL="your_frontend_url"

# Deploy
git push heroku main
```

### Deploy to Railway

1. Connect GitHub repo
2. Add environment variables in Railway dashboard
3. Auto-deploys on push

### Deploy to Render

1. Create account at [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub
4. Add environment variables
5. Deploy

---

## 🧪 Testing APIs with Postman

### Create Postman Collection

1. Create new collection "Portfolio API"
2. Add requests:

**POST /api/contact**
```json
POST http://localhost:5000/api/contact
Headers: Content-Type: application/json
Body:
{
  "name": "Test",
  "email": "test@example.com",
  "message": "Test message"
}
```

**GET /api/projects**
```
GET http://localhost:5000/api/projects
```

**POST /api/chat**
```json
POST http://localhost:5000/api/chat
Headers: Content-Type: application/json
Body:
{
  "message": "What are your skills?"
}
```

---

## 📚 Full API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete endpoint reference.

---

## 🎯 Next Steps

1. ✅ Backend running on localhost:5000
2. ✅ MongoDB connected
3. ✅ All APIs working
4. Next: Connect frontend components
5. Next: Add authentication
6. Next: Deploy to production

---

## ✅ Checklist

- [ ] MongoDB Atlas account created
- [ ] Backend `.env` configured
- [ ] `npm install` completed
- [ ] Backend running on port 5000
- [ ] MongoDB connection verified
- [ ] Contact API tested
- [ ] Chat API tested
- [ ] Projects API tested
- [ ] Frontend connected
- [ ] Emails working (if enabled)

---

**Status:** ✅ **READY TO USE**

Your backend is fully configured and ready for development!
