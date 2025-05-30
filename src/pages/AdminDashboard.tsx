
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Settings, LogOut, User, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectsManager from '@/components/admin/ProjectsManager';
import SkillsManager from '@/components/admin/SkillsManager';
import AboutManager from '@/components/admin/AboutManager';

const AdminDashboard = () => {
  const { user, profile, signOut, isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Access Denied</CardTitle>
            <CardDescription className="text-slate-600">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="inline-flex items-center text-sky-600 hover:text-sky-700 transition-colors group"
              >
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
                Back to Portfolio
              </Link>
              <div className="border-l border-slate-200 pl-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600 mt-1">Welcome back, {profile?.full_name || 'Admin'}</p>
              </div>
            </div>
            
            <Button 
              onClick={signOut} 
              variant="outline" 
              className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
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
          
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
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
          
          <Card className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
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
        </div>

        {/* Main Content Tabs */}
        <Card className="shadow-xl">
          <Tabs defaultValue="projects" className="w-full">
            <div className="border-b bg-slate-50 rounded-t-lg">
              <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="projects" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none first:rounded-tl-lg"
                >
                  <Plus size={16} />
                  <span className="font-medium">Projects</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="skills" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none"
                >
                  <BarChart3 size={16} />
                  <span className="font-medium">Skills</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="about" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none last:rounded-tr-lg"
                >
                  <Settings size={16} />
                  <span className="font-medium">About</span>
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
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
