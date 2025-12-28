import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.dark};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: white;
`;

const Loader = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid ${props => props.theme.primary};
  border-radius: 50%;
  margin-bottom: 2rem;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-top: 1rem;
  overflow: hidden;
`;

const Progress = styled.div`
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.primary}, ${props => props.theme.secondary});
  border-radius: 2px;
`;

const Loading = ({ onLoadingComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Animate out
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: onLoadingComplete
        });
      }
    });

    // Rotate loader
    tl.to(loaderRef.current, {
      rotation: 360,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1
    });

    // Animate text
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=1.5"
    );

    // Animate progress bar
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut"
    }, "-=2");

    // Text animation effect
    const text = textRef.current;
    const originalText = text.textContent;
    const letters = originalText.split('');
    
    text.textContent = '';
    
    letters.forEach((letter, i) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.opacity = '0';
      text.appendChild(span);
      
      gsap.to(span, {
        opacity: 1,
        duration: 0.1,
        delay: i * 0.05,
        ease: "power2.out"
      });
    });

  }, [onLoadingComplete]);

  return (
    <LoadingContainer ref={containerRef}>
      <Loader ref={loaderRef} />
      <LoadingText ref={textRef}>Loading</LoadingText>
      <ProgressBar>
        <Progress ref={progressRef} />
      </ProgressBar>
    </LoadingContainer>
  );
};

export default Loading;