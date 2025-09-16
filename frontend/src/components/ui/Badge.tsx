import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  className?: string; // allows custom styling
};

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => {
  const baseStyles =
    "inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";

  return <span className={`${baseStyles} ${className}`}>{children}</span>;
};

export default Badge;
