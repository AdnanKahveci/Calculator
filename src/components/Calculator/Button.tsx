import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export function Button({ children, onClick, variant = 'primary', className }: ButtonProps) {
  const baseStyles = "flex items-center justify-center p-4 rounded-lg text-lg font-semibold transition-all duration-200 active:scale-95 hover:brightness-110";
  
  const variants = {
    primary: "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white",
    secondary: "bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white",
    accent: "bg-blue-500 dark:bg-blue-600 text-white"
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}