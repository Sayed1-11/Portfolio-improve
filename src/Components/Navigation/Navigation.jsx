import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { Container } from '../../styles/GlobalStyles';
import file from '../../assets/resume.pdf';
import { FiDownload } from 'react-icons/fi'; // Install react-icons if not already: npm install react-icons

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0.5rem 1rem;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavBackground = styled.div`
  position: absolute;
  top: 0.6rem;
  left: 50%;
  transform: translateX(-50%);
  width: ${props => props.contentWidth}px;
  height: calc(100% - 1.2rem);
  background: ${props => props.scrolled 
    ? 'rgba(0, 230, 118, 0.1)' 
    : 'rgba(255, 255, 255, 0.05)'
  };
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.scrolled 
    ? 'rgba(0, 230, 118, 0.3)' 
    : 'rgba(255, 255, 255, 0.1)'
  };
  border-radius: 25px;
  transition: all 0.3s ease;
  box-shadow: ${props => props.scrolled 
    ? '0 8px 32px rgba(0, 230, 118, 0.1)' 
    : '0 4px 20px rgba(0, 0, 0, 0.1)'
  };
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 0.5rem 0.5rem;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const DevImage = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${props => props.scrolled 
    ? 'rgba(0, 230, 118, 0.5)' 
    : 'rgba(255, 255, 255, 0.3)'
  };
  transition: all 0.3s ease;
  background: linear-gradient(135deg, ${props => props.theme?.primary || '#00E676'}, ${props => props.theme?.secondary || '#00BFA5'});

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
    filter: ${props => props.scrolled ? 'none' : 'brightness(1.1)'};
  }
`;

const Name = styled.div`
  display: flex;
  gap: 4px;
  padding: 0 10px;
`;

const FirstName = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  color: ${props => props.scrolled ? '#00E676' : 'white'};
  transition: all 0.3s ease;
  letter-spacing: -0.5px;
`;

const LastName = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  color: ${props => props.scrolled ? '#00E676' : 'white'};
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    color: ${props => props.scrolled ? '#00E676' : 'white'};
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 0;

    &:hover {
      color: white;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #00E676, #00E676);
      transition: width 0.3s ease;
      border-radius: 2px;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const ResumeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  color: #0a140f;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4);
    color: #083020;
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    font-size: 1rem;
    transition: transform 0.3s ease;
  }

  &:hover .icon {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ResumeButtonMobile = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  color: #0a140f;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  margin-top: 2rem;
  width: 80%;
  justify-content: center;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4);
    color: #083020;
    text-decoration: none;
    
    &::before {
      left: 100%;
    }
  }

  .icon {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  &:hover .icon {
    transform: translateY(-2px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.scrolled ? '#00E676' : 'white'};
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  z-index: 2;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
  }

  .hamburger-line {
    width: 20px;
    height: 2px;
    background: ${props => props.scrolled ? '#00E676' : 'white'};
    transition: all 0.3s ease;
    position: absolute;
    
    &:nth-child(1) {
      transform: ${props => props.menuOpen ? 'rotate(45deg) translate(0, 0)' : 'translateY(-6px)'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.menuOpen ? 0 : 1};
    }
    
    &:nth-child(3) {
      transform: ${props => props.menuOpen ? 'rotate(-45deg) translate(0, 0)' : 'translateY(6px)'};
    }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, rgba(10, 20, 15, 0.98), rgba(15, 30, 20, 0.95));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
  gap: 1.8rem;
  z-index: 999;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);

  a {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 0.5rem 1.5rem;
    border-radius: 10px;
    width: 80%;
    text-align: center;
    position: relative;
    overflow: hidden;

    &:hover {
      color: #00E676;
      background: rgba(0, 230, 118, 0.1);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #00E676, #00BFA5);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contentWidth, setContentWidth] = useState(1200);
  const navContentRef = useRef(null);

  // Add your resume PDF file path here
  const resumeUrl = 'https://drive.google.com/file/d/1H7sMMDWFDflwMA0F5FnQaHn3QUKaM1bf/view?usp=drive_link'; // Update this path to your actual resume file
  const resumeFilename = file; // Update this to your filename

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    const updateContentWidth = () => {
      if (navContentRef.current) {
        const width = navContentRef.current.offsetWidth;
        setContentWidth(width);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateContentWidth);
    
    // Initial animations
    gsap.fromTo('.nav-content', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Get initial content width
    setTimeout(updateContentWidth, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateContentWidth);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNameClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = resumeFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Nav scrolled={scrolled}>
        <NavBackground 
          scrolled={scrolled} 
          contentWidth={contentWidth}
        />
        <Container>
          <NavContent 
            className="nav-content" 
            ref={navContentRef}
          >
            <NameContainer onClick={handleNameClick}>
              <Name>
                <FirstName scrolled={scrolled}>Sheikh</FirstName>
                <LastName scrolled={scrolled}>Sayed</LastName>
              </Name>
            </NameContainer>
            
            <NavLinks scrolled={scrolled}>
              <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Services</a>
              <a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }}>Portfolio</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
              
              {/* Resume Download Button for Desktop */}
              <ResumeButton onClick={handleDownloadResume}>
                <FiDownload className="icon" />
                Resume
              </ResumeButton>
            </NavLinks>
            
            <MobileMenuButton 
              scrolled={scrolled} 
              menuOpen={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </MobileMenuButton>
          </NavContent>
        </Container>
      </Nav>

      <MobileMenu isOpen={mobileMenuOpen}>
        <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a>
        <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Services</a>
        <a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }}>Portfolio</a>
        <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
        
        {/* Resume Download Button for Mobile */}
        <ResumeButtonMobile href={resumeUrl} download={resumeFilename}>
          <FiDownload className="icon" />
          Download Resume
        </ResumeButtonMobile>
      </MobileMenu>
    </>
  );
};

export default Navigation;