import React from 'react';
import Button from '../Button/Button';

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isActive?: boolean;
  isIcon?: boolean;
}

const PaginationButton = ({
  children,
  onClick,
  disabled,
  isActive,
  isIcon,
}: PaginationButtonProps) => (
  <li
    className={`${
      isActive
        ? 'block size-8 rounded border-blue-600 bg-blue-600 dar:border-gray-500 dark:bg-gray-500 text-center leading-8 text-white'
        : ''
    } ${
      isIcon
        ? 'inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'
        : ''
    } `}
  >
    {isActive ? (
      children
    ) : (
      <Button
        className={`${disabled ? '' : 'cursor-pointer'}
          ${
            isIcon
              ? ''
              : 'block size-8 rounded border border-gray-100 bg-white dar:border-gray-400 dark:bg-gray-100 text-center leading-8 text-gray-900'
          }`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    )}
  </li>
);

export default PaginationButton;
