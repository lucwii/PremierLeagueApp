import React from "react";

type SelectProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
};

const Select: React.FC<SelectProps> = ({ value, onChange, children, className = "" }) => {
  const baseStyles =
    "w-full h-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-700 shadow-sm transition";

  return (
    <select
      value={value}
      onChange={onChange}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;
