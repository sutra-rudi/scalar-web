'use client';

import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
import { SutraButtonBase } from './SutraButton';
import { useFormspark } from '@formspark/use-formspark';

interface ScalarContact {
  isPage: boolean;
}

const ScalarContact = ({ isPage }: ScalarContact) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submit, submitting] = useFormspark({
    formId: '9DolWOCtL',
  });

  // Funkcija koja se pokreće kada je forma uspješno podnesena
  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();
    try {
      // await axios.post(FORMSPARK_URL, data);
      await submit({ ...data });
      reset();
      toast.success(`Hvala na svemu!, ${JSON.stringify(data)}`);
    } catch (error) {
      console.error('Error sending the message:', error);
      toast.error('Došlo je do pogreške prilikom slanja poruke.');
    }
  };

  // Funkcija koja se pokreće ako postoje greške u formi
  const onError = (errors: any) => {
    Object.entries(errors).forEach(([field, error]) => {
      //@ts-ignore
      toast.error(`Greška u polju ${field}: ${error.message}`);
    });
  };

  const background: BannerLayer = {
    translateY: [0, 0],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className='relative w-full h-full'>
        <Image
          src={'https://www.scalar.hr/img/construction-workers-sunset.jpg'}
          alt='Scalar banner'
          fill
          className='object-cover object-center block z-10'
        />
        <div className='absolute inset-0 bg-almost-black/40 z-20'></div>
      </div>
    ),
  };

  const foreground: BannerLayer = {
    translateY: [0, 15],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className='absolute inset-0 w-full flex flex-col items-center justify-center px-4 pb-24 z-30'>
        <div className='text-center py-4'>
          <h2 className='mb-2 text-h3_md font-extrabold text-almost-white'>Kontaktirajte nas s povjerenjem</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, onError)} // Dodajemo onError callback
          className='w-full max-w-screen-sm z-40'
        >
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-almost-white'>
              Vaš email
            </label>
            <input
              type='email'
              id='email'
              className={`shadow-sm bg-almost-white border border-sutraCardDivider text-almost-black text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                errors.email ? 'border-red-500' : 'focus:border-accent'
              }`}
              placeholder='vašeime@mail.com'
              {...register('email', {
                required: 'Email je obavezan',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: 'Unesite ispravan email',
                },
              })}
            />
            {/* @ts-ignore */}
            {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
          </div>
          <div className='mb-4'>
            <label htmlFor='name' className='block mb-2 text-sm font-medium text-almost-white'>
              Vaše ime
            </label>
            <input
              type='text'
              id='name'
              className={`block p-2.5 w-full text-sm text-almost-black bg-almost-white rounded-lg border shadow-sm focus:outline-none ${
                errors.name ? 'border-red-500' : 'focus:border-accent'
              }`}
              placeholder='Ivan Horvat'
              {...register('name', {
                required: 'Ime je obavezno',
              })}
            />
            {/* @ts-ignore */}
            {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
          </div>
          <div className='mb-4 sm:col-span-2'>
            <label htmlFor='message' className='block mb-2 text-sm font-medium text-almost-white'>
              Vaša poruka
            </label>
            <textarea
              id='message'
              rows={4}
              className={`block p-2.5 w-full text-sm text-almost-black bg-almost-white rounded-lg shadow-sm border ${
                errors.message ? 'border-red-500' : 'focus:border-accent'
              }`}
              placeholder='Napišite nam poruku'
              {...register('message', {
                required: 'Poruka je obavezna',
              })}
            />
            {/* @ts-ignore */}
            {errors.message && <span className='text-red-500'>{errors.message.message}</span>}
          </div>
          <SutraButtonBase innerText='Pošalji upit' size='normal' type='submit' />
        </form>
      </div>
    ),
  };

  return (
    <section className={`bg-white dark:bg-almost-black w-full ${isPage && 'min-h-screen'}`}>
      <ParallaxBanner
        layers={[background, foreground]}
        className={`w-full relative h-[600px] ${isPage && 'h-screen'}`}
      />
    </section>
  );
};

export default ScalarContact;
