import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, ...rest }: InputProps, ref) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-black dark:text-white"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`w-full px-3 py-2 border text-black rounded ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        ref={ref}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  ),
);

Input.displayName = 'Button';

export default Input;
