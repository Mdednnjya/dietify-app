"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export interface InputProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const inputSizes = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-3",
  lg: "py-3 px-4 text-lg"
};

export const Input: React.FC<InputProps> = ({
  className,
  label,
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
      <input
        suppressHydrationWarning
        className={cn(
          "border border-gray-300 rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
          inputSizes[size],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;