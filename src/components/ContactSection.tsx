
import React from 'react';
import { Mail, Linkedin, Github, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-slate-800 dark:bg-slate-900 text-slate-100 transition-colors duration-300">
      <div className="container mx-auto animate-fade-in-up">
        <h2 className="section-title !text-slate-100">Get In Touch</h2>
        <p className="section-subtitle !text-slate-300">
          I'm currently looking for new opportunities, and my inbox is always open.
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <div className="max-w-lg mx-auto text-center">
          <a
            href="mailto:ahmedabbad2@gmail.com"
            className="inline-block bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md transition-colors duration-300 mb-10"
          >
            Say Hello (Email Me)
          </a>
          <div className="space-y-4 mb-10 text-slate-300 dark:text-slate-400">
            <div className="flex items-center justify-center space-x-2">
              <Phone size={20} />
              <span>+967 775 187 535</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MapPin size={20} />
              <span>Mukalla City District, Yemen</span>
            </div>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="mailto:ahmedabbad2@gmail.com" title="Email" className="text-slate-300 hover:text-sky-400 dark:text-slate-400 dark:hover:text-sky-300 transition-colors">
              <Mail size={32} />
            </a>
            <a href="https://www.linkedin.com/in/ahmed-mubarak-8811b7281" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-sky-400 dark:text-slate-400 dark:hover:text-sky-300 transition-colors">
              <Linkedin size={32} />
            </a>
            <a href="https://github.com/5asul" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-slate-300 hover:text-sky-400 dark:text-slate-400 dark:hover:text-sky-300 transition-colors">
              <Github size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
