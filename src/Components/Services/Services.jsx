import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { gsap } from 'gsap';
import img from '../../assets/Screenshot_6.png';
import img1 from '../../assets/Screenshot_7.png';
import img2 from '../../assets/Screenshot_8.png';
import img3 from '../../assets/Screenshot_14.png';
import img4 from '../../assets/Screenshot_19.png';
import img5 from '../../assets/Screenshot_11.png';
import img6 from '../../assets/Screenshot_13.png';
import img7 from '../../assets/Screenshot_15.png';
import img8 from '../../assets/Screenshot_17.png';
import img9 from '../../assets/Screenshot_20.png';
import img10 from '../../assets/Screenshot_19.png';
import img11 from '../../assets/mobile app.jpg';

// Define keyframes outside of styled components
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const shine = keyframes`
  0% {
    background-position: -100% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

const GridSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: calc(-50vw + 50%);
  background: linear-gradient(135deg, rgba(10, 20, 15, 0.95) 0%, rgba(15, 30, 20, 0.98) 100%);
  color: white;
  position: relative;
  overflow: hidden;
  padding: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 75%, rgba(0, 230, 118, 0.15) 0%, transparent 15%),
      radial-gradient(circle at 70% 25%, rgba(0, 191, 165, 0.15) 0%, transparent 5%),
      radial-gradient(circle at 50% 50%, rgba(0, 255, 204, 0.08) 0%, transparent 60%);
    animation: ${pulse} 8s ease-in-out infinite;
  }
`;

const TopOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280px;
  background: linear-gradient(to bottom, rgba(0, 30, 15, 1) 0%, rgba(10, 20, 15, 0) 60%);
  pointer-events: none;
  z-index: 10;
`;

const BottomOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 480px;
  background: linear-gradient(to top, rgba(0, 30, 15, 1) 0%, rgba(10, 20, 15, 0) 100%);
  pointer-events: none;
  z-index: 10;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const FloatingOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
  animation: ${float} 15s ease-in-out infinite;
  
  &:nth-child(1) {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 230, 118, 0.3) 0%, transparent 70%);
    top: 10%;
    left: 10%;
    animation-delay: 0s;

    @media (max-width: 768px) {
      width: 200px;
      height: 200px;
      top: 5%;
      left: 5%;
    }
  }
  
  &:nth-child(2) {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 191, 165, 0.3) 0%, transparent 70%);
    bottom: 20%;
    right: 10%;
    animation-delay: -5s;

    @media (max-width: 768px) {
      width: 250px;
      height: 250px;
      bottom: 15%;
      right: 5%;
    }
  }
  
  &:nth-child(3) {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 255, 204, 0.3) 0%, transparent 70%);
    top: 50%;
    left: 80%;
    animation-delay: -10s;

    @media (max-width: 768px) {
      width: 150px;
      height: 150px;
      top: 60%;
      left: 70%;
    }
  }
`;

const GeometricShape = styled.div`
  position: absolute;
  opacity: 0.1;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:nth-child(4) {
    width: 100px;
    height: 100px;
    top: 20%;
    right: 15%;
    transform: rotate(45deg);
    animation: ${float} 20s linear infinite reverse;

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
      top: 15%;
      right: 10%;
    }
  }
  
  &:nth-child(5) {
    width: 150px;
    height: 150px;
    bottom: 30%;
    left: 5%;
    border-radius: 50%;
    animation: ${float} 25s linear infinite;

    @media (max-width: 768px) {
      width: 100px;
      height: 100px;
      bottom: 25%;
      left: 3%;
    }
  }
  
  &:nth-child(6) {
    width: 80px;
    height: 80px;
    top: 70%;
    right: 20%;
    transform: rotate(15deg);
    animation: ${float} 18s linear infinite reverse;

    @media (max-width: 768px) {
      width: 50px;
      height: 50px;
      top: 75%;
      right: 15%;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 0 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  overflow: visible;
  position: relative;
  z-index: 2;
  
  @media (max-width: 968px) {
    padding: 0 1.5rem 3rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 1rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem 1.5rem;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  position: relative;
  align-items: center;
  justify-items: center;
  
  /* Tablet */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.8rem;
  }
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 0.7rem;
  }
  
  /* Mobile Large */
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.6rem;
  }
  
  /* Mobile Medium */
  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  
  /* Mobile Small */
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem;
  }
  
  /* Extra Small Mobile */
  @media (max-width: 360px) {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
`;

const MobilePair = styled.div`
  display: contents;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    
    & > div {
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }
`;

const GridItem = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.6s ease-out;
  cursor: pointer;
  will-change: transform;
  background: rgba(10, 20, 15, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  /* Desktop Grid Spans */
  ${props => {
    switch (props.aspectRatio) {
      case '4:3':
        return css`
          grid-column: span 2;
          aspect-ratio: 4/3;
        `;
      case '16:9':
        return css`
          grid-column: span 3;
          aspect-ratio: 16/9;
        `;
      case '9:16':
        return css`
          grid-column: span 1;
          aspect-ratio: 9/16;
        `;
      default:
        return css`
          grid-column: span 1;
          aspect-ratio: 1/1;
        `;
    }
  }}

  /* Tablet Adjustments */
  @media (max-width: 1200px) {
    ${props => {
      switch (props.aspectRatio) {
        case '4:3':
          return css`grid-column: span 2;`;
        case '16:9':
          return css`grid-column: span 3;`;
        case '9:16':
          return css`grid-column: span 1;`;
        default:
          return css`grid-column: span 1;`;
      }
    }}
  }
  
  @media (max-width: 968px) {
    ${props => {
      switch (props.aspectRatio) {
        case '4:3':
          return css`grid-column: span 2;`;
        case '16:9':
          return css`grid-column: span 3;`;
        case '9:16':
          return css`grid-column: span 1;`;
        default:
          return css`grid-column: span 1;`;
      }
    }}
  }
  
  /* Mobile Large - 4 columns */
  @media (max-width: 768px) {
    ${props => {
      switch (props.aspectRatio) {
        case '4:3':
          return css`
            grid-column: span 2;
            aspect-ratio: 4/3;
          `;
        case '16:9':
          return css`
            grid-column: span 4;
            aspect-ratio: 16/9;
          `;
        case '9:16':
          return css`
            grid-column: span 1;
            aspect-ratio: 9/16;
          `;
        default:
          return css`
            grid-column: span 1;
            aspect-ratio: 1/1;
          `;
      }
    }}
  }
  
  /* Mobile Medium - 3 columns */
  @media (max-width: 640px) {
    ${props => {
      switch (props.aspectRatio) {
        case '4:3':
          return css`
            grid-column: span 2;
            aspect-ratio: 4/3;
          `;
        case '16:9':
          return css`
            grid-column: span 3;
            aspect-ratio: 16/9;
          `;
        case '9:16':
          return css`
            grid-column: span 1;
            aspect-ratio: 9/16;
          `;
        default:
          return css`
            grid-column: span 1;
            aspect-ratio: 1/1;
          `;
      }
    }}
  }
  
  /* Mobile Small - 2 columns */
  @media (max-width: 480px) {
    ${props => {
      switch (props.aspectRatio) {
        case '4:3':
          return css`
            grid-column: span 2;
            aspect-ratio: 4/3;
          `;
        case '16:9':
          return css`
            grid-column: span 2;
            aspect-ratio: 16/9;
          `;
        case '9:16':
          return css`
            grid-column: span 1;
            aspect-ratio: 9/16;
          `;
        default:
          return css`
            grid-column: span 1;
            aspect-ratio: 1/1;
          `;
      }
    }}
    border-radius: 8px;
  }
  
  /* Extra Small Mobile - 1 column */
  @media (max-width: 360px) {
    ${props => {
      switch (props.aspectRatio) {
        case '4:3':
        case '16:9':
        case '9:16':
        default:
          return css`
            grid-column: span 1;
            aspect-ratio: 16/9;
          `;
      }
    }}
    border-radius: 6px;
  }

  &:hover {
    border-color: rgba(0, 230, 118, 0.5);
    box-shadow: 
      0 15px 40px rgba(0, 230, 118, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    transform: translateY(-5px) scale(1.02);
    
    .gradient-overlay {
      opacity: 0.8;
      transform: scale(1.1);
    }
    
    .shine-overlay {
      background-position: 200% 50%;
    }
    
    .image-overlay-left {
      opacity: 1;
      transform: translateX(0);
    }
    
    .image-overlay-right {
      opacity: 1;
      transform: translateX(0);
    }
    
    img {
      transform: scale(1.08);
    }

    @media (max-width: 768px) {
      transform: translateY(-3px) scale(1.01);
    }
  }

  @media (max-width: 768px) {
    &:active {
      transform: scale(0.98);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  transition: all 0.6s ease;
  z-index: 1;
  
  ${props => props.gradientType === '1' && css`
    background: linear-gradient(135deg, 
      rgba(0, 230, 118, 0.4) 0%,
      rgba(0, 191, 165, 0.3) 30%,
      rgba(0, 255, 204, 0.2) 70%,
      transparent 100%
    );
    opacity: 0.6;
  `}
  
  ${props => props.gradientType === '2' && css`
    background: linear-gradient(45deg, 
      transparent 0%,
      rgba(0, 230, 118, 0.3) 25%,
      rgba(0, 191, 165, 0.4) 50%,
      rgba(0, 255, 204, 0.3) 75%,
      transparent 100%
    );
    opacity: 0.7;
  `}
  
  ${props => props.gradientType === '3' && css`
    background: linear-gradient(225deg, 
      rgba(0, 230, 118, 0.2) 0%,
      rgba(0, 191, 165, 0.3) 40%,
      rgba(0, 255, 204, 0.4) 80%,
      transparent 100%
    );
    opacity: 0.65;
  `}
  
  ${props => props.gradientType === '4' && css`
    background: radial-gradient(
      circle at 30% 30%,
      rgba(0, 230, 118, 0.4) 0%,
      rgba(0, 191, 165, 0.3) 40%,
      rgba(0, 255, 204, 0.2) 70%,
      transparent 100%
    );
    opacity: 0.6;
  `}
  
  ${props => props.gradientType === '5' && css`
    background: linear-gradient(to bottom right,
      rgba(0, 230, 118, 0.3) 0%,
      rgba(0, 191, 165, 0.4) 30%,
      rgba(0, 255, 204, 0.3) 60%,
      transparent 100%
    );
    opacity: 0.7;
  `}
  
  ${props => props.gradientType === '6' && css`
    background: linear-gradient(to top left,
      transparent 0%,
      rgba(0, 230, 118, 0.2) 20%,
      rgba(0, 191, 165, 0.3) 50%,
      rgba(0, 255, 204, 0.4) 80%,
      transparent 100%
    );
    opacity: 0.65;
  `}
`;

const ShineOverlay = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: all 0.8s ease;
  z-index: 2;
  animation: ${shine} 3s infinite linear paused;
  
  .grid-item:hover & {
    animation-play-state: running;
  }
`;

const ColorBurst = styled.div`
  position: absolute;
  width: 150%;
  height: 150%;
  background: radial-gradient(
    circle,
    rgba(0, 230, 118, 0.1) 0%,
    rgba(0, 191, 165, 0.05) 20%,
    rgba(0, 255, 204, 0.03) 40%,
    transparent 70%
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 1;
  
  .grid-item:hover & {
    opacity: 1;
  }
`;

const ImageOverlayLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 40%;
  background: linear-gradient(90deg, 
    rgba(10, 20, 15, 0.95) 0%, 
    rgba(10, 20, 15, 0.85) 70%, 
    transparent 100%
  );
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translateX(-100%);
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 3;

  @media (max-width: 768px) {
    width: 60%;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 70%;
    padding: 0.3rem;
  }
`;

const ImageOverlayRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  background: linear-gradient(270deg, 
    rgba(10, 20, 15, 0.95) 0%, 
    rgba(10, 20, 15, 0.85) 70%, 
    transparent 100%
  );
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 3;
  text-align: right;

  @media (max-width: 768px) {
    width: 60%;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 70%;
    padding: 0.3rem;
  }
`;

const ImageTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  background: linear-gradient(135deg, #00E676, #00BFA5, #00E676);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${shine} 3s ease-in-out infinite;

  @media (max-width: 968px) {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const ImageDescription = styled.div`
  font-size: 0.8rem;
  color: #e2e8f0;
  opacity: 0.9;
  line-height: 1.4;

  @media (max-width: 968px) {
    font-size: 0.75rem;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    line-height: 1.2;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    display: none; /* Hide description on very small screens */
  }
`;

const AspectRatioBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: linear-gradient(135deg, rgba(0, 230, 118, 0.9), rgba(0, 191, 165, 0.9));
  color: #0a140f;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 4;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    top: 0.3rem;
    right: 0.3rem;
    padding: 0.2rem 0.4rem;
    font-size: 0.6rem;
  }

  @media (max-width: 480px) {
    display: none; /* Hide badge on mobile to reduce clutter */
  }
`;

const Step1LogoSelection = ({ onScrollFromHero, receivedImages }) => {
  const itemsRef = useRef([]);
  const sectionRef = useRef();
  const [imagesReturned, setImagesReturned] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Define gradient types for each item
  const gridItems = [
    // Row 1 - Optimized for mobile
    {
      id: 1,
      url: img1,
      aspectRatio: "4:3",
      title: "Mountain Majesty",
      description: "Snow-capped peaks",
      overlaySide: "left",
      gradientType: "1" // Green gradient from top-left
    },
    {
      id: 2,
      url: img7,
      aspectRatio: "9:16",
      title: "Alpine Summit",
      description: "Breathtaking view",
      overlaySide: "right",
      gradientType: "2" // Diagonal gradient
    },
    {
      id: 3,
      url: img,
      aspectRatio: "16:9",
      title: "Misty Mountains",
      description: "Fog over hills",
      overlaySide: "left",
      gradientType: "3" // Green gradient from bottom-right
    },
    {
      id: 4,
      url: img6,
      aspectRatio: "9:16",
      title: "Lake Serenity",
      description: "Perfect mirror",
      overlaySide: "right",
      gradientType: "4" // Radial gradient
    },
    // Row 2
    {
      id: 5,
      url: img5,
      aspectRatio: "4:3",
      title: "Forest Pathway",
      description: "Sunlit trail",
      overlaySide: "left",
      gradientType: "5" // Bottom-right gradient
    },
    {
      id: 6,
      url: img8,
      aspectRatio: "9:16",
      title: "Autumn Colors",
      description: "Vibrant foliage",
      overlaySide: "right",
      gradientType: "6" // Top-left gradient
    },
    {
      id: 7,
      url: img4,
      aspectRatio: "16:9",
      title: "Northern Lights",
      description: "Aurora dancing",
      overlaySide: "left",
      gradientType: "1"
    },
    {
      id: 8,
      url: img3,
      aspectRatio: "9:16",
      title: "Mirror Lake",
      description: "Perfect reflection",
      overlaySide: "right",
      gradientType: "2"
    },
    {
      id: 9,
      url: img2,
      aspectRatio: "4:3",
      title: "Alpine Meadow",
      description: "Wildflowers",
      overlaySide: "left",
      gradientType: "3"
    },
    {
      id: 10,
      url: img9,
      aspectRatio: "9:16",
      title: "Tropical Beach",
      description: "Palm trees",
      overlaySide: "right",
      gradientType: "4"
    },
    {
      id: 11,
      url: img10,
      aspectRatio: "16:9",
      title: "Colorful Sunset",
      description: "Vibrant horizon",
      overlaySide: "left",
      gradientType: "5"
    },
    {
      id: 12,
      url: img11,
      aspectRatio: "9:16",
      title: "Enchanted Woods",
      description: "Mystical forest",
      overlaySide: "right",
      gradientType: "6"
    }
  ];

  useEffect(() => {
    // Check if mobile on component mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (onScrollFromHero || receivedImages) {
      const timer = setTimeout(() => {
        returnImagesToGrid();
      }, 800);

      return () => clearTimeout(timer);
    } else {
      animateGridEntrance();
    }
  }, [onScrollFromHero, receivedImages]);

  const returnImagesToGrid = () => {
    if (imagesReturned) return;

    setImagesReturned(true);
    const targetGridItems = itemsRef.current.slice(0, 4);

    const returnTl = gsap.timeline();

    targetGridItems.forEach((item, index) => {
      if (item) {
        returnTl.fromTo(item, {
          opacity: 0,
          scale: 0.5,
          y: 100,
          rotation: -10
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.1
        });
      }
    });

    returnTl.call(() => {
      animateRemainingGrid();
    });
  };

  const animateGridEntrance = () => {
    const gridTl = gsap.timeline();
    gridTl.fromTo(itemsRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      stagger: {
        amount: 1,
        from: "center"
      },
      ease: "back.out(1.2)",
      delay: 0.5
    });
  };

  const animateRemainingGrid = () => {
    const remainingItems = itemsRef.current.slice(4);
    gsap.fromTo(remainingItems, {
      opacity: 0,
      y: 50,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: {
        amount: 0.8,
        from: "start"
      },
      ease: "back.out(1.2)"
    });
  };

  const renderGridItems = () => {
    const items = [];
    
    for (let i = 0; i < gridItems.length; i += 2) {
      const currentItem = gridItems[i];
      const nextItem = gridItems[i + 1];
      
      if (currentItem.aspectRatio === '9:16' && nextItem?.aspectRatio === '9:16') {
        // Pair two 9:16 images for mobile
        items.push(
          <MobilePair key={`pair-${i}`}>
            <GridItem
              aspectRatio={currentItem.aspectRatio}
              ref={addToRefs}
              className="grid-item"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: (i < 4 && onScrollFromHero && !imagesReturned) ? 0 : 1
              }}
            >
              <ImageContainer>
                <Image src={currentItem.url} alt={currentItem.title} loading="lazy" />
                <GradientOverlay 
                  className="gradient-overlay" 
                  gradientType={currentItem.gradientType}
                />
                <ShineOverlay className="shine-overlay" />
                <ColorBurst className="color-burst" />
              </ImageContainer>
              <AspectRatioBadge>{currentItem.aspectRatio}</AspectRatioBadge>
              {currentItem.overlaySide === 'left' ? (
                <ImageOverlayLeft className="image-overlay-left">
                  <ImageTitle>{currentItem.title}</ImageTitle>
                  <ImageDescription>{currentItem.description}</ImageDescription>
                </ImageOverlayLeft>
              ) : (
                <ImageOverlayRight className="image-overlay-right">
                  <ImageTitle>{currentItem.title}</ImageTitle>
                  <ImageDescription>{currentItem.description}</ImageDescription>
                </ImageOverlayRight>
              )}
            </GridItem>
            <GridItem
              aspectRatio={nextItem.aspectRatio}
              ref={addToRefs}
              className="grid-item"
              style={{
                animationDelay: `${(i + 1) * 0.1}s`,
                opacity: ((i + 1) < 4 && onScrollFromHero && !imagesReturned) ? 0 : 1
              }}
            >
              <ImageContainer>
                <Image src={nextItem.url} alt={nextItem.title} loading="lazy" />
                <GradientOverlay 
                  className="gradient-overlay" 
                  gradientType={nextItem.gradientType}
                />
                <ShineOverlay className="shine-overlay" />
                <ColorBurst className="color-burst" />
              </ImageContainer>
              <AspectRatioBadge>{nextItem.aspectRatio}</AspectRatioBadge>
              {nextItem.overlaySide === 'left' ? (
                <ImageOverlayLeft className="image-overlay-left">
                  <ImageTitle>{nextItem.title}</ImageTitle>
                  <ImageDescription>{nextItem.description}</ImageDescription>
                </ImageOverlayLeft>
              ) : (
                <ImageOverlayRight className="image-overlay-right">
                  <ImageTitle>{nextItem.title}</ImageTitle>
                  <ImageDescription>{nextItem.description}</ImageDescription>
                </ImageOverlayRight>
              )}
            </GridItem>
          </MobilePair>
        );
        i++; // Skip next item since we paired it
      } else {
        // Single item
        items.push(
          <GridItem
            key={currentItem.id}
            aspectRatio={currentItem.aspectRatio}
            ref={addToRefs}
            className="grid-item"
            style={{
              animationDelay: `${i * 0.1}s`,
              opacity: (i < 4 && onScrollFromHero && !imagesReturned) ? 0 : 1
            }}
          >
            <ImageContainer>
              <Image src={currentItem.url} alt={currentItem.title} loading="lazy" />
              <GradientOverlay 
                className="gradient-overlay" 
                gradientType={currentItem.gradientType}
              />
              <ShineOverlay className="shine-overlay" />
              <ColorBurst className="color-burst" />
            </ImageContainer>
            <AspectRatioBadge>{currentItem.aspectRatio}</AspectRatioBadge>
            {currentItem.overlaySide === 'left' ? (
              <ImageOverlayLeft className="image-overlay-left">
                <ImageTitle>{currentItem.title}</ImageTitle>
                <ImageDescription>{currentItem.description}</ImageDescription>
              </ImageOverlayLeft>
            ) : (
              <ImageOverlayRight className="image-overlay-right">
                <ImageTitle>{currentItem.title}</ImageTitle>
                <ImageDescription>{currentItem.description}</ImageDescription>
              </ImageOverlayRight>
            )}
          </GridItem>
        );
      }
    }
    
    return items;
  };

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <GridSection ref={sectionRef}>
      {/* Background Elements */}
      <FloatingOrb />
      <FloatingOrb />
      <FloatingOrb />
      <GeometricShape />
      <GeometricShape />
      <GeometricShape />

      <TopOverlay />
      <Container>
        <MainGrid>
          {isMobile ? (
            // Mobile layout with paired 9:16 images
            renderGridItems()
          ) : (
            // Web layout - original grid structure
            gridItems.map((item, index) => (
              <GridItem
                key={item.id}
                aspectRatio={item.aspectRatio}
                ref={addToRefs}
                className="grid-item"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: (index < 4 && onScrollFromHero && !imagesReturned) ? 0 : 1
                }}
              >
                <ImageContainer>
                  <Image
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                  />
                  <GradientOverlay 
                    className="gradient-overlay" 
                    gradientType={item.gradientType}
                  />
                  <ShineOverlay className="shine-overlay" />
                  <ColorBurst className="color-burst" />
                </ImageContainer>
                <AspectRatioBadge>{item.aspectRatio}</AspectRatioBadge>

                {item.overlaySide === 'left' ? (
                  <ImageOverlayLeft className="image-overlay-left">
                    <ImageTitle>{item.title}</ImageTitle>
                    <ImageDescription>{item.description}</ImageDescription>
                  </ImageOverlayLeft>
                ) : (
                  <ImageOverlayRight className="image-overlay-right">
                    <ImageTitle>{item.title}</ImageTitle>
                    <ImageDescription>{item.description}</ImageDescription>
                  </ImageOverlayRight>
                )}
              </GridItem>
            ))
          )}
        </MainGrid>
        <BottomOverlay />
      </Container>
    </GridSection>
  );
};

export default Step1LogoSelection;