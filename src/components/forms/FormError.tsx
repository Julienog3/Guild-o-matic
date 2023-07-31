import React from 'react';

interface FormErrorProps {
  children: React.ReactNode;
}

const FormError = ({ children }: FormErrorProps): JSX.Element => {
  return (
    <div className="bg-red/25 border border-red p-4 rounded-lg text-white">
      {children}
    </div>
  );
};

export default FormError;
