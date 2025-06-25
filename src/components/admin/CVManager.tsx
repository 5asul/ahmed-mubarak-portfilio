
import React, { useState, useEffect } from 'react';
import { Upload, Download, Eye, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const CVManager = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [currentCV, setCurrentCV] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkCurrentCV();
  }, []);

  const checkCurrentCV = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .list('cv', { limit: 1 });

      if (error) {
        console.error('Error checking CV:', error);
        return;
      }

      if (data && data.length > 0) {
        setCurrentCV(data[0].name);
      }
    } catch (error) {
      console.error('Error checking current CV:', error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setCvFile(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please select a PDF file",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!cvFile) return;

    setUploading(true);
    try {
      // Delete existing CV if it exists
      if (currentCV) {
        await supabase.storage
          .from('documents')
          .remove([`cv/${currentCV}`]);
      }

      // Upload new CV
      const fileName = `resume_${Date.now()}.pdf`;
      const { error } = await supabase.storage
        .from('documents')
        .upload(`cv/${fileName}`, cvFile);

      if (error) throw error;

      setCurrentCV(fileName);
      setCvFile(null);
      
      toast({
        title: "Success",
        description: "CV uploaded successfully",
      });

      // Reset file input
      const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error uploading CV:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Failed to upload CV. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!currentCV) return;

    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(`cv/${currentCV}`);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Ahmed_Mubarak_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Failed to download CV",
      });
    }
  };

  const handlePreview = async () => {
    if (!currentCV) return;

    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(`cv/${currentCV}`);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error previewing CV:', error);
      toast({
        variant: "destructive",
        title: "Preview Failed",
        description: "Failed to preview CV",
      });
    }
  };

  const handleDelete = async () => {
    if (!currentCV) return;

    setLoading(true);
    try {
      const { error } = await supabase.storage
        .from('documents')
        .remove([`cv/${currentCV}`]);

      if (error) throw error;

      setCurrentCV(null);
      toast({
        title: "Success",
        description: "CV deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting CV:', error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "Failed to delete CV",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">CV Management</h2>
        <p className="text-slate-600 dark:text-slate-400">Upload and manage your CV/Resume</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Current CV</span>
          </CardTitle>
          <CardDescription>
            {currentCV ? `Current file: ${currentCV}` : 'No CV uploaded yet'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentCV && (
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handlePreview}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Eye size={14} />
                <span>Preview</span>
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Download size={14} />
                <span>Download</span>
              </Button>
              <Button
                onClick={handleDelete}
                variant="destructive"
                size="sm"
                disabled={loading}
                className="flex items-center space-x-1"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload New CV</CardTitle>
          <CardDescription>
            Select a PDF file to upload as your new CV
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="cv-upload" className="text-sm font-medium">
              Select PDF File
            </label>
            <input
              id="cv-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-background"
            />
          </div>

          {cvFile && (
            <div className="p-3 bg-sky-50 dark:bg-sky-950/30 rounded-md">
              <p className="text-sm text-sky-700 dark:text-sky-300">
                Selected: {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!cvFile || uploading}
            className="flex items-center space-x-2"
          >
            <Upload size={16} />
            <span>{uploading ? 'Uploading...' : 'Upload CV'}</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVManager;
