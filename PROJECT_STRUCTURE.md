# 📁 Project Structure Overview

## Directory Layout

```
my portfolio/
│
├── 📁 frontend/                    # React Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 components/          # React Components
│   │   │   ├── Navbar.jsx          # Navigation bar with menu
│   │   │   ├── Hero.jsx            # Landing section with typing effect
│   │   │   ├── About.jsx           # About section with stats
│   │   │   ├── Skills.jsx          # Skills showcase with icons
│   │   │   ├── Projects.jsx        # Featured projects grid
│   │   │   ├── Experience.jsx      # Timeline of achievements
│   │   │   ├── Contact.jsx         # Contact form with validation
│   │   │   └── Footer.jsx          # Footer with social links
│   │   ├── App.jsx                 # Main app component
│   │   ├── App.css                 # App styles
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── 📁 public/                  # Static assets
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies & scripts
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── .env.example                # Environment variables template
│
├── 📁 backend/                     # Node.js/Express Backend
│   ├── 📁 routes/
│   │   └── contact.js              # Contact form route
│   ├── 📁 controllers/
│   │   └── contactController.js    # Email sending logic
│   ├── 📁 models/                  # Database models (future)
│   ├── server.js                   # Express server setup
│   ├── package.json                # Dependencies & scripts
│   ├── nodemon.json                # Nodemon configuration
│   └── .env.example                # Environment variables template
│
├── 📁 .github/
│   └── copilot-instructions.md    # Project setup instructions
│
├── README.md                       # Main project documentation
├── SETUP.md                        # Quick start guide
├── DEPLOYMENT.md                   # Deployment instructions
├── PROJECT_STRUCTURE.md            # This file
├── .gitignore                      # Git ignore rules
├── start-dev.bat                   # Windows startup script
└── start-dev.sh                    # Unix startup script
```

## Component Descriptions

### Frontend Components

#### 🎯 **Navbar.jsx**
- Fixed navigation bar with smooth scroll
- Mobile responsive menu
- Logo and navigation links
- Gradient styling and animations

#### 🚀 **Hero.jsx**
- Full viewport landing section
- Typing animation effect
- Animated background gradients
- Call-to-action buttons
- Scroll indicator

#### 📋 **About.jsx**
- Split layout with avatar
- Introduction text
- Stats cards (Projects, Hackathons, Skills)
- Glassmorphism design
- Intersection observer for scroll animations

#### 💼 **Skills.jsx**
- Grid layout of skill categories
- 6 categories: Languages, Frontend, Backend, Database, Tools, Other
- Icon display for each skill
- Hover effects and animations

#### 🎨 **Projects.jsx**
- Responsive project grid
- Project cards with:
  - Emoji icon/image
  - Title and description
  - Tech stack tags
  - Live demo and code buttons
- Hover zoom effects

#### 📈 **Experience.jsx**
- Vertical timeline design
- 4 achievements/experiences
- Timeline with animated dots
- Alternating layout
- Glowing effects

#### 📧 **Contact.jsx**
- Contact form with validation
- Name, email, message fields
- Submit button with loading state
- Success message feedback
- Social media links
- Contact information

#### 🔗 **Footer.jsx**
- Brand section
- Quick links
- Social icons
- Copyright information
- Tagline

## Backend Structure

### Routes
- `POST /contact` - Submit contact form
  - Validation middleware
  - Success/error responses

### Controllers
- `sendContactEmail()` - Handle email sending
  - Admin notification email
  - User confirmation email
  - Error handling

## Key Files

### Configuration Files

**vite.config.js**
- Vite build configuration
- Development server settings
- API proxy setup

**tailwind.config.js**
- Custom colors (purple-glow, blue-glow)
- Custom animations (float, glow)
- Box shadows
- Theme extensions

**postcss.config.js**
- PostCSS plugins configuration
- Tailwind CSS and Autoprefixer

**server.js**
- Express app initialization
- CORS configuration
- Route setup
- Error handling middleware

### CSS Files

**index.css**
- Font imports
- Global styles
- Scrollbar customization
- Smooth transitions

**App.css**
- App-level styles
- Background gradients
- Layout styles

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
NODE_ENV=development
```

## Dependencies

### Frontend
- React 18
- Framer Motion
- React Scroll
- React Icons
- Axios
- Tailwind CSS
- Vite

### Backend
- Express
- CORS
- Nodemailer
- Express Validator
- Dotenv

## Development Workflow

1. **Start Development**
   - Run: `start-dev.bat` (Windows) or `./start-dev.sh` (macOS/Linux)
   - Or manually start both servers in different terminals

2. **Edit Components**
   - Edit `.jsx` files in `frontend/src/components/`
   - Changes auto-reload with Vite

3. **Test Features**
   - Open http://localhost:3000
   - Test form submissions
   - Check console for errors

4. **Build for Production**
   - Frontend: `npm run build` (creates `dist/` folder)
   - Backend: Ready to run with `npm start`

## Customization Guide

### Add New Component
1. Create file in `src/components/NewComponent.jsx`
2. Add to imports in `App.jsx`
3. Add to JSX in `App.jsx`
4. Add section id for navigation

### Add New Route
1. Create route file in `backend/routes/`
2. Create controller in `backend/controllers/`
3. Import in `server.js`
4. Use `app.use('/newroute', routeImport)`

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  'custom-color': '#hexcode',
}
```

### Add New Skill
Edit `frontend/src/components/Skills.jsx`:
```javascript
{
  title: 'New Category',
  skills: ['Skill 1', 'Skill 2'],
  icon: IconComponent,
}
```

## Performance Tips

- Components use Framer Motion for animations
- React Intersection Observer for lazy animations
- Tailwind CSS for optimized styling
- Vite for fast development
- Production build is minified and optimized

## Security Notes

- Never commit `.env` files
- Use App Passwords for Gmail
- Validate input on backend
- CORS configured for specific origin
- No sensitive data in frontend

## File Sizes

- Built frontend: ~115kb (gzipped)
- Backend: Minimal (~100kb node_modules excluded)
- Total: ~350 dependencies (both)

## Next Steps

1. Customize with your information
2. Add your real projects
3. Test contact form
4. Deploy to production
5. Set up analytics
6. Monitor performance

---

For detailed instructions, see:
- [SETUP.md](SETUP.md) - Quick start guide
- [README.md](README.md) - Full documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
