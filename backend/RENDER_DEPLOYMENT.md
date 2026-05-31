# Deploy Backend to Render.com

## Quick Setup (5 minutes)

### Step 1: Go to Render Dashboard
https://render.com/dashboard

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Click **"Connect account"** → Connect GitHub
3. Select your portfolio repository

### Step 3: Configure Service
- **Name:** `portfolio-backend`
- **Branch:** `main` (or your default branch)
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Node
- **Plan:** Free
- **Region:** Oregon (or closest to you)

### Step 4: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these:
```
MONGODB_URI
mongodb+srv://raseshvarshney82_db_user:Yuga8ajJwiF9NTul@cluster0.3oo80at.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0

EMAIL_USER
raseshvarshney82@gmail.com

EMAIL_PASSWORD
nluiozutoqqaqmcq

NODE_ENV
production

PORT
5000
```

### Step 5: Deploy
Click **"Create Web Service"**

Render automatically deploys! Wait for completion (2-3 minutes).

---

## Get Your Render URL

After deployment completes:
1. Go to your service dashboard
2. Look at the top - you'll see your URL like:
```
https://portfolio-backend-xxxx.onrender.com
```

**Copy this URL - you'll need it next!**

---

## What Happens Next

Once you have the Render URL, I will:
1. ✅ Update frontend to use Render URL
2. ✅ Redeploy frontend to Vercel
3. ✅ Delete Vercel backend deployment
4. ✅ Test everything works

---

## Testing Your Render Backend

Once deployed, test it:

```bash
curl https://portfolio-backend-xxxx.onrender.com/health
```

Should return:
```json
{
  "status": "Server is running!",
  "timestamp": "2026-04-19T...",
  "environment": "production"
}
```

---

## Important Notes

- ✅ **Always-on:** Backend runs 24/7 without stopping
- ✅ **Free tier:** Completely free
- ✅ **Auto-deploy:** Updates when you push to GitHub
- ⚠️ **First load:** May take 30 seconds on first request (cold start once), then fast
- 🔄 **Optional:** Add UptimeRobot for health checks (same as Vercel setup)

---

## Status

✅ Backend optimized for Render
✅ Environment variables configured
✅ render.yaml created
✅ Ready to deploy

**Next:** Deploy to Render, then send me your Render URL!
