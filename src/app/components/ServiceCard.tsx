import Image from 'next/image';
import { SutraButtonBase } from './SutraButton';
import parse from 'html-react-parser';

interface DefaultServiceCard {
  url: string;
  imgSource: string;
  title: string;
  subtitle: string;
  intro: any;
}

const ServiceCard = ({ url, imgSource, title, subtitle, intro }: DefaultServiceCard) => {
  return (
    <a
      href={url}
      className='flex flex-col items-center bg-almost-white border border-almost-black rounded-lg shadow md:max-w-xs hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full group'
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
          <h5 className='mb-1 text-2xl font-bold tracking-tight text-balance text-gray-900 dark:text-white'>{title}</h5>
          <p className='mb-1 line-clamp-4 max-w-[25ch] font-normal text-gray-700 dark:text-gray-400'>{subtitle}</p>

          <div className='transition-all ease-out duration-150 prose mb-3 line-clamp-2 opacity-40 group-hover:opacity-100'>
            {parse(intro)}
          </div>

          <SutraButtonBase innerText='Pročitaj više' size='small' isFullCard />
        </div>
      </div>
    </a>
  );
};

export default ServiceCard;
