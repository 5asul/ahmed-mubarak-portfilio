
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

const featuredProjects = [
  {
    title: 'HomeRush Home Services App',
    description: 'Designed a platform that connects service seekers (customers) with service providers (workers), enabling seamless booking, real-time communication, and secure payment options.',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['C#', 'Dart', 'Mobile App', 'Backend', 'Platform'],
    category: 'mobile',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'HALA AI Educational App',
    description: 'Developed an AI-driven educational mobile application that utilizes machine learning algorithms to personalize learning experiences, incorporating natural language processing and real-time analytics.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['Python', 'Dart', 'AI', 'Machine Learning', 'NLP', 'Mobile App'],
    category: 'mobile',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Medication Management System',
    description: 'Developed the backend using ASP.NET Core Web API with JWT-based authentication to securely handle prescription tracking, scheduling, and patient data management.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['C#', 'ASP.NET Core', 'Web API', 'JWT', 'Backend'],
    category: 'backend',
    liveUrl: '#',
    repoUrl: '#',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-slate-100">
      <div className="container mx-auto animate-fade-in-up">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Here are some of my featured projects. Explore more to see my full portfolio.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
        
        <div className="text-center">
          <Link
            to="/all-projects"
            className="inline-flex items-center bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-sky-700 transition-all duration-300 text-lg hover:scale-105 transform"
          >
            View All Projects
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
