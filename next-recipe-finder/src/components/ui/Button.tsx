import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

const getButtonStyles = (variant: ButtonVariant, disabled: boolean): string => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]';
  
  if (disabled) {
    return `${baseStyles} py-3.5 px-6 bg-gray-200 text-gray-400 cursor-not-allowed`;
  }
  
  switch (variant) {
    case 'primary':
      return `${baseStyles} py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:from-blue-700 hover:to-indigo-700`;
    case 'secondary':
      return `${baseStyles} py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200`;
    case 'link':
      return `${baseStyles} text-blue-600 dark:text-blue-400 hover:underline py-2 px-1`;
    default:
      return baseStyles;
  }
};

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  onClick, 
  href, 
  type = 'button'
}) => {
  const buttonStyles = getButtonStyles(variant, disabled);
  const combinedStyles = `${buttonStyles} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      type={type} 
      className={combinedStyles} 
      disabled={disabled} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button; 