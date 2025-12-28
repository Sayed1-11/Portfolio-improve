import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Container } from '../../styles/GlobalStyles';
import ThreeScene from '../ThreeJS/ThreeScene.jsx';
import styled from 'styled-components';
import { useJourney } from '../context/JourneyContext.jsx';

const GlobalFontStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Inter:wght@400;500;600;700&display=swap');
`;

const HeroSection = styled.section`
  height: 100vh;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  text-align: center;
  background: linear-gradient(135deg, rgba(10, 20, 15, 0.95) 0%, rgba(15, 30, 20, 0.92) 100%);
  padding: 1rem; /* Added padding for mobile */

  @media (max-width: 1024px) {
    min-height: 700px;
    height: 100vh;
  }

  @media (max-width: 768px) {
    min-height: 600px;
    height: 100vh;
    padding: 0.5rem;
    justify-content: flex-start; /* Align content to top on mobile */
    padding-top: 4rem; /* Added top padding for mobile */
  }

  @media (max-width: 480px) {
    min-height: 550px;
    height: 100vh;
    padding-top: 3rem;
  }

  @media (max-width: 380px) {
    min-height: 500px;
    padding-top: 2.5rem;
  }
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 25% 75%, rgba(0, 230, 118, 0.15) 0%, transparent 15%),
    radial-gradient(circle at 70% 25%, rgba(0, 191, 165, 0.15) 0%, transparent 5%),
    radial-gradient(circle at 50% 50%, rgba(0, 255, 204, 0.08) 0%, transparent 60%);
  z-index: 1;
  
  @media (max-width: 768px) {
    background: 
      radial-gradient(circle at 25% 25%, rgba(0, 230, 118, 0.15) 0%, transparent 30%),
      radial-gradient(circle at 75% 75%, rgba(0, 191, 165, 0.15) 0%, transparent 30%);
  }
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 20;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem; /* Added padding for mobile */

  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }

  @media (max-width: 380px) {
    padding: 0 0.25rem;
  }
`;

const HeroContent = styled.div`
  z-index: 30;
  width: 100%;
  position: relative;
  max-width: 1200px; /* Limit max width for better readability */
  margin: 0 auto;
`;

const Greeting = styled.div`
  font-family: 'Barlow', sans-serif;
  font-size: 2rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.3px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  
  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 5px;
  }

  @media (max-width: 380px) {
    font-size: 1.2rem;
  }
`;

const NameTitle = styled.h1`
  font-family: 'Barlow', sans-serif;
  font-size: 5rem;
  font-weight: 700;
  font-style: italic;
  color: #ffffff;
  text-align: center;
  line-height: 1;
  letter-spacing: -1px;
  margin-bottom: 1.5rem;
  position: relative;
  text-shadow: 
    0 4px 20px rgba(0, 230, 118, 0.4),
    0 0 40px rgba(0, 230, 118, 0.3),
    0 2px 10px rgba(0, 0, 0, 0.8);
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (max-width: 1024px) {
    font-size: 4.2rem;
  }

  @media (max-width: 768px) {
    font-size: 3.4rem;
    line-height: 1.1;
    margin-bottom: 1rem;
    letter-spacing: -0.5px;
  }

  @media (max-width: 640px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.6rem;
    line-height: 1.15;
    letter-spacing: -0.3px;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 380px) {
    font-size: 2.2rem;
    margin-bottom: 0.6rem;
  }

  @media (max-width: 320px) {
    font-size: 2rem;
  }
`;

const RoleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    gap: 0.6rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 380px) {
    gap: 0.4rem;
    margin-bottom: 1.2rem;
  }
`;

const RoleTag = styled.span`
  font-family: 'Barlow', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  font-style: italic;
  padding: 0.6rem 1.8rem;
  border-radius: 50px;
  background: rgba(0, 230, 118, 0.1);
  color: #ffffff;
  border: 1px solid rgba(0, 230, 118, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(0, 230, 118, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 230, 118, 0.2);
  }
  
  @media (max-width: 1024px) {
    font-size: 1.1rem;
    padding: 0.5rem 1.6rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.45rem 1.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.4rem 1.2rem;
  }

  @media (max-width: 380px) {
    font-size: 0.9rem;
    padding: 0.35rem 1rem;
  }

  @media (max-width: 320px) {
    font-size: 0.85rem;
    padding: 0.3rem 0.8rem;
    white-space: normal;
    text-align: center;
  }
`;

const Description = styled.p`
  font-family: 'Barlow', sans-serif;
  font-size: 1.4rem;
  font-style: italic;
  font-weight: 400;
  color: #f0f0f0;
  max-width: 750px;
  line-height: 1.6;
  margin: 2.5rem auto 3rem;
  letter-spacing: 0.02em;
  text-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.7),
    0 1px 3px rgba(0, 0, 0, 0.5);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00E676, transparent);
  }
  
  @media (max-width: 1024px) {
    font-size: 1.3rem;
    max-width: 680px;
    margin: 2rem auto 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.15rem;
    max-width: 580px;
    line-height: 1.5;
    margin: 1.8rem auto 2rem;
    
    &::before {
      top: -0.8rem;
      width: 100px;
    }
  }

  @media (max-width: 640px) {
    font-size: 1.1rem;
    max-width: 520px;
    margin-bottom: 1.8rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 1.05rem;
    max-width: 100%;
    line-height: 1.45;
    margin: 1.5rem auto 1.8rem;
    padding: 0 0.5rem;
    
    &::before {
      top: -0.7rem;
      width: 80px;
    }
  }

  @media (max-width: 380px) {
    font-size: 1rem;
    line-height: 1.4;
    margin: 1.2rem auto 1.5rem;
    
    &::before {
      top: -0.6rem;
    }
  }

  @media (max-width: 320px) {
    font-size: 0.95rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 10;
  
  @media (max-width: 1024px) {
    gap: 2.5rem;
  }
  
  @media (max-width: 768px) {
    gap: 2rem;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 640px) {
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.2rem;
    margin-bottom: 1.8rem;
    width: 100%;
    justify-content: space-around;
  }

  @media (max-width: 380px) {
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 320px) {
    gap: 0.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  min-width: 130px;
  position: relative;
  padding: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: rgba(0, 230, 118, 0.25);
    backdrop-filter: blur(32px);
    border-radius: 10px;
    z-index: -1;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    padding: 0.4rem;
    
    &::before {
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
    }
  }

  @media (max-width: 480px) {
    min-width: 100px;
    flex: 1;
    max-width: 33%;
    padding: 0.3rem;
    
    &::before {
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
    }
  }

  @media (max-width: 380px) {
    min-width: 85px;
    padding: 0.2rem;
    
    &::before {
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
    }
  }

  @media (max-width: 320px) {
    min-width: 75px;
  }
`;

const StatNumber = styled.div`
  font-family: 'Barlow', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  font-style: italic;
  margin-bottom: 0.5rem;
  text-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(0, 230, 118, 0.3);
  letter-spacing: 0.05em;
  color: #ffffff;
  position: relative;

  @media (max-width: 1024px) {
    font-size: 2.4rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.4rem;
  }

  @media (max-width: 640px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 0.3rem;
  }

  @media (max-width: 380px) {
    font-size: 1.4rem;
  }

  @media (max-width: 320px) {
    font-size: 1.3rem;
  }
`;

const StatLabel = styled.div`
  font-family: 'Barlow', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  font-style: italic;
  color: #e8e8e8;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    letter-spacing: 1.2px;
  }

  @media (max-width: 640px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    letter-spacing: 1px;
  }

  @media (max-width: 380px) {
    font-size: 0.7rem;
    letter-spacing: 0.8px;
  }

  @media (max-width: 320px) {
    font-size: 0.65rem;
    white-space: normal;
    line-height: 1.1;
  }
`;

const CTAButton = styled.button`
  font-family: 'Barlow', sans-serif;
  font-style: italic;
  font-weight: 600;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  color: #0a140f;
  border: none;
  padding: 1.2rem 3.2rem;
  font-size: 1.2rem;
  border-radius: 100px;
  cursor: pointer;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: all 0.35s ease;
  box-shadow: 
    0 8px 25px rgba(0, 230, 118, 0.4),
    0 0 30px rgba(0, 230, 118, 0.2);
  min-width: 240px;
  position: relative;
  z-index: 10;
  border: 1px solid rgba(0, 230, 118, 0.3);
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(135deg, #00C853, #00BFA5);
    transform: translateY(-4px);
    box-shadow: 
      0 15px 40px rgba(0, 230, 118, 0.5),
      0 0 50px rgba(0, 230, 118, 0.3);
    color: #083020;
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    padding: 1.1rem 2.8rem;
    font-size: 1.15rem;
    min-width: 220px;
  }

  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    min-width: 200px;
    margin-top: 0.5rem;
  }

  @media (max-width: 640px) {
    padding: 0.9rem 2.2rem;
    font-size: 1.05rem;
    min-width: 180px;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
    min-width: 160px;
    width: 100%;
    max-width: 280px;
  }

  @media (max-width: 380px) {
    padding: 0.7rem 1.8rem;
    font-size: 0.95rem;
    min-width: 140px;
    max-width: 250px;
  }

  @media (max-width: 320px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
    min-width: 120px;
    max-width: 220px;
  }
`;

const ThreeSceneContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.7;

  canvas {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    opacity: 0.5;
    transform: scale(1.2) translateY(-10%);
  }

  @media (max-width: 480px) {
    opacity: 0.4;
    transform: scale(1.5) translateY(-15%);
  }

  @media (max-width: 380px) {
    opacity: 0.3;
    transform: scale(1.8) translateY(-20%);
  }
`;

const Hero = ({ onScrollToGrid, floatingImagesData }) => {
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const buttonRef = useRef(null);
  const sceneRef = useRef(null);
  const floatingImagesRef = useRef([]);
  const heroSectionRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const { startJourney } = useJourney();

  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    experience: 0,
    teamwork: 0,
  });

  const [imagesSent, setImagesSent] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate Three.js scene first
    tl.fromTo(sceneRef.current, 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );

    // Animate name
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );

    // Animate roles
    tl.fromTo('.role-tag',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2, ease: "back.out(1.7)" },
      "-=0.3"
    );

    // Animate description
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );

    // Animate stats
    tl.fromTo(statsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      "-=0.2"
    );

    // Animate button
    tl.fromTo(buttonRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
    );

    // Animate stats numbers
    const animateNumbers = () => {
      gsap.to(animatedStats, {
        projects: 10,
        experience: 1,
        teamwork: 5,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          setAnimatedStats({ ...animatedStats });
        }
      });
    };

    setTimeout(animateNumbers, 1000);

    const handleScroll = () => {
      if (imagesSent) return;

      const heroRect = heroSectionRef.current.getBoundingClientRect();
      if (heroRect.bottom < window.innerHeight * 0.2) {
        sendImagesToGrid();
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [imagesSent]);

  const handleExploreJourney = () => {
    if (onScrollToGrid) {
      onScrollToGrid();
    }
  };

  const sendImagesToGrid = () => {
    setImagesSent(true);
  };

  const addToFloatingRefs = (el, index) => {
    if (el && !floatingImagesRef.current.includes(el)) {
      floatingImagesRef.current[index] = el;
    }
  };

  return (
    <>
      <GlobalFontStyle />
      
      {/* Hero Section */}
      <HeroSection ref={heroSectionRef} id="hero-section">
        
        {/* Three.js Scene */}
        <ThreeSceneContainer ref={sceneRef}>
          <ThreeScene />
        </ThreeSceneContainer>

        <BackgroundOverlay />
        <Container>
          <TextContainer>
            <HeroContent>
              <Greeting>Hi, I'm</Greeting>
              
              <NameTitle ref={nameRef}>
                SHEIKH SAYED
              </NameTitle>
              
              <RoleContainer ref={roleRef}>
                <RoleTag className="role-tag">Full Stack Developer</RoleTag>
                <RoleTag className="role-tag">React Specialist</RoleTag>
                <RoleTag className="role-tag">Django Developer</RoleTag>
              </RoleContainer>
              
              <Description ref={subtitleRef}>
                I build exceptional digital experiences with modern technologies. 
                Currently focused on creating responsive web applications with clean, efficient code.
              </Description>

              <StatsContainer ref={statsRef}>
                <StatItem>
                  <StatNumber>+{Math.round(animatedStats.projects)}</StatNumber>
                  <StatLabel>Projects Completed</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>+{Math.round(animatedStats.experience)}</StatNumber>
                  <StatLabel>Years Experience</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>+{Math.round(animatedStats.teamwork)}</StatNumber>
                  <StatLabel>Team Work</StatLabel>
                </StatItem>
              </StatsContainer>

              <CTAButton ref={buttonRef} onClick={handleExploreJourney}>
                Explore My Work →
              </CTAButton>
            </HeroContent>
          </TextContainer>
        </Container>
      </HeroSection>
    </>
  );
};

export default Hero;