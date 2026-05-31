import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Create realistic cloud texture
function createCloudTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Transparent base
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Create cloud patterns using noise-like generation
  const cloudColor = 'rgba(255, 255, 255, 0.6)'
  ctx.fillStyle = cloudColor

  // Generate cloud patches
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 80 + 30
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)')
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(x - size, y - size, size * 2, size * 2)
  }

  // Add some turbulent cloud patterns
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(150, 180, 220, ${Math.random() * 0.15})`
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 60 + 20,
      Math.random() * 20 + 10
    )
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Atmosphere glow component
function AtmosphereGlow({ size }) {
  return (
    <mesh scale={1.08}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshBasicMaterial
        color="#4a90e2"
        transparent={true}
        opacity={0.12}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// Cloud layer component (separate, faster rotation)
function CloudLayer({ cloudTexture, size }) {
  const cloudsRef = useRef(null)

  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0008  // Faster than Earth
    }
  })

  return (
    <mesh ref={cloudsRef} scale={1.025}>
      <sphereGeometry args={[size, 128, 128]} />
      <meshStandardMaterial
        map={cloudTexture}
        transparent={true}
        opacity={0.5}
        emissive={0x222222}
        emissiveIntensity={0.05}
        roughness={1.0}
        metalness={0}
        side={THREE.FrontSide}
      />
    </mesh>
  )
}

// Ultra-realistic Earth texture with vibrant colors
function createEarthTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  // Deep ocean base gradient
  const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  oceanGradient.addColorStop(0, '#0d47a1')      // Deep blue top
  oceanGradient.addColorStop(0.3, '#1565c0')    // Ocean blue
  oceanGradient.addColorStop(0.5, '#1976d2')    // Medium ocean
  oceanGradient.addColorStop(0.7, '#1565c0')    // Ocean blue
  oceanGradient.addColorStop(1, '#0d47a1')      // Deep blue bottom
  ctx.fillStyle = oceanGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Add shallow water areas (lighter blue)
  ctx.fillStyle = 'rgba(66, 165, 245, 0.3)'
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 150 + 80
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size)
    grad.addColorStop(0, 'rgba(100, 180, 255, 0.4)')
    grad.addColorStop(1, 'rgba(66, 165, 245, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(x - size, y - size, size * 2, size * 2)
  }

  // Continents - VIBRANT GREENS
  for (let i = 0; i < 35; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 140 + 70

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    gradient.addColorStop(0, 'rgba(76, 175, 80, 0.95)')      // Bright green
    gradient.addColorStop(0.4, 'rgba(56, 142, 60, 0.7)')    // Medium green
    gradient.addColorStop(0.7, 'rgba(27, 94, 32, 0.5)')     // Dark green
    gradient.addColorStop(1, 'rgba(27, 94, 32, 0)')         // Fade out

    ctx.fillStyle = gradient
    ctx.fillRect(x - size, y - size, size * 2, size * 2)
  }

  // Desert/Sand regions - VIBRANT ORANGE/YELLOW
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 100 + 50

    ctx.fillStyle = `rgba(255, 152, 0, ${Math.random() * 0.5 + 0.3})`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Dark soil/earth regions
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 80 + 40

    ctx.fillStyle = `rgba(139, 69, 19, ${Math.random() * 0.4 + 0.2})`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Bright white ice caps and polar regions
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * (canvas.height * 0.25) // Top edges (poles)
    const size = Math.random() * 60 + 30

    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.4})`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Bottom pole
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width
    const y = canvas.height - Math.random() * (canvas.height * 0.25)
    const size = Math.random() * 60 + 30

    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.4})`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // White fluffy clouds - HIGHLY VISIBLE
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.25})`
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 50 + 25
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Mountain/Terrain shadows
  ctx.fillStyle = 'rgba(101, 67, 33, 0.15)'
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    ctx.fillRect(x, y, Math.random() * 80 + 40, Math.random() * 30 + 15)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function createMarsTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Mars rusty base
  ctx.fillStyle = '#a0522d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Add rocky craters and terrain
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 40 + 10
    
    ctx.fillStyle = `rgba(${100 + Math.random() * 50}, ${50 + Math.random() * 30}, ${20 + Math.random() * 30}, ${Math.random() * 0.6})`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Dust storms
  for (let i = 0; i < 15; i++) {
    ctx.fillStyle = `rgba(200, 150, 100, ${Math.random() * 0.2})`
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    ctx.fillRect(x, y, Math.random() * 100 + 50, Math.random() * 50 + 20)
  }

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

function createGasGiantTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Create horizontal stripes for gas giant
  const colors = ['#daa520', '#8b6914', '#cd853f', '#8b5a2b']
  let y = 0
  const stripeHeight = canvas.height / colors.length
  
  colors.forEach((color, idx) => {
    ctx.fillStyle = color
    ctx.fillRect(0, y, canvas.width, stripeHeight)
    
    // Add turbulence/bands
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`
      ctx.fillRect(
        Math.random() * canvas.width, 
        y + Math.random() * stripeHeight,
        Math.random() * 100 + 50,
        Math.random() * 10 + 5
      )
    }
    y += stripeHeight
  })

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

function createIcePlanetTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Ice blue base gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, '#e0f6ff')
  gradient.addColorStop(0.5, '#87ceeb')
  gradient.addColorStop(1, '#4682b4')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Add ice caps and frozen regions
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 60 + 20
    
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Cracks/fissures
  ctx.strokeStyle = 'rgba(100, 200, 255, 0.4)'
  ctx.lineWidth = 2
  for (let i = 0; i < 8; i++) {
    ctx.beginPath()
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.quadraticCurveTo(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * canvas.width,
      Math.random() * canvas.height
    )
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

function createNeptuneLikeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Deep blue gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, '#1e90ff')
  gradient.addColorStop(0.5, '#4169e1')
  gradient.addColorStop(1, '#000080')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Storm bands
  for (let i = 0; i < 5; i++) {
    const y = (i / 5) * canvas.height
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`
    ctx.fillRect(0, y, canvas.width, canvas.height / 5)
  }

  // Great storm spot
  ctx.fillStyle = 'rgba(255, 200, 0, 0.3)'
  ctx.beginPath()
  ctx.ellipse(canvas.width * 0.3, canvas.height * 0.4, 80, 60, 0.2, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

// Ultra-realistic planet component with clouds and atmosphere
function Planet({ position, size, texture, cloudTexture, rotationSpeed }) {
  const groupRef = useRef(null)
  const surfaceRef = useRef(null)

  // Cinematic floating motion parameters
  const basePosition = position
  const floatOffset = useRef(Math.random() * Math.PI * 2)

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    // Subtle floating motion (bob + drift)
    const t = clock.getElapsedTime() * 0.25
    const floatY = Math.sin(t + floatOffset.current) * 4
    const floatX = Math.cos(t * 0.6 + floatOffset.current) * 3
    const floatZ = Math.sin(t * 0.4 + floatOffset.current) * 2

    groupRef.current.position.x = basePosition[0] + floatX
    groupRef.current.position.y = basePosition[1] + floatY
    groupRef.current.position.z = basePosition[2] + floatZ

    // Planet surface rotation
    if (surfaceRef.current) {
      surfaceRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <group ref={groupRef} position={basePosition}>
      {/* Planet surface - high detail */}
      <mesh ref={surfaceRef} castShadow receiveShadow>
        <sphereGeometry args={[size, 128, 128]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.65}
          metalness={0}
          envMapIntensity={1.2}
          side={THREE.FrontSide}
          toneMapped={true}
        />
      </mesh>

      {/* Cloud layer - separate, faster rotation */}
      {cloudTexture && <CloudLayer cloudTexture={cloudTexture} size={size} />}

      {/* Atmospheric glow */}
      <AtmosphereGlow size={size} />
    </group>
  )
}

// Planets system with ultra-realistic Earth
function PlanetsSystem() {
  const earthTexture = useMemo(() => createEarthTexture(), [])
  const cloudTexture = useMemo(() => createCloudTexture(), [])
  const marsTexture = useMemo(() => createMarsTexture(), [])

  return (
    <group>
      {/* MAIN PLANET - Ultra-realistic Earth with clouds */}
      <Planet
        position={[100, 70, -40]}
        size={95}
        texture={earthTexture}
        cloudTexture={cloudTexture}
        rotationSpeed={0.0004}
      />

      {/* DEPTH PLANET - Mars for depth perception */}
      <Planet
        position={[-120, -100, -180]}
        size={22}
        texture={marsTexture}
        cloudTexture={null}
        rotationSpeed={0.0006}
      />
    </group>
  )
}

// Create circular glowing star texture
function createStarTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw radial gradient for glow effect
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)')
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

function generateStarData(count, zNear, zFar, spreadRadius) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    // Random spherical distribution
    positions[i * 3] = (Math.random() - 0.5) * spreadRadius
    positions[i * 3 + 1] = (Math.random() - 0.5) * spreadRadius
    positions[i * 3 + 2] = Math.random() * (zFar - zNear) + zNear

    // Star colors - MOSTLY WHITE, rare blue/purple
    const colorRoll = Math.random()
    if (colorRoll < 0.88) {
      // Pure white stars (88%) - bright
      const brightness = 0.95 + Math.random() * 0.05
      colors[i * 3] = brightness
      colors[i * 3 + 1] = brightness
      colors[i * 3 + 2] = brightness
    } else if (colorRoll < 0.96) {
      // Slight blue tint (8%) - bright blue
      colors[i * 3] = 0.9 + Math.random() * 0.1
      colors[i * 3 + 1] = 0.92 + Math.random() * 0.08
      colors[i * 3 + 2] = 1.0
    } else {
      // Slight purple tint (4%) - bright purple
      colors[i * 3] = 0.95 + Math.random() * 0.05
      colors[i * 3 + 1] = 0.88 + Math.random() * 0.12
      colors[i * 3 + 2] = 0.98 + Math.random() * 0.02
    }

    // Star sizes - varied for depth perception
    const sizeRoll = Math.random()
    if (sizeRoll < 0.6) {
      sizes[i] = 0.15 + Math.random() * 0.2
    } else if (sizeRoll < 0.9) {
      sizes[i] = 0.25 + Math.random() * 0.3
    } else {
      sizes[i] = 0.4 + Math.random() * 0.3
    }
  }

  return { positions, colors, sizes }
}

// Individual star layer with parallax and forward motion
function StarLayer({ count, zNear, zFar, spreadRadius, parallaxIntensity, motionSpeed, opacity }) {
  const pointsRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cameraOffset = useRef({ x: 0, y: 0 })
  const starTexture = useMemo(() => createStarTexture(), [])

  const starData = useMemo(
    () => generateStarData(count, zNear, zFar, spreadRadius),
    [count, zNear, zFar, spreadRadius]
  )

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(starData.positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(starData.colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(starData.sizes, 1))
    return geo
  }, [starData])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (!pointsRef.current || !geometry.attributes.position) return

    const positions = geometry.attributes.position.array

    // Smooth parallax interpolation
    const targetX = mousePos.current.x * parallaxIntensity
    const targetY = mousePos.current.y * parallaxIntensity
    cameraOffset.current.x += (targetX - cameraOffset.current.x) * 0.08
    cameraOffset.current.y += (targetY - cameraOffset.current.y) * 0.08

    pointsRef.current.position.x = -cameraOffset.current.x
    pointsRef.current.position.y = -cameraOffset.current.y

    // Continuous forward motion: stars move toward camera
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] -= motionSpeed

      // Reset star to far distance when it passes camera
      if (positions[i + 2] < zNear) {
        positions[i + 2] = zFar
      }
    }

    geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        map={starTexture}
        size={2.5}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={1}
        sRGBColor={true}
        fog={false}
        alphaTest={0.001}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Multi-layer starfield rendering - MINIMAL and subtle
function StarField() {
  return (
    <group>
      {/* Far layer - very subtle background stars */}
      <StarLayer
        count={800}
        zNear={-300}
        zFar={-80}
        spreadRadius={500}
        parallaxIntensity={6}
        motionSpeed={0.05}
        opacity={0.3}
      />

      {/* Mid layer - moderate stars */}
      <StarLayer
        count={600}
        zNear={-80}
        zFar={10}
        spreadRadius={300}
        parallaxIntensity={20}
        motionSpeed={0.12}
        opacity={0.5}
      />

      {/* Near layer - minimal */}
      <StarLayer
        count={300}
        zNear={10}
        zFar={80}
        spreadRadius={200}
        parallaxIntensity={35}
        motionSpeed={0.2}
        opacity={0.7}
      />
    </group>
  )
}

// Cinematic space lighting
function Lights() {
  return (
    <>
      {/* Ambient light - sufficient for visibility */}
      <ambientLight intensity={0.25} color="#ffffff" />

      {/* SUNLIGHT - Key light simulating the sun */}
      <directionalLight
        position={[120, 100, 150]}
        intensity={2.5}
        color="#ffffdd"
        castShadow={false}
      />

      {/* Fill light - subtle illumination from opposite side */}
      <directionalLight
        position={[-100, -80, -50]}
        intensity={0.4}
        color="#2a5aaa"
      />

      {/* Subtle point lights for atmospheric glow */}
      <pointLight position={[100, 80, 120]} intensity={0.12} color="#ffffff" distance={600} />
      <pointLight position={[-100, -80, 100]} intensity={0.1} color="#ffffff" distance={500} />
    </>
  )
}

// Debug cube (optional)
function DebugCube() {
  const meshRef = useRef(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#ff0000" wireframe={true} />
    </mesh>
  )
}

// Main scene component
export default function HeroScene({ scrollY = 0, debug = false }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMappingExposure: 1.0,
        dithering: true,
        clearColor: 0x000000
      }}
      dpr={[1, 1.5]}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Pure black deep space */}
      <color attach="background" args={['#000000']} />

      {/* Subtle fog for cinematic depth */}
      <fog attach="fog" args={['#000000', 200, 800]} />

      {/* Minimal lighting */}
      <Lights />

      {/* Realistic starfield only */}
      {!debug && (
        <>
          <PlanetsSystem />
          <StarField />
        </>
      )}

      {/* Debug cube */}
      {debug && <DebugCube />}
    </Canvas>
  )
}
