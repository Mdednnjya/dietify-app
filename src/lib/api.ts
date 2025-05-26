// API Service untuk Dietify
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://34.50.85.124:8000';
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';

// Types matching backend models
export interface UserProfile {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activity_level: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
  goal: 'lose' | 'maintain' | 'gain';
  meals_per_day: number;
  recipes_per_meal: number;
  exclude?: string[];
  diet_type?: 'vegetarian' | 'vegan' | 'pescatarian';
}

export interface MealPlanResponse {
  session_id: string;
  status: string;
  message: string;
  estimated_time?: string;
  poll_url?: string;
}

export interface MealPlanResult {
  session_id: string;
  status: 'processing' | 'completed' | 'error';
  meal_plan?: any;
  error?: string;
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

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/${API_VERSION}`;
  }

  // Health check
  async healthCheck(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw new Error('API server is not available');
    }
  }

  // Submit meal plan request
  async createMealPlan(userProfile: UserProfile): Promise<MealPlanResponse> {
    try {
      console.log('Submitting meal plan request:', userProfile);
      
      const response = await fetch(`${this.baseUrl}/meal-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('Meal plan request submitted:', result);
      return result;
    } catch (error) {
      console.error('Create meal plan error:', error);
      throw error;
    }
  }

  // Poll for meal plan result
  async getMealPlan(sessionId: string): Promise<MealPlanResult> {
    try {
      const response = await fetch(`${this.baseUrl}/meal-plan/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Get meal plan error:', error);
      throw error;
    }
  }

  // Poll with retry mechanism
  async pollMealPlan(
    sessionId: string, 
    maxRetries: number = 60,
    onProgress?: (status: string, attempt: number) => void
  ): Promise<MealPlanResult> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        if (onProgress) {
          onProgress(`Checking progress... (${i + 1}/${maxRetries})`, i + 1);
        }
        
        console.log(`Polling attempt ${i + 1}: GET ${this.baseUrl}/meal-plan/${sessionId}`);
        const result = await this.getMealPlan(sessionId);
        
        console.log(`Polling result ${i + 1}:`, result);
        
        if (result.status === 'completed' || result.status === 'error') {
          return result;
        }
        
        // Wait 3 seconds before next poll (increased from 2 seconds)
        await new Promise(resolve => setTimeout(resolve, 3000));
        
      } catch (error) {
        console.error(`Poll attempt ${i + 1} failed:`, error);
        
        // If it's the last attempt, throw the error
        if (i === maxRetries - 1) {
          throw error;
        }
        
        // Wait 3 seconds before retry
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    
    throw new Error('Polling timeout - meal plan generation took too long');
  }
}

export const apiService = new ApiService();

// Helper function to transform form data to API format
export function transformFormDataToUserProfile(formData: MealPlanFormData): UserProfile {
  // Map activity levels
  const activityLevelMap: Record<string, UserProfile['activity_level']> = {
    'sedentary': 'sedentary',
    'lightly-active': 'lightly_active',
    'moderately-active': 'moderately_active',
    'very-active': 'very_active',
    'extra-active': 'extra_active'
  };

  // Map diet goals
  const goalMap: Record<string, UserProfile['goal']> = {
    'lose-weight': 'lose',
    'maintain-weight': 'maintain',
    'gain-weight': 'gain'
  };

  return {
    age: parseInt(formData.age),
    gender: formData.gender as 'male' | 'female',
    weight: parseFloat(formData.weight),
    height: parseFloat(formData.height),
    activity_level: activityLevelMap[formData.activityLevel] || 'moderately_active',
    goal: goalMap[formData.dietGoal] || 'maintain',
    meals_per_day: parseInt(formData.mealsPerDay) || 3,
    recipes_per_meal: 3,
    exclude: formData.allergies ? 
      formData.allergies.split(',').map((s: string) => s.trim()).filter(s => s.length > 0) : 
      undefined,
    diet_type: undefined
  };
}

// Validation helper
export function validateFormData(formData: MealPlanFormData): string[] {
  const errors: string[] = [];

  if (!formData.age || parseInt(formData.age) < 10 || parseInt(formData.age) > 100) {
    errors.push('Age must be between 10 and 100 years');
  }

  if (!formData.gender) {
    errors.push('Gender is required');
  }

  if (!formData.weight || parseFloat(formData.weight) < 30 || parseFloat(formData.weight) > 200) {
    errors.push('Weight must be between 30 and 200 kg');
  }

  if (!formData.height || parseFloat(formData.height) < 100 || parseFloat(formData.height) > 250) {
    errors.push('Height must be between 100 and 250 cm');
  }

  return errors;
}