"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ResultLayout } from "@/src/components/result/result-layout";
import { apiService } from '@/src/lib/api';

export default function ResultPage() {
  const router = useRouter();
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState('Initializing...');
  const [attemptCount, setAttemptCount] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        // Get session ID from localStorage
        const sessionId = localStorage.getItem('mealPlanSessionId');
        const storedUserData = localStorage.getItem('mealPlanUserData');
        
        if (!sessionId) {
          throw new Error('No meal plan session found. Please submit the form again.');
        }

        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }

        setProgress('Starting meal plan optimization...');
        
        // Poll for result with progress updates
        const result = await apiService.pollMealPlan(
          sessionId, 
          60, // max 60 attempts (2 minutes)
          (status, attempt) => {
            setAttemptCount(attempt);
            if (attempt <= 10) {
              setProgress('Analyzing your preferences...');
            } else if (attempt <= 20) {
              setProgress('Calculating nutritional requirements...');
            } else if (attempt <= 40) {
              setProgress('Optimizing meal combinations...');
            } else {
              setProgress('Finalizing your meal plan...');
            }
          }
        );
        
        if (result.status === 'completed') {
          setMealPlan(result.meal_plan);
          setProgress('Meal plan ready!');
          console.log('Meal plan received:', result.meal_plan);
        } else if (result.status === 'error') {
          throw new Error(result.error || 'Failed to generate meal plan');
        }
        
      } catch (err) {
        console.error('Error fetching meal plan:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load meal plan';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealPlan();
  }, []);

  const handleRetry = () => {
    // Clear stored data and go back to form
    localStorage.removeItem('mealPlanSessionId');
    localStorage.removeItem('mealPlanUserData');
    router.push('/forms');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Loading Spinner */}
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-orange-500 font-bold">{attemptCount}</span>
            </div>
          </div>
          
          {/* Title and Progress */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            Generating Your Meal Plan
          </h2>
          <p className="text-lg text-gray-600 mb-4">{progress}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((attemptCount / 60) * 100, 100)}%` }}
            ></div>
          </div>
          
          {/* Time Info */}
          <div className="space-y-2 text-sm text-gray-500">
            <p>This process uses advanced AI optimization algorithms</p>
            <p>Expected time: 30-60 seconds</p>
            {attemptCount > 30 && (
              <p className="text-orange-600">Almost done, please wait...</p>
            )}
          </div>

          {/* User Info Display */}
          {userData && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
              <h3 className="font-semibold text-gray-800 mb-2">Optimizing for:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Age: {(userData as any).age} years</p>
                <p>Goal: {(userData as any).dietGoal?.replace('-', ' ')}</p>
                <p>Activity: {(userData as any).activityLevel?.replace('-', ' ')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-red-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-red-600 mb-6">{error}</p>
            
            <div className="space-y-3">
              <button 
                onClick={handleRetry}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Try Again
              </button>
              <button 
                onClick={handleGoHome}
                className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <ResultLayout mealPlan={mealPlan} userData={userData} />
      
      {/* Action Buttons */}
      <div className="max-w-2xl mx-auto mt-8 flex gap-4 justify-center">
        <button 
          onClick={handleRetry}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Generate New Plan
        </button>
        <button 
          onClick={handleGoHome}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}