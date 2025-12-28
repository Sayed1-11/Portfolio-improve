// ProjectShowcase.jsx
import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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
  height: 200px;
  background: linear-gradient(to top, rgba(0, 30, 15, 0.9) 0%, transparent 100%);
  pointer-events: none;
  z-index: 10;
`;

const ShowcaseSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 20, 15, 0.95) 100%, rgba(15, 30, 20, 0.98) 100%);
  position: relative;
  overflow: hidden;
  
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
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 2rem 50px;
  position: relative;
  z-index: 2;
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  text-align: center;
  color: #b2dfdb;
  margin-bottom: 8rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
    margin-bottom: 5rem;
  }
`;

const CardsContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.cardCount * 43}vh; 
`;

const CardStack = styled.div`
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  position: absolute;
  width: 90%;
  max-width: 1000px;
  height: 75vh;
  border-radius: 25px;
  overflow: hidden;
  background: linear-gradient(145deg, rgba(17, 17, 17, 0.95), rgba(10, 10, 10, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 35px 60px rgba(0, 230, 118, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 0 1px rgba(0, 230, 118, 0.3);
    border-color: rgba(0, 230, 118, 0.3);
    
    .gradient-overlay {
      opacity: 0.8;
      transform: scale(1.1);
    }
    
    .shine-overlay {
      background-position: 200% 50%;
    }
    
    .project-image {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: 80vh;
    width: 95%;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const CardContent = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  color: white;
  position: relative;
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(10, 20, 15, 0.95) 0%,
      rgba(10, 20, 15, 0.8) 100%,
      transparent 100%
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${Card}:hover &::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    padding: 2rem;
    order: 2;
  }
`;

const ProjectTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00E676, #00BFA5, #00E676);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${shine} 3s ease-in-out infinite;
  line-height: 1.1;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #00E676, #00BFA5);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    
    &::after {
      width: 40px;
      height: 2px;
      bottom: -5px;
    }
  }
`;

const ProjectDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6;
  color: #e2e8f0;
  margin-bottom: 2rem;
  position: relative;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
`;

const Tag = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 230, 118, 0.15);
  color: #00E676;
  border: 1px solid rgba(0, 230, 118, 0.3);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  font-weight: 500;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &:hover {
    background: rgba(0, 230, 118, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 230, 118, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProjectButton = styled.a`
  font-family: 'Inter', sans-serif;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
    z-index: -1;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, #00E676, #00BFA5);
    color: #0f0f0f;
    box-shadow: 0 6px 20px rgba(0, 230, 118, 0.3);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(0, 230, 118, 0.4);
    }
  ` : `
    background: transparent;
    color: #00E676;
    border: 1.5px solid rgba(0, 230, 118, 0.5);
    
    &:hover {
      background: rgba(0, 230, 118, 0.1);
      transform: translateY(-3px);
    }
  `}
`;

const ImgWrapper = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(0, 230, 118, 0.1) 0%,
      rgba(0, 191, 165, 0.2) 50%,
      rgba(0, 255, 204, 0.1) 100%
    );
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${Card}:hover &::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    order: 1;
  }
`;

const ProjectImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, 
    rgba(0, 230, 118, 0.4) 0%,
    rgba(0, 191, 165, 0.3) 30%,
    rgba(0, 255, 204, 0.2) 70%,
    transparent 100%
  );
  opacity: 0.5;
  transition: all 0.6s ease;
  z-index: 2;
  pointer-events: none;
  
  ${props => props.gradientType === '2' && `
    background: linear-gradient(45deg, 
      transparent 0%,
      rgba(0, 230, 118, 0.3) 25%,
      rgba(0, 191, 165, 0.4) 50%,
      rgba(0, 255, 204, 0.3) 75%,
      transparent 100%
    );
  `}
  
  ${props => props.gradientType === '3' && `
    background: radial-gradient(
      circle at 70% 30%,
      rgba(0, 230, 118, 0.4) 0%,
      rgba(0, 191, 165, 0.3) 40%,
      rgba(0, 255, 204, 0.2) 70%,
      transparent 100%
    );
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
  z-index: 3;
  pointer-events: none;
  animation: ${shine} 3s infinite linear paused;
  
  ${Card}:hover & {
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
  pointer-events: none;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const OrnamentalBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 25px;
  background: linear-gradient(45deg, 
    transparent 49%,
    rgba(0, 230, 118, 0.3) 50%,
    transparent 51%
  );
  background-size: 20px 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 4;
  pointer-events: none;
  
  ${Card}:hover & {
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    border-radius: 20px;
  }
`;

const ProjectShowcase = ({ projects, onAnimationReady }) => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const defaultProjects = [
    {
      id: 1,
      title: "CareerSwift",
      description: "A modern job board platform connecting employers and job seekers with advanced matching algorithms and real-time notifications.",
      tags: ["Django", "Python", "PostgreSQL", "Redis", "Docker"],
      github: "https://github.com/Sayed161/CareerSwift",
      live: "https://career-swift.onrender.com/",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      gradientType: "1"
    },
    {
      id: 2,
      title: "TuskHub", 
      description: "Micro-tasking platform that seamlessly connects Workers, Buyers, and Admins with real-time task management and payment processing.",
      tags: ["React", "Node.js", "MongoDB", "WebSocket", "Stripe"],
      github: "https://github.com/Sayed161/Assignement-12",
      live: "https://taskbucks-4a4ba.web.app",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      gradientType: "2"
    },
    {
      id: 3,
      title: "Hunger Hero",
      description: "Full-stack application combating food waste through community-driven donations and smart distribution systems.",
      tags: ["MERN Stack", "Firebase", "Mapbox", "JWT", "PWA"],
      github: "https://github.com/Sayed161/Assignment-11-Client-Side",
      live: "https://hungerhero-ca978.web.app/",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      gradientType: "3"
    }
  ];

  const projectsToDisplay = projects || defaultProjects;

  useEffect(() => {
    if (onAnimationReady) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        onAnimationReady();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [onAnimationReady]);

  return (
    <ShowcaseSection id="projects" ref={sectionRef}>
      <TopOverlay />
      <Container>
        <SectionTitle className="section-title">Featured Projects</SectionTitle>
        <SectionSubtitle className="section-subtitle">
          A collection of my latest work showcasing innovative solutions and cutting-edge technologies
        </SectionSubtitle>
        
        <CardsContainer ref={cardsContainerRef} cardCount={projectsToDisplay.length} className="cards-container">
          <CardStack>
            {projectsToDisplay.map((project, idx) => (
              <Card 
                className="project-card" 
                key={project.id}
                ref={addToCardRefs}
                style={idx === 0 ? { 
                  opacity: 1, 
                  transform: 'translateY(0) scale(1)',
                  zIndex: projectsToDisplay.length - idx 
                } : { 
                  zIndex: projectsToDisplay.length - idx 
                }}
              >
                <CardContent>
                  <ProjectTitle className="project-title">
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription className="project-description">
                    {project.description}
                  </ProjectDescription>
                  
                  <TagsContainer className="tags-container">
                    {project.tags.map((tag, tagIndex) => (
                      <Tag 
                        key={tagIndex} 
                        delay={`${tagIndex * 0.1}s`}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </TagsContainer>
                  
                  <ButtonGroup className="button-group">
                    <ProjectButton 
                      primary 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </ProjectButton>
                    <ProjectButton 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Code
                    </ProjectButton>
                  </ButtonGroup>
                </CardContent>
                
                <ImgWrapper>
                  <ProjectImage 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    className="project-image"
                  />
                  <GradientOverlay 
                    className="gradient-overlay" 
                    gradientType={project.gradientType}
                  />
                  <ShineOverlay className="shine-overlay" />
                  <ColorBurst className="color-burst" />
                  <OrnamentalBorder />
                </ImgWrapper>
              </Card>
            ))}
          </CardStack>
        </CardsContainer>
      </Container>
      <BottomOverlay />
    </ShowcaseSection>
  );
};

export default ProjectShowcase;