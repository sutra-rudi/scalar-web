import slugify from 'slugify';
import { getSuffixFromLang } from '../langUtils/getSuffixFromLang';
import { getListeQuery } from '../queries/getAllListsQuery';
import Image from 'next/image';

export default async function IzdvojeneReference({ params: { lang } }: { params: { lang: string } }) {
  const baseURL = process.env.CMS_PUBLIC_MEDIA_URL;

  const getAllListe = await fetch(`${process.env.CMS_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getListeQuery(lang),
    }),
    // cache: 'no-cache',
  });

  const parseListeData = await getAllListe.json();

  const prepData = parseListeData.data.liste.edges;

  const l = getSuffixFromLang(lang);

  const basePath = `${baseURL}icons-list/`;

  return (
    <section className='my-12'>
      <h2 className='w-full text-center lg:text-[2rem] md:text-3xl text-2xl text-primary-dark dark:text-primary-light  py-8 font-medium'>
        Izdvojene reference
      </h2>

      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 max-w-screen-2xl mx-auto pb-8 px-4 gap-4'>
        {prepData &&
          prepData.map((nodeCont: any) => {
            const contentFieldMaster = `lista${l}`;
            const contentField = nodeCont.node[contentFieldMaster][`listaSadrzaj${l}`];
            const listaContent = contentField.split('\r\n');

            const triageOfIcons = nodeCont.node.ikona.odabirIkoneKojaSePrikazujeNaListi[0];

            const introField = nodeCont.node[contentFieldMaster][`listaUvod${l}`];
            return (
              <div key={nodeCont.node.title}>
                {introField.naslov && (
                  <div className='py-4'>
                    <h3 className='lg:text-xl md:text-lg text-base font-medium text-primary-dark dark:text-primary-light '>
                      {introField.naslov}
                    </h3>
                  </div>
                )}
                {/* {introField.nadnaslovpodnaslovOpcionalno && (
                  <div className='pt-1'>
                    <h5 className='text-lg font-medium  dark:text-primary-light'>
                      {introField.nadnaslovpodnaslovOpcionalno}
                    </h5>
                  </div>
                )}

                {introField.uvodnaRecenica && (
                  <div className='pt-1'>
                    <p className='text-base font-medium  dark:text-primary-light'>{introField.uvodnaRecenica}</p>
                  </div>
                )} */}
                {triageOfIcons !== 'Brojevi' ? (
                  <ul className='flex items-start flex-col md:gap-2 gap-3 appearance-none text-balance md:text-base text-sm text-primary-dark dark:text-primary-light '>
                    {listaContent.map((list: any, index: number) => {
                      const imgShorthand = nodeCont.node.ikona.svgListIcon
                        ? nodeCont.node.ikona.svgListIcon.node.sourceUrl
                        : null;

                      const cmsImgPath = nodeCont.node.ikona.odabirIkoneKojaSePrikazujeNaListi[0];
                      const cmsClrPath = nodeCont.node.ikona.odabirBojeZaDefaultIkone[0];
                      const slugCrl = slugify(cmsClrPath, { lower: true });

                      const checkIfNumber = cmsImgPath.split('-')[0];

                      const fullURL = `${basePath}${cmsImgPath}-${slugCrl}.svg`;

                      return (
                        <li key={index} className='w-full flex items-center justify-start gap-3'>
                          {triageOfIcons === 'Dodaj svoju ikonu' && imgShorthand ? (
                            <Image
                              src={imgShorthand}
                              alt='image for list item'
                              className='w-6 h-6 object-cover object-center shrink-0'
                              loading='lazy'
                              width={24}
                              height={24}
                            />
                          ) : checkIfNumber === 'Broj' ? (
                            <div className='relative'>
                              <span className='absolute left-1/2 -translate-x-1/2 text-primary-dark dark:text-primary-light '>
                                {index + 1}
                              </span>

                              <Image
                                src={fullURL}
                                className='w-6 h-6 object-cover object-center shrink-0'
                                alt='image for list item'
                                loading='lazy'
                                width={24}
                                height={24}
                              />
                            </div>
                          ) : (
                            <Image
                              src={fullURL}
                              alt='image for list item'
                              className='w-6 h-6 object-cover object-center shrink-0'
                              loading='lazy'
                              width={24}
                              height={24}
                            />
                          )}
                          <span className='font-normal md:text-base text-sm text-primary-dark dark:text-primary-light '>
                            {list}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <ol className='appearance-none flex items-start flex-col md:gap-2 gap-3'>
                    {listaContent.map((list: any, index: number) => {
                      const clr = nodeCont.node.ikona.odabirBojeZaDefaultIkone[0];

                      const clrPathDict = () => {
                        if (clr === 'Akcentna') {
                          return 'accent';
                        }
                        if (clr === 'Primarna tamna') {
                          return 'primary-dark';
                        }
                        if (clr === 'Primarna svijetla') {
                          return 'primary-light';
                        }
                      };

                      return (
                        <li
                          key={index}
                          className='flex items-center justify-start gap-3 text-primary-dark dark:text-primary-light '
                        >
                          <span
                            className={`bg-${clrPathDict()} rounded-full w-6 h-6  flex items-center justify-center ${
                              clrPathDict() === 'primary-dark' && 'text-primary-dark dark:text-primary-light '
                            }`}
                          >
                            {index + 1}
                          </span>
                          {list}
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}
