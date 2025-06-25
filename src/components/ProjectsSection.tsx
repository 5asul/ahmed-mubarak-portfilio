
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ProjectCard from './ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  tags: string[];
  category?: string;
  live_url?: string;
  repo_url?: string;
  featured: boolean;
  order_index: number;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    return activeTab === 'all' || project.category === activeTab;
  }).slice(0, 3);

  if (loading) {
    return (
      <section id="projects" className="bg-muted/30 dark:bg-muted/10 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="text-center py-12 text-foreground">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="bg-muted/30 dark:bg-muted/10 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="flex flex-col items-center text-center mb-8 lg:mb-12">
          <div className="mb-6">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Here are some of my featured projects. Explore different categories below.
            </p>
          </div>
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" className="mb-6">Manage Projects</Button>
            </Link>
          )}
        </div>

        {/* Category Tabs - Responsive */}
        <div className="flex justify-center mb-8 lg:mb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
              <TabsTrigger value="websites" className="text-xs sm:text-sm">Websites</TabsTrigger>
              <TabsTrigger value="backend" className="text-xs sm:text-sm">Backend</TabsTrigger>
              <TabsTrigger value="mobile" className="text-xs sm:text-sm">Mobile</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {filteredProjects.length > 0 ? (
          <>
            {/* Projects Grid - Improved Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-7xl mx-auto">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            
            {/* View All Projects Button */}
            <div className="text-center">
              <Link
                to="/all-projects"
                className="inline-flex items-center bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg shadow-lg transition-all duration-300 text-base sm:text-lg hover:scale-105 transform"
              >
                View All Projects
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No projects found.</p>
            {isAdmin && (
              <Link to="/admin">
                <Button>Add Your First Project</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
