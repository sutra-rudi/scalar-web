'use client';

import { SutraButtonOutlined } from '../components/SutraButton';
import { BsArrowRightShort as RightIcon } from 'react-icons/bs';
import Image from 'next/image';
import scalarOverlayHero from '../images/scalar-hero-page-lines.png';
import scalarHeroBg from '../images/scalar-hero-page-bg.jpg';
import scalarHeroMobile from '../images/scalar-hero-mobile.jpg';
import { useWindowSize } from '@uidotdev/usehooks';
import { useParallax } from 'react-scroll-parallax';

const HeroSection = ({ lang }: { lang: string }) => {
  const { width: ClientW } = useWindowSize();

  const backgroundParallax = useParallax({
    translateY: [0, 10],
    shouldAlwaysCompleteAnimation: true,
  });

  const overlayParallax = useParallax({
    translateY: [0, 20],
    shouldAlwaysCompleteAnimation: true,
  });

  const headlineParallax = useParallax({
    translateY: [0, 15],
    shouldAlwaysCompleteAnimation: true,
  });

  const buttonParallax = useParallax({
    translateX: [0, 5],
    shouldAlwaysCompleteAnimation: true,
  });

  return (
    <section className='w-full min-h-screen relative overflow-hidden'>
      <div ref={backgroundParallax.ref as any} className='absolute inset-0 w-full h-full'>
        {ClientW && (
          <Image
            src={ClientW > 1200 ? scalarHeroBg : scalarHeroMobile}
            alt='page background'
            width={ClientW > 1200 ? scalarHeroBg.width : scalarHeroMobile.width}
            height={ClientW > 1200 ? scalarHeroBg.height : scalarHeroMobile.height}
            className='object-left-bottom block w-full h-full'
            priority={true}
            sizes='(max-width: 768px) 100vw, (min-width: 769px) 70vw, (min-width: 1200px) 50vw'
          />
        )}
      </div>

      <div ref={overlayParallax.ref as any} className='absolute inset-0 w-full h-full'>
        {ClientW && (
          <Image
            src={scalarOverlayHero}
            alt='hero-overlay'
            width={scalarOverlayHero.width}
            height={scalarOverlayHero.height}
            className='object-cover object-center block w-full h-full'
            sizes='(max-width: 768px) 100vw, (min-width: 769px) 50vw'
            priority={true}
          />
        )}
      </div>

      <div className='absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center'>
        <div className='max-w-max xl:pl-[40%] lg:pl-[35%] md:pl-[30%] pl-0 flex flex-col items-center md:items-start'>
          <div ref={headlineParallax.ref as any}>
            <h1 className='xl:max-w-2xl lg:max-w-xl md:max-w-sm max-w-xs md:text-left text-center mb-4 font-bold tracking-tight leading-none text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-accent'>
              {`SCALAR - Vaš partner u\ninvesticijama u građevini`}
            </h1>
          </div>

          <div ref={buttonParallax.ref as any} className=''>
            <a href={`/${lang}/contact`} className='flex items-center gap-4'>
              <SutraButtonOutlined innerText='Kontaktirajte nas' size='normal' backIcon={RightIcon} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
