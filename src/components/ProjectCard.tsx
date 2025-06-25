
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
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'backend':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'mobile':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-border shadow-lg bg-card/50 backdrop-blur-sm h-full flex flex-col">
      {image_url && (
        <div className="relative overflow-hidden h-48 sm:h-52 bg-gradient-to-br from-muted to-muted/50">
          <img 
            src={image_url} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          {category && (
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getCategoryColor(category)}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          )}
        </div>
      )}
      
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
              {title}
            </CardTitle>
            {!image_url && category && (
              <CardDescription className="mt-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-grow flex flex-col">
        <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm sm:text-base flex-grow">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 4).map((tag) => (
            <span 
              key={tag} 
              className="inline-block bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 text-xs font-medium px-2 py-1 rounded-md border border-sky-100 dark:border-sky-800"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="inline-block text-muted-foreground text-xs px-2 py-1">
              +{tags.length - 4} more
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 mt-auto">
          {live_url && (
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1 text-xs sm:text-sm"
            >
              <a
                href={live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Live Demo</span>
                <span className="sm:hidden">Demo</span>
              </a>
            </Button>
          )}
          {repo_url && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 text-xs sm:text-sm"
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
