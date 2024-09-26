import slugify from 'slugify';
import { getSuffixFromLang } from '../langUtils/getSuffixFromLang';
import { getListeQuery } from '../queries/getAllListsQuery';

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
      <h2 className='w-full text-center text-3xl text-primary-dark py-8'>Izdvojene reference</h2>

      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 max-w-screen-2xl mx-auto pb-8'>
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
                    <h3 className='text-xl font-medium text-balance  dark:text-primary-light'>{introField.naslov}</h3>
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
                  <ul className='flex items-start flex-col gap-2 appearance-none text-balance'>
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
                            <picture>
                              <img
                                src={imgShorthand}
                                alt='image for list item'
                                className='w-6 h-6 object-cover object-center'
                              />
                            </picture>
                          ) : checkIfNumber === 'Broj' ? (
                            <div className='relative'>
                              <span className='absolute left-1/2 -translate-x-1/2 text-primary-dark dark:text-primary-light z-20'>
                                {index + 1}
                              </span>
                              <picture>
                                <img src={fullURL} className='w-6 h-6 object-cover object-center' alt='' />
                              </picture>
                            </div>
                          ) : (
                            <picture>
                              <img
                                src={fullURL}
                                alt='image for list item'
                                className='w-6 h-6 object-cover object-center'
                              />
                            </picture>
                          )}
                          <span className='text-base font-normal dark:text-primary-light'>{list}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <ol className='appearance-none flex items-start flex-col gap-2'>
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
                        <li key={index} className='flex items-center justify-start gap-3 dark:text-primary-light'>
                          <span
                            className={`bg-${clrPathDict()} rounded-full w-6 h-6  flex items-center justify-center ${
                              clrPathDict() === 'primary-dark' && 'text-primary-light dark:text-primary-dark'
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
