import React from 'react'

type CardProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({children, className = "", onClick, style}) => {
    const baseStyles =
    "rounded-2xl bg-white p-6 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1";

  return (
    <div 
    onClick={onClick}
    className={`${baseStyles} ${className}`}
    style={style}
    >
        {children}
    </div>
  )
}

export default Card