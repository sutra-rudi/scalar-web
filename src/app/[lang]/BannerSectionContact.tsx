'use client';

import Image from 'next/image';
import React from 'react';
import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
import { SutraButtonBase } from '../components/SutraButton';
const BannerSectionContact = () => {
  const background: BannerLayer = {
    translateY: [0, 60],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <Image
        src={'https://www.scalar.hr/img/construction-workers-sunset.jpg'}
        alt='Scalar banner'
        fill
        className='object-cover object-center block  aspect-video'
        //   placeholder='blur'
      />
    ),
  };

  const foreground: BannerLayer = {
    translateY: [0, 30],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className='w-full h-full absolute inset-0 flex items-center justify-center'>
        <div className='flex flex-col items-center justify-start gap-4'>
          <h3 className='text-almost-white opacity-70 text-3xl'>Kontaktirajte nas s povjerenjem</h3>
          <SutraButtonBase innerText='Pošalji' size='large' />
        </div>
      </div>
    ),
  };
  return (
    <section>
      <div className='w-full relative '>
        <ParallaxBanner layers={[background, foreground]} className='w-full relative h-[400px]' />
      </div>
    </section>
  );
};

export default BannerSectionContact;
