// ThreeScene.jsx - Simplified Guaranteed Working Version
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Central Brand Sphere - Always visible
const BrandSphere = () => {
  const sphereRef = useRef();
  
  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial 
        color="#00E676"
        emissive="#00E676"
        emissiveIntensity={0.2}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
};

// Simple Orbital Ring
const OrbitalRing = ({ radius = 2.5, speed = 0.5 }) => {
  const ringRef = useRef();
  
  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.05, 16, 100]} />
      <meshBasicMaterial 
        color="#00BFA5" 
        transparent 
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Simple Floating Element
const FloatingElement = ({ position = [0, 0, 0], text = "Strategy" }) => {
  const elementRef = useRef();
  
  useFrame((state, delta) => {
    if (elementRef.current) {
      elementRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={elementRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#00E676"
          emissive="#00E676"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};

// Main Scene Component
const BrandStrategyScene = () => {
  return (
    <group>
      {/* Central Sphere - This should be clearly visible */}
      <BrandSphere />
      
      {/* Orbital Rings */}
      <OrbitalRing radius={2} speed={0.3} />
      <OrbitalRing radius={3} speed={0.4} />
      <OrbitalRing radius={4} speed={0.5} />
      
      {/* Floating Elements */}
      <FloatingElement position={[2, 0, 0]} text="Strategy" />
      <FloatingElement position={[-2, 0, 0]} text="Design" />
      <FloatingElement position={[0, 2, 0]} text="Identity" />
      <FloatingElement position={[0, -2, 0]} text="Growth" />
    </group>
  );
};

const ThreeScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        background: 'transparent'
      }}
      gl={{
        alpha: true,
        antialias: true,
      }}
    >
      {/* Basic Lighting - Essential for visibility */}
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Main Scene */}
      <BrandStrategyScene />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        maxDistance={12}
        minDistance={4}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default ThreeScene;