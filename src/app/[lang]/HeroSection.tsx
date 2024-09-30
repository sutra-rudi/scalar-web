'use client';

import { SutraButtonOutlined } from '../components/SutraButton';
import { BsArrowRightShort as RightIcon } from 'react-icons/bs';
import Image from 'next/image';
import scalarOverlayHero from '../images/scalar-hero-page-lines.png';
import scalarHeroBg from '../images/scalar-hero-page-bg.jpg';
import scalarHeroMobile from '../images/scalar-hero-mobile.jpg';
import { useWindowSize } from '@uidotdev/usehooks';
import { useParallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';

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

  const wordVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        type: 'spring',
        stiffness: 300,
      },
    }),
  };

  const firstLine = `SCALAR - Vaš partner u`.split(' ');
  const secondLine = `investicijama u građevini`.split(' ');

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
          {/* First Line */}
          <div ref={headlineParallax.ref as any} className='flex flex-wrap justify-center md:justify-start'>
            {firstLine.map((word, index) => (
              <motion.span
                key={word + index}
                className='inline-block  font-bold tracking-tight leading-none text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-accent'
                initial='hidden'
                animate='visible'
                variants={wordVariants}
                custom={index}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </div>

          {/* Second Line */}
          <div ref={headlineParallax.ref as any} className='flex flex-wrap justify-center md:justify-start'>
            {secondLine.map((word, index) => (
              <motion.span
                key={word + index}
                className='inline-block mb-4 font-bold tracking-tight leading-none text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-accent'
                initial='hidden'
                animate='visible'
                variants={wordVariants}
                custom={index + firstLine.length} // Offset index for second line
              >
                {word}&nbsp;
              </motion.span>
            ))}
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
