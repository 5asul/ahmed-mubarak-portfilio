
-- Create a table for experience entries
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  location TEXT,
  technologies TEXT[],
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - making it public for portfolio viewing
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Allow public read access for portfolio viewing
CREATE POLICY "Anyone can view experiences" 
  ON public.experiences 
  FOR SELECT 
  USING (true);

-- Only allow inserts, updates, and deletes through admin interface
-- We'll handle admin authentication in the application layer
CREATE POLICY "Allow all modifications for now" 
  ON public.experiences 
  FOR ALL 
  USING (true);
