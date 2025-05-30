
import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface AboutContent {
  id: string;
  title: string;
  description: string;
  image_url?: string;
}

const AboutManager = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setAboutContent(data);
        setFormData({
          title: data.title,
          description: data.description,
          image_url: data.image_url || '',
        });
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch about content",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contentData = {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url || null,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (aboutContent) {
        ({ error } = await supabase
          .from('about_content')
          .update(contentData)
          .eq('id', aboutContent.id));
      } else {
        ({ error } = await supabase
          .from('about_content')
          .insert([contentData]));
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: "About content updated successfully",
      });
      
      setEditing(false);
      fetchAboutContent();
    } catch (error) {
      console.error('Error saving about content:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save about content",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !aboutContent) {
    return <div className="text-center py-8">Loading about content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">About Section Management</h2>
          <p className="text-slate-600">Manage the about section content of your portfolio</p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing(true)} className="flex items-center space-x-2">
            <Edit size={16} />
            <span>Edit About</span>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Content</CardTitle>
          <CardDescription>
            Update your personal information and description
          </CardDescription>
        </CardHeader>
        <CardContent>
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title *</label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description *</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="image_url" className="text-sm font-medium">Image URL</label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/profile-image.jpg"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{aboutContent?.title || 'No title set'}</h3>
                <p className="text-slate-600 mt-2 whitespace-pre-wrap">
                  {aboutContent?.description || 'No description set'}
                </p>
              </div>
              {aboutContent?.image_url && (
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Profile Image:</h4>
                  <img 
                    src={aboutContent.image_url} 
                    alt="Profile" 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutManager;
