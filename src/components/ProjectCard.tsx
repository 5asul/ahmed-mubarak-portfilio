
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  title: string;
  description: string;
  image_url?: string;
  tags: string[];
  category?: string;
  live_url?: string;
  repo_url?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image_url, 
  tags, 
  category, 
  live_url, 
  repo_url 
}) => {
  const getCategoryColor = (cat?: string) => {
    switch (cat) {
      case 'websites':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'backend':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'mobile':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
      {image_url && (
        <div className="relative overflow-hidden h-48 bg-gradient-to-br from-slate-100 to-slate-200">
          <img 
            src={image_url} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          {category && (
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          )}
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
              {title}
            </CardTitle>
            {!image_url && category && (
              <CardDescription className="mt-1">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-slate-600 leading-relaxed line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 4).map((tag) => (
            <span 
              key={tag} 
              className="inline-block bg-sky-50 text-sky-700 text-xs font-medium px-2 py-1 rounded-md border border-sky-100"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="inline-block text-slate-500 text-xs px-2 py-1">
              +{tags.length - 4} more
            </span>
          )}
        </div>
        
        <div className="flex gap-2 pt-2">
          {live_url && (
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1"
            >
              <a
                href={live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            </Button>
          )}
          {repo_url && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <a
                href={repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1"
              >
                <Github size={14} />
                Code
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
