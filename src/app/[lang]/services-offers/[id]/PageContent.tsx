'use client';
import Image from 'next/image';
import parse from 'html-react-parser';
import { ParallaxBanner } from 'react-scroll-parallax';
import React from 'react';
import Slider from 'react-slick';
import { defaultMultiple } from '@/app/scriptSettings/slickOptions';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SutraTagBase } from '@/app/components/SutraTag';
interface ServicesOffersInterface {
  attributes: any;
  textContent: any;
  tags: any;
  gallery: any[];
  introImages: any;
  pageContent: any;
}

const PageContent = ({ textContent, introImages, gallery, tags, pageContent }: ServicesOffersInterface) => {
  // const prepAttr = Object.values(attributes);

  const isGalleryEmpty = React.useMemo(() => gallery.every((item) => item === null), [gallery]);

  return (
    <article className='mx-auto my-0 w-full'>
      <ParallaxBanner
        layers={[
          {
            image: introImages.imageOne.node.sourceUrl,
            speed: -50,
            easing: 'easeOutQuad',
          },
        ]}
        className='block object-cover object-center aspect-video h-[360px]  mx-auto my-0 '
      />
      <div className='max-w-screen-2xl mx-auto  lg:px-0 px-4'>
        <div className='prose mx-auto py-6 '>
          <h2 className='text-primary-dark dark:text-primary-light'>{textContent.naslovBazaTekstova}</h2>
          <p className='text-primary-dark dark:text-primary-light'>{textContent.nadnaslovPodnaslovBazaTekstova}</p>
        </div>

        <div className='prose mx-auto lg:px-0 px-4 text-primary-dark dark:text-primary-light text-lg'>
          {parse(pageContent)}
        </div>

        {!isGalleryEmpty && (
          <div className='mx-auto md:w-2/3  lg:px-0 px-4'>
            <h3 className='max-w-max py-6 text-2xl prose'>Galerija</h3>
            <Slider {...defaultMultiple} slidesToScroll={1} className='cursor-grab'>
              {gallery.map((nod, index) => {
                return (
                  nod && (
                    <Image
                      width={300}
                      height={200}
                      src={nod.node.sourceUrl}
                      alt='galleryImage'
                      key={index}
                      className='pr-6 w-full h-full object-cover object-center aspect-video'
                    />
                  )
                );
              })}
            </Slider>
          </div>
        )}

        <div className='mx-auto md:w-2/3 my-20  lg:px-0 px-4'>
          <div className='flex gap-2 lg:flex-nowrap flex-wrap'>
            {tags &&
              tags
                .split(', ')
                .map((tag: string, index: string) => <SutraTagBase key={index} size='small' innerText={`#${tag}`} />)}
          </div>
        </div>

        <div className='lg:w-1/2 w-1/3 h-px bg-primary-dark/15 dark:bg-primary-light/15 mx-auto'></div>
      </div>
    </article>
  );
};

export default PageContent;
