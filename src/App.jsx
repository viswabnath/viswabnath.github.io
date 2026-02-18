import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'

// 1. The 3D Particle Universe Component
function Starfield() {
  const ref = useRef()
  
  // High-performance particle generation (5000 stars)
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000 * 3) // x, y, z for each particle
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15     // X spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15 // Y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 // Z depth spread
    }
    return positions
  }, [])

  // Animate the stars on every single frame
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta * 0.02
    ref.current.rotation.y -= delta * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#60a5fa"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// 2. The Main Application Container
export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      {/* ScrollControls sets up the scrollable space. pages={3} means the scrollbar is 3 screens long */}
      <ScrollControls pages={3} damping={0.2}>
        
        {/* Everything here renders in 3D space */}
        <Starfield />

        {/* Everything inside <Scroll html> renders as normal 2D DOM elements floating OVER the 3D canvas */}
        <Scroll html style={{ width: '100%' }}>
          <div className="portfolio-container">
            
            <section className="hero-section">
              <h1>Viswanath<br/>Bodasakurthi</h1>
              <p>Senior Software Engineer | UI Expert | Digital Architect</p>
            </section>

            <section className="spacer-section">
              <h2>Scroll down to travel through space...</h2>
            </section>

            <section className="spacer-section">
              <h2>We will add your experience timeline here next!</h2>
            </section>

          </div>
        </Scroll>

      </ScrollControls>
    </Canvas>
  )
}