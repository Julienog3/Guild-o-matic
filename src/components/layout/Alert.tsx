import React from 'react';
import { AlertTypeEnum } from '../../interfaces/alert.interface';

interface AlertProps {
  type: AlertTypeEnum;
}

const Alert = ({ type }: AlertProps): JSX.Element => {
  return (
    <span className="text-red px-4 py-2 bg-red/20 border rounded border-red fixed bottom-8 right-10">
      Je suis une alerte
    </span>
  );
};

export default Alert;
