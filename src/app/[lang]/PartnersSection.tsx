import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

interface PartnersSectionInterface {
  pageContent: any;
}

const PartnersSection = ({ pageContent }: PartnersSectionInterface) => {
  const duplicatedContent = [...pageContent, ...pageContent];

  return (
    <section>
      <div className='max-w-[1225px] mx-auto my-8'>
        <Marquee direction='left'>
          {duplicatedContent.map((cont: any, index) => {
            const imageSourcesShorthand = cont.node.logotipiPartnera.logoPNG.node;
            return (
              cont.node.logotipiPartnera.prikaziNaNaslovnici && (
                <Link
                  key={`${cont.node.id}+${index}`}
                  className='block mx-4 flex-shrink-0'
                  href={cont.node.logotipiPartnera.linkNaStranicuKlijentapartnera}
                >
                  <Image
                    src={imageSourcesShorthand.sourceUrl}
                    alt='partner logo'
                    width={96}
                    height={96}
                    sizes={imageSourcesShorthand.sizes}
                    className='object-contain object-center block'
                  />
                </Link>
              )
            );
          })}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersSection;
