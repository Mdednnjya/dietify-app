"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const selectSizes = {
  sm: "py-1 pl-2 pr-8 text-sm",
  md: "py-2 pl-3 pr-8",
  lg: "py-3 pl-4 pr-10 text-lg"
};

export const Select: React.FC<SelectProps> = ({
  className,
  label,
  options,
  fullWidth = false,
  size = 'md',
  ...props
}) => {
  return (
    <div className={cn(
      "flex flex-col gap-1", 
      fullWidth ? "w-full" : ""
    )}>
      {label && (
        <label className="font-medium text-gray-700 text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          suppressHydrationWarning
          className={cn(
            "appearance-none border border-gray-300 rounded-md bg-white",
            "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
            selectSizes[size],
            fullWidth ? "w-full" : "",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;