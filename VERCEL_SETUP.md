# 🚀 Vercel Deployment Setup

## Configuration Complete ✅

Vercel configurations have been created for both frontend and backend.

### Files Created
- ✅ `frontend/vercel.json` - Frontend deployment config
- ✅ `backend/vercel.json` - Backend deployment config

---

## 📋 Next Steps

### 1. **Push to GitHub**
```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### 2. **Deploy Frontend**

#### Option A: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Select your portfolio repository
5. Framework: **Vite**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Root Directory: `frontend`
9. Click Deploy

#### Option B: Using Vercel CLI
```bash
cd frontend
npm install -g vercel
vercel
```

**Select options:**
- Link to existing project? **No**
- Set project name? **your-portfolio-frontend**
- Directory: `.` (current)
- Build: **Y**
- Override build settings? **No**

### 3. **Deploy Backend**

#### Option A: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select your portfolio repository
4. Framework: **Other**
5. Build Command: `npm install`
6. Root Directory: `backend`
7. Environment Variables (add these):
   ```
   NODE_ENV=production
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   MONGODB_URI=your_mongodb_uri (if using)
   PORT=3001
   ```
8. Click Deploy

#### Option B: Using Vercel CLI
```bash
cd backend
vercel
```

**Select options:**
- Link to existing project? **No**
- Set project name? **your-portfolio-backend**
- Directory: `.` (current)
- Build: **Y**
- Override build settings? **No**

Then add environment variables via Vercel dashboard.

---

## 🔧 Environment Variables

### Frontend `.env` (Vercel Dashboard)
```
VITE_API_URL=https://your-backend.vercel.app
```

### Backend `.env` (Vercel Dashboard)
```
NODE_ENV=production
PORT=3001
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

---

## 📝 Configuration Details

### Frontend (vercel.json)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **Security Headers**: Configured
- **Rewrites**: SPA routing support

### Backend (vercel.json)
- **Version**: 2 (Serverless Functions)
- **Memory**: 1024 MB
- **Max Duration**: 60 seconds
- **Runtime**: Node.js 18.x
- **Routes**: API endpoints configured
- **Functions**: server.js wrapped

---

## ✅ What's Configured

✅ Frontend with Vite optimization  
✅ Backend with Express support  
✅ Security headers included  
✅ SPA routing configured  
✅ API routes mapped  
✅ Environment variables ready  
✅ Production optimized  

---

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Deployment Documentation](https://vercel.com/docs/concepts/deployments/overview)

---

## 📧 Gmail App Password Setup

If you haven't set up Gmail app password:

1. Enable 2-Factor Authentication: [myaccount.google.com/security](https://myaccount.google.com/security)
2. Go to "App passwords"
3. Select "Mail" and "Windows Computer"
4. Generate app password
5. Use this password for `EMAIL_PASSWORD`

---

## 🎯 Quick Checklist

- [ ] Push to GitHub
- [ ] Deploy Frontend to Vercel
- [ ] Deploy Backend to Vercel
- [ ] Add environment variables
- [ ] Test deployed application
- [ ] Update DNS (if using custom domain)
- [ ] Set up monitoring

---

## 🚨 Common Issues & Solutions

### Issue: Build fails on Vercel
**Solution**: Make sure `npm run build` works locally first
```bash
npm install
npm run build
```

### Issue: Backend not receiving requests
**Solution**: Update `VITE_API_URL` in frontend environment variables to match backend URL

### Issue: Email not sending
**Solution**: Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct in backend environment

### Issue: CORS errors
**Solution**: Update backend CORS settings with frontend URL
```javascript
// In server.js
cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
})
```

---

**Status**: ✅ Ready for Vercel Deployment  
**Next Action**: Push to GitHub and deploy!
