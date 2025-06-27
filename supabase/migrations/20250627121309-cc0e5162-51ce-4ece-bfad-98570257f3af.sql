
-- Create a table for avatar configuration
CREATE TABLE public.avatar_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  show_orbital_elements BOOLEAN NOT NULL DEFAULT true,
  orbital_speed_1 INTEGER NOT NULL DEFAULT 20,
  orbital_speed_2 INTEGER NOT NULL DEFAULT 15,
  show_floating_particles BOOLEAN NOT NULL DEFAULT true,
  show_animated_border BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default configuration
INSERT INTO public.avatar_config (show_orbital_elements, orbital_speed_1, orbital_speed_2, show_floating_particles, show_animated_border)
VALUES (true, 20, 15, true, true);

-- Enable Row Level Security
ALTER TABLE public.avatar_config ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read the avatar config
CREATE POLICY "Anyone can view avatar config" 
  ON public.avatar_config 
  FOR SELECT 
  USING (true);

-- Create policy that allows authenticated users to update avatar config
CREATE POLICY "Authenticated users can update avatar config" 
  ON public.avatar_config 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');
