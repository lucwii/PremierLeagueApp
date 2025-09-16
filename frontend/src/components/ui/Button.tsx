import React from 'react'

type ButtonProps = {
    label: string;
    onClick?: () => void;
    variant?: "purple" | "green";
    className?: string;
}

const Button: React.FC<ButtonProps> = ({label, onClick, variant = "purple", className}) => {
    const baseStyles = "px-6 py-2 rounded-2xl font-semibold shadow-md transition-transform transform hover:scale-105 transition duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variantStyles = 
        variant === "purple"
        ? "bg-purple-900 text-white hover:bg-purple-800 focus:ring-purple-600"
        : "bg-green-400 text-black hover:bg-green-300 focus:ring-green-500";
  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles} + ${className ?? ""}`}>
        {label}
    </button>
  )
}

export default Button