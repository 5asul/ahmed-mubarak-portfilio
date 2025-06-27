
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ProjectCard from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
      <div className="min-h-screen bg-background pt-20 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 dark:border-sky-400 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{t('projects.loadingProjects')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <Card className="p-6 sm:p-8 mb-8 shadow-lg border-border bg-card/70 backdrop-blur-sm">
          <Link 
            to="/" 
            className="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 mb-6 transition-colors group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
            {t('nav.backToHome')}
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
              {t('projects.allProjectsTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('projects.allProjectsSubtitle')}
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder={t('projects.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-base sm:text-lg shadow-sm bg-background/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-2xl mx-auto bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="all" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                {t('projects.all')}
                <span className="bg-muted-foreground/20 text-foreground text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                  {getCategoryCount('all')}
                </span>
              </TabsTrigger>
              <TabsTrigger value="websites" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <span className="hidden sm:inline">{t('projects.websites')}</span>
                <span className="sm:hidden">{t('projects.web')}</span>
                <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                  {getCategoryCount('websites')}
                </span>
              </TabsTrigger>
              <TabsTrigger value="backend" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                {t('projects.backend')}
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                  {getCategoryCount('backend')}
                </span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                {t('projects.mobile')}
                <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                  {getCategoryCount('mobile')}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
          <Card className="p-8 sm:p-12 text-center shadow-lg bg-card/70 backdrop-blur-sm border-border">
            <Filter className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{t('projects.noProjectsFound')}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              {searchTerm ? 
                `${t('projects.noProjectsMatch')} "${searchTerm}"` : 
                `${t('projects.noProjectsCategory')} ${activeTab}`
              }
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
