// components/ThreeJS/ParticleScene.jsx
import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

const ParticleScene = ({ imagesData, scrollProgress }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const particlesRef = useRef();
  const animationRef = useRef();

  const particleTextures = useMemo(() => {
    if (!imagesData) return [];
    
    const loader = new THREE.TextureLoader();
    return imagesData.map(image => loader.load(image.url));
  }, [imagesData]);

  useEffect(() => {
    if (!mountRef.current || particleTextures.length === 0) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Position camera
    camera.position.z = 15;

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = particleTextures.length;

    const positions = new Float32Array(particlesCount * 3);
    const scales = new Float32Array(particlesCount);
    const velocities = new Float32Array(particlesCount * 3);
    const originalPositions = new Float32Array(particlesCount * 3);

    // Initialize particle positions and properties
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Spread particles in a sphere-like formation
      const radius = 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];
      
      scales[i] = Math.random() * 0.8 + 0.4;
      
      // Random velocities for floating animation
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    particlesGeometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));

    // Create particle materials
    const particleMaterials = particleTextures.map(texture => {
      return new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
    });

    // Create particle system
    const particles = new THREE.Group();
    
    for (let i = 0; i < particlesCount; i++) {
      const sprite = new THREE.Sprite(particleMaterials[i]);
      sprite.scale.set(3, 3, 1);
      sprite.userData = {
        originalPosition: new THREE.Vector3(
          originalPositions[i * 3],
          originalPositions[i * 3 + 1],
          originalPositions[i * 3 + 2]
        ),
        velocity: new THREE.Vector3(
          velocities[i * 3],
          velocities[i * 3 + 1],
          velocities[i * 3 + 2]
        ),
        timeOffset: Math.random() * Math.PI * 2
      };
      particles.add(sprite);
    }

    scene.add(particles);
    particlesRef.current = particles;

    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      particles.children.forEach((particle, index) => {
        // Floating animation
        const floatSpeed = 0.5;
        const floatAmount = 0.3;
        
        particle.position.x = particle.userData.originalPosition.x + 
          Math.sin(elapsedTime * floatSpeed + particle.userData.timeOffset) * floatAmount;
        particle.position.y = particle.userData.originalPosition.y + 
          Math.cos(elapsedTime * floatSpeed * 0.7 + particle.userData.timeOffset) * floatAmount;
        particle.position.z = particle.userData.originalPosition.z + 
          Math.sin(elapsedTime * floatSpeed * 0.5 + particle.userData.timeOffset) * floatAmount;

        // Gentle rotation
        particle.rotation.z = Math.sin(elapsedTime * 0.3 + particle.userData.timeOffset) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleMaterials.forEach(material => material.dispose());
      particleTextures.forEach(texture => texture.dispose());
    };
  }, [particleTextures]);

  // Update particles based on scroll
  useEffect(() => {
    if (!particlesRef.current || !cameraRef.current) return;

    const particles = particlesRef.current;
    const camera = cameraRef.current;

    // Move particles down based on scroll progress
    const scrollY = scrollProgress * 20; // Adjust this multiplier for speed
    
    particles.children.forEach(particle => {
      // Move particles downward
      particle.position.y = particle.userData.originalPosition.y - scrollY;
      
      // Fade out as they move down
      const fadeStart = 5;
      const fadeProgress = Math.max(0, Math.min(1, scrollY / fadeStart));
      particle.material.opacity = 0.8 * (1 - fadeProgress);
      
      // Scale down as they move away
      particle.scale.setScalar(3 * (1 - fadeProgress * 0.5));
    });

    // Move camera slightly for parallax effect
    camera.position.z = 15 + scrollProgress * 5;

  }, [scrollProgress]);

  return (
    <div 
      ref={mountRef} 
      className="particle-scene"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleScene;