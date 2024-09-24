import Image from 'next/image';

interface ServicesOffersInterface {
  attributes: any;
  textContent: any;
  tags: any;
  gallery: any[];
  introImages: any;
}

const PageContent = ({ textContent, introImages, gallery, tags, attributes }: ServicesOffersInterface) => {
  const prepAttr = Object.values(attributes);
  console.log('HALO');
  return (
    <article className='mx-auto my-0 max-w-[1024px] py-8'>
      <div className=''>
        <h2>{textContent.naslovBazaTekstova}</h2>
        <p>{textContent.nadnaslovPodnaslovBazaTekstova}</p>
      </div>

      <div className='flex'>
        <div className='relative h-32 w-full'>
          <Image
            src={introImages.imageOne.node.sourceUrl}
            alt='service pic 1'
            fill
            className='object-cover object-center block aspect-video'
          />
        </div>
        <div className='relative h-32 w-full'>
          <Image
            src={introImages.imageTwo.node.sourceUrl}
            alt='service pic 2'
            fill
            className='object-cover object-center block aspect-video'
          />
        </div>
      </div>

      <div className=''>
        <h3>Attributes</h3>

        <div className='grid grid-cols-1 items-start gap-1'>
          {prepAttr.map((attr: any, index: number) => {
            return (
              <div key={index} className='flex items-center gap-2'>
                <p>{`${attr.nazivAttributa ?? 'No name'}:`}</p>
                <p>{`${attr.vrijednostAtributa ?? 'No value'}`}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className=''>
        <h3>Gallery</h3>

        <div className='flex flex-wrap'>
          {gallery.map((nod, index) => {
            return nod && <Image width={300} height={200} src={nod.node.sourceUrl} alt='galleryImage' key={index} />;
          })}
        </div>
      </div>

      <div className=''>
        <div className='flex gap-2'>
          {tags.split(', ').map((tag: string, index: number) => (
            <span key={index}>{`#${tag}`}</span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PageContent;
