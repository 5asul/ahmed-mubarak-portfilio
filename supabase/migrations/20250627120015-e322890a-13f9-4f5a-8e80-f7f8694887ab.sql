
-- Create a storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Create RLS policies for the project-images bucket
CREATE POLICY "Anyone can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update their project images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete their project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');
