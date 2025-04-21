import React from 'react';
import SignatureCanvas from 'react-signature-canvas';

export const SignaturePad = React.forwardRef(({ className = '', height = 200, ...props }, ref) => (
  <SignatureCanvas
    ref={ref}
    penColor="black"
    canvasProps={{ className: className || 'w-full', height }}
    {...props}
  />
));