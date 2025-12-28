// Skills.jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled, { keyframes } from 'styled-components';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const SkillsSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a140f 0%, #0f1e14 50%, #0a140f 100%);
  background-size: 400% 400%;
  position: relative;
  overflow: hidden;
  padding: 100px 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 70%, rgba(0, 230, 118, 0.08) 0%, transparent 25%),
      radial-gradient(circle at 70% 30%, rgba(0, 191, 165, 0.08) 0%, transparent 25%),
      radial-gradient(circle at 50% 50%, rgba(0, 255, 204, 0.03) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 5rem;
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 230, 118, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

  &:hover {
    border-color: rgba(0, 230, 118, 0.3);
    box-shadow: 0 20px 50px rgba(0, 230, 118, 0.15);
    transform: translateY(-5px);
  }

  &:hover::before {
    left: 100%;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CategoryIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(0, 230, 118, 0.2), rgba(0, 191, 165, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: #00E676;
  transition: all 0.3s ease;

  ${SkillCategory}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: linear-gradient(135deg, rgba(0, 230, 118, 0.3), rgba(0, 191, 165, 0.3));
  }
`;

const CategoryTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const SkillList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const SkillItem = styled.div`
  position: relative;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const SkillName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #e2e8f0;
  transition: color 0.3s ease;

  ${SkillCategory}:hover & {
    color: white;
  }
`;

const SkillPercentage = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00E676, #00BFA5);
  border-radius: 4px;
  position: relative;
  width: ${props => props.percentage}%;
  transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const TechStackSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const TechStackTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TechStackGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const TechItem = styled.div`
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 230, 118, 0.1);
  border-radius: 50px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #b2dfdb;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: rgba(0, 230, 118, 0.1);
    color: #00E676;
    border-color: rgba(0, 230, 118, 0.3);
    transform: translateY(-3px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatsItem = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
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
    transition: left 0.5s ease;
  }

  &:hover {
    background: rgba(0, 230, 118, 0.05);
    border-color: rgba(0, 230, 118, 0.2);
    transform: translateY(-5px);
    
    &::before {
      left: 100%;
    }
  }
`;

const StatsNumber = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const StatsLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
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

const skillsData = {
  categories: [
    {
      id: 1,
      icon: '💻',
      title: 'Frontend Development',
      skills: [
        { name: 'React', percentage: 95 },
        { name: 'JavaScript (ES6+)', percentage: 98 },
        { name: 'TypeScript', percentage: 85 },
        { name: 'HTML5 & CSS3', percentage: 92 },
        { name: 'Styled Components', percentage: 90 },
        { name: 'Tailwind CSS', percentage: 88 }
      ]
    },
    {
      id: 2,
      icon: '⚙️',
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', percentage: 92 },
        { name: 'Express.js', percentage: 90 },
        { name: 'Django', percentage: 85 },
        { name: 'REST APIs', percentage: 94 },
        { name: 'GraphQL', percentage: 80 },
        { name: 'Python', percentage: 88 }
      ]
    },
    {
      id: 3,
      icon: '🗄️',
      title: 'Databases',
      skills: [
        { name: 'MongoDB', percentage: 90 },
        { name: 'PostgreSQL', percentage: 85 },
        { name: 'MySQL', percentage: 82 },
        { name: 'Firebase', percentage: 78 },
        { name: 'Redis', percentage: 75 },
        { name: 'Prisma', percentage: 80 }
      ]
    },
    {
      id: 4,
      icon: '🛠️',
      title: 'Tools & DevOps',
      skills: [
        { name: 'Git & GitHub', percentage: 95 },
        { name: 'Docker', percentage: 80 },
        { name: 'AWS', percentage: 75 },
        { name: 'VS Code', percentage: 98 },
        { name: 'Webpack', percentage: 82 },
        { name: 'Jest', percentage: 85 }
      ]
    }
  ],
  techStack: [
    'React', 'Node.js', 'Django', 'MongoDB', 'PostgreSQL', 
    'TypeScript', 'GraphQL', 'Docker', 'AWS', 'Firebase',
    'Tailwind', 'Styled-Components', 'GSAP', 'Framer Motion'
  ],
  stats: [
    { number: '10+', label: 'Projects Completed' },
    { number: '1+', label: 'Years Experience' },
    { number: '5+', label: 'Team Work' },
    { number: '∞', label: 'Lines of Code' }
  ]
};

const Skills = () => {
  const skillRefs = useRef([]);

  useGSAP(() => {
    // Animate skill bars on scroll
    skillRefs.current.forEach((skill, index) => {
      if (skill) {
        gsap.fromTo(
          skill.querySelector('.progress-fill'),
          { width: 0 },
          {
            width: `${skill.dataset.percentage}%`,
            duration: 1.5,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skill,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stats-number');
    statNumbers.forEach((stat, index) => {
      gsap.fromTo(
        stat,
        { textContent: 0 },
        {
          textContent: stat.dataset.target,
          duration: 2,
          delay: index * 0.2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate tech stack items
    gsap.fromTo('.tech-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.tech-stack-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  return (
    <SkillsSection id="skills">
      <Container>
        <HeaderSection>
          <SectionBadge>Technical Expertise</SectionBadge>
          <SectionTitle className="section-title">
            My Skills & Technologies
          </SectionTitle>
          <SectionSubtitle>
            Building digital solutions with modern technologies and best practices
          </SectionSubtitle>
        </HeaderSection>

        <SkillsGrid>
          {skillsData.categories.map((category) => (
            <SkillCategory key={category.id}>
              <CategoryHeader>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryHeader>
              <SkillList>
                {category.skills.map((skill, index) => (
                  <SkillItem
                    key={skill.name}
                    ref={el => skillRefs.current.push(el)}
                    data-percentage={skill.percentage}
                    className="skill-item"
                  >
                    <SkillHeader>
                      <SkillName>{skill.name}</SkillName>
                      <SkillPercentage>{skill.percentage}%</SkillPercentage>
                    </SkillHeader>
                    <ProgressBar>
                      <ProgressFill 
                        percentage={skill.percentage} 
                        className="progress-fill"
                      />
                    </ProgressBar>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
          ))}
        </SkillsGrid>

        <TechStackSection className="tech-stack-section">
          <TechStackTitle>Tech Stack</TechStackTitle>
          <TechStackGrid>
            {skillsData.techStack.map((tech, index) => (
              <TechItem key={index} className="tech-item">
                {tech}
              </TechItem>
            ))}
          </TechStackGrid>
        </TechStackSection>

        <StatsGrid className="stats-grid">
          {skillsData.stats.map((stat, index) => (
            <StatsItem key={index} className="stat-item">
              <StatsNumber 
                className="stats-number"
                data-target={stat.number}
              >
                {stat.number}
              </StatsNumber>
              <StatsLabel>{stat.label}</StatsLabel>
            </StatsItem>
          ))}
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
            View My Projects
          </CTAButton>
          <CTAButton
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Let's Work Together
          </CTAButton>
        </ButtonGroup>
      </Container>
    </SkillsSection>
  );
};

export default Skills;