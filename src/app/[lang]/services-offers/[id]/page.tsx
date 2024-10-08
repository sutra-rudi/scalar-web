import { getSingleServicesOfferQuery } from '@/app/queries/getSingleUslugeQuery';
import { getSuffixFromLang } from '@/app/langUtils/getSuffixFromLang';
import Script from 'next/script';
import { getAllUslugeQuery } from '@/app/queries/getAllUslugeQuery';
import UslugeSection from '../../UslugeSection';
import ScalarContact from '@/app/components/ScalarContact';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const PageContent = dynamic(() => import('./PageContent'));

import { Metadata } from 'next';
import { htmlToText } from 'html-to-text';

function formatMetaDescription(description: string, maxLength: number = 160): string {
  const plainText = htmlToText(description, {
    wordwrap: 130,
  }).trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
}

export async function generateMetadata({
  params: { lang, id },
}: {
  params: { lang: string; id: string };
}): Promise<Metadata> {
  const getIdFromSlug = (slug: string): string => {
    const parts = slug.split('-');
    return parts.pop() || '';
  };

  const slugId = getIdFromSlug(id);

  const getSingleService = await fetch(`${process.env.CMS_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getSingleServicesOfferQuery(slugId, lang),
    }),
  });

  const parseData = await getSingleService.json();
  const prepareDataForClient = parseData.data.usluge;

  const l = getSuffixFromLang(lang);

  const prepareIntroText =
    prepareDataForClient[`modulBazeTekstova2Kolumne${l}`]?.[`naslovNadnaslov2KolumneTeksta${l}`]
      .naslovIPodnaslovDvaPolja;

  const contentForPage =
    prepareDataForClient[`modulBazeTekstova2Kolumne${l}`]?.[`naslovNadnaslov2KolumneTeksta${l}`].kolumneTeksta2
      .tekstBazaTekstova;

  const imageUrl = prepareDataForClient.modulBazeTekstovaUvod.slika1.node.sourceUrl ?? '';

  return {
    title: prepareIntroText.naslovBazaTekstova ?? 'Nema naslova',
    description: formatMetaDescription(contentForPage),
    openGraph: {
      title: prepareIntroText.naslovBazaTekstova ?? 'Nema naslova',
      description: formatMetaDescription(contentForPage),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Slika usluge',
        },
      ],
      siteName: 'Scalar',
      locale: 'hr_HR',
    },
    twitter: {
      card: 'summary_large_image',
      title: prepareIntroText.naslovBazaTekstova ?? 'Nema naslova',
      description: formatMetaDescription(contentForPage),
      images: [
        {
          url: imageUrl,
          alt: 'Slika usluge',
        },
      ],
    },
    keywords: 'investicije, građevina, projektiranje, partner, Scalar',
  };
}

function generateServiceSchemaOrg(serviceData: any, lang: string) {
  const l = getSuffixFromLang(lang);

  const name =
    serviceData[`modulBazeTekstova2Kolumne${l}`]?.[`naslovNadnaslov2KolumneTeksta${l}`]?.naslovIPodnaslovDvaPolja
      ?.title ?? 'Nema naziva';
  const description =
    serviceData[`modulBazeTekstova2Kolumne${l}`]?.[`naslovNadnaslov2KolumneTeksta${l}`]?.naslovIPodnaslovDvaPolja
      ?.description ?? 'Nema opisa';
  const imageUrl = serviceData.modulBazeTekstovaUvod.slika1.node.sourceUrl ?? '';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    image: imageUrl, // Ako koristite samo URL, ovo je ispravno
    additionalType: 'https://schema.org/Service',
    serviceType: serviceData[`tags${l}`]?.[`tagText${l}`] ?? 'Nema vrste usluge',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'HRK',
      price: '0.00',
    },
  };
}

export default async function SingleServiceOfferPage({
  params: { lang, id },
}: {
  params: { lang: string; id: string };
}) {
  const getIdFromSlug = (slug: string): string => {
    const parts = slug.split('-');
    return parts.pop() || '';
  };

  const slugId = getIdFromSlug(id);

  const getSingleService = await fetch(`${process.env.CMS_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getSingleServicesOfferQuery(slugId, lang),
    }),
    // cache: 'no-cache',
  });

  const parseData = await getSingleService.json();

  const prepareDataForClient = parseData.data.usluge;

  const prepareIntroText =
    prepareDataForClient[`modulBazeTekstova2Kolumne${getSuffixFromLang(lang)}`]?.[
      `naslovNadnaslov2KolumneTeksta${getSuffixFromLang(lang)}`
    ].naslovIPodnaslovDvaPolja;

  const contentForPage =
    prepareDataForClient[`modulBazeTekstova2Kolumne${getSuffixFromLang(lang)}`]?.[
      `naslovNadnaslov2KolumneTeksta${getSuffixFromLang(lang)}`
    ].kolumneTeksta2.tekstBazaTekstova;

  const prepareIntroImages = {
    imageOne: prepareDataForClient.modulBazeTekstovaUvod.slika1,
    imageTwo: prepareDataForClient.modulBazeTekstovaUvod.slika2,
  };

  const prepareGallery = Object.values(prepareDataForClient.photoGallery.fotogalerija);

  const prepareTags = prepareDataForClient[`tags${getSuffixFromLang(lang)}`]?.[`tagText${getSuffixFromLang(lang)}`];

  const prepareAttributes =
    prepareDataForClient[`skupinaAtributa${getSuffixFromLang(lang)}`]?.[`atributiSkupina${getSuffixFromLang(lang)}`];

  const schemaOrgData = generateServiceSchemaOrg(prepareDataForClient, lang);

  const getAllServices = await fetch(`${process.env.CMS_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getAllUslugeQuery(lang),
    }),
    // cache: 'no-cache',
  });

  const getAllUsluge = await getAllServices.json();

  const uslugeDataArrayShorthand =
    getAllUsluge?.data?.allUsluge?.edges.filter((usluga: any) => usluga.node.id !== getIdFromSlug(id)) || [];

  return (
    <main className='w-full relative '>
      <Suspense>
        <PageContent
          textContent={prepareIntroText}
          introImages={prepareIntroImages}
          gallery={prepareGallery}
          tags={prepareTags}
          attributes={prepareAttributes}
          pageContent={contentForPage}
        />
      </Suspense>
      <Suspense>
        <UslugeSection pageContent={uslugeDataArrayShorthand} lang={lang} isOnSub={true} />
      </Suspense>
      <Suspense>
        <ScalarContact isPage={false} />
      </Suspense>
      <Script
        id='schema-org-single-service'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
      />
    </main>
  );
}
