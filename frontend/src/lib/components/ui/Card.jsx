import React from 'react';
import { classNames } from '../../utils/classNames';

export const Card = ({ className = '', children, ...props }) => (
  <div
    className={classNames('bg-white rounded-xl shadow-md p-6', className)}
    {...props}
  >
    {children}
  </div>
);