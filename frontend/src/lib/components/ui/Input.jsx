import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';

export const Input = forwardRef(({ label, className = '', ...props }, ref) => (
  <div className="mb-4">
    {label && <label className="block font-medium text-gray-700 mb-1">{label}</label>}
    <input
      ref={ref}
      className={classNames(
        'w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
        className,
      )}
      {...props}
    />
  </div>
));