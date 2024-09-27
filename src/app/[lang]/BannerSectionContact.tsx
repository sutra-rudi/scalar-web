'use client';

import Image from 'next/image';
import React from 'react';
import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
import { SutraButtonBase } from '../components/SutraButton';
import scalarOverlayHero from '../images/scalar-hero-page-lines.png';
import scalarContactOverlay from '../images/scalar-contact-overlay.jpg';
const BannerSectionContact = ({ lang }: { lang: string }) => {
  const background: BannerLayer = {
    translateY: [0, 30],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <Image
        src={scalarContactOverlay}
        placeholder='blur'
        blurDataURL={scalarContactOverlay.blurDataURL}
        alt='Scalar banner'
        fill
        className='object-cover object-center block aspect-video w-full h-full'
        loading='lazy'
      />
    ),
  };

  const overlay: BannerLayer = {
    children: (
      <Image
        src={scalarOverlayHero}
        fill
        alt='hero-overlay'
        className='w-full h-full absolute object-cover object-center inset-0 block'
        placeholder='blur'
        blurDataURL={scalarOverlayHero.blurDataURL}
        loading='lazy'
      />
    ),
  };

  const foreground: BannerLayer = {
    translateY: [0, 15],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className='w-full h-full absolute inset-0 flex items-center justify-center'>
        <div className='flex flex-col items-center justify-start gap-4'>
          <h3 className='text-almost-white opacity-70 lg:text-3xl md:text-2xl text-xl'>
            Kontaktirajte nas s povjerenjem
          </h3>
          <a href={`/${lang}/contact`}>
            <SutraButtonBase innerText='Pošalji' size='large' />
          </a>
        </div>
      </div>
    ),
  };
  return (
    <section className='overflow-hidden'>
      <ParallaxBanner layers={[background, overlay, foreground]} className='w-full relative h-[316px] ' />
    </section>
  );
};

export default BannerSectionContact;
