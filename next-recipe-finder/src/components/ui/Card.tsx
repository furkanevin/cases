import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  imageContainer?: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  interactive = false,
  imageContainer,
  title,
  footer
}) => {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden';
  const interactiveStyles = interactive 
    ? 'hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]' 
    : '';
  
  return (
    <div className={`${baseStyles} ${interactiveStyles} ${className}`}>
      {imageContainer && (
        <div className="relative h-48 w-full overflow-hidden">
          {imageContainer}
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        {title && (
          <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {title}
          </h3>
        )}
        {children}
        {footer && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center mt-auto">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card; 