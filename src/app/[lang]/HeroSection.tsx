'use client';

import { SutraButtonOutlined } from '../components/SutraButton';
import { BsArrowRightShort as RightIcon } from 'react-icons/bs';
import Image from 'next/image';
import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
import scalarOverlayHero from '../images/scalar-hero-page-lines.png';
import scalarHeroBg from '../images/scalar-hero-page-bg.png';
const HeroSection = ({ lang }: { lang: string }) => {
  const background: BannerLayer = {
    translateY: [-5, 15],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className='w-full h-full relative'>
        <Image
          src={scalarHeroBg}
          alt='page background'
          placeholder='blur'
          blurDataURL={scalarHeroBg.blurDataURL}
          fill
          className='object-left-bottom block'
          loading='eager'
        />
      </div>
    ),
  };

  const overlay: BannerLayer = {
    translateX: [0, -35],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <Image
        src={scalarOverlayHero}
        fill
        alt='hero-overlay'
        className='w-full h-full absolute object-cover object-center inset-0 block'
      />
    ),
  };

  const foreground: BannerLayer = {
    translateY: [0, 10],
    translateX: [0, 5],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className='flex flex-col justify-center items-center absolute inset-0 z-10 w-full h-full'>
        <div className='flex flex-col items-start max-w-max pl-[40%]'>
          <h1 className='max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-accent text-balance'>
            {`SCALAR - Vaš partner u\ninvesticijama u građevini`}
          </h1>

          <a className='flex items-center justify-start gap-4' href={`/${lang}/contact`}>
            <SutraButtonOutlined innerText='Kontaktirajte nas' size='large' backIcon={RightIcon} />
          </a>
        </div>
      </div>
    ),
  };

  return (
    <section className='w-full'>
      <ParallaxBanner className='w-full h-screen relative overflow-hidden' layers={[background, overlay, foreground]} />
    </section>
  );
};

export default HeroSection;
