"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { 
  apiService, 
  transformFormDataToUserProfile, 
  validateFormData,
  type MealPlanFormData 
} from '@/src/lib/api';

interface MealPlanFormProps {
  onSubmit?: (formData: MealPlanFormData) => void;
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  
  const [formData, setFormData] = useState<MealPlanFormData>({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    mealsPerDay: '3',
    activityLevel: 'moderately-active',
    dietGoal: 'maintain-weight',
    allergies: ''
  });

  // Check API status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await apiService.healthCheck();
        setApiStatus('online');
      } catch (error) {
        console.error('API health check failed:', error);
        setApiStatus('offline');
      }
    };

    checkApiStatus();
  }, []);

  const handleChange = (field: keyof MealPlanFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate form data
      const validationErrors = validateFormData(formData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      // Check API status first
      if (apiStatus === 'offline') {
        throw new Error('API server is not available. Please check if the backend is running.');
      }

      // Transform form data to API format
      const userProfile = transformFormDataToUserProfile(formData);
      console.log('Submitting user profile:', userProfile);
      
      // Submit to API
      const response = await apiService.createMealPlan(userProfile);
      console.log('API response:', response);
      
      // Store session ID in localStorage for result page
      localStorage.setItem('mealPlanSessionId', response.session_id);
      localStorage.setItem('mealPlanUserData', JSON.stringify(formData));
      
      // Navigate to result page
      router.push('/result');
      
      // Call onSubmit if provided
      if (onSubmit) {
        onSubmit(formData);
      }
      
    } catch (err) {
      console.error('Error submitting form:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit form';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Meal Plan Form</CardTitle>
        
        {/* API Status Indicator */}
        <div className="flex items-center gap-2 text-sm">
          <div className={`w-3 h-3 rounded-full ${
            apiStatus === 'online' ? 'bg-green-500' : 
            apiStatus === 'offline' ? 'bg-red-500' : 
            'bg-yellow-500'
          }`}></div>
          <span className={
            apiStatus === 'online' ? 'text-green-600' : 
            apiStatus === 'offline' ? 'text-red-600' : 
            'text-yellow-600'
          }>
            API Status: {apiStatus === 'checking' ? 'Checking...' : apiStatus}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        {apiStatus === 'offline' && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-yellow-700 text-sm">
              ⚠️ Backend API is not available. Please make sure the backend server is running on http://34.50.85.124:8000
            </p>
          </div>
        )}
        
        <form id="meal-plan-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <Input
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your name"
              disabled={isLoading}
            />
            
            <Input
              label="Age *"
              fullWidth
              type="number"
              min="10"
              max="100"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder="Enter your age"
              disabled={isLoading}
              required
            />
            
            <RadioGroup
              label="Gender *"
              name="gender"
              options={genderOptions}
              value={formData.gender}
              onChange={(value) => handleChange('gender', value)}
            />
          </div>
          
          {/* Physical Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Weight (kg) *"
              fullWidth
              type="number"
              min="30"
              max="200"
              step="0.1"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              placeholder="kg"
              disabled={isLoading}
              required
            />
            
            <Input
              label="Height (cm) *"
              fullWidth
              type="number"
              min="100"
              max="250"
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)}
              placeholder="cm"
              disabled={isLoading}
              required
            />
            
            <Input
              label="Meals per Day"
              fullWidth
              type="number"
              min="1"
              max="4"
              value={formData.mealsPerDay}
              onChange={(e) => handleChange('mealsPerDay', e.target.value)}
              placeholder="3"
              disabled={isLoading}
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
              disabled={isLoading}
            />
            
            <Select
              label="Diet Goal"
              fullWidth
              options={dietGoalOptions}
              value={formData.dietGoal}
              onChange={(e) => handleChange('dietGoal', e.target.value)}
              disabled={isLoading}
            />
            
            <Input
              label="Food Allergies or Exclusions"
              fullWidth
              value={formData.allergies}
              onChange={(e) => handleChange('allergies', e.target.value)}
              placeholder="e.g., peanuts, shellfish, beef (comma separated)"
              disabled={isLoading}
            />
          </div>
        </form>
      </CardContent>
      
      <CardFooter>
        <Button 
          type="submit"
          variant="accent"
          size="lg"
          disabled={isLoading || apiStatus === 'offline'}
          onClick={handleSubmit}
          form="meal-plan-form"
          className="w-full"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Generating Meal Plan...
            </div>
          ) : (
            'Generate Meal Plan'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealPlanForm;