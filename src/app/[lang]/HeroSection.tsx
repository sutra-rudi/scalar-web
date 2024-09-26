'use client';

import { SutraButtonWithIcon } from '../components/SutraButton';
import { BsArrowRightShort as RightIcon } from 'react-icons/bs';
import Image from 'next/image';
import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';

const HeroSection = ({ lang }: { lang: string }) => {
  const background: BannerLayer = {
    translateY: [0, 60],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <Image
        src={'https://www.scalar.hr/img/Hero%201.jpg'}
        alt='mockup'
        fill
        className='object-cover object-center block aspect-video'
        loading='eager'
      />
    ),
  };

  const foreground: BannerLayer = {
    translateY: [0, 30],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className='flex flex-col justify-center items-center absolute inset-0 z-10 w-full h-full'>
        <div className='flex flex-col items-start max-w-max pl-[25%]'>
          <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-almost-white'>
            Scalar
          </h1>
          <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
            Vaš partner u investicijama u građevini
          </p>
          <a className='flex items-center justify-start gap-4' href={`/${lang}/contact`}>
            <SutraButtonWithIcon innerText='Kontaktirajte nas' size='normal' backIcon={RightIcon} />
          </a>
        </div>
      </div>
    ),
  };

  return (
    <section className='w-full'>
      <ParallaxBanner className='w-full h-screen relative overflow-hidden' layers={[background, foreground]} />
    </section>
  );
};

export default HeroSection;
