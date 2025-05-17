
import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product listings, cart functionality, and payment integration. Built with modern web technologies for a seamless shopping experience.',
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVjb21tZXJjZSUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application designed to help teams organize, track, and manage their projects effectively. Features include drag-and-drop boards, real-time updates, and user roles.',
    imageUrl: 'https://images.unsplash.com/photo-1579548122080-c3efd5075829?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFzayUyMG1hbmFnZW1lbnQlMjBhcHB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Supabase'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Personal Blog Site',
    description: 'A dynamic personal blog built with a CMS backend for easy content management. Features a clean, responsive design, Markdown support, and SEO optimization.',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Gatsby', 'GraphQL', 'Contentful', 'Styled Components'],
    repoUrl: '#',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-slate-100">
      <div className="container mx-auto">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          Here are a few projects I've worked on. Want to see more? Check out my GitHub.
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
