import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckoutFormData } from './CheckoutForm';

type Props = {
  className?: string;
  type: string;
  id:
    | 'address'
    | 'email'
    | 'nameOnCard'
    | 'cardNumber'
    | 'expirationDate'
    | 'cvc'
    | 'company'
    | 'apartament'
    | 'city'
    | 'state'
    | 'zip'
    | 'sameAsShipping';
  label: string;
};

const Input = ({ className, type, id, label }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();
  return (
    <div className="space-y-1">
      <p>
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
      </p>
      <input {...register(id)} type={type} id={id} className={`form-input rounded ${className}`} />
      {errors[id] && <p className="text-red-500 font-bold">{errors[id]?.message}</p>}
    </div>
  );
};

export default Input;
