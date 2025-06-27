
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Save, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AvatarConfig {
  id: string;
  show_orbital_elements: boolean;
  orbital_speed_1: number;
  orbital_speed_2: number;
  show_floating_particles: boolean;
  show_animated_border: boolean;
}

const AvatarManager = () => {
  const [config, setConfig] = useState<AvatarConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('avatar_config')
        .select('*')
        .single();

      if (error) throw error;
      setConfig(data);
    } catch (error) {
      console.error('Error fetching avatar config:', error);
      toast({
        title: "Error",
        description: "Failed to load avatar configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async () => {
    if (!config) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('avatar_config')
        .update({
          show_orbital_elements: config.show_orbital_elements,
          orbital_speed_1: config.orbital_speed_1,
          orbital_speed_2: config.orbital_speed_2,
          show_floating_particles: config.show_floating_particles,
          show_animated_border: config.show_animated_border,
          updated_at: new Date().toISOString()
        })
        .eq('id', config.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Avatar configuration updated successfully",
      });
    } catch (error) {
      console.error('Error saving avatar config:', error);
      toast({
        title: "Error",
        description: "Failed to save avatar configuration",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No avatar configuration found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Avatar Configuration</h2>
        <p className="text-muted-foreground">
          Manage the visual elements and animations of the professional avatar
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Animation Settings</CardTitle>
          <CardDescription>
            Control the visual effects and animations of the avatar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="animated-border"
              checked={config.show_animated_border}
              onCheckedChange={(checked) =>
                setConfig({ ...config, show_animated_border: checked })
              }
            />
            <Label htmlFor="animated-border">Show Animated Border</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="floating-particles"
              checked={config.show_floating_particles}
              onCheckedChange={(checked) =>
                setConfig({ ...config, show_floating_particles: checked })
              }
            />
            <Label htmlFor="floating-particles">Show Floating Particles</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="orbital-elements"
              checked={config.show_orbital_elements}
              onCheckedChange={(checked) =>
                setConfig({ ...config, show_orbital_elements: checked })
              }
            />
            <Label htmlFor="orbital-elements">Show Orbital Elements</Label>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orbital-speed-1">Orbital Speed 1 (seconds)</Label>
              <Input
                id="orbital-speed-1"
                type="number"
                min="5"
                max="60"
                value={config.orbital_speed_1}
                onChange={(e) =>
                  setConfig({ ...config, orbital_speed_1: parseInt(e.target.value) || 20 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orbital-speed-2">Orbital Speed 2 (seconds)</Label>
              <Input
                id="orbital-speed-2"
                type="number"
                min="5"
                max="60"
                value={config.orbital_speed_2}
                onChange={(e) =>
                  setConfig({ ...config, orbital_speed_2: parseInt(e.target.value) || 15 })
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={saveConfig} disabled={saving}>
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvatarManager;
