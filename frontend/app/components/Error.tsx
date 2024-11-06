import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen text-red-600">
      <p>{message}</p>
    </div>
  );
};

export default Error;
