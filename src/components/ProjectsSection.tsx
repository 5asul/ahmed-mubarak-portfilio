
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const allProjects = [
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
  {
    title: 'Adrenalin Mobile Exercise App',
    description: 'Designed a mobile app using Flutter that employs AI to analyze user exercise patterns and provide customized workout routines, tracking user progress effectively.',
    imageUrl: 'https://images.unsplash.com/photo-1579548122080-c3efd5075829?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['PHP', 'Dart', 'Flutter', 'AI', 'Mobile App'],
    category: 'mobile',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Dungeons Desktop Security Application',
    description: 'Engineered a security-focused desktop application with encryption and real-time threat monitoring features to enhance cybersecurity measures.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['C#', 'Desktop App', 'Security', 'Encryption'],
    category: 'backend',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Invitation Card Maker & QR Reader',
    description: 'Developed an intuitive app for creating personalized invitations and integrating QR code functionality, streamlining user engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['Dart', 'Mobile App', 'QR Code', 'Utility'],
    category: 'mobile',
    repoUrl: '#',
  },
  {
    title: 'E-Commerce Website',
    description: 'Built a full-featured e-commerce platform with React, featuring product catalog, shopping cart, and payment integration.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    category: 'websites',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'Designed and developed a responsive portfolio website showcasing projects and skills with modern UI/UX design.',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Responsive'],
    category: 'websites',
    liveUrl: '#',
    repoUrl: '#',
  },
];

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = allProjects.filter(project => {
    return activeTab === 'all' || project.category === activeTab;
  }).slice(0, 3); // Limit to first 3 projects

  return (
    <section id="projects" className="bg-slate-100">
      <div className="container mx-auto animate-fade-in-up">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Here are some of my featured projects. Explore different categories below.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
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
