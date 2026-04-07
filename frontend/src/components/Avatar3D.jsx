import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AvatarModel() {
  const groupRef = useRef(null)
  const torusRef = useRef(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.3
    }

    if (torusRef.current) {
      torusRef.current.rotation.z += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Rotating torus around sphere */}
      <mesh ref={torusRef} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.2, 32, 16]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Orbiting particles */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 2.5,
            Math.sin((i / 6) * Math.PI * 2) * 2.5,
            0,
          ]}
        >
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#a78bfa' : '#60a5fa'}
            emissive={i % 2 === 0 ? '#7c3aed' : '#3b82f6'}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

function AvatarLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#a78bfa" distance={30} />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#60a5fa" distance={30} />
      <pointLight position={[0, 0, -5]} intensity={0.5} />
    </>
  )
}

const Avatar3D = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'transparent',
          borderRadius: '0.5rem',
        }}
      >
        <AvatarLights />
        <AvatarModel />
      </Canvas>
    </div>
  )
}

export default Avatar3D


