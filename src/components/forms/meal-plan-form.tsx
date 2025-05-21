"use client";
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Select } from '@/src/components/ui/select';
import { RadioGroup } from '@/src/components/ui/radio-group';
import { Button } from '@/src/components/ui/button';

interface MealPlanFormProps {
  onSubmit?: (formData: MealPlanFormData) => void;
}

export interface MealPlanFormData {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  mealsPerDay: string;
  activityLevel: string;
  dietGoal: string;
  allergies: string;
}

const activityLevelOptions = [
  { value: 'sedentary', label: 'Sedentary' },
  { value: 'lightly-active', label: 'Lightly Active' },
  { value: 'moderately-active', label: 'Moderately Active' },
  { value: 'very-active', label: 'Very Active' },
  { value: 'extra-active', label: 'Extra Active' }
];

const dietGoalOptions = [
  { value: 'lose-weight', label: 'Lose Weight' },
  { value: 'maintain-weight', label: 'Maintain Weight' },
  { value: 'gain-weight', label: 'Gain Weight' }
];

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

export const MealPlanForm: React.FC<MealPlanFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<MealPlanFormData>({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    mealsPerDay: '3',
    activityLevel: 'lightly-active',
    dietGoal: 'lose-weight',
    allergies: ''
  });

  const handleChange = (field: keyof MealPlanFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    console.log('Form data submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Meal Plan Form</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form id="meal-plan-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <Input
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your name"
            />
            
            <Input
              label="Age"
              fullWidth
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder="Enter your age"
            />
            
            <RadioGroup
              label="Gender"
              name="gender"
              options={genderOptions}
              value={formData.gender}
              onChange={(value) => handleChange('gender', value)}
            />
          </div>
          
          {/* Physical Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Weight"
              fullWidth
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              placeholder="kg"
            />
            
            <Input
              label="Height"
              fullWidth
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)}
              placeholder="cm"
            />
            
            <Input
              label="Meals per Day"
              fullWidth
              type="number"
              min="1"
              max="7"
              value={formData.mealsPerDay}
              onChange={(e) => handleChange('mealsPerDay', e.target.value)}
              placeholder="3"
            />
          </div>
          
          {/* Preferences Section */}
          <div className="space-y-4">
            <Select
              label="Activity Level"
              fullWidth
              options={activityLevelOptions}
              value={formData.activityLevel}
              onChange={(e) => handleChange('activityLevel', e.target.value)}
            />
            
            <Select
              label="Diet Goal"
              fullWidth
              options={dietGoalOptions}
              value={formData.dietGoal}
              onChange={(e) => handleChange('dietGoal', e.target.value)}
            />
            
            <Input
              label="Allergies"
              fullWidth
              value={formData.allergies}
              onChange={(e) => handleChange('allergies', e.target.value)}
              placeholder="Enter any food allergies"
            />
          </div>
        </form>
      </CardContent>
      
      <CardFooter>
        <Button 
          type="submit"
          variant="accent"
          size="lg"
          onClick={handleSubmit}
          form="meal-plan-form"
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealPlanForm;