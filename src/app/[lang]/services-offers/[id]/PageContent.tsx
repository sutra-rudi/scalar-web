import Image from 'next/image';
import parse from 'html-react-parser';

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

  return (
    <article className='mx-auto my-0 w-full py-8'>
      <div className='relative h-[560px] w-full'>
        <Image
          src={introImages.imageOne.node.sourceUrl}
          alt='service pic 1'
          fill
          className='object-cover object-center block aspect-video'
        />
      </div>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='prose mx-auto py-6'>
          <h2>{textContent.naslovBazaTekstova}</h2>
          <p>{textContent.nadnaslovPodnaslovBazaTekstova}</p>
        </div>

        <div className='prose mx-auto'>{parse(pageContent)}</div>

        <div className='mx-auto md:w-2/3'>
          <h3 className='max-w-max py-6 text-2xl prose'>Gallery</h3>

          <div className='flex flex-wrap'>
            {gallery.map((nod, index) => {
              return nod && <Image width={300} height={200} src={nod.node.sourceUrl} alt='galleryImage' key={index} />;
            })}
          </div>
        </div>

        <div className='mx-auto md:w-2/3 py-6'>
          <div className='flex gap-2'>
            {tags && tags.split(', ').map((tag: string, index: number) => <span key={index}>{`#${tag}`}</span>)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PageContent;
