import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      <p className="ml-3 text-lg text-white">Loading Star Wars characters...</p>
    </div>
  );
};

export default LoadingSpinner;