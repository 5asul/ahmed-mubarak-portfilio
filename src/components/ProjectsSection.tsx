
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
  }).slice(0, 3); // Limit to first 3 projects

  if (loading) {
    return (
      <section id="projects" className="bg-muted/30 dark:bg-muted/10 transition-colors duration-300">
        <div className="container mx-auto animate-fade-in-up">
          <div className="text-center py-12 text-foreground">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="bg-muted/30 dark:bg-muted/10 transition-colors duration-300">
      <div className="container mx-auto animate-fade-in-up">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Here are some of my featured projects. Explore different categories below.
            </p>
          </div>
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline">Manage Projects</Button>
            </Link>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 px-4 sm:px-0">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            
            <div className="text-center">
              <Link
                to="/all-projects"
                className="inline-flex items-center bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 text-lg hover:scale-105 transform"
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
