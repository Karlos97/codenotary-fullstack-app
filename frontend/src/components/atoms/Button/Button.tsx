import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...rest }: ButtonProps) => (
  <button
    className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
    {...rest}
  >
    {label}
  </button>
);

export default Button;
