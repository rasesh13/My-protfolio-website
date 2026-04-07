# 🚀 Quick Start Guide

Get your portfolio website up and running in minutes!

## Prerequisites
- Node.js v16+ ([Download](https://nodejs.org))
- npm or yarn
- Git (optional)

## Step-by-Step Setup

### 1️⃣ Clone/Create the Project
```bash
cd your-desired-directory
```

### 2️⃣ Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 3️⃣ Configure Environment Variables

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
```

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

Edit the `.env` files with your settings:

**Backend .env:**
```
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

> **Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)

### 4️⃣ Start Development Servers

**Windows:**
```bash
start-dev.bat
```

**macOS/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Manual (Recommended):**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### 5️⃣ View Your Portfolio
Open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/health

## 🎨 Customization

### Update Your Information
1. **Hero Section** - Edit `frontend/src/components/Hero.jsx`
2. **About Section** - Edit `frontend/src/components/About.jsx`
3. **Skills** - Edit `frontend/src/components/Skills.jsx`
4. **Projects** - Edit `frontend/src/components/Projects.jsx`
5. **Experience** - Edit `frontend/src/components/Experience.jsx`
6. **Contact** - Edit `frontend/src/components/Contact.jsx`
7. **Footer** - Edit `frontend/src/components/Footer.jsx`

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'purple-glow': '#your-color',
      'blue-glow': '#your-color',
    }
  }
}
```

### Customize Social Links
Update links in:
- `frontend/src/components/Contact.jsx`
- `frontend/src/components/Footer.jsx`
- `frontend/src/components/Navbar.jsx`

## 🔗 Email Setup (Contact Form)

### Gmail with App Password:
1. Enable 2-factor authentication
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Generate an App Password
4. Add to `.env`:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=generated_app_password
```

### Other Email Providers:
Edit `backend/controllers/contactController.js` to configure your email service.

## 📦 Build for Production

### Frontend:
```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/`

### Backend:
```bash
cd backend
npm start
```

## 🚢 Deployment

### Deploy Frontend:
1. **Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

### Deploy Backend:
1. **Railway**
2. **Render**
3. **Heroku**
4. **AWS/GCP/Azure**

Set environment variables on deployment platform.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### npm install Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Email Not Sending
- Check `.env` file is set
- Verify Gmail App Password is correct
- Check Network tab in browser DevTools

## 📚 Useful Commands

```bash
# Frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build

# Backend
npm run dev        # Start with nodemon
npm start          # Production start

# Both
npm audit          # Check dependencies
npm update         # Update packages
npm install package-name  # Install new package
```

## 💡 Tips

- Use VS Code for best development experience
- Install ES7+ React extensions for VS Code
- Keep `.env` files in `.gitignore` (don't commit)
- Test contact form before deploying
- Use Lighthouse for performance audit

## 🤝 Need Help?

- Check [Troubleshooting](#-troubleshooting) section
- Review [README.md](README.md) for more details
- Check component comments in code
- Open an issue on GitHub

## ✨ Next Steps

After setup, consider:
- [ ] Add your real projects
- [ ] Update social links
- [ ] Configure email
- [ ] Add blog section
- [ ] Deploy to production
- [ ] Add analytics
- [ ] Set up CI/CD

Happy coding! 🚀
