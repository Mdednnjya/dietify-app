"use client";
import React, { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  label?: string;
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const optionSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg"
};

const indicatorSizes = {
  sm: { outer: "w-4 h-4", inner: "w-2 h-2" },
  md: { outer: "w-5 h-5", inner: "w-3 h-3" },
  lg: { outer: "w-6 h-6", inner: "w-4 h-4" }
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
  size = 'md'
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );
  
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (controlledValue === undefined) {
      setSelectedValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const currentValue = controlledValue !== undefined 
    ? controlledValue 
    : selectedValue;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <div className="font-medium text-gray-700 text-sm">
          {label}
        </div>
      )}
      
      <div className="flex gap-6">
        {options.map((option) => (
          <label 
            key={option.value} 
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              optionSizes[size]
            )}
          >
            <div className="relative flex items-center justify-center">
              <input
                suppressHydrationWarning
                type="radio"
                name={name}
                value={option.value}
                checked={currentValue === option.value}
                onChange={handleChange}
                className="sr-only"
              />
              
              <div className={cn(
                "rounded-full border flex items-center justify-center",
                indicatorSizes[size].outer,
                currentValue === option.value 
                  ? "border-2 border-orange-500" 
                  : "border border-gray-300"
              )}>
                {currentValue === option.value && (
                  <div className={cn(
                    "rounded-full bg-orange-500",
                    indicatorSizes[size].inner
                  )} />
                )}
              </div>
            </div>
            
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;