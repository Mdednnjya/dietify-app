import React, { useRef, useState } from 'react';
import { MealCard } from './meal-card';

interface ResultLayoutProps {
  mealPlan?: any;
  userData?: any;
}

export const ResultLayout: React.FC<ResultLayoutProps> = ({ mealPlan, userData }) => {
  const fallbackMeals = [
    {
      id: "fallback-1",
      name: "Sample Healthy Meal",
      nutrition: {
        calories: 400,
        protein: 25,
        fat: 15,
        carbohydrates: 45,
        fiber: 8
      }
    }
  ];

  const days = mealPlan?.meal_plan || [];
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showDayMenu, setShowDayMenu] = useState(false);

  const scrollToDay = (idx: number) => {
    const ref = dayRefs.current[idx];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nutritionSummary = React.useMemo(() => {
    if (mealPlan?.average_daily_nutrition) {
      return {
        calories: Math.round(mealPlan.average_daily_nutrition.calories),
        protein: Math.round(mealPlan.average_daily_nutrition.protein * 10) / 10,
        fat: Math.round(mealPlan.average_daily_nutrition.fat * 10) / 10,
        carbohydrates: Math.round(mealPlan.average_daily_nutrition.carbohydrates * 10) / 10,
        fiber: Math.round(mealPlan.average_daily_nutrition.fiber * 10) / 10
      };
    }
    return null;
  }, [mealPlan]);

  const targetSummary = React.useMemo(() => {
    if (mealPlan?.target_nutrition) {
      return {
        calories: Math.round(mealPlan.target_nutrition.calories),
        protein: Math.round(mealPlan.target_nutrition.protein * 10) / 10,
        fat: Math.round(mealPlan.target_nutrition.fat * 10) / 10,
        carbohydrates: Math.round(mealPlan.target_nutrition.carbohydrates * 10) / 10,
        fiber: Math.round(mealPlan.target_nutrition.fiber * 10) / 10
      };
    }
    return null;
  }, [mealPlan]);

  const totalDays = days.length || 7;
  const dayLabels = Array.from({ length: totalDays }, (_, i) => `Day ${i + 1}`);

  return (
    <div className="max-w-7xl mx-auto flex relative">
      {/* Vertical Navigation Bar */}
      <nav
        className="hidden md:flex flex-col gap-2 sticky top-24 h-fit min-w-[120px] mr-8"
        style={{ alignSelf: 'flex-start' }}
        aria-label="Jump to day"
      >
        <span className="font-semibold text-gray-700 mb-2">Jump to day:</span>
        {dayLabels.map((label, idx) => (
          <button
            key={label}
            className="px-3 py-1 rounded font-medium transition text-left"
            style={{
              background: '#00B9A4',
              color: '#FFFFFF',
            }}
            onClick={() => scrollToDay(idx)}
            type="button"
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Your Personalized Meal Plan
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Optimized meal recommendations based on your preferences and nutritional goals
          </p>
          
          {/* Nutrition Summary Cards */}
          {nutritionSummary && targetSummary && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {/* Target Nutrition */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Target Nutrition</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Calories:</span>
                    <span className="text-gray-600">{targetSummary.calories} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Protein:</span>
                    <span className="text-gray-600">{targetSummary.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className='font-medium text-gray-700'>Fat:</span>
                    <span className="text-gray-600">{targetSummary.fat}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Carbs:</span>
                    <span className="text-gray-600">{targetSummary.carbohydrates}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Fiber:</span>
                    <span className="text-gray-600">{targetSummary.fiber}g</span>
                  </div>
                </div>
              </div>
              {/* Achieved Nutrition */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Daily Plan Average</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Calories:</span>
                    <span className="text-gray-600">{nutritionSummary.calories} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Protein:</span>
                    <span className="text-gray-600">{nutritionSummary.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Fat:</span>
                    <span className="text-gray-600">{nutritionSummary.fat}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Carbs:</span>
                    <span className="text-gray-600">{nutritionSummary.carbohydrates}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Fiber:</span>
                    <span className="text-gray-600">{nutritionSummary.fiber}g</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* User Info Summary */}
          {userData && (
            <div className="bg-gray-50 rounded-lg p-4 max-w-2xl mx-auto mb-8">
              <p className="text-sm text-gray-600">
                Optimized for {userData.name || 'User'} ({userData.age} years, {userData.gender}) • 
                Goal: {userData.dietGoal?.replace('-', ' ')} • 
                Activity: {userData.activityLevel?.replace('-', ' ')}
              </p>
            </div>
          )}
        </div>

        {/* Semua Hari */}
        {days.length > 0 ? (
          days.map((day: any, dayIdx: number) => (
            <div
              key={dayIdx}
              ref={el => { dayRefs.current[dayIdx] = el; }}
              className="mb-12"
              id={`day-${dayIdx + 1}`}
            >
              
              {/* Day Container Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 mb-6">
              <h2 className="text-2xl font-bold mb-6 text-black text-center">
                Day {dayIdx + 1}
              </h2>
                {/* Untuk setiap meal */}
                {day.meals && day.meals.length > 0 ? (
                  <div className="space-y-8">
                    {day.meals.map((meal: any, mealIdx: number) => (
                      <div key={`meal-block-${dayIdx}-${mealIdx}`}>
                        {/* Meal Container Card */}
                        <div className="bg-gray-50 rounded-lg border border-gray-100 p-3">
                          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                            Meal {meal.meal_number}
                          </h3>
                          
                          {/* MealCards inside Meal Container */}
                          <div className="mb-6">
                            {meal.recipes && meal.recipes.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                                {meal.recipes.map((recipe: any, recipeIdx: number) => (
                                  <div key={`${dayIdx}-${mealIdx}-${recipeIdx}`} className="w-full max-w-sm">
                                    <MealCard
                                      meal={{
                                        id: `${dayIdx}-${mealIdx}-${recipeIdx}`,
                                        name: recipe.title || 'Healthy Recipe',
                                        nutrition: {
                                          calories: Math.round(recipe.nutrition?.calories || 0),
                                          protein: Math.round((recipe.nutrition?.protein || 0) * 10) / 10,
                                          fat: Math.round((recipe.nutrition?.fat || 0) * 10) / 10,
                                          carbohydrates: Math.round((recipe.nutrition?.carbohydrates || 0) * 10) / 10,
                                          fiber: Math.round((recipe.nutrition?.fiber || 0) * 10) / 10
                                        }
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex justify-center">
                                <div className="w-full max-w-sm">
                                  <MealCard meal={fallbackMeals[0]} />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Meal Nutrition Summary - Integrated at bottom */}
                          <div className="border-t border-gray-200 pt-4">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                              Nutrition Summary
                            </h4>
                            <div className="space-y-2 max-w-md mx-auto">
                              <div className="flex justify-between items-center text-sm text-gray-700">
                                <span>Calories:</span>
                                <span className="font-semibold text-orange-600">{meal.meal_nutrition.calories.toFixed(1)} kcal</span>
                              </div>
                              <div className="flex justify-between items-center text-sm text-gray-700">
                                <span>Protein:</span>
                                <span className="font-semibold text-teal-600">{meal.meal_nutrition.protein.toFixed(1)} g</span>
                              </div>
                              <div className="flex justify-between items-center text-sm text-gray-700">
                                <span>Fat:</span>
                                <span className="font-semibold text-blue-600">{meal.meal_nutrition.fat.toFixed(1)} g</span>
                              </div>
                              <div className="flex justify-between items-center text-sm text-gray-700">
                                <span>Carbohydrates:</span>
                                <span className="font-semibold text-green-600">{meal.meal_nutrition.carbohydrates.toFixed(1)} g</span>
                              </div>
                              <div className="flex justify-between items-center text-sm text-gray-700">
                                <span>Fiber:</span>
                                <span className="font-semibold text-purple-600">{meal.meal_nutrition.fiber.toFixed(1)} g</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 text-center mt-2">
                              Total nutrisi untuk seluruh resep pada meal ini.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <div className="w-full max-w-sm">
                      <MealCard meal={fallbackMeals[0]} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          // Fallback jika meal plan kosong
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-black text-center">Day 1</h2>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="bg-gray-50 rounded-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  Meal 1
                </h3>
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <MealCard meal={fallbackMeals[0]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plan Details */}
        {mealPlan && (
          <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Plan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Duration:</span>
                <p className="text-gray-600">{totalDays} days</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Meals per day:</span>
                <p className="text-gray-600">{userData?.mealsPerDay || 3}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Optimization:</span>
                <p className="text-gray-600">PSO Algorithm</p>
              </div>
            </div>
            
            {typeof mealPlan.fitness_score === "number" && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="font-medium text-gray-700">Optimization Score:</span>
                <p className="text-sm text-gray-600">
                  {(() => {
                    const score = Number(mealPlan.fitness_score);
                    if (isNaN(score)) return "N/A";
                    const accuracy = 100 / (1 + Math.max(0, score));
                    return `${accuracy.toFixed(1)}% accuracy`;
                  })()}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This meal plan is generated using AI optimization algorithms and should be used as a general guide. 
            Please consult with a healthcare professional or registered dietitian for personalized nutrition advice.
          </p>
        </div>
      </div>

      {/* Arrow Up Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 text-white rounded-full p-3 shadow-lg transition"
        aria-label="Scroll to top"
        style={{
          background: '#FF781F',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
        }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M12 5v14M12 5l-7 7M12 5l7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Hamburger Button for mobile */}
      <button
        className="md:hidden fixed bottom-6 left-6 z-50 bg-white border border-gray-200 rounded-full p-3 shadow-lg flex items-center justify-center"
        aria-label="Open jump to day menu"
        onClick={() => setShowDayMenu(true)}
      >
        {/* Hamburger Icon */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="2" rx="1" fill="#1B4B4B"/>
          <rect x="4" y="11" width="16" height="2" rx="1" fill="#1B4B4B"/>
          <rect x="4" y="16" width="16" height="2" rx="1" fill="#1B4B4B"/>
        </svg>
      </button>

      {/* Drawer/Menu for jump to day */}
      {showDayMenu && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0"
            onClick={() => setShowDayMenu(false)}
          />
          {/* Bottom Sheet */}
          <div className="relative w-full bg-white rounded-t-2xl shadow-lg p-6 pb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-700 text-lg">Jump to day</span>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowDayMenu(false)}
                aria-label="Close"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {dayLabels.map((label, idx) => (
                <button
                  key={label}
                  className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-[#1B4B4B] font-medium text-left"
                  onClick={() => {
                    setShowDayMenu(false);
                    scrollToDay(idx);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};