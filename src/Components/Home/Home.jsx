// Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import Hero from '../Hero/Hero';
import Step1LogoSelection from '../Services/Services';
import ProjectShowcase from '../ProjectShowcase';
import About from '../About';
import Contact from '../Contact';
import Footer from '../Footer'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img from '../../assets/Screenshot_16.png';
import img1 from '../../assets/Screenshot_13.png';
import img2 from '../../assets/Screenshot_22.png';
import img3 from '../../assets/Screenshot_9.png';
import Skills from '../Skills';
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Home = () => {
  const gridSectionRef = useRef();
  const projectsSectionRef = useRef();
  const aboutSectionRef = useRef();
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const [imagesReceived, setImagesReceived] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [projectsAnimationReady, setProjectsAnimationReady] = useState(false);
  const [activeService, setActiveService] = useState(0);

  const myProjects = [
    {
      id: 1,
      title: "CareerSwift",
      description: "A web application designed to serve as a job board platform where both employers and job seekers can interact.",
      tags: ["Django", "Html", "CSS", "Bootsrap"],
      category: "Full Stack",
      github: "https://github.com/Sayed161/CareerSwift",
      live: "https://career-swift.onrender.com/",
      image: img,
    },
    {
      id: 2,
      title: "TuskHub",
      description: "TaskHub is a micro-tasking and earning platform that connects Workers, Buyers, and Admins in a seamless environment.",
      tags: ["React", "Express", "JWT", "Firebase", "Tailwind CSS"],
      category: "Frontend",
      github: "https://github.com/Sayed161/Assignement-12",
      live: "https://taskbucks-4a4ba.web.app",
      image:img1,
    },
    {
      id: 3,
      title: "Hunger Hero",
      description: "Hunger Hero is a full-stack MERN application built to help reduce food waste and serve the community.",
      tags: ["React", "Firebase", "Tailwind CSS", "Express", "JWT"],
      category: "Backend",
      github: "https://github.com/Sayed161/Assignment-11-Client-Side",
      live: "https://hungerhero-ca978.web.app/",
      image: img2,
    },
    {
      id: 4,
      title: "StyleHub",
      description: "Stylehub is a full-stack MERN application built to help clothing brand and serve the community.",
      tags: ["React", "Firebase", "Tailwind CSS", "Express", "JWT"],
      category: "Backend",
      github: "https://github.com/Sayed1-11/ServerSide_clothing",
      live: "https://stylehub-11c33.web.app/",
      image: img3,
    },
  ];
    
  const floatingImagesData = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      aspectRatio: "4:3",
      title: "Mountain Majesty",
      description: "Snow-capped peaks under blue sky"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=1067&fit=crop",
      aspectRatio: "9:16",
      title: "Alpine Summit",
      description: "Breathtaking mountain view"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=675&fit=crop",
      aspectRatio: "16:9",
      title: "Misty Mountains",
      description: "Fog rolling over green hills"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1464822759844-df9c072a5e9b?w=600&h=1067&fit=crop",
      aspectRatio: "9:16",
      title: "Lake Serenity",
      description: "Perfect mirror in alpine lake"
    }
  ];

// Home.jsx - Updated About section useGSAP
useGSAP(() => {
  if (!aboutSectionRef.current) return;

  // Clear existing triggers for about section
  const existingAboutTriggers = ScrollTrigger.getAll().filter(trigger => 
    trigger.trigger === aboutSectionRef.current
  );
  existingAboutTriggers.forEach(trigger => trigger.kill());

  // Apply ProjectShowcase-style card animations to About section
  const aboutCards = aboutSectionRef.current.querySelectorAll('.service-card');
  const totalCards = aboutCards.length;

  if (aboutCards.length === 0) return;

  // Calculate proper heights and durations
  const cardHeight = 100;
  const spacing = 5;
  const totalScrollDistance = (cardHeight + spacing) * totalCards;

  // Set initial states
  gsap.set(aboutCards, {
    opacity: 0,
    y: 100,
    scale: 0.9
  });

  // Make first card immediately visible
  gsap.set(aboutCards[0], {
    opacity: 1,
    y: 0,
    scale: 1
  });

  // Create master timeline for stacking animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: aboutSectionRef.current.querySelector('.services-container'),
      start: "top top",
      end: `+=${totalScrollDistance}%`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      markers: false,
      id: "about-cards-stack"
    }
  });

  // Animation logic for About cards
  aboutCards.forEach((card, index) => {
    const progressStart = index / totalCards;
    const progressEnd = (index + 1) / totalCards;
    
    const title = card.querySelector(".service-title");
    const description = card.querySelector(".service-description");
    const image = card.querySelector(".service-image");

    if (index > 0) {
      tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      }, progressStart);
    }

    tl.call(() => {
      if (index > 0 && image) {
        gsap.to(image, {
          clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
          duration: 1.2,
          ease: "power2.out"
        });
      }

      gsap.to([title, description], {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
      });

    }, null, progressStart + 0.1);

    if (index < totalCards - 1) {
      tl.to(card, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, progressEnd - 0.1);
    }
  });

  // Additional About section specific animations
  gsap.fromTo(aboutSectionRef.current.querySelector('.section-title'), 
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: aboutSectionRef.current.querySelector('.section-title'),
        start: "top 80%",
        toggleActions: "play none none none",
        markers: false
      }
    }
  );

}, { 
  dependencies: [activeService],
  scope: aboutSectionRef 
});

  // Projects section animations (existing code)
  useGSAP(() => {
    if (!projectsSectionRef.current || !projectsAnimationReady) return;

    // Clear existing triggers for projects section
    const existingTriggers = ScrollTrigger.getAll().filter(trigger => 
      trigger.trigger === projectsSectionRef.current
    );
    existingTriggers.forEach(trigger => trigger.kill());

    // Your ProjectShowcase animations here
    const cards = projectsSectionRef.current.querySelectorAll('.project-card');
    const totalCards = cards.length;

    if (cards.length === 0) return;

    // Calculate proper heights and durations
    const cardHeight = 100;
    const spacing = 5;
    const totalScrollDistance = (cardHeight + spacing) * totalCards;

    // Set initial states
    gsap.set(cards, {
      opacity: 0,
      y: 100,
      scale: 0.9
    });

    // Make first card immediately visible
    gsap.set(cards[0], {
      opacity: 1,
      y: 0,
      scale: 1
    });

    // Set initial clip-path for images
    gsap.set(".project-image", {
      clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
    });

    // Make first card's image immediately visible
    gsap.set(cards[0].querySelector(".project-image"), {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    });

    // Create master timeline for stacking animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsSectionRef.current.querySelector('.cards-container'),
        start: "top top",
        end: `+=${totalScrollDistance}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        markers: false,
        id: "project-cards-stack"
      }
    });

    // Your animation logic here...
    cards.forEach((card, index) => {
      const progressStart = index / totalCards;
      const progressEnd = (index + 1) / totalCards;
      
      const img = card.querySelector(".project-image");
      const title = card.querySelector(".project-title");
      const description = card.querySelector(".project-description");
      const tags = card.querySelector(".tags-container");
      const buttons = card.querySelector(".button-group");

      if (index > 0) {
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        }, progressStart);
      }

      tl.call(() => {
        if (index > 0) {
          gsap.to(img, {
            clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
            duration: 1.2,
            ease: "power2.out"
          });

          gsap.to([title, description], {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2
          });

          gsap.to([tags, buttons], {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1
          });
        }
      }, null, progressStart + 0.1);

      if (index < totalCards - 1) {
        tl.to(card, {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in"
        }, progressEnd - 0.1);
      }
    });

    // Section title animation
    gsap.fromTo(".section-title, .section-subtitle", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectsSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          id: "project-title-animation"
        }
      }
    );

  }, { 
    dependencies: [projectsAnimationReady],
    scope: projectsSectionRef 
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToGrid = () => {
    setScrollTriggered(true);
    setImagesReceived(true);
    
    if (gridSectionRef.current) {
      gridSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle service click from About component
  const handleServiceClick = (index) => {
    setActiveService(index);
    const element = aboutSectionRef.current?.querySelector(`.service-card-${index}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    }
  };

  // Callback when ProjectShowcase is ready for animations
  const handleProjectsReady = () => {
    setProjectsAnimationReady(true);
  };

  return (
    <div className="home-page">
      <section id="home">
        <Hero 
          onScrollToGrid={handleScrollToGrid}
          floatingImagesData={floatingImagesData}
          gridSectionRef={gridSectionRef}
          scrollY={scrollY}
        />
      </section>
      
      <section id="services" ref={gridSectionRef}>
        <Step1LogoSelection 
          onScrollFromHero={scrollTriggered} 
          receivedImages={imagesReceived}
        />
      </section>
      
      <section id="portfolio" ref={projectsSectionRef}>
        <ProjectShowcase 
          projects={myProjects} 
          onAnimationReady={handleProjectsReady}
        />
      </section>
      
      <section id="about" ref={aboutSectionRef}>
        <Skills/>
      </section>


      <section id='contact'>
        <Contact></Contact>
      </section>
      <section>
        <Footer></Footer>
      </section>
    </div>
  );
};

export default Home;