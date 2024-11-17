import React from 'react'

const Button = ({ text, className, onClick, type }) => {
  return (
    <button
      className={`text-white px-4 rounded-lg min-h-12 ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;