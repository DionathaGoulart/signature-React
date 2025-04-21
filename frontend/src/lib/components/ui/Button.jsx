import React from 'react';
import { classNames } from '../../utils/classNames';

const variants = {
  primary:   'bg-indigo-600 hover:bg-indigo-700 text-white',
  secondary: 'bg-white border border-indigo-300 text-indigo-600 hover:bg-indigo-50',
  ghost:     'bg-transparent text-indigo-600 hover:text-indigo-700',
};

export const Button = ({
  as: Tag = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  return React.createElement(
    Tag,
    {
      className: classNames(
        'inline-flex items-center px-4 py-2 rounded-md font-medium transition-colors duration-200',
        variants[variant],
        className,
      ),
      ...props,
    },
    children,
  );
};
