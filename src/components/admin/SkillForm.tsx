
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon_name?: string;
  order_index: number;
}

interface SkillFormProps {
  skill?: Skill | null;
  onSave: () => void;
  onCancel: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ skill, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 3,
    icon_name: '',
    order_index: 0,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        icon_name: skill.icon_name || '',
        order_index: skill.order_index,
      });
    }
  }, [skill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillData = {
        name: formData.name,
        category: formData.category,
        level: formData.level,
        icon_name: formData.icon_name || null,
        order_index: formData.order_index,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (skill) {
        ({ error } = await supabase
          .from('skills')
          .update(skillData)
          .eq('id', skill.id));
      } else {
        ({ error } = await supabase
          .from('skills')
          .insert([skillData]));
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: `Skill ${skill ? 'updated' : 'created'} successfully`,
      });
      onSave();
    } catch (error) {
      console.error('Error saving skill:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save skill",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{skill ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
        <CardDescription>
          Fill in the details below to {skill ? 'update the' : 'create a new'} skill
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name *</label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category *</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
                <option value="Design">Design</option>
                <option value="Mobile">Mobile</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="level" className="text-sm font-medium">Level (1-5) *</label>
              <Input
                id="level"
                type="number"
                min="1"
                max="5"
                value={formData.level}
                onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) || 1 }))}
                required
              />
            </div>
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
          </div>

          <div className="space-y-2">
            <label htmlFor="icon_name" className="text-sm font-medium">Icon Name (optional)</label>
            <Input
              id="icon_name"
              type="text"
              value={formData.icon_name}
              onChange={(e) => setFormData(prev => ({ ...prev, icon_name: e.target.value }))}
              placeholder="e.g., react, nodejs, python"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (skill ? 'Update Skill' : 'Create Skill')}
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

export default SkillForm;
