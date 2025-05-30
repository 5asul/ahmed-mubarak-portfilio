
import React from 'react';
import { Link, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  category?: string;
  liveUrl?: string;
  repoUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, tags, category, liveUrl, repoUrl }) => {
  const getCategoryColor = (cat?: string) => {
    switch (cat) {
      case 'websites':
        return 'bg-green-100 text-green-700';
      case 'backend':
        return 'bg-blue-100 text-blue-700';
      case 'mobile':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      {imageUrl && (
        <img 
          src={imageUrl || "https://via.placeholder.com/400x250/E0E7FF/4F46E5?text=Project+Image"} 
          alt={title} 
          className="w-full h-56 object-cover" 
        />
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-semibold text-slate-800">{title}</h3>
          {category && (
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryColor(category)}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          )}
        </div>
        <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow">{description}</p>
        <div className="mb-4">
          {tags.map((tag) => (
            <span key={tag} className="inline-block bg-sky-100 text-sky-700 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex space-x-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-700 font-medium flex items-center transition-colors"
            >
              <Link size={18} className="mr-1" /> Live Demo
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-800 font-medium flex items-center transition-colors"
            >
              <Github size={18} className="mr-1" /> View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
