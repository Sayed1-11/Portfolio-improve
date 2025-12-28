import React from 'react';
import { 
  Heart, 
  Code, 
  Coffee, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ExternalLink
} from 'lucide-react';
import styled, { keyframes } from 'styled-components';
import LOGO from '../assets/logo(2).png';
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

const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
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

const FooterSection = styled.footer`
  width: 100%;
  background: linear-gradient(135deg, rgba(10, 20, 15, 0.98) 0%, rgba(15, 30, 20, 0.95) 100%);
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
    animation: ${pulse} 6s ease-in-out infinite;
    pointer-events: none;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
  position: relative;
  z-index: 2;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BrandLogo = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00E676, #00BFA5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
`;

const BrandTagline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #b2dfdb;
  line-height: 1.6;
  max-width: 400px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b2dfdb;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(0, 230, 118, 0.1);
    border-color: rgba(0, 230, 118, 0.3);
    color: #00E676;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.2);
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ColumnTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(135deg, #00E676, #00BFA5);
    border-radius: 2px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #b2dfdb;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #00E676;
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(0, 230, 118, 0.1), rgba(0, 191, 165, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00E676;
  flex-shrink: 0;
`;

const ContactText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #00E676;
  font-weight: 500;
`;

const ContactValue = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #e2e8f0;
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #b2dfdb;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const MadeWithLove = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #b2dfdb;
  animation: ${float} 3s ease-in-out infinite;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const BottomLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #b2dfdb;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #00E676;
  }
`;

const BackToTop = styled.button`
  background: linear-gradient(135deg, #00E676, #00BFA5);
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  color: #0f0f0f;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: 'Home', href: '#home', onClick: () => scrollToSection('home') },
    { name: 'Projects', href: '#projects', onClick: () => scrollToSection('projects') },
    { name: 'Services', href: '#about', onClick: () => scrollToSection('about') },
    { name: 'Contact', href: '#contact', onClick: () => scrollToSection('contact') }
  ];

  const services = [
    { name: 'Web Development', href: '#about' },
    { name: 'Brand Design', href: '#about' },
    { name: 'Social Media', href: '#about' },
    { name: 'Consulting', href: '#about' }
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: 'https://www.facebook.com/sheikh.sayed.146', label: 'Facebook' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/sheikh-sayed/', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/sayed_in_frame/', label: 'Instagram' },
    { icon: <Mail size={20} />, href: 'mailto:sheikhsayed0202@gmail.com', label: 'Email' }
  ];

  return (
    <FooterSection>
      <FooterContainer>
        <FooterContent>
          {/* Brand Section */}
          <BrandSection>
            <BrandLogo>SHEIKH SAYED</BrandLogo>
            <BrandTagline>
              Creating digital experiences that inspire and transform. 
              Let's build something amazing together.
            </BrandTagline>
            <SocialLinks>
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </SocialLink>
              ))}
            </SocialLinks>
          </BrandSection>

          {/* Quick Links */}
          <FooterColumn>
            <ColumnTitle>Quick Links</ColumnTitle>
            <FooterLinks>
              {quickLinks.map((link, index) => (
                <FooterLink
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    link.onClick();
                  }}
                >
                  <ExternalLink size={16} />
                  {link.name}
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>

          {/* Services */}
          <FooterColumn>
            <ColumnTitle>Services</ColumnTitle>
            <FooterLinks>
              {services.map((service, index) => (
                <FooterLink
                  key={index}
                  href={service.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('about');
                  }}
                >
                  {service.name}
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>

          {/* Contact Info */}
          <FooterColumn>
            <ColumnTitle>Get In Touch</ColumnTitle>
            <ContactInfo>
              <ContactItem>
                <ContactIcon>
                  <Phone size={18} />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Phone</ContactLabel>
                  <ContactValue>+880 157 0209 010</ContactValue>
                </ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <Mail size={18} />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Email</ContactLabel>
                  <ContactValue>sheikhsayed0202@gmail.com</ContactValue>
                </ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <MapPin size={18} />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Location</ContactLabel>
                  <ContactValue>Dhaka, Bangladesh</ContactValue>
                </ContactText>
              </ContactItem>
            </ContactInfo>
          </FooterColumn>
        </FooterContent>

        {/* Footer Bottom */}
        <FooterBottom>
          <Copyright>
            <span>© 2026 Sheikh Sayed. All rights reserved.</span>
          </Copyright>
          
          <BottomLinks>
            <BottomLink href="/privacy">Privacy Policy</BottomLink>
            <BottomLink href="/terms">Terms of Service</BottomLink>
            <BackToTop onClick={scrollToTop}>
              Back to Top
            </BackToTop>
          </BottomLinks>
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;