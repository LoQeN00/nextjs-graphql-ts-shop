import React from 'react';
import Input from '../utils/Input';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Checkbox } from '../utils/Checkbox';
import { useCreateOrderMutation, useUpdateOrderMutation, OrderItemCreateInput } from '../../generated/graphql';
import { useCartContext } from '../Cart/useCartContext';
import { displayToast } from '../../lib/displayToast';

type Props = {};

yup.setLocale({
  mixed: {
    required: 'To Pole jest wymagane',
  },
});

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Nieprawidłowy email').required(),
    nameOnCard: yup.string().required().typeError('Nieprawidłowe dane'),
    cardNumber: yup.number().required().typeError('Nieprawidłowe dane'),
    expirationDate: yup.string().required().typeError('Nieprawidłowe dane'),
    cvc: yup.number().required().typeError('Nieprawidłowe dane'),
    company: yup.string().required().typeError('Nieprawidłowe dane'),
    address: yup.string().required().typeError('Nieprawidłowe dane'),
    apartament: yup.string().required().typeError('Nieprawidłowe dane'),
    city: yup.string().required().typeError('Nieprawidłowe dane'),
    state: yup.string().required().typeError('Nieprawidłowe dane'),
    zip: yup.string().required().typeError('Nieprawidłowe dane'),
    sameAsShipping: yup.boolean().required().typeError('Nieprawidłowe dane'),
  })
  .required();

export type CheckoutFormData = yup.InferType<typeof schema>;

const CheckoutForm = (props: Props) => {
  const methods = useForm<CheckoutFormData>({
    resolver: yupResolver(schema),
  });

  const { total, items } = useCartContext();

  const [createOrder] = useCreateOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  const onSubmit = async (data: CheckoutFormData) => {
    console.log(data);

    const order = await createOrder({
      variables: {
        email: data.email,
        stripeCheckoutId: 'odianmon123213',
        total,
      },
    });

    if (!order.data?.order) return;

    const orderedItems = items.map((item) => {
      return {
        quantity: item.count,
        total: item.count * item.price,
        order: { connect: { id: order.data?.order?.id } },
        product: { connect: { id: item.id } },
      };
    });

    await updateOrder({
      variables: {
        orderId: order.data?.order?.id,
        items: {
          create: orderedItems,
        },
      },
    });

    displayToast('Zamówienie złożone pomyślnie');
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-8 bg-white p-8" onSubmit={methods.handleSubmit(onSubmit)}>
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
        <Checkbox id="sameAsShipping" label="Same as shipping address" />
        <button type="submit" className="px-4 py-2 rounded-full bg-blue-700 text-white">
          Continue
        </button>
      </form>
    </FormProvider>
  );
};

export default CheckoutForm;
