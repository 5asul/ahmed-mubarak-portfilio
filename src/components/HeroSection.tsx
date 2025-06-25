
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; 
import ProfessionalAvatar from './ProfessionalAvatar';
import FloatingProjectPreviews from './FloatingProjectPreviews';
import AnimatedTechStack from './AnimatedTechStack';
import ClientStats from './ClientStats';
import EnhancedCallToAction from './EnhancedCallToAction';

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    setIsClient(true);
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); 
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    // Particles loaded callback
  }, []);

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repel",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          repel: { distance: 100, duration: 0.4 },
          push: { quantity: 2 },
        },
      },
      particles: {
        color: { value: "#0ea5e9" },
        links: {
          color: "#0ea5e9",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: true,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 40,
        },
        opacity: { value: 0.3 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
      background: {
        color: {
          value: 'transparent'
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
      {/* Particles Background */}
      {isClient && init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={particlesOptions}
          className="absolute top-0 left-0 w-full h-full z-0"
        />
      )}

      {/* Floating Project Previews */}
      <FloatingProjectPreviews />

      {/* Animated Tech Stack */}
      <AnimatedTechStack />

      {/* Main Content */}
      <div className="text-center m-3 animate-fade-in-up relative z-10 max-w-4xl mx-auto px-4">
        {/* Professional Avatar */}
        <ProfessionalAvatar />

        {/* Main Heading */}
        <h1 className="text-3xl md:text-7xl font-extrabold mb-4 text-foreground">
          Hello, I'm{' '}
          <span 
            className="inline-block text-sky-500 dark:text-sky-400 overflow-hidden whitespace-nowrap border-r-[0.15em] border-r-transparent animate-typing-name align-bottom"
          >
            Ahmed Mubarak
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl font-medium mb-4 text-muted-foreground">
          Full Stack Developer
        </p>

        {/* Enhanced Description */}
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto px-4 text-muted-foreground leading-relaxed">
          I create exceptional digital experiences through modern web applications, 
          AI-powered solutions, and scalable architectures. Ready to bring your vision to life.
        </p>

        {/* Client Stats */}
        <ClientStats />

        {/* Enhanced Call to Action */}
        <div className="mt-10">
          <EnhancedCallToAction />
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
          <p className="text-sm text-muted-foreground mb-3">Trusted by clients worldwide</p>
          <div className="flex justify-center items-center gap-6 opacity-60">
            <div className="text-xs font-medium">⭐ 5.0 Rating</div>
            <div className="text-xs font-medium">🚀 Fast Delivery</div>
            <div className="text-xs font-medium">💡 Creative Solutions</div>
            <div className="text-xs font-medium">🔧 Full Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
