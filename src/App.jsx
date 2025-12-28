import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { JourneyProvider } from './Components/context/JourneyContext';
import Loading from './Components/Loading/Loading';
import PageTransition from './Components/PageTransition/PageTransition';
import HomeLayout from './Components/Layout/HomeLayout';
import Home from './Components/Home/Home';
import Projects from './Components/ProjectShowcase';
import Contact from './Components/Contact';
import { theme, GlobalStyles } from './styles/GlobalStyles';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Loading onLoadingComplete={handleLoadingComplete} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <JourneyProvider>
        <Router>
          <div className="App">
            <PageTransition isVisible={isTransitioning}>
              <Routes>
                {/* Home route with all sections in one scrollable page */}
                <Route path="/" element={
                  <HomeLayout>
                    <Home />
                  </HomeLayout>
                } />
                
                {/* Individual routes for direct access */}
                <Route path="/portfolio" element={
                  <HomeLayout>
                    <Projects />
                  </HomeLayout>
                } />
                
                <Route path="/contact" element={
                  <HomeLayout>
                    <Contact />
                  </HomeLayout>
                } />
              </Routes>
            </PageTransition>
          </div>
        </Router>
      </JourneyProvider>
    </ThemeProvider>
  );
}

export default App;