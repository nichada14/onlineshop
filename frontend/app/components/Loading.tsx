import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader border-8 border-t-8 border-gray-200 border-t-primary animate-spin rounded-full w-16 h-16"></div>
    </div>
  );
};

export default Loading;
