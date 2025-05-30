
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <Card className="p-8 mb-8 shadow-lg">
          <Link 
            to="/" 
            className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6 transition-colors group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
            Back to Home
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
              All Projects
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore all my projects across different categories and technologies
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                type="text"
                placeholder="Search projects, tags, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg shadow-sm"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All
                <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full">
                  {getCategoryCount('all')}
                </span>
              </TabsTrigger>
              <TabsTrigger value="websites" className="flex items-center gap-2">
                Websites
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                  {getCategoryCount('websites')}
                </span>
              </TabsTrigger>
              <TabsTrigger value="backend" className="flex items-center gap-2">
                Backend
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                  {getCategoryCount('backend')}
                </span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                Mobile
                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
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
          <Card className="p-12 text-center shadow-lg">
            <Filter className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No projects found</h3>
            <p className="text-slate-500">
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
