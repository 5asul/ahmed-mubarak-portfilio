
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectPreview {
  id: number;
  title: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
}

const FloatingProjectPreviews = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Sample project data - replace with your actual projects
  const projects: ProjectPreview[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      image: "/placeholder.svg",
      tech: ["React", "Node.js", "MongoDB"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/example"
    },
    {
      id: 2,
      title: "AI Dashboard",
      image: "/placeholder.svg",
      tech: ["Next.js", "Python", "TensorFlow"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/example"
    },
    {
      id: 3,
      title: "Mobile App",
      image: "/placeholder.svg",
      tech: ["React Native", "Firebase"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/example"
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`absolute pointer-events-auto transition-all duration-500 hover:scale-110 hover:z-50 ${
            index === 0 ? 'top-20 left-10 animate-bounce' :
            index === 1 ? 'top-32 right-16 animate-pulse' :
            'bottom-32 left-20 animate-bounce'
          }`}
          style={{
            animationDelay: `${index * 0.5}s`,
            animationDuration: '3s'
          }}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <div className="relative group">
            <div className="w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-1 left-1 text-xs text-white font-medium">
                {project.title}
              </div>
            </div>

            {/* Hover preview */}
            {hoveredProject === project.id && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-4 z-50 animate-fade-in">
                <h4 className="font-semibold text-sm mb-2">{project.title}</h4>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-sky-500 text-white px-2 py-1 rounded hover:bg-sky-600 transition-colors"
                    >
                      <ExternalLink size={10} />
                      Live
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                    >
                      <Github size={10} />
                      Code
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingProjectPreviews;
