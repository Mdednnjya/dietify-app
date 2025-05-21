"use client";
import React from 'react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

type VariantType = 
  | 'default' 
  | 'primary'
  | 'secondary' 
  | 'accent' 
  | 'outline' 
  | 'ghost' 
  | 'destructive' 
  | 'link';

type SizeType = 'sm' | 'md' | 'lg' | 'icon';

const variants: Record<VariantType, string> = {
  default: "bg-teal-700 text-white hover:bg-teal-800",
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  accent: "bg-orange-500 text-white hover:bg-orange-600",
  outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
  ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-800",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  link: "text-teal-600 underline-offset-4 hover:underline p-0 h-auto"
};

const sizes: Record<SizeType, string> = {
  sm: "h-8 px-3 text-xs rounded-md",
  md: "h-9 px-4 py-2 rounded-md",
  lg: "h-10 px-8 rounded-md",
  icon: "h-9 w-9 p-0 rounded-md"
};

const baseStyles = "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none";

export interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType;
  size?: SizeType;
  href?: string;
  isExternal?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  href,
  isExternal = false,
  ...props
}) => {
  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      suppressHydrationWarning
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;