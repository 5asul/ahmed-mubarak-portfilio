
import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-slate-800 text-slate-100">
      <div className="container mx-auto">
        <h2 className="section-title !text-slate-100">Get In Touch</h2>
        <p className="section-subtitle !text-slate-300">
          I'm currently looking for new opportunities, and my inbox is always open.
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <div className="max-w-md mx-auto text-center">
          <a
            href="mailto:your.email@example.com"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md transition-colors duration-300 mb-10"
          >
            Say Hello
          </a>
          <div className="flex justify-center space-x-6">
            <a href="mailto:your.email@example.com" className="text-slate-300 hover:text-sky-400 transition-colors">
              <Mail size={32} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-sky-400 transition-colors">
              <Linkedin size={32} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-sky-400 transition-colors">
              <Github size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
