
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ProjectCard from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

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

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

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
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeTab === 'all' || project.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (category: string) => {
    if (category === 'all') return projects.length;
    return projects.filter(p => p.category === category).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 pt-20 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 dark:border-sky-400 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 pt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <Card className="p-8 mb-8 shadow-lg border-border bg-card/50 backdrop-blur-sm">
          <Link 
            to="/" 
            className="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 mb-6 transition-colors group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
            Back to Home
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
              All Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore all my projects across different categories and technologies
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search projects, tags, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg shadow-sm bg-background/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs px-2 py-0.5 rounded-full">
                  {getCategoryCount('all')}
                </span>
              </TabsTrigger>
              <TabsTrigger value="websites" className="flex items-center gap-2">
                Websites
                <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">
                  {getCategoryCount('websites')}
                </span>
              </TabsTrigger>
              <TabsTrigger value="backend" className="flex items-center gap-2">
                Backend
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                  {getCategoryCount('backend')}
                </span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                Mobile
                <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full">
                  {getCategoryCount('mobile')}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                title={project.title}
                description={project.description}
                image_url={project.image_url}
                tags={project.tags}
                category={project.category}
                live_url={project.live_url}
                repo_url={project.repo_url}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center shadow-lg bg-card/50 backdrop-blur-sm border-border">
            <Filter className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 
                `No projects match your search "${searchTerm}"` : 
                `No projects in the ${activeTab} category yet`
              }
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
