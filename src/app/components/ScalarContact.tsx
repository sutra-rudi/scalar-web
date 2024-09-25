'use client';

import Image from 'next/image';
import React from 'react';
import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
import { SutraButtonBase } from './SutraButton';

const ScalarContact = () => {
  const background: BannerLayer = {
    translateY: [0, 0], // Za fiksnu pozadinu
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
          <h2 className='mb-2 text-3xl md:text-4xl font-extrabold text-almost-white'>
            Kontaktirajte nas s povjerenjem
          </h2>
        </div>
        <form action='#' className='w-full max-w-md z-40'>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-almost-white'>
              Vaš email
            </label>
            <input
              type='email'
              id='email'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              placeholder='vašeime@mail.com'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='name' className='block mb-2 text-sm font-medium text-almost-white'>
              Vaše ime
            </label>
            <input
              type='text'
              id='name'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              placeholder='Ivan Horvat'
              required
            />
          </div>
          <div className='mb-4 sm:col-span-2'>
            <label htmlFor='message' className='block mb-2 text-sm font-medium text-almost-white'>
              Vaša poruka
            </label>
            <textarea
              id='message'
              rows={4}
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              placeholder='Napišite nam poruku'
            />
          </div>
          <SutraButtonBase innerText='Pošalji upit' size='normal' />
        </form>
      </div>
    ),
  };

  return (
    <section className='bg-white dark:bg-gray-900 w-full'>
      <ParallaxBanner layers={[background, foreground]} className='w-full relative h-[600px]' />
    </section>
  );
};

export default ScalarContact;
