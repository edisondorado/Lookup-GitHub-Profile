import React from 'react';

type DividerProps = {
  className?: string;
  vertical?: boolean;
};

const Divider: React.FC<DividerProps> = ({ className = '', vertical = false }) => {
  return vertical ? (
    <div className={`h-full w-px bg-gray-300 ${className}`} />
  ) : (
    <div className={`w-full h-px bg-gray-300 ${className}`} />
  );
};

export default Divider;
