
import React, { useState, useEffect } from 'react';
import { Upload, Download, Eye, Trash2, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const CVManager = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [currentCV, setCurrentCV] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [checkingCV, setCheckingCV] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkCurrentCV();
  }, []);

  const checkCurrentCV = async () => {
    setCheckingCV(true);
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .list('cv', { limit: 1 });

      if (error) {
        console.error('Error checking CV:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to check existing CV files",
        });
        return;
      }

      if (data && data.length > 0) {
        setCurrentCV(data[0].name);
      }
    } catch (error) {
      console.error('Error checking current CV:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to check existing CV files",
      });
    } finally {
      setCheckingCV(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          toast({
            variant: "destructive",
            title: "File Too Large",
            description: "Please select a PDF file smaller than 10MB",
          });
          return;
        }
        setCvFile(file);
        toast({
          title: "File Selected",
          description: `${file.name} is ready for upload`,
        });
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
        const { error: deleteError } = await supabase.storage
          .from('documents')
          .remove([`cv/${currentCV}`]);
        
        if (deleteError) {
          console.warn('Warning: Could not delete existing CV:', deleteError);
        }
      }

      // Upload new CV with a more descriptive filename
      const fileName = `AHMED_MUBARAK_RESUME.pdf`;
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(`cv/${fileName}`, cvFile, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      setCurrentCV(fileName);
      setCvFile(null);
      
      toast({
        title: "Success!",
        description: "CV uploaded successfully and is now live on your portfolio",
      });

      // Reset file input
      const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error: any) {
      console.error('Error uploading CV:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "Failed to upload CV. Please try again.",
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
            <span>Current CV Status</span>
          </CardTitle>
          <CardDescription>
            {checkingCV ? (
              "Checking for existing CV..."
            ) : currentCV ? (
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>CV is live: {currentCV}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                <AlertCircle className="w-4 h-4" />
                <span>No CV uploaded yet</span>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentCV && !checkingCV && (
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
            Select a PDF file to upload as your new CV (max 10MB)
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
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-background file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 dark:file:bg-sky-950 dark:file:text-sky-300"
            />
          </div>

          {cvFile && (
            <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-md border border-sky-200 dark:border-sky-800">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <div>
                  <p className="text-sm font-medium text-sky-700 dark:text-sky-300">
                    {cvFile.name}
                  </p>
                  <p className="text-xs text-sky-600 dark:text-sky-400">
                    Size: {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!cvFile || uploading || checkingCV}
            className="flex items-center space-x-2 w-full sm:w-auto"
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
