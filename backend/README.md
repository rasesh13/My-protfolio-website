# 🚀 Portfolio Backend API

Complete MongoDB-integrated backend for your portfolio website with Contact Form, Chatbot, and Projects management APIs.

## ✨ Features

✅ **Contact Form API**
- Store contact submissions in MongoDB
- Email notifications (Gmail)
- Input validation
- Contact management (list, update, delete)
- Search and filtering

✅ **Chatbot API**
- AI-powered responses based on knowledge base
- Store conversation history
- Session tracking
- User feedback system
- Analytics and statistics

✅ **Projects API**
- Full CRUD operations
- Featured projects showcase
- Category filtering
- View tracking
- Search and pagination

✅ **Production Ready**
- Mongoose schema validation
- Error handling
- CORS configuration
- Environment variables
- Input sanitization
- Secure email handling

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Email:** Nodemailer
- **Validation:** express-validator
- **Dev Tool:** Nodemon

## 📦 Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Start Server
```bash
npm run dev
```

Server: **http://localhost:5000**

## 🗂️ Project Structure

```
backend/
├── config/
│   └── database.js              # MongoDB connection
├── models/
│   ├── Contact.js               # Contact schema
│   ├── Project.js               # Project schema
│   └── Chatbot.js               # Chatbot schema
├── controllers/
│   ├── contactController.js     # Contact logic
│   ├── chatbotController.js     # Chatbot logic
│   └── projectController.js     # Project logic
├── routes/
│   ├── contact.js               # /api/contact
│   ├── chatbot.js               # /api/chat
│   └── projects.js              # /api/projects
├── server.js                    # Express app
├── seed.js                      # Sample data
├── package.json                 # Dependencies
├── .env                         # Environment vars
├── .env.example                 # Template
├── nodemon.json                 # Dev config
├── API_DOCUMENTATION.md         # API reference
├── BACKEND_SETUP.md             # Setup guide
└── README.md                    # This file
```

## 🔌 API Endpoints

### Contact API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all contacts (admin) |
| GET | `/api/contact/:id` | Get single contact |
| PUT | `/api/contact/:id` | Update contact status |
| DELETE | `/api/contact/:id` | Delete contact |

### Chatbot API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message |
| GET | `/api/chat/history` | Get chat history |
| GET | `/api/chat/stats` | Get statistics |
| PUT | `/api/chat/:id/feedback` | Submit feedback |

### Projects API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/featured` | Get featured projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| PUT | `/api/projects/:id/views` | Increment views |

## 📝 Example Requests

### Submit Contact

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I am interested in your services"
  }'
```

### Send Chat Message

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are your skills?",
    "sessionId": "session_123"
  }'
```

### Get Projects

```bash
curl "http://localhost:5000/api/projects?featured=true&limit=6"
```

## 🗄️ Database Schema

### Contact
```javascript
{
  name: String (required, 2-50 chars)
  email: String (required, valid email)
  subject: String (optional)
  message: String (required, 10-2000 chars)
  phone: String (optional)
  isRead: Boolean
  status: 'pending' | 'replied' | 'archived'
  ipAddress: String
  timestamps: true
}
```

### Project
```javascript
{
  title: String (required)
  description: String (required)
  shortDescription: String
  image: String (required)
  images: [String]
  technologies: [String]
  category: 'web' | 'mobile' | 'fullstack' | 'ai' | 'other'
  liveLink: String (URL)
  githubLink: String (URL)
  featured: Boolean
  views: Number
  status: 'active' | 'draft' | 'archived'
  year: Number
  timestamps: true
}
```

### Chatbot
```javascript
{
  userMessage: String (required)
  botResponse: String (required)
  category: String
  sentiment: 'positive' | 'neutral' | 'negative'
  ipAddress: String
  sessionId: String
  isHelpful: Boolean
  timestamps: true
}
```

## 📧 Email Setup

### Gmail Configuration

1. **Enable 2FA on Gmail**
   - Go to [Google Account Security](https://myaccount.google.com)
   - Enable 2-Step Verification

2. **Create App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select Mail and Windows Computer
   - Copy the 16-character password

3. **Update `.env`**
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

## 🌱 Seed Database

Load sample project data:

```bash
npm run seed
```

This adds 8 sample projects to your database for testing.

## 🧪 Testing

### Using cURL

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test contact
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'

# Test chat
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'

# Test projects
curl http://localhost:5000/api/projects
```

### Using Postman

1. Import the API collection
2. Set base URL to `http://localhost:5000`
3. Test each endpoint

## 🔐 Security Features

✅ Input validation with express-validator
✅ CORS configuration
✅ Request size limiting
✅ Mongoose schema validation
✅ Email validation
✅ Environment variables for secrets
✅ Error handling middleware
✅ HTTP headers security

## 🚀 Deployment

### Environment Variables

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://yoursite.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_password
```

### Deploy to Heroku

```bash
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI="..."
heroku config:set EMAIL_USER="..."
heroku config:set EMAIL_PASSWORD="..."
git push heroku main
```

### Deploy to Railway

1. Connect GitHub repo
2. Add environment variables
3. Auto-deploy on push

### Deploy to Render

1. Create account
2. Connect GitHub
3. Add environment variables
4. Deploy

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check `MONGODB_URI` in `.env`
- Verify IP whitelist in MongoDB Atlas
- Ensure username/password are correct

### Email Not Sending
- Use App Password (not regular password)
- Enable 2FA on Gmail
- Check credentials in `.env`

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

## 📚 Documentation

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Detailed setup guide

## 📝 Scripts

```bash
npm run dev      # Development with hot reload
npm start        # Production start
npm run seed     # Load sample data
```

## 🎯 Next Steps

1. ✅ Backend running locally
2. ✅ APIs tested
3. Next: Connect frontend
4. Next: Add authentication
5. Next: Deploy to production

## ✅ Checklist

- [x] Express.js server setup
- [x] MongoDB Mongoose models
- [x] Contact form API
- [x] Chatbot API
- [x] Projects API
- [x] Input validation
- [x] Error handling
- [x] CORS configuration
- [x] Email integration
- [x] Database seed script
- [x] API documentation
- [ ] Authentication (ready to add)
- [ ] Admin dashboard (ready to add)
- [ ] Rate limiting (ready to add)

## 📞 Support

For issues or questions:
1. Check error logs in terminal
2. Review setup guide above
3. Check API documentation
4. Verify `.env` configuration

## 📄 License

This project is open source and available under the MIT License.

---

**Status:** ✅ **PRODUCTION READY**

All APIs fully functional and ready to use!
