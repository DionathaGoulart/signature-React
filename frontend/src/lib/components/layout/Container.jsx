import React from 'react';
import { classNames } from '../../utils/classNames';

export const Container = ({ className = '', children }) => (
  <div className={classNames('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8', className)}>{children}</div>
);