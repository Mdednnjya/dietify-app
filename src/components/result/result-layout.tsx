import React from 'react';
import { MealCard } from './meal-card';

// Hardcoded meal data
const mealPlanData = {
  meals: [
    {
      id: "1",
      name: "Udang Saus Tiram",
      image: "/api/placeholder/400/300",
      nutrition: {
        calories: 481.8,
        protein: 25.9,
        fat: 7.2,
        carbohydrates: 63.6,
        fiber: 5.1
      }
    },
    {
      id: "2",
      name: "Udang Saus Tiram",
      image: "/api/placeholder/400/300",
      nutrition: {
        calories: 481.8,
        protein: 25.9,
        fat: 7.2,
        carbohydrates: 63.6,
        fiber: 5.1
      }
    },
    {
      id: "3",
      name: "Udang Saus Tiram",
      image: "/api/placeholder/400/300",
      nutrition: {
        calories: 481.8,
        protein: 25.9,
        fat: 7.2,
        carbohydrates: 63.6,
        fiber: 5.1
      }
    },
  ]
};

export const ResultLayout: React.FC = () => {
  const mealCount = mealPlanData.meals.length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Healthy Recipes for Your Diet
        </h1>
        <p className="text-lg text-gray-600">
          Your personalized meal plan based on your preferences and nutritional goals
        </p>
      </div>

      {/* Meal Cards */}
      {mealCount === 1 ? (
        // Single card centered
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <MealCard meal={mealPlanData.meals[0]} />
          </div>
        </div>
      ) : mealCount === 2 ? (
        // Two cards centered
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {mealPlanData.meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      ) : (
        // Multiple cards in responsive grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealPlanData.meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};