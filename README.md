# 🚀 Rasesh Varshney - Portfolio Website

A modern, interactive full-stack developer portfolio website built with **React**, **Tailwind CSS**, **Framer Motion**, and **Node.js/Express**.

![Portfolio Preview](#)

## ✨ Features

- 🎨 **Modern Design** - Dark theme with neon gradients and glassmorphism effects
- 🎬 **Smooth Animations** - Framer Motion animations for engaging interactions
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized with Vite for lightning-fast loading
- 🎯 **Interactive Sections**:
  - Hero section with typing animation
  - About section with stats
  - Skills showcase with icons
  - Featured projects gallery
  - Experience timeline
  - Contact form with backend integration
  - Social media links

## 🌐 3D & Advanced Interactivity (NEW!)

Advanced 3D elements powered by **Three.js** and **React Three Fiber**:

- **🎞️ 3D Hero Scene** - Animated rotating 3D objects that react to mouse movement
  - Rotating torus and icosahedron with dynamic lighting
  - Parallax effect based on cursor position
  - Optimized for smooth 60 FPS performance

- **🧑‍💻 3D Avatar** - Interactive 3D avatar in About section
  - Continuously rotating metallic sphere with orbiting particles
  - Smooth animations and hover effects
  - Professional, engaging presentation

- **🃏 3D Project Cards** - Parallax tilt effect on project cards
  - Real-time 3D tilt based on mouse position
  - Smooth 400ms transitions
  - GPU-accelerated for optimal performance
  - Uses `react-parallax-tilt` library

- **🖱️ Advanced Interactivity**
  - Mouse movement parallax on 3D objects
  - Smooth scroll reveal animations
  - Hover effects and micro-interactions
  - Cursor glow and particle background effects

**Performance**: Automatically optimized for all devices:
- ✅ Desktop (1024px+): Full 3D features, 60 FPS
- ✅ Tablet (768px-1023px): Optimized 3D, smooth animations
- ✅ Mobile (<768px): Touch-optimized, adaptive animations

See [3D_FEATURES.md](./3D_FEATURES.md) for technical details and [TESTING_GUIDE.md](./TESTING_GUIDE.md) for setup instructions.


## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **react-parallax-tilt** - 3D tilt effect library
- **Vite** - Fast build tool
- **React Scroll** - Smooth scrolling
- **React Icons** - Icon library
- **Axios** - HTTP client
- **React Intersection Observer** - Scroll-based triggers

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Nodemailer** - Email service
- **Express Validator** - Form validation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
my portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HeroScene.jsx        # 3D hero scene component
│   │   │   ├── About.jsx
│   │   │   ├── Avatar3D.jsx         # 3D avatar component
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CursorGlow.jsx
│   │   │   ├── ParticleBackground.jsx
│   │   │   ├── MagneticButton.jsx
│   │   │   ├── Tilt3D.jsx
│   │   │   └── useMousePosition.js  # Custom hook for mouse tracking
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── .env.example
├── backend/
│   ├── routes/
│   │   └── contact.js
│   ├── controllers/
│   │   └── contactController.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── nodemon.json
├── 3D_FEATURES.md       # 3D features documentation
├── TESTING_GUIDE.md     # Testing guide for 3D features
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

#### 1. **Frontend Setup**

```bash
cd frontend
npm install
```

Create `.env` file:
```
VITE_API_URL=http://localhost:5000
```

#### 2. **Backend Setup**

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Development

#### Start Frontend (Terminal 1)
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

#### Start Backend (Terminal 2)
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

### Production Build

#### Frontend
```bash
cd frontend
npm run build
```

#### Backend
```bash
cd backend
npm start
```

## 📧 Email Configuration

To enable the contact form, you need to set up Gmail:

1. Create a Gmail account or use an existing one
2. Enable "Less secure app access" or use an **App Password**:
   - Go to Google Account Settings
   - Enable 2-Factor Authentication
   - Generate an App Password
3. Add to `.env`:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  'purple-glow': '#a78bfa',
  'blue-glow': '#60a5fa',
  // Add your custom colors
}
```

### Content
- Update personal info in each component
- Modify project details in `Projects.jsx`
- Update skills in `Skills.jsx`
- Change social links in `Contact.jsx` and `Footer.jsx`

### Animations
All animations are in components using Framer Motion. Customize animations in respective component files.

## 📱 Responsive Design

The website is fully responsive and tested on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🔗 API Endpoints

### Contact Form
- **POST** `/contact` - Submit contact form

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

Response:
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

## 🌟 Performance Optimizations

- ✅ Code splitting with Vite
- ✅ Image optimization
- ✅ Lazy loading components
- ✅ CSS compression
- ✅ Minified JavaScript
- ✅ Smooth scrolling
- ✅ Efficient animations

## 📝 License

This project is open source and available under the MIT License.

## 👥 Social Links

- **GitHub**: https://github.com/rasesh13
- **LinkedIn**: https://www.linkedin.com/in/rasesh-varshney-2364ab371
- **Email**: raseshvarshney@gmail.com

## 💡 Future Enhancements

- [ ] Add blog section
- [ ] Implement dark/light theme toggle
- [ ] Add project filtering
- [ ] Integrate database for projects
- [ ] Add newsletter subscription
- [ ] Implement analytics
- [ ] Add testimonials section
- [ ] Deploy to production

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📞 Support

If you have questions or need help, feel free to reach out:
- Email: raseshvarshney@gmail.com
- GitHub Issues: https://github.com/rasesh13/portfolio/issues

---

**"I don't just write code—I build solutions that make an impact."** 🚀
