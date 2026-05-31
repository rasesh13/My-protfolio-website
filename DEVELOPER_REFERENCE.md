# 🧑‍💻 Developer Reference Guide - 3D Portfolio

Quick reference for developers working with 3D components.

## 🚀 Quick Start

```bash
# Install dependencies
cd frontend && npm install

# Start development
npm run dev

# Visit
http://localhost:3000
```

## 📁 3D Components Location

```
frontend/src/components/
├── HeroScene.jsx          # 3D hero scene
├── Avatar3D.jsx           # 3D avatar
├── useMousePosition.js    # Mouse hook
├── Tilt3D.jsx            # Custom 3D tilt (can be removed)
├── MagneticButton.jsx    # Magnetic button
├── CursorGlow.jsx        # Cursor effect
└── ParticleBackground.jsx # Particles
```

## 🎨 Using HeroScene Component

### Basic Usage
```jsx
import HeroScene from './HeroScene'

export default function MyComponent() {
  return (
    <div className="w-1/2 h-screen">
      <HeroScene />
    </div>
  )
}
```

### Customization
```jsx
// In HeroScene.jsx

// Change rotation speed
meshRef.current.rotation.y += 0.002  // Increase value for faster

// Change colors
<meshStandardMaterial color="#a78bfa" />

// Change lighting
<pointLight position={[3, 3, 3]} intensity={1} />

// Change geometry
<torusGeometry args={[1, 0.4, 64, 32]} />
```

## 🎯 Using Avatar3D Component

### Basic Usage
```jsx
import Avatar3D from './Avatar3D'

export default function AboutSection() {
  return (
    <div className="w-64 h-64 rounded-2xl overflow-hidden">
      <Avatar3D />
    </div>
  )
}
```

### Customize Avatar
```jsx
// In Avatar3D.jsx

// Change particle count
{[...Array(6)].map((_, i) => (  // 6 = particle count
```

## 🔄 Using Parallax Tilt

### Basic Usage
```jsx
import Tilt from 'react-parallax-tilt'

export default function Card() {
  return (
    <Tilt
      tiltMaxAngleX={25}
      tiltMaxAngleY={25}
      perspective={1000}
      scale={1.05}
      transitionSpeed={400}
    >
      <div className="card">Your content here</div>
    </Tilt>
  )
}
```

### Configuration Options
```javascript
tiltMaxAngleX={25}      // Max tilt angle X axis (degrees)
tiltMaxAngleY={25}      // Max tilt angle Y axis (degrees)
perspective={1000}      // 3D perspective distance (px)
scale={1.05}            // Scale on hover (1.0 = no scale)
transitionSpeed={400}   // Transition duration (ms)
reset={true}            // Reset on mouse leave
```

## 🖱️ Using Mouse Position Hook

### Basic Usage
```jsx
import { useMousePosition } from './useMousePosition'

export default function Component() {
  const { mouseX, mouseY } = useMousePosition()
  
  // mouseX and mouseY are 0-1 (left-to-right, top-to-bottom)
  console.log(mouseX, mouseY) // e.g., 0.5, 0.3
  
  return <div>Mouse: {Math.round(mouseX * 100)}%</div>
}
```

### Applying to 3D Object
```jsx
useFrame(() => {
  // Apply mouse position to object rotation
  meshRef.current.rotation.x += (mouseY - 0.5) * 0.001
  meshRef.current.rotation.y += (mouseX - 0.5) * 0.001
})
```

## 🎬 Common Animations

### Rotate Continuously
```javascript
useFrame(() => {
  meshRef.current.rotation.x += 0.01
  meshRef.current.rotation.y += 0.02
})
```

### Scale Animation
```javascript
<motion.div
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Content
</motion.div>
```

### Glow Effect
```jsx
<pointLight
  position={[0, 0, 0]}
  intensity={1}
  color="#a78bfa"
  distance={20}
  decay={2}
/>
```

## 🎨 Changing Colors

### Update in Three.js Material
```javascript
<meshStandardMaterial
  color="#a78bfa"        // Main color
  emissive="#7c3aed"     // Glow color
  emissiveIntensity={0.5} // Glow brightness
/>
```

### Update Tailwind Colors
In `tailwind.config.js`:
```javascript
extend: {
  colors: {
    'purple-glow': '#a78bfa',
    'blue-glow': '#60a5fa',
  }
}
```

## 📊 Performance Tips

### Optimize Geometry
```javascript
// Good - Low polygon count
<sphereGeometry args={[1, 32, 32]} />  // 4,096 vertices

// Better - Even lower
<sphereGeometry args={[1, 16, 16]} />  // 1,024 vertices

// Avoid - High polygon count
<sphereGeometry args={[1, 64, 64]} />  // 16,384 vertices
```

### Disable on Mobile
```jsx
const isDesktop = window.innerWidth >= 1024

return isDesktop ? <HeroScene /> : null
```

### Monitor FPS
```javascript
// In browser console:
let frameCount = 0
setInterval(() => {
  console.log('FPS:', frameCount)
  frameCount = 0
}, 1000)

// In animation loop:
frameCount++
```

## 🐛 Debugging

### Check WebGL Support
```javascript
const canvas = document.createElement('canvas')
const gl = canvas.getContext('webgl') || canvas.getContext('webgl2')
console.log('WebGL supported:', !!gl)
```

### Log Mouse Position
```javascript
const { mouseX, mouseY } = useMousePosition()
useEffect(() => {
  console.log(mouseX, mouseY)
}, [mouseX, mouseY])
```

### Monitor Render Performance
```javascript
// In browser DevTools: Performance tab
// Record → Scroll → Stop → Check "Composite Layers"
```

## 📚 Three.js Geometries

### Common Shapes
```javascript
// Sphere - Most common
<sphereGeometry args={[radius, widthSegments, heightSegments]} />

// Torus - Ring/donut
<torusGeometry args={[radius, thickness, torusSegments, tubeSegments]} />

// Box - Cube
<boxGeometry args={[width, height, depth]} />

// Cone - Triangle
<coneGeometry args={[radius, height, segments]} />

// Icosahedron - 20-sided
<icosahedronGeometry args={[radius, detail]} />
```

## 💡 Material Properties

### Standard Material
```javascript
<meshStandardMaterial
  color="#ffffff"              // Base color
  metalness={0.8}              // 0-1, reflectivity
  roughness={0.2}              // 0-1, surface smoothness
  emissive="#000000"           // Glow color
  emissiveIntensity={1}        // Glow brightness
  wireframe={false}            // Show wireframe
/>
```

## 🔗 Useful Resources

### Documentation
- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Framer Motion](https://www.framer.com/motion/)
- [react-parallax-tilt](https://www.npmjs.com/package/react-parallax-tilt)

### Learning
- [Three.js Journey](https://threejs-journey.com/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [WebGL Fundamentals](https://webglfundamentals.org/)

## 🚀 Common Tasks

### Add New 3D Object
1. Create new `.jsx` file in components/
2. Import `useRef`, `useFrame` from `@react-three/fiber`
3. Create mesh with geometry + material
4. Add rotation logic in `useFrame`
5. Import and use in component

### Change Animation Speed
1. Locate `useFrame` or `animate` property
2. Adjust timing values:
   - `useFrame`: Change increment (e.g., `+= 0.01`)
   - `animate`: Change `duration` value

### Adjust Lighting
1. Find lighting in component
2. Modify `position`, `intensity`, `color`, `distance`
3. Add/remove lights as needed

## ⚡ Production Checklist

- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)
- [ ] Check FPS (should be 60+)
- [ ] Verify no console errors
- [ ] Check memory usage
- [ ] Test on different browsers
- [ ] Optimize if needed
- [ ] Deploy to production

## 📞 Quick Links

- Main Repo: `c:\Users\rases\OneDrive\Desktop\my portfolio`
- Frontend: `./frontend`
- Dev Server: `http://localhost:3000`
- Documentation: `./3D_FEATURES.md`
- Testing Guide: `./TESTING_GUIDE.md`

---

**Last Updated**: April 4, 2026

**For Issues**: Check browser console (F12) for error messages
