'use client';
import Image from 'next/image';
import parse from 'html-react-parser';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
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
  const isGalleryEmpty = React.useMemo(() => gallery.every((item) => item === null), [gallery]);

  return (
    <article className='mx-auto my-0 w-full relative'>
      <ParallaxBanner className='w-full h-[360px] relative'>
        <ParallaxBannerLayer speed={-20}>
          <Image
            src={introImages.imageOne.node.sourceUrl}
            alt='service image'
            fill
            className='w-full h-full object-cover object-center aspect-video'
            priority
          />
        </ParallaxBannerLayer>
      </ParallaxBanner>

      <div className='max-w-screen-2xl mx-auto lg:px-0 px-4'>
        <div className='grid grid-cols-1 justify-center place-items-start lg:w-2/4 w-full mx-auto'>
          {/* Prilagoditi razmak između naslova i sadržaja */}
          <div className='prose py-6 text-primary-dark dark:text-primary-light w-full'>
            <h2 className='text-primary-dark dark:text-primary-light w-full lg:px-0 px-4 lg:text-4xl md:text-3xl text-2xl'>
              {textContent.naslovBazaTekstova}
            </h2>
          </div>

          <div className='prose lg:px-0 px-4 text-primary-dark dark:text-primary-light text-lg prose-p:pl-0'>
            {parse(pageContent)}
          </div>
        </div>

        {!isGalleryEmpty && (
          <div className='mx-auto md:w-2/3 lg:px-0 px-4'>
            <h3 className='max-w-max py-6 text-2xl prose text-center'>Galerija</h3>
            <Slider {...defaultMultiple} slidesToScroll={1} className='cursor-grab'>
              {gallery.map((nod, index) => {
                return (
                  nod && (
                    <Image
                      width={400}
                      height={300}
                      src={nod.node.sourceUrl}
                      alt='galleryImage'
                      key={index}
                      className='lg:pr-6 md:pr-3 pr-1 w-full h-full object-cover object-center aspect-video'
                    />
                  )
                );
              })}
            </Slider>
          </div>
        )}

        <div className='mx-auto md:w-2/3 my-20 lg:px-0 px-4'>
          <div className='flex gap-2 lg:flex-nowrap flex-wrap justify-center'>
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
