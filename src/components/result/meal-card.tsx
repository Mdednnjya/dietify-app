import React from 'react';
import { NutritionInfo } from './nutrition-info';

interface MealCardProps {
  meal: {
    id: string;
    name: string;
    nutrition: {
      calories: number;
      protein: number;
      fat: number;
      carbohydrates: number;
      fiber: number;
    };
  };
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200 w-full max-w-sm mx-auto">
      {/* Gradient/Pattern Placeholder */}
      <div
        className="h-32 w-full flex items-center justify-center rounded-t-lg"
        style={{
          background: 'linear-gradient(135deg, #B4EBE6 0%, #7ED6DF 100%)'
        }}
      >
        <span className="text-4xl font-bold text-white drop-shadow">🍽️</span>
      </div>

      {/* Meal Content */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Meal Name */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
          {meal.name}
        </h3>

        {/* Nutrition Information */}
        <NutritionInfo nutrition={meal.nutrition} />
      </div>
    </div>
  );
};