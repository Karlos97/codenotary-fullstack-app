import React from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const Input = ({ label, name, error, ...rest }: InputProps) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block mb-1 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      className={`w-full px-3 py-2 border rounded ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...rest}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
  </div>
);

export default Input;
