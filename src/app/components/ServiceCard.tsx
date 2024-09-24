import Image from 'next/image';
import React from 'react';
import { SutraButtonBase } from './SutraButton';

interface DefaultServiceCard {
  url: string;
  imgSource: string;
  title: string;
  subtitle: string;
}

const ServiceCard = ({ url, imgSource, title, subtitle }: DefaultServiceCard) => {
  return (
    <a
      href={url}
      className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
    >
      <div className='w-full h-56  md:w-48 relative'>
        <Image
          className='object-cover w-full h-full rounded-t-lg md:rounded-none md:rounded-s-lg'
          src={imgSource}
          fill
          alt=''
        />
      </div>
      <div className='flex flex-col justify-between p-4 leading-normal'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h5>
        <p className='mb-3 line-clamp-4 max-w-[25ch] font-normal text-gray-700 dark:text-gray-400'>{subtitle}</p>
      </div>

      <SutraButtonBase innerText='Pročitaj više' size='small' />
    </a>
  );
};

export default ServiceCard;
