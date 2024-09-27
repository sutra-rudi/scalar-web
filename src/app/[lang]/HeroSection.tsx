'use client';

import { SutraButtonOutlined } from '../components/SutraButton';
import { BsArrowRightShort as RightIcon } from 'react-icons/bs';
import Image from 'next/image';
import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
import scalarOverlayHero from '../images/scalar-hero-page-lines.png';
import scalarHeroBg from '../images/scalar-hero-page-bg.png';
import scalarHeroMobile from '../images/scalar-hero-mobile.jpg';
import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

const HeroSection = ({ lang }: { lang: string }) => {
  const { width: ClientW } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  // Throttle resize events to avoid too frequent updates
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(ClientW! <= 768);
    };

    // Throttle with setTimeout for better performance
    const throttledResize = () => {
      setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', throttledResize);
    return () => window.removeEventListener('resize', throttledResize);
  }, [ClientW]);

  // Background layer with optimised image loading
  const background: BannerLayer = {
    translateY: [0, 10], // reduced translateY for smoother animation
    shouldAlwaysCompleteAnimation: true, // Ensure complete animation
    children: (
      <div className='w-full h-full relative'>
        <Image
          src={ClientW! > 1200 ? scalarHeroBg : scalarHeroMobile}
          alt='page background'
          placeholder='blur'
          blurDataURL={scalarHeroBg.blurDataURL}
          fill
          className='object-left-bottom block'
          priority
          sizes='(max-width: 768px) 100vw, (min-width: 769px) 50vw'
        />
      </div>
    ),
  };

  // Overlay layer with reduced intensity of parallax
  const overlay: BannerLayer = {
    translateY: [0, 20], // reduced range for better performance
    shouldAlwaysCompleteAnimation: true,
    easing: 'easeOutQuad',
    children: (
      <Image
        src={scalarOverlayHero}
        fill
        alt='hero-overlay'
        className='absolute object-cover object-center inset-0 block'
        placeholder='blur'
        blurDataURL={scalarOverlayHero.blurDataURL}
        priority
      />
    ),
  };

  // Foreground with conditional rendering for mobile devices
  const foreground: BannerLayer = {
    translateY: [0, 5],
    translateX: [0, 5],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className='flex flex-col justify-center items-center absolute inset-0 z-10 w-full h-full'>
        <div className='flex flex-col items-start max-w-max xl:pl-[40%] lg:pl-[35%] md:pl-[30%] pl-[10%]'>
          <h1 className='xl:max-w-2xl lg:max-w-xl md:max-w-sm max-w-xs mb-4 text-2xl font-bold tracking-tight leading-none md:text-4xl xl:text-5xl text-accent text-balance'>
            {`SCALAR - Vaš partner u\ninvesticijama u građevini`}
          </h1>

          <a className='flex items-center justify-start gap-4' href={`/${lang}/contact`}>
            <SutraButtonOutlined innerText='Kontaktirajte nas' size='large' backIcon={RightIcon} />
          </a>
        </div>
      </div>
    ),
  };

  // Layer selection based on screen size
  const layers = isMobile
    ? [background] // Only background layer for mobile for better performance
    : [background, overlay, foreground]; // Full parallax effect for desktop

  return (
    <section className='w-full min-h-fit'>
      <ParallaxBanner className='w-full h-screen relative overflow-hidden' layers={layers} />
    </section>
  );
};

export default HeroSection;
