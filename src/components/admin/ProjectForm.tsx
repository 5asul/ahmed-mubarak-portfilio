import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image } from 'lucide-react';

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

interface ProjectFormProps {
  project?: Project | null;
  onSave: () => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    tags: '',
    category: 'websites',
    live_url: '',
    repo_url: '',
    featured: false,
    order_index: 0,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        image_url: project.image_url || '',
        tags: project.tags.join(', '),
        category: project.category || 'websites',
        live_url: project.live_url || '',
        repo_url: project.repo_url || '',
        featured: project.featured,
        order_index: project.order_index,
      });
      setImagePreview(project.image_url || '');
    }
  }, [project]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image file",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select an image smaller than 5MB",
      });
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload image",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image_url;

      // Upload new image if selected
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const projectData = {
        title: formData.title,
        description: formData.description,
        image_url: imageUrl || null,
        tags: tagsArray,
        category: formData.category,
        live_url: formData.live_url || null,
        repo_url: formData.repo_url || null,
        featured: formData.featured,
        order_index: formData.order_index,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (project) {
        ({ error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id));
      } else {
        ({ error } = await supabase
          .from('projects')
          .insert([projectData]));
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: `Project ${project ? 'updated' : 'created'} successfully`,
      });
      onSave();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save project",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project ? 'Edit Project' : 'Add New Project'}</CardTitle>
        <CardDescription>
          Fill in the details below to {project ? 'update the' : 'create a new'} project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
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
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="websites">Websites</option>
                <option value="mobile">Mobile</option>
                <option value="backend">Backend</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Project preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload project image
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </span>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              )}
            </div>
            {uploading && (
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <Upload className="animate-spin" size={16} />
                <span>Uploading image...</span>
              </div>
            )}
          </div>

          {/* Manual URL Input as Fallback */}
          <div className="space-y-2">
            <label htmlFor="image_url" className="text-sm font-medium">Or enter image URL manually</label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">Tags</label>
            <Input
              id="tags"
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="React, TypeScript, Tailwind CSS"
            />
            <p className="text-xs text-slate-500">Separate tags with commas</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="live_url" className="text-sm font-medium">Live URL</label>
              <Input
                id="live_url"
                type="url"
                value={formData.live_url}
                onChange={(e) => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="repo_url" className="text-sm font-medium">Repository URL</label>
              <Input
                id="repo_url"
                type="url"
                value={formData.repo_url}
                onChange={(e) => setFormData(prev => ({ ...prev, repo_url: e.target.value }))}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="order_index" className="text-sm font-medium">Order Index</label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                min="0"
              />
            </div>
            <div className="space-y-2 flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm font-medium">Featured Project</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="submit" disabled={loading || uploading}>
              {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
