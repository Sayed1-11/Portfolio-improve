import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  // Primary colors
  primary: '#6366f1',
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',
  
  // Secondary colors
  secondary: '#8b5cf6',
  secondaryLight: '#a78bfa',
  secondaryDark: '#7c3aed',
  
  // Accent colors
  accent: '#06b6d4',
  accentLight: '#22d3ee',
  accentDark: '#0891b2',
  
  // Neutral colors
  dark: '#1e293b',
  darkLight: '#334155',
  light: '#f8fafc',
  lightDark: '#e2e8f0',
  
  // Text colors
  text: '#334155',
  textLight: '#64748b',
  textDark: '#1e293b',
  
  // Background colors
  background: '#ffffff',
  backgroundDark: '#0f172a',
  
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  gradientSecondary: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
  gradientDark: 'linear-gradient(135deg, #1e293b, #0f172a)',
  
  // Shadows
  shadowSmall: '0 2px 4px rgba(0, 0, 0, 0.1)',
  shadowMedium: '0 4px 6px rgba(0, 0, 0, 0.1)',
  shadowLarge: '0 10px 25px rgba(0, 0, 0, 0.15)',
  shadowXLarge: '0 20px 40px rgba(0, 0, 0, 0.2)',
  
  // Border radius
  borderRadiusSmall: '8px',
  borderRadiusMedium: '12px',
  borderRadiusLarge: '16px',
  borderRadiusXLarge: '24px',
  
  // Spacing
  spacingXs: '0.5rem',
  spacingSm: '1rem',
  spacingMd: '1.5rem',
  spacingLg: '2rem',
  spacingXl: '3rem',
  spacingXxl: '4rem'
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.background};
    color: ${theme.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: ${theme.spacingSm};
    color: ${theme.textDark};
  }

  h1 {
    font-size: 3.5rem;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 1.8rem;
  }

  p {
    margin-bottom: ${theme.spacingSm};
    line-height: 1.7;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.light};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.gradientPrimary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.primaryDark};
  }

  /* Selection */
  ::selection {
    background: rgba(99, 102, 241, 0.3);
    color: inherit;
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid ${theme.primary};
    outline-offset: 2px;
  }

  /* Remove focus outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Utility classes */
  .text-gradient {
    background: ${theme.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Animation classes */
  .fade-in {
    animation: fadeIn 0.8s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Prevent horizontal scroll */
  body {
    overflow-x: hidden;
  }

  /* Smooth scrolling for the entire app */
  html {
    scroll-behavior: smooth;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacingLg};

  @media (max-width: 768px) {
    padding: 0 ${props => props.theme.spacingMd};
  }

  @media (max-width: 480px) {
    padding: 0 ${props => props.theme.spacingSm};
  }
`;

export const Section = styled.section`
  padding: ${props => props.theme.spacingXl} 0;
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacingLg} 0;
  }
`;

export const Button = styled.button`
  background: ${props => props.variant === 'secondary' 
    ? props.theme.gradientSecondary 
    : props.theme.gradientPrimary
  };
  color: white;
  border: none;
  padding: ${props => props.theme.spacingSm} ${props => props.theme.spacingLg};
  font-size: 1rem;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadiusLarge};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadowLarge};
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;