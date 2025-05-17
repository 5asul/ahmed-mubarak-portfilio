
import React from 'react';
import { User, Briefcase, Zap } from 'lucide-react'; // Example icons

const AboutSection = () => {
  return (
    <section id="about" className="bg-slate-50">
      <div className="container mx-auto">
        <h2 className="section-title">About Me</h2>
        <div className="max-w-3xl mx-auto text-center text-slate-700 space-y-6">
          <p className="text-lg leading-relaxed">
            Hi, I'm Your Name, a passionate Full Stack Developer with a knack for creating elegant and efficient solutions. 
            I thrive on turning complex problems into intuitive and user-friendly web applications. 
            My journey in web development started with a fascination for how websites work, and it has grown into a deep-seated passion for building and innovating.
          </p>
          <p className="text-lg leading-relaxed">
            I have experience working with a variety of technologies including React, Node.js, TypeScript, and modern database systems. 
            I'm a lifelong learner, always eager to explore new tools and frameworks to enhance my skill set and deliver high-quality products.
          </p>
          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <User size={48} className="text-sky-600 mb-3" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">User-Focused</h3>
              <p className="text-sm text-slate-600">Crafting intuitive and engaging user experiences is my top priority.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Briefcase size={48} className="text-sky-600 mb-3" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Problem Solver</h3>
              <p className="text-sm text-slate-600">I enjoy tackling complex challenges and finding innovative solutions.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Zap size={48} className="text-sky-600 mb-3" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Performance Driven</h3>
              <p className="text-sm text-slate-600">Building fast, scalable, and reliable applications.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
