import React from 'react';
import Input from './Input';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Props = {};

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Nieprawidłowy email').required('To Pole jest wymagane'),
    nameOnCard: yup.string().required('To Pole jest wymagane').typeError('Nieprawidłowe dane'),
    cardNumber: yup.number().required('To Pole jest wymagane').typeError('Nieprawidłowe dane'),
    expirationDate: yup.string().required('To Pole jest wymagane'),
    cvc: yup.number().required('To Pole jest wymagane').typeError('Nieprawidłowe dane'),
    company: yup.string().required('To Pole jest wymagane'),
    address: yup.string().required('To Pole jest wymagane'),
    apartament: yup.string().required('To Pole jest wymagane'),
    city: yup.string().required('To Pole jest wymagane'),
    state: yup.string().required('To Pole jest wymagane'),
    zip: yup
      .string()
      .required('To Pole jest wymagane')
      .matches(/^[0-9]{2}-[0-9]{3}$/, 'Nieprawidłowy kod pocztowy'),
    sameAsShipping: yup.boolean().required('To Pole jest wymagane'),
  })
  .required();

export type CheckoutFormData = yup.InferType<typeof schema>;

const CheckoutForm = (props: Props) => {
  const methods = useForm<CheckoutFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: CheckoutFormData) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form className="space-y-8 bg-white p-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="text-xl ">Contact Information</h2>
        <Input className="w-full" label="Email" id="email" type="email" />
        <h2 className="text-xl ">Payment details</h2>
        <Input className="w-full" id="nameOnCard" type="text" label="Name on card" />
        <Input className="w-full" id="cardNumber" type="text" label="Card number" />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-8 lg:space-y-0">
          <Input className="w-full lg:w-[90%]" id="expirationDate" type="text" label="Expiration date" />
          <Input className="w-full lg:w-[90%]" id="cvc" type="text" label="CVC" />
        </div>
        <h2 className="text-xl ">Shipping address</h2>
        <Input className="w-full" id="company" type="text" label="Company" />
        <Input className="w-full" id="address" type="text" label="Address" />
        <Input className="w-full" id="apartament" type="text" label="Apartament, suite, etc." />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-8 lg:space-y-0 pb-10">
          <div className="w-full">
            <Input className="w-full lg:w-[90%]" id="city" type="text" label="City" />
          </div>
          <div className="w-full">
            <Input className="w-full lg:w-[90%]" id="state" type="text" label="State / Province" />
          </div>
          <div className="w-full">
            <Input className="w-full lg:w-[90%]" id="zip" type="text" label="Zip / Postal code" />
          </div>
        </div>
        <h2 className="text-xl">Billing information</h2>
        <div>
          <label htmlFor="sameAsShipping">
            <input type="checkbox" className="form-checkbox" id="sameAsShipping" /> Same as shipping address
          </label>
        </div>
        <button type="submit" className="px-4 py-2 rounded-full bg-blue-700 text-white">
          Continue
        </button>
      </form>
    </FormProvider>
  );
};

export default CheckoutForm;
