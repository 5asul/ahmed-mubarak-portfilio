
import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'Medication Management System',
    description: 'Developed the backend using ASP.NET Core Web API with JWT-based authentication to securely handle prescription tracking, scheduling, and patient data management.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Placeholder
    tags: ['C#', 'ASP.NET Core', 'Web API', 'JWT', 'Backend'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'HomeRush Home Services App',
    description: 'Designed a platform that connects service seekers (customers) with service providers (workers), enabling seamless booking, real-time communication, and secure payment options. The app streamlines the process of finding and managing home services, ensuring convenience and reliability for both parties.',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Placeholder
    tags: ['C#', 'Dart', 'Mobile App', 'Backend', 'Platform'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'HALA AI Educational App',
    description: 'Developed an AI-driven educational mobile application that utilizes machine learning algorithms to personalize learning experiences, incorporating natural language processing and real-time analytics.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Placeholder
    tags: ['Python', 'Dart', 'AI', 'Machine Learning', 'NLP', 'Mobile App'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Adrenalin Mobile Exercise App',
    description: 'Designed a mobile app using Flutter that employs AI to analyze user exercise patterns and provide customized workout routines, tracking user progress effectively.',
    imageUrl: 'https://images.unsplash.com/photo-1579548122080-c3efd5075829?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Placeholder (Task management similar to progress tracking)
    tags: ['PHP', 'Dart', 'Flutter', 'AI', 'Mobile App'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Dungeons Desktop Security Application',
    description: 'Engineered a security-focused desktop application with encryption and real-time threat monitoring features to enhance cybersecurity measures.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Placeholder (Circuit board for tech/security)
    tags: ['C#', 'Desktop App', 'Security', 'Encryption'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Invitation Card Maker & QR Reader',
    description: 'Developed an intuitive app for creating personalized invitations and integrating QR code functionality, streamlining user engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Placeholder (Generic app usage)
    tags: ['Dart', 'Mobile App', 'QR Code', 'Utility'],
    repoUrl: '#',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-slate-100">
      <div className="container mx-auto animate-fade-in-up">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          Here are a few projects I've worked on. Feel free to explore them.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
