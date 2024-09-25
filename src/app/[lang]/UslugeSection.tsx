import React from 'react';
import { getSuffixFromLang } from '../langUtils/getSuffixFromLang';
import slugify from 'slugify';
import { slugifyOptions } from '../pathsUtils/slugifyOptions';
import ServiceCard from '../components/ServiceCard';
import Script from 'next/script';
interface UslugeSectionInterface {
  pageContent: any;
  lang: any;
}

function generateServicesSchemaOrg(pageContent: any, lang: string) {
  const l = getSuffixFromLang(lang);

  // Generiraj listu usluga
  const services = pageContent.map((content: any) => {
    const contentShorthand = content.node;

    const titleShorthandObj =
      contentShorthand[`modulBazeTekstova2Kolumne${l}`]?.[`naslovNadnaslov2KolumneTeksta${l}`].naslovIPodnaslovDvaPolja;

    const thumbImageShorthandObj = contentShorthand.modulBazeTekstovaUvod.slika1.node;

    return {
      '@type': 'Service',
      serviceType: titleShorthandObj.naslovBazaTekstova ?? 'Unknown Service',
      description: titleShorthandObj.nadnaslovPodnaslovBazaTekstova ?? 'No description available',
      provider: {
        '@type': 'Organization', // Možeš promijeniti u odgovarajući tip ako je potrebno
        name: 'Your Organization Name', // Zamijeni sa stvarnim imenom organizacije
        logo: thumbImageShorthandObj.sourceUrl ?? '', // Zamijeni ako imaš URL za logo
      },
      url: `/${lang}/services-offers/${
        slugify(`${titleShorthandObj.naslovBazaTekstova ?? ''}`, slugifyOptions) + `-${contentShorthand.id}`
      }`,
      image: thumbImageShorthandObj.sourceUrl ?? '',
    };
  });

  // Vraćamo cijeli schema.org objekt
  const schemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Our Services',
    description: 'A catalog of the services we offer.',
    itemListElement: services, // Promijenjeno na itemListElement
  };

  return JSON.stringify(schemaOrgData, null, 2); // Dodano formatiranje za preglednost
}

const UslugeSection = ({ pageContent, lang }: UslugeSectionInterface) => {
  const schemaOrgData = generateServicesSchemaOrg(pageContent, lang);

  return (
    <section className=''>
      <div className='max-w-screen-2xl mx-auto my-8 flex flex-wrap items-start justify-center lg:gap-16 md:gap-12 gap-6'>
        {pageContent.map((content: any) => {
          const contentShorthand = content.node;

          const thumbImageShorthandObj = contentShorthand.modulBazeTekstovaUvod.slika1.node;

          const titleShorthandObj =
            contentShorthand[`modulBazeTekstova2Kolumne${getSuffixFromLang(lang)}`]?.[
              `naslovNadnaslov2KolumneTeksta${getSuffixFromLang(lang)}`
            ].naslovIPodnaslovDvaPolja;

          return (
            <ServiceCard
              url={`/${lang}/services-offers/${
                slugify(`${titleShorthandObj.naslovBazaTekstova ?? ''}`, slugifyOptions) + `-${contentShorthand.id}`
              }`}
              title={titleShorthandObj.naslovBazaTekstova}
              subtitle={titleShorthandObj.nadnaslovPodnaslovBazaTekstova}
              imgSource={thumbImageShorthandObj.sourceUrl}
              key={contentShorthand.id}
            />
          );
        })}
      </div>

      <Script
        id='schema-org-services'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: schemaOrgData,
        }}
      />
    </section>
  );
};

export default UslugeSection;
