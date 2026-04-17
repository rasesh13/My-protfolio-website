# Vercel Backend Keep-Alive Setup

## Problem
Vercel serverless functions go to sleep after inactivity, causing the backend to fail when your laptop is off.

## Solution
Use the **Keep-Alive Service** to ping the backend every 5 minutes, preventing it from sleeping.

---

## Setup Instructions

### Option 1: Run Keep-Alive Locally (Simple)

**When:** Keep this running on your laptop whenever you're online

```bash
cd backend
npm run keep-alive
```

This will continuously ping your Vercel backend every 5 minutes, keeping it warm.

**Output:**
```
🔄 Keep-Alive Service Starting
📍 Backend URL: https://backend-alpha-ebon-24.vercel.app
⏱️  Ping interval: 5 minutes

[10:30:45 AM] 🔥 Pinging backend to keep it warm...
[10:30:46 AM] ✅ Backend pinged successfully
[10:30:46 AM] Status: Warmup successful
```

---

### Option 2: Deploy Keep-Alive to Cloud (Advanced)

Deploy the keep-alive service to a cloud platform to run 24/7:

**On Heroku (free tier ending):**
```bash
git push heroku main
```

**On UptimeRobot (Recommended for 24/7):**
1. Go to https://uptimerobot.com
2. Create free account
3. Add Monitor:
   - URL: `https://backend-alpha-ebon-24.vercel.app/warmup`
   - Type: HTTP(s)
   - Interval: 5 minutes

UptimeRobot will ping your backend 24/7 for free!

---

## Current Configuration

**Database Connection Timeouts:**
- Socket Timeout: 60 seconds
- Server Selection: 10 seconds  
- Connection Timeout: 15 seconds
- Connection Pool: 2-10 connections

**Vercel Function Timeout:**
- Max Duration: 60 seconds
- Memory: 1024MB

---

## Testing

Test the warmup endpoint:

```bash
curl https://backend-alpha-ebon-24.vercel.app/warmup
```

Expected response:
```json
{
  "status": "Warmup successful",
  "timestamp": "2026-04-17T10:30:46.000Z",
  "message": "Backend is warmed up and ready",
  "mongooseState": 1,
  "database": "portfolio"
}
```

---

## Recommended: Use UptimeRobot

**Why UptimeRobot is best:**
✅ Free tier
✅ 24/7 monitoring  
✅ Automatic pings
✅ No laptop needed
✅ Works even when you sleep

**Setup (5 minutes):**
1. https://uptimerobot.com → Sign up
2. Dashboard → "Add Monitor"
3. Enter: `https://backend-alpha-ebon-24.vercel.app/warmup`
4. Interval: 5 minutes
5. Save → Done!

---

## What Gets Pinged

The `/warmup` endpoint:
- ✅ Checks database connection
- ✅ Initializes connections if needed
- ✅ Keeps backend warm
- ✅ Prevents cold starts

---

## Troubleshooting

**Backend still fails?**
- [ ] Check UptimeRobot is pinging
- [ ] Verify environment variables on Vercel
- [ ] Check MongoDB Atlas status
- [ ] Review Vercel logs

**Keep-alive not running?**
```bash
npm install
npm run keep-alive
```

---

## Status

✅ Backend optimized for Vercel
✅ Connection pooling configured
✅ Timeouts increased  
✅ Warmup endpoint ready
✅ Keep-alive service created

Next: Set up UptimeRobot for 24/7 monitoring!
