'use client';

import Image from 'next/image';
import React from 'react';
import { useParallax } from 'react-scroll-parallax';
import { SutraButtonBase } from '../components/SutraButton';
import scalarOverlayHero from '../images/scalar-hero-page-lines.png';
import scalarContactOverlay from '../images/scalar-contact-overlay.jpg';

const BannerSectionContact = ({ lang }: { lang: string }) => {
  // Background parallax effect
  const backgroundParallax = useParallax({
    translateY: [0, 30],
    shouldAlwaysCompleteAnimation: true,
  });

  const overlayParallax = useParallax({
    translateY: [0, 30],

    shouldAlwaysCompleteAnimation: true,
  });

  const foregroundParallax = useParallax({
    translateY: [0, 15],
    shouldAlwaysCompleteAnimation: true,
  });

  return (
    <section className='overflow-hidden relative h-[316px]'>
      <div ref={backgroundParallax.ref as any} className='absolute inset-0 w-full h-full'>
        <Image
          src={scalarContactOverlay}
          placeholder='blur'
          blurDataURL={scalarContactOverlay.blurDataURL}
          alt='Scalar banner'
          fill
          className='object-cover object-center block w-full h-full'
          loading='lazy'
        />
      </div>

      <div ref={overlayParallax.ref as any} className='absolute inset-0 w-full h-full'>
        <Image
          src={scalarOverlayHero}
          fill
          alt='hero-overlay'
          className='w-full h-full object-cover object-center absolute'
          placeholder='blur'
          blurDataURL={scalarOverlayHero.blurDataURL}
          loading='lazy'
        />
      </div>

      <div
        ref={foregroundParallax.ref as any}
        className='w-full h-full absolute inset-0 flex items-center justify-center z-10'
      >
        <div className='flex flex-col items-center justify-start gap-4 w-full'>
          <h3 className='text-almost-white lg:text-4xl md:text-3xl text-2xl'>Kontaktirajte nas s povjerenjem</h3>
          <a href={`/${lang}/contact`} className='sm:w-1/6'>
            <SutraButtonBase innerText='Pošalji' size='large' isFullCard isContactBtn />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BannerSectionContact;
