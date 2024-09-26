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
      className='flex flex-col lg:items-center items-start bg-white border border-gray-200 rounded-lg shadow max-w-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full'
    >
      <Image className='object-cover w-full h-full' src={imgSource} width={384} height={224} alt='service image' />

      <div className='p-4'>
        <div className='flex flex-col justify-between  leading-normal w-full md:w-64 prose'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-balance text-gray-900 dark:text-white'>{title}</h5>
          <p className='mb-3 line-clamp-4 max-w-[25ch] font-normal text-gray-700 dark:text-gray-400'>{subtitle}</p>
        </div>

        <SutraButtonBase innerText='Pročitaj više' size='small' />
      </div>
    </a>
  );
};

export default ServiceCard;
