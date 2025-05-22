import React from 'react';
import Image from 'next/image';
import { NutritionInfo } from './nutrition-info';

interface MealCardProps {
  meal: {
    id: string;
    name: string;
    image?: string;
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
      {/* Meal Image */}
      <div className="relative h-48 sm:h-56 md:h-48 lg:h-52 w-full bg-gray-100">
        <Image
          src={meal.image || "/api/placeholder/400/300"}
          alt={meal.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
        />
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