import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Settings, LogOut, User, BarChart3, FileText, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectsManager from '@/components/admin/ProjectsManager';
import SkillsManager from '@/components/admin/SkillsManager';
import AboutManager from '@/components/admin/AboutManager';
import CVManager from '@/components/admin/CVManager';
import ExperienceManager from '@/components/admin/ExperienceManager';

const AdminDashboard = () => {
  const { user, profile, signOut, isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-300">
        <Card className="w-full max-w-md shadow-xl bg-card/70 backdrop-blur-sm border-border">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl text-red-600 dark:text-red-400">Access Denied</CardTitle>
            <CardDescription className="text-muted-foreground">
              You don't have admin privileges to access this dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/">
              <Button className="w-full">Return to Portfolio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-card/70 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors group"
              >
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
                Back to Portfolio
              </Link>
              <div className="border-l border-border pl-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">Welcome back, {profile?.full_name || 'Admin'}</p>
              </div>
            </div>
            
            <Button 
              onClick={signOut} 
              variant="outline" 
              className="flex items-center space-x-2 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-600 dark:to-blue-700 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">0</span>
                <Plus className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Skills Added</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">0</span>
                <BarChart3 className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-violet-600 dark:from-purple-600 dark:to-violet-700 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">About Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">1</span>
                <Settings className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">CV Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">1</span>
                <FileText className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Experiences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">0</span>
                <Building className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="shadow-xl bg-card/70 backdrop-blur-sm border-border">
          <Tabs defaultValue="projects" className="w-full">
            <div className="border-b border-border bg-muted/30 rounded-t-lg">
              <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="projects" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-none first:rounded-tl-lg transition-colors duration-200"
                >
                  <Plus size={16} />
                  <span className="font-medium">Projects</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="skills" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-none transition-colors duration-200"
                >
                  <BarChart3 size={16} />
                  <span className="font-medium">Skills</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="about" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-none transition-colors duration-200"
                >
                  <Settings size={16} />
                  <span className="font-medium">About</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="cv" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-none transition-colors duration-200"
                >
                  <FileText size={16} />
                  <span className="font-medium">CV</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="experience" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-none last:rounded-tr-lg transition-colors duration-200"
                >
                  <Building size={16} />
                  <span className="font-medium">Experience</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="projects" className="mt-0">
                <ProjectsManager />
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                <SkillsManager />
              </TabsContent>

              <TabsContent value="about" className="mt-0">
                <AboutManager />
              </TabsContent>

              <TabsContent value="cv" className="mt-0">
                <CVManager />
              </TabsContent>

              <TabsContent value="experience" className="mt-0">
                <ExperienceManager />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
