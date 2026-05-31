# 🚀 Quick Vercel Deployment Guide

## Status: ✅ READY TO DEPLOY

Your portfolio is fully configured for Vercel deployment!

---

## 📋 Pre-Deployment Checklist

- [x] `frontend/vercel.json` created
- [x] `backend/vercel.json` created  
- [x] `vite.config.js` optimized for production
- [x] `server.js` updated for serverless
- [x] API client created for dynamic URLs
- [x] Environment variables documented
- [x] CORS configured for production

---

## 🚀 Deploy in 5 Minutes

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### Step 2: Deploy Frontend

**Via Vercel Dashboard:**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. **Root Directory**: `frontend`
5. **Framework**: Vite (auto-detected)
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. Click **"Deploy"**

**Environment Variables:**
- `VITE_API_URL` = `https://your-backend.vercel.app`

### Step 3: Deploy Backend

**Via Vercel Dashboard:**
1. Click **"Add New"** → **"Project"** again
2. Import same repository (or new)
3. **Root Directory**: `backend`
4. **Framework**: Other/Node.js
5. Click **"Deploy"**

**Environment Variables** (in Vercel Dashboard):
```
NODE_ENV=production
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=https://your-portfolio.vercel.app
MONGODB_URI=your_mongodb_connection_string (if using DB)
```

---

## 📱 After Deployment

### Update Frontend API URL
1. In Vercel Dashboard → Frontend Project → Settings
2. Go to **Environment Variables**
3. Add: `VITE_API_URL=https://your-backend.vercel.app`
4. Redeploy frontend

### Verify Deployment
1. **Frontend**: Visit `https://your-portfolio.vercel.app`
2. **Backend**: Visit `https://your-backend.vercel.app/health`
3. **Test Contact Form**: Should send email successfully

---

## 🔗 Your Deployment URLs

| Service | URL |
|---------|-----|
| Frontend | `https://your-portfolio.vercel.app` |
| Backend | `https://your-backend.vercel.app` |
| Health Check | `https://your-backend.vercel.app/health` |

Replace `your-portfolio` and `your-backend` with your actual Vercel project names.

---

## 📧 Email Setup for Production

### Get Gmail App Password:
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** (left sidebar)
3. Enable **2-Step Verification** if not already done
4. Scroll down to **App passwords**
5. Select: Mail + Windows Computer
6. Copy generated 16-character password
7. Use in `EMAIL_PASSWORD` environment variable

---

## 🧪 Test Your Deployment

### Frontend Tests
- [ ] Page loads without errors
- [ ] 3D animations working
- [ ] Responsive on mobile
- [ ] Links navigate correctly

### Backend Tests
```bash
curl https://your-backend.vercel.app/health
```

Should return:
```json
{
  "status": "Server is running!",
  "timestamp": "2026-04-17T...",
  "environment": "production"
}
```

### Contact Form Test
- [ ] Fill out contact form
- [ ] Submit successfully
- [ ] Email received in inbox
- [ ] No console errors

---

## 🔧 Troubleshooting

### Issue: Frontend can't reach backend
**Solution**: 
- Check `VITE_API_URL` environment variable
- Verify backend is deployed and running
- Check CORS settings match production URL

### Issue: Email not sending
**Solution**:
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct
- Check Gmail App Password (16 chars with spaces removed)
- Enable "Less secure app access" if not using App Password
- Check backend logs for email errors

### Issue: Build fails
**Solution**:
- Run `npm install` locally: `npm run build`
- Check for console errors: `npm run dev`
- Clear Vercel build cache and redeploy

### Issue: CORS errors
**Solution**:
- Update `FRONTEND_URL` in backend environment
- Verify both frontend and backend are deployed
- Check browser console for exact error message

---

## 📚 Useful Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Express on Serverless](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)

---

## 🎯 Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy frontend to Vercel
3. ✅ Deploy backend to Vercel
4. ✅ Configure environment variables
5. ✅ Test all features
6. Optional: Add custom domain
7. Optional: Set up monitoring

---

**Status**: 🚀 Ready for Production!  
**Deployed**: [Check your Vercel dashboard](https://vercel.com/dashboard)
