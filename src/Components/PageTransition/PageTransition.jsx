import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

const TransitionOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.dark};
  z-index: 9998;
  pointer-events: none;
`;

const PageTransition = ({ isVisible, children }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      // Animate in
      gsap.fromTo(overlayRef.current,
        { x: '-100%' },
        { x: '0%', duration: 0.8, ease: "power2.inOut" }
      );
    } else {
      // Animate out
      gsap.fromTo(overlayRef.current,
        { x: '0%' },
        { x: '100%', duration: 0.8, ease: "power2.inOut", delay: 0.2 }
      );
    }
  }, [isVisible]);

  return (
    <>
      <TransitionOverlay ref={overlayRef} />
      {children}
    </>
  );
};

export default PageTransition;