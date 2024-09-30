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
      className='flex flex-col items-center bg-almost-white border border-almost-black/5 rounded-sm shadow sm:max-w-serviceCardDesktop dark:border-accent/50 dark:bg-almost-black  w-full group transition-all ease-in-out hover:border-accent dark:hover:border-accent group'
    >
      <div className='overflow-hidden w-full md:h-[224px] h-[200px]'>
        <Image
          className='object-cover w-full h-full block object-center group-hover:scale-125 transition-all ease-out duration-300'
          src={imgSource}
          width={260}
          height={224}
          alt='service image'
        />
      </div>

      <div className='p-4 w-full'>
        <div className='flex flex-col justify-between  leading-normal w-full  prose'>
          <h5 className='mb-1 lg:text-2xl md:text-xl text-lg font-bold tracking-tight text-balance text-primary-dark dark:text-white'>
            {title}
          </h5>
          {/* <p className='mb-1 line-clamp-4 max-w-[25ch] font-normal text-primary-dark dark:text-white'>{subtitle}</p> */}

          <p className='transition-all ease-out duration-150 md:text-base text-sm opacity-70  text-primary-dark dark:text-white group-hover:opacity-100'>
            {intro}
          </p>

          <SutraButtonBase innerText='Pročitaj više' size='normal' isFullCard />
        </div>
      </div>
    </a>
  );
};

export default ServiceCard;
