import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckoutFormData } from './CheckoutForm';

type Props = {
  id: string;
  label: string;
};

export const Checkbox = ({ id, label }: Props) => {
  const { register } = useFormContext<CheckoutFormData>();
  return (
    <div>
      <label htmlFor={id}>
        <input type="checkbox" className="form-checkbox" id={id} {...register('sameAsShipping')} /> {label}
      </label>
    </div>
  );
};
