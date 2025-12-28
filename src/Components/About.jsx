// About.jsx
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled, { keyframes } from 'styled-components';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const sparkle = keyframes`
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

const AboutSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a140f 0%, #0f1e14 50%, #0a140f 100%);
  background-size: 400% 400%;
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
      radial-gradient(circle at 20% 80%, rgba(0, 230, 118, 0.08) 0%, transparent 25%),
      radial-gradient(circle at 80% 20%, rgba(0, 191, 165, 0.08) 0%, transparent 25%),
      radial-gradient(circle at 40% 40%, rgba(0, 255, 204, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 2rem 80px;
  position: relative;
  z-index: 2;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionBadge = styled.div`
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  background: rgba(0, 230, 118, 0.1);
  color: #00E676;
  border: 1px solid rgba(0, 230, 118, 0.3);
  border-radius: 25px;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00E676, #00BFA5, #00E676);
  background-size: 200% 200%;
  animation: ${gradientShift} 6s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #b2dfdb;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  margin-bottom: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightPanel = styled.div`
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ServiceTitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ServiceTitleItem = styled.div`
  padding: 1.5rem 2rem;
  border-radius: 16px;
  background: ${props => props.active ? 'rgba(0, 230, 118, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'rgba(0, 230, 118, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 230, 118, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: rgba(0, 230, 118, 0.08);
    border-color: rgba(0, 230, 118, 0.4);
    transform: translateX(8px);
  }

  ${props => props.active && `
    background: rgba(0, 230, 118, 0.15) !important;
    border-color: rgba(0, 230, 118, 0.5) !important;
    transform: translateX(8px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.15);
  `}
`;

const ServiceNumber = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.active ? '#00E676' : 'rgba(255, 255, 255, 0.5)'};
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
`;

const ServiceName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.active ? '#00E676' : '#e2e8f0'};
  margin: 0;
  transition: color 0.3s ease;
  position: relative;

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 30px;
      height: 2px;
      background: #00E676;
      border-radius: 2px;
    }
  `}
`;

const ServiceCardsContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 600px; // Increased height for stacking
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 230, 118, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  opacity: ${props => props.active ? 1 : 0.3};
  transform: ${props => props.active ?
    'translateY(0) scale(1)' :
    'translateY(50px) scale(0.9)'};
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: ${props => props.active ? 3 : props.index + 1};
  
  ${props => !props.active && `
    pointer-events: none;
  `}

  &:hover {
    border-color: rgba(0, 230, 118, 0.3);
    box-shadow: 0 20px 50px rgba(0, 230, 118, 0.2);
  }
`;
// About.jsx - Fix the ServiceIcon component
const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(0, 230, 118, 0.2), rgba(0, 191, 165, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  transition: all 0.3s ease;
  
  /* Use ::before with content based on data attribute */
  &::before {
    content: attr(data-icon);
  }

  ${ServiceCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: linear-gradient(135deg, rgba(0, 230, 118, 0.3), rgba(0, 191, 165, 0.3));
  }
`;



const ServiceCardTitle = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ServiceDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #b2dfdb;
  margin-bottom: 2rem;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceFeature = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #e2e8f0;
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  transition: color 0.3s ease;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #00E676;
    font-weight: bold;
    transition: transform 0.3s ease;
  }

  ${ServiceCard}:hover & {
    color: #ffffff;
    
    &::before {
      transform: scale(1.2);
    }
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 230, 118, 0.05);
    border-color: rgba(0, 230, 118, 0.2);
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #b2dfdb;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled.a`
  font-family: 'Inter', sans-serif;
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  min-width: 180px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
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
      box-shadow: 0 8px 25px rgba(0, 230, 118, 0.2);
    }
  `}
`;

const services = [
  {
    id: 1,
    number: '01',
    name: 'Web Design & Development',
    icon: '💻',
    title: 'Web Design & Development',
    description: 'Creating stunning, responsive websites that not only look beautiful but perform exceptionally across all devices and platforms.',
    features: [
      'Custom Website Design',
      'Frontend & Backend Development',
      'E-commerce Solutions',
      'Performance Optimization'
    ]
  },
  {
    id: 2,
    number: '02',
    name: 'Logo & Brand Identity',
    icon: '🎨',
    title: 'Logo & Brand Identity',
    description: 'Designing memorable logos and comprehensive brand systems that communicate your unique value and build lasting impressions.',
    features: [
      'Custom Logo Design',
      'Brand Style Guides',
      'Visual Identity Systems',
      'Brand Strategy'
    ]
  },
  {
    id: 3,
    number: '03',
    name: 'Social Media Management',
    icon: '📱',
    title: 'Social Media Management',
    description: 'Building and maintaining your social presence with strategic content that engages your audience and grows your community.',
    features: [
      'Content Strategy & Creation',
      'Community Management',
      'Social Media Advertising',
      'Analytics & Reporting'
    ]
  },
  {
    id: 4,
    number: '04',
    name: 'Sales Engagement',
    icon: '🚀',
    title: 'Sales Engagement',
    description: 'Driving business growth through strategic sales funnels, lead generation, and conversion optimization techniques.',
    features: [
      'Sales Funnel Design',
      'Lead Generation Strategies',
      'Conversion Rate Optimization',
      'Customer Retention Programs'
    ]
  }
];

const About = ({ activeService, onServiceClick, onServiceChange }) => {
  const handleServiceClick = (index) => {
    onServiceClick(index);
  };

  return (
    <AboutSection id="about">
      <Container>
        {/* Top Middle: Header Section */}
        <HeaderSection>
          <SectionBadge>Our Services</SectionBadge>
          <SectionTitle className="section-title">
            Crafting Digital Excellence
          </SectionTitle>
          <SectionSubtitle>
            Transforming ideas into exceptional digital experiences through innovative design and cutting-edge development
          </SectionSubtitle>
        </HeaderSection>

        {/* Middle: Main Content - Left Titles & Right Cards */}
        <MainContent>
          <LeftPanel>
            <ServiceTitlesContainer className="service-titles-container">
              {services.map((service, index) => (
                <ServiceTitleItem
                  key={service.id}
                  className="service-title-item"
                  active={activeService === index}
                  onClick={() => handleServiceClick(index)}
                >
                  <ServiceNumber active={activeService === index}>
                    {service.number}
                  </ServiceNumber>
                  <ServiceName active={activeService === index}>
                    {service.name}
                  </ServiceName>
                </ServiceTitleItem>
              ))}
            </ServiceTitlesContainer>
          </LeftPanel>

          <RightPanel>
            <ServiceCardsContainer>
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  className={`service-card-${index}`}
                  active={activeService === index}
                >
                  <ServiceIcon data-icon={service.icon} />
                  <ServiceCardTitle>{service.title}</ServiceCardTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <ServiceFeatures>
                    {service.features.map((feature, featureIndex) => (
                      <ServiceFeature key={featureIndex}>
                        {feature}
                      </ServiceFeature>
                    ))}
                  </ServiceFeatures>
                </ServiceCard>
              ))}
            </ServiceCardsContainer>
          </RightPanel>
        </MainContent>

        {/* Bottom Middle: Stats and CTA */}
        <BottomSection>
          <StatsGrid className="stats-grid">
            <StatItem className="stat-item">
              <StatNumber>50+</StatNumber>
              <StatLabel>Websites Launched</StatLabel>
            </StatItem>
            <StatItem className="stat-item">
              <StatNumber>100+</StatNumber>
              <StatLabel>Brands Designed</StatLabel>
            </StatItem>
            <StatItem className="stat-item">
              <StatNumber>1M+</StatNumber>
              <StatLabel>Social Reach</StatLabel>
            </StatItem>
            <StatItem className="stat-item">
              <StatNumber>∞</StatNumber>
              <StatLabel>Creativity</StatLabel>
            </StatItem>
          </StatsGrid>

          <ButtonGroup className="button-group">
            <CTAButton
              primary
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Our Work
            </CTAButton>
            <CTAButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Your Project
            </CTAButton>
          </ButtonGroup>
        </BottomSection>
      </Container>
    </AboutSection>
  );
};

export default About;