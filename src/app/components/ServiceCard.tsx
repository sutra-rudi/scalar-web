import Image from 'next/image';
import { SutraButtonBase } from './SutraButton';

interface DefaultServiceCard {
  url: string;
  imgSource: string;
  title: string;
  subtitle: string;
  intro: any;
}

const ServiceCard = ({ url, imgSource, title, intro }: DefaultServiceCard) => {
  return (
    <a
      href={url}
      className='flex flex-col items-center bg-almost-white border border-almost-black/5 rounded-sm shadow md:max-w-xs  dark:border-accent/50 dark:bg-almost-black  w-full group transition-all ease-in-out hover:border-accent dark:hover:border-accent hover:scale-105'
    >
      <Image
        className='object-cover w-full h-full block object-center'
        src={imgSource}
        width={384}
        height={224}
        alt='service image'
      />

      <div className='p-4'>
        <div className='flex flex-col justify-between  leading-normal w-full md:w-64 prose'>
          <h5 className='mb-1 text-2xl font-bold tracking-tight text-balance text-primary-dark dark:text-white'>
            {title}
          </h5>
          {/* <p className='mb-1 line-clamp-4 max-w-[25ch] font-normal text-primary-dark dark:text-white'>{subtitle}</p> */}

          <p className='transition-all ease-out duration-150 prose mb-3 opacity-70  text-primary-dark dark:text-white group-hover:opacity-100'>
            {intro}
          </p>

          <SutraButtonBase innerText='Pročitaj više' size='normal' isFullCard />
        </div>
      </div>
    </a>
  );
};

export default ServiceCard;
