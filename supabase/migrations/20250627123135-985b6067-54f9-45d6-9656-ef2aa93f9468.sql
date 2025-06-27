
-- Create the documents storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true);

-- Create policy to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to view documents
CREATE POLICY "Allow authenticated users to view documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update documents
CREATE POLICY "Allow authenticated users to update documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete documents
CREATE POLICY "Allow authenticated users to delete documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
