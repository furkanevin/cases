import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = ({ error }) => {
  const navigate = useNavigate();

  const handleReload = () => {
    navigate( '/'); 
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50
    ">
      <div className="bg-white p-8 rounded-md">
        <p className="text-2xl text-red-700 mb-4">Oops! An error occurred.</p>
        <p className="text-lg text-gray-800 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={handleReload} 
        >
          Home Page
        </button>
      </div>
    </div>
  );
};

export default Error;
