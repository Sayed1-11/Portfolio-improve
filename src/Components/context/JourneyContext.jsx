import React, { createContext, useContext, useState } from 'react';

const JourneyContext = createContext();

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};

export const JourneyProvider = ({ children }) => {
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [finalBrand, setFinalBrand] = useState(null);

  const startJourney = () => {
    setJourneyStarted(true);
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const resetJourney = () => {
    setJourneyStarted(false);
    setCurrentStep(0);
    setSelectedLogo(null);
    setSelectedSocialMedia([]);
    setSelectedColors([]);
    setFinalBrand(null);
  };

  const value = {
    journeyStarted,
    currentStep,
    selectedLogo,
    selectedSocialMedia,
    selectedColors,
    finalBrand,
    startJourney,
    nextStep,
    previousStep,
    resetJourney,
    setSelectedLogo,
    setSelectedSocialMedia,
    setSelectedColors,
    setFinalBrand
  };

  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  );
};