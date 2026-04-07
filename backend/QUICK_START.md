# 🚀 Backend Quick Start

## ⚡ 30-Second Setup

### 1️⃣ Create Environment File
```bash
cd backend
cp .env.example .env
```

### 2️⃣ Set MongoDB URI
Edit `.env` and add:
```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio

# OR for MongoDB Atlas (cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 3️⃣ Run Backend
```bash
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### 4️⃣ Test It
```bash
curl http://localhost:5000/api/chat \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

---

## 🎯 What's Included

### 📧 Contact API
Send and manage contact form submissions
```bash
POST /api/contact
GET /api/contact
PUT /api/contact/:id
DELETE /api/contact/:id
```

### 🤖 Chatbot API
AI chatbot with conversation history
```bash
POST /api/chat
GET /api/chat/history
GET /api/chat/stats
```

### 📁 Projects API
Manage your portfolio projects
```bash
GET /api/projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id
```

---

## 📊 Load Sample Data

```bash
npm run seed
```

Loads 8 example projects into database.

---

## ✅ Files Created

```
models/          - Database schemas (Contact, Project, Chatbot)
controllers/     - Business logic
routes/          - API endpoints
config/          - Database connection
server.js        - Express app
seed.js          - Sample data
```

---

## 📚 Need Help?

- **Full Setup?** → See `BACKEND_SETUP.md`
- **API Reference?** → See `API_DOCUMENTATION.md`
- **Overview?** → See `README.md`

---

## 🔗 Connect Frontend

In your React app:

```javascript
const API = 'http://localhost:5000'

// Contact
fetch(`${API}/api/contact`, {
  method: 'POST',
  body: JSON.stringify(data)
})

// Chat
fetch(`${API}/api/chat`, {
  method: 'POST',
  body: JSON.stringify({ message })
})

// Projects
fetch(`${API}/api/projects`)
```

---

**Status:** ✅ Complete and Ready!
