
import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-600 to-indigo-700 text-white">
      <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
          Hello, I'm <span className="text-sky-300">Ahmed Mubarak</span>
        </h1>
        <p className="text-2xl md:text-3xl font-medium mb-8">
          Full Stack Developer
        </p>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto px-4">
          I build modern, responsive, and scalable web applications using cutting-edge technologies, with a passion for AI and data-driven solutions.
        </p>
        <a
          href="#projects"
          className="bg-white text-sky-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-sky-100 transition-colors duration-300 text-lg"
        >
          View My Work
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
