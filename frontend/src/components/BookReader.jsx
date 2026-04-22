import React from 'react';

const BookReader = ({ embedUrl, onClose }) => {
  if (!embedUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative w-full h-full max-w-5xl bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold">Book Reader</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="flex-grow">
          <iframe 
            src={embedUrl} 
            title="Book Reader"
            className="w-full h-full border-none"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default BookReader;
