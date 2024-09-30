'use client';

import { getSuffixFromLang } from '../langUtils/getSuffixFromLang';
import slugify from 'slugify';
import { slugifyOptions } from '../pathsUtils/slugifyOptions';
import ServiceCard from '../components/ServiceCard';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import React, { useState } from 'react';

interface UslugeSectionInterface {
  pageContent: any;
  lang: any;
  isOnSub?: boolean;
}

function generateServicesSchemaOrg(pageContent: any, lang: string) {
  const l = getSuffixFromLang(lang);

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
        '@type': 'Organization',
        name: 'Your Organization Name',
        logo: thumbImageShorthandObj.sourceUrl ?? '',
      },
      url: `/${lang}/services-offers/${
        slugify(`${titleShorthandObj.naslovBazaTekstova ?? ''}`, slugifyOptions) + `-${contentShorthand.id}`
      }`,
      image: thumbImageShorthandObj.sourceUrl ?? '',
    };
  });

  const schemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Our Services',
    description: 'A catalog of the services we offer.',
    itemListElement: services,
  };

  return JSON.stringify(schemaOrgData, null, 2);
}

const introTextContent = [
  `Kompletna usluga vođenja, organizacije i provedbe investicijskih projekata s uključenim inženjersko – konzultantskim uslugama prilagođenih karakteristikama projekta i potrebama investitora.`,
  `Usluga stručnog nadzora nad izvedbom građevinskih, elektroinstalaterskih, strojarskih i ostalih radova u tijeku izgradnje temeljem ugovornih uvjeta, zakonskih i tehničkih propisa te uzanci struke - uz aktivno prisustvo na gradilištu.`,
  `Sve razine i tipovi tehničkog savjetovanja sukladno potrebama naručitelja i/ili projekta. Savjetovanje u svim fazama projekta – od faze formiranja koncepta pa sve do završetka projekta uključujući fazu korištenja objekata.`,
  `Usluge različitih segmenata u projektiranju (troškovnici, idejna rješenja, proračuni, analize, razrade detalja i sl.) kao i usluga izrade cjelokupne projektne dokumentacije za potrebe ishođenja dozvola i izvedbu objekata.`,
];

const UslugeSection = ({ pageContent, lang, isOnSub }: UslugeSectionInterface) => {
  const schemaOrgData = generateServicesSchemaOrg(pageContent, lang);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [sectionRef, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  });

  // Trigger animation only once when the section comes into view
  if (entry?.isIntersecting && !hasAnimated) {
    setHasAnimated(true);
  }

  return (
    <section className='my-12' ref={sectionRef}>
      <div
        className={`max-w-screen-2xl 2xl:px-24 xl:px-20 lg:px-16 md:px-12 px-4 mx-auto my-8 flex flex-wrap items-start lg:gap-8 md:gap-4 gap-2 ${
          isOnSub ? 'justify-center' : ' justify-between '
        }`}
      >
        {pageContent.map((content: any, index: number) => {
          const contentShorthand = content.node;
          const thumbImageShorthandObj = contentShorthand.modulBazeTekstovaUvod.slika1.node;

          const titleShorthandObj =
            contentShorthand[`modulBazeTekstova2Kolumne${getSuffixFromLang(lang)}`]?.[
              `naslovNadnaslov2KolumneTeksta${getSuffixFromLang(lang)}`
            ].naslovIPodnaslovDvaPolja;

          return (
            <motion.div
              key={contentShorthand.id}
              initial={{ opacity: 0, y: -100 }} // Start from above
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}} // Animate only if hasAnimated is true
              transition={{ duration: 0.5, delay: index * 0.1 }} // Delay based on index for staggered effect
            >
              <ServiceCard
                url={`/${lang}/services-offers/${
                  slugify(`${titleShorthandObj.naslovBazaTekstova ?? ''}`, slugifyOptions) + `-${contentShorthand.id}`
                }`}
                title={titleShorthandObj.naslovBazaTekstova}
                subtitle={titleShorthandObj.nadnaslovPodnaslovBazaTekstova}
                imgSource={thumbImageShorthandObj.sourceUrl}
                intro={introTextContent[index]}
              />
            </motion.div>
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
