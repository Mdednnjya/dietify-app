// src/components/ui/loading.tsx
"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-orange-500",
        sizeClasses[size],
        className
      )}
    />
  );
};

interface LoadingOverlayProps {
  message?: string;
  progress?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Loading...",
  progress,
  className
}) => {
  return (
    <div className={cn(
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      className
    )}>
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center">
        <div className="flex justify-center mb-4">
          <LoadingSpinner size="lg" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {message}
        </h3>
        {progress && (
          <p className="text-sm text-gray-600">
            {progress}
          </p>
        )}
      </div>
    </div>
  );
};

interface LoadingCardProps {
  title?: string;
  message?: string;
  progress?: string;
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  title = "Generating Your Meal Plan",
  message = "Please wait while we create your personalized meal plan...",
  progress,
  className
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center",
      className
    )}>
      <div className="flex justify-center mb-6">
        <LoadingSpinner size="lg" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {title}
      </h2>
      
      <p className="text-gray-600 mb-4">
        {message}
      </p>
      
      {progress && (
        <div className="mt-4 p-3 bg-orange-50 rounded-md">
          <p className="text-sm text-orange-700 font-medium">
            Status: {progress}
          </p>
        </div>
      )}
      
      <div className="mt-6 text-xs text-gray-500">
        This may take 30-60 seconds depending on your preferences
      </div>
    </div>
  );
};

export default LoadingSpinner;