import React from 'react';
import { FieldError } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: FieldError;
}
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, name, options, error, ...rest }: SelectProps, ref) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-black dark:text-white"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={`w-full px-3 py-2 border rounded text-black ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...rest}
        ref={ref}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  ),
);

Select.displayName = 'Button';

export default Select;
