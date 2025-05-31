
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
// Updated import from "tsparticles-slim" to "@tsparticles/slim"
import { loadSlim } from "@tsparticles/slim"; 

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this runs client-side
    initParticlesEngine(async (engine) => {
      // Now loadSlim will be compatible with the v3 engine
      await loadSlim(engine); 
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    // You can add any logic here once particles are loaded, if needed
    // console.log('Particles loaded:', container);
  }, []);

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repel", // Particles will move away from the mouse
          },
          onClick: {
            enable: true,
            mode: "push", // Adds a few particles on click
          },
        },
        modes: {
          repel: { distance: 100, duration: 0.4 },
          push: { quantity: 2 },
        },
      },
      particles: {
        color: { value: "#0ea5e9" }, // sky-500 color that works in both themes
        links: {
          color: "#0ea5e9",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" }, // Particles bounce off screen edges
          random: true,
          speed: 1, // Slow movement speed
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 60, // Number of particles
        },
        opacity: { value: 0.4 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } }, // Small particles
      },
      detectRetina: true,
      background: {
        color: {
          value: 'transparent' // Important to show your existing gradient
        }
      }
    }),
    []
  );

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500/20 to-indigo-600/20 dark:from-sky-400/10 dark:to-indigo-500/10 bg-background text-foreground relative overflow-hidden transition-colors duration-300"
    >
      {isClient && init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={particlesOptions}
          className="absolute top-0 left-0 w-full h-full z-0" // Styles to ensure it's a background layer
        />
      )}
      <div 
        className="text-center m-3 animate-fade-in-up relative z-10" // Ensures content is above particles
        style={{ animationDelay: '0.2s' }}
      >
        <h1 className="text-3xl md:text-7xl font-extrabold mb-4 text-foreground">
          Hello, I'm{' '}
          <span 
            className="inline-block text-sky-500 dark:text-sky-400 overflow-hidden whitespace-nowrap border-r-[0.15em] border-r-transparent animate-typing-name align-bottom"
          >
            Ahmed Mubarak
          </span>
        </h1>
        <p className="text-2xl md:text-3xl font-medium mb-8 text-muted-foreground">
          Full Stack Developer
        </p>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto px-4 text-muted-foreground">
          I build modern, responsive, and scalable web applications using cutting-edge technologies, with a passion for AI and data-driven solutions.
        </p>
        <a
          href="#projects"
          className="bg-sky-500 text-white dark:bg-sky-600 dark:text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-sky-600 dark:hover:bg-sky-700 transition-all duration-300 text-lg hover:scale-105 transform"
        >
          View My Work
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
