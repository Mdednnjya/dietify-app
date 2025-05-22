import React from 'react';

interface NutritionInfoProps {
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    fiber: number;
  };
}

export const NutritionInfo: React.FC<NutritionInfoProps> = ({ nutrition }) => {
  const nutritionItems = [
    {
      label: 'Calories',
      value: nutrition.calories,
      unit: 'kcal',
      color: 'text-orange-600'
    },
    {
      label: 'Protein',
      value: nutrition.protein,
      unit: 'g',
      color: 'text-teal-600'
    },
    {
      label: 'Fat',
      value: nutrition.fat,
      unit: 'g', 
      color: 'text-blue-600'
    },
    {
      label: 'Carbohydrates',
      value: nutrition.carbohydrates,
      unit: 'g',
      color: 'text-green-600'
    },
    {
      label: 'Fiber',
      value: nutrition.fiber,
      unit: 'g',
      color: 'text-purple-600'
    }
  ];

  return (
    <div>
      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
        Nutritional Information (per serving):
      </h4>
      
      <div className="space-y-1.5 sm:space-y-2">
        {nutritionItems.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-600">{item.label}:</span>
            <span className={`text-xs sm:text-sm font-semibold ${item.color}`}>
              {item.value.toFixed(1)} {item.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};