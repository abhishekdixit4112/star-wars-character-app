
import React from 'react';

const Pagination = ({ currentPage, totalPages, onNext, onPrevious }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex justify-center items-center space-x-4 mt-8 p-4 bg-gray-800 rounded-lg">
      <button
        onClick={onPrevious}
        disabled={isFirstPage}
        className={`px-4 py-2 rounded transition duration-200 ${
          isFirstPage
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
        }`}
      >
        Previous
      </button>

      <span className="text-white font-semibold">
        Page {currentPage} of {totalPages || '?'}
      </span>

      <button
        onClick={onNext}
        disabled={isLastPage}
        className={`px-4 py-2 rounded transition duration-200 ${
          isLastPage
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;