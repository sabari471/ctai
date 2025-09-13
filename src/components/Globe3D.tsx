import { useRef, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Extend Three.js objects
extend({ OrbitControls });

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Rotate the globe
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  // Create vendor location points
  const createVendorPoints = () => {
    const positions = [];
    const colors = [];
    
    // Sample vendor locations (lat, lon converted to 3D coordinates)
    const locations = [
      { lat: 28.6139, lon: 77.2090 }, // Delhi
      { lat: 19.0760, lon: 72.8777 }, // Mumbai  
      { lat: 13.0827, lon: 80.2707 }, // Chennai
      { lat: 22.5726, lon: 88.3639 }, // Kolkata
      { lat: 12.9716, lon: 77.5946 }, // Bangalore
      { lat: 17.3850, lon: 78.4867 }, // Hyderabad
    ];

    locations.forEach(location => {
      const phi = (90 - location.lat) * (Math.PI / 180);
      const theta = (location.lon + 180) * (Math.PI / 180);
      
      const x = -(2.1 * Math.sin(phi) * Math.cos(theta));
      const y = 2.1 * Math.cos(phi);
      const z = 2.1 * Math.sin(phi) * Math.sin(theta);
      
      positions.push(x, y, z);
      colors.push(0.5, 0.8, 1); // Light blue color
    });

    return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
  };

  const { positions, colors } = createVendorPoints();

  return (
    <>
      {/* Main Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#1a1a2e"
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* Vendor Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            count={colors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
        />
      </points>

      {/* Ambient Light */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const Globe3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Globe />
      </Canvas>
    </div>
  );
};

export default Globe3D;