'use client';

import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParallax } from 'react-scroll-parallax';
import { SutraButtonBase, SutraButtonOutlined } from './SutraButton';
import { useFormspark } from '@formspark/use-formspark';
import scalarContactOverlay from '../images/scalar-contact-overlay.jpg';
import scalarOverlayHero from '../images/scalar-hero-page-lines.png';

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

  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();
    try {
      await submit({ ...data });
      reset();
      toast.success(`Hvala na svemu!, ${JSON.stringify(data)}`);
    } catch (error) {
      console.error('Error sending the message:', error);
      toast.error('Došlo je do pogreške prilikom slanja poruke.');
    }
  };

  const onError = async (errors: any) => {
    Object.entries(errors).forEach(([field, error]) => {
      //@ts-ignore
      return toast.error(`Greška u polju ${field}: ${error.message}`);
    });
  };

  const backgroundParallax = useParallax({
    translateY: [0, 0],
    shouldAlwaysCompleteAnimation: true,
  });

  const overlayParallax = useParallax({
    translateY: [0, 0],
  });

  const foregroundParallax = useParallax({
    translateY: [0, 5],
    shouldAlwaysCompleteAnimation: true,
  });

  return (
    <section className={`bg-white dark:bg-almost-black w-full ${isPage && 'min-h-screen'}`}>
      <div className={`relative h-[600px] ${isPage && 'h-screen'}`}>
        <div ref={backgroundParallax.ref as any} className='absolute inset-0 w-full h-full'>
          <div className='relative w-full h-full'>
            <Image
              src={scalarContactOverlay}
              placeholder='blur'
              blurDataURL={scalarContactOverlay.blurDataURL}
              alt='Scalar banner'
              fill
              className='object-cover object-center block z-10'
            />
            <div className='absolute inset-0 bg-almost-black/40 z-20'></div>
          </div>
        </div>

        <div ref={overlayParallax.ref as any} className='absolute inset-0 w-full h-full'>
          <Image
            src={scalarOverlayHero}
            fill
            alt='hero-overlay'
            className='w-full h-full object-cover object-center absolute'
            placeholder='blur'
            blurDataURL={scalarOverlayHero.blurDataURL}
            loading={isPage ? 'eager' : 'lazy'}
          />
        </div>

        <div
          ref={foregroundParallax.ref as any}
          className='absolute inset-0 w-full flex flex-col items-center justify-center px-4 pb-24 z-30'
        >
          <div className='text-center py-4'>
            <h2 className='mb-2 xl:text-h3_md lg:text-h4_sm text-h5_xs font-extrabold text-almost-white'>
              Kontaktirajte nas s povjerenjem
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit, onError)} className='w-full max-w-screen-sm z-40'>
            <div className='mb-4'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-almost-white'>
                Vaš email
              </label>
              <input
                type='email'
                id='email'
                className={`shadow-sm bg-almost-white border border-sutraCardDivider text-almost-black text-sm rounded-sm block w-full p-2.5 focus:outline-none ${
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
                className={`block p-2.5 w-full text-sm text-almost-black bg-almost-white rounded-sm border shadow-sm focus:outline-none ${
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
                className={`block p-2.5 w-full text-sm text-almost-black bg-almost-white rounded-sm shadow-sm border ${
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
            <div className='sm:w-1/4 w-1/2'>
              <SutraButtonOutlined innerText='Pošalji upit' size='normal' type='submit' isFullCard />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ScalarContact;
