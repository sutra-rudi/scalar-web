'use client';

import Image from 'next/image';
import { FaLinkedin as LinkedInIcon, FaRegEnvelope as MailIcon, FaUser as UserIcon } from 'react-icons/fa';
import { FaLocationDot as LocationIcon } from 'react-icons/fa6';
import { PiBankFill as BankIcon } from 'react-icons/pi';
import ScalarLogoVer from '../images/scalar-logo-ver-bezpot.svg';
import noiseScalar from '../images/scalar-noise-opt.png';
export default function AppFooter() {
  return (
    <footer className='relative w-full overflow-hidden bg-primary-dark py-12'>
      {/* Pozadinska slika */}
      <div className='absolute inset-0 z-[-1]  w-[150%] h-[150%]'>
        <Image
          src={noiseScalar} // Stavi pravi put do slike
          layout='fill'
          objectFit='cover'
          alt='Pozadinska slika'
          loading='lazy'
          className='opacity-20 animate-animateFilm'
        />
        {/* Poluprozirni sloj iznad pozadinske slike */}
        <div className='absolute inset-0 bg-primary-dark/80 z-[-1]' />
      </div>

      {/* Glavni sadržaj footera */}
      <div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col justify-between sm:gap-0 gap-4 z-10'>
        <div className='flex gap-16 items-start lg:justify-start justify-center lg:flex-nowrap flex-wrap'>
          <Image
            src={ScalarLogoVer}
            width={350}
            height={350}
            alt='app logo'
            loading='lazy'
            className='object-center object-cover block z-10' // Dodan z-indeks
          />

          <div className='text-primary-light flex items-start justify-start flex-col z-10'>
            <p className='text-base leading-normal font-medium pb-4'>SCALAR d.o.o. za nadzor i savjetovanje</p>
            <a
              href='https://www.google.hr/maps/place/Debani%C4%87eva+ul.+1a,+10000,+Zagreb/@45.8126286,15.9063611,17z/data=!3m1!4b1!4m6!3m5!1s0x4765d13cf1ce17c1:0xb239558099b1c059!8m2!3d45.8126249!4d15.908936!16s%2Fg%2F11gmfty1h0?entry=ttu&g_ep=EgoyMDI0MDkyMy4wIKXMDSoASAFQAw%3D%3D'
              className='text-base leading-normal flex items-center justify-start gap-2 transition-all ease-out hover:text-accent'
              target='_blank'
              role='link'
              aria-label='Upute do naše lokacije'
            >
              <LocationIcon />
              <span>Debanićeva ulica 1A, Zagreb</span>
            </a>
            <p className='text-base leading-normal flex items-center justify-start gap-2'>
              <UserIcon /> <span>OIB: 52575580755 Erste&Steiermärkische Bank d.d.</span>
            </p>
            <p className='text-base leading-normal flex items-center justify-start gap-2'>
              <BankIcon />
              <span>IBAN: HR5224020061101147166</span>
            </p>
          </div>
        </div>

        {/* Ikone društvenih mreža */}
        <div className='flex text-3xl gap-4 z-10'>
          <a
            href='https://hr.linkedin.com/company/scalar-d-o-o'
            target='_blank'
            role='link'
            aria-label='Posjetite našu LinkedIn stranicu!'
          >
            <LinkedInIcon className='text-primary-light cursor-pointer transition-all ease-out duration-150 hover:scale-110 hover:text-accent' />
          </a>
          <a href='mailto:info@scalar.hr' target='_blank' role='link' aria-label='Pošaljite nam poruku!'>
            <MailIcon className='text-primary-light cursor-pointer transition-all ease-out duration-150 hover:scale-110 hover:text-accent' />
          </a>
        </div>
      </div>
    </footer>
  );
}
