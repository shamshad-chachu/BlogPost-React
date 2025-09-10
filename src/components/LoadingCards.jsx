import React from 'react';

const LoadingCards = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCards;