import { getSezonskoRadnoVrijemeQuery } from '@/app/queries/getAllSezonskoRadnoVrijemeQuery';
import { getAllRadnoVrijemeQuery } from '@/app/queries/getDefaultRadnoVrijeme';
import { getTjedniRasporedQuery } from '@/app/queries/getAllTjedniRasporedQuery';
import dayjs from 'dayjs';
import Script from 'next/script';
import { getWorkingHoursSchemaQuery } from '@/app/queries/getWorkingHoursSchema';
import dynamic from 'next/dynamic';
const LazyContent = dynamic(() => import('./PageContent'));
function generateSchemaOrg(
  aktivatorDatuma: any,
  sezonskoRadno: any,
  defaultRadno: any,
  dodatnaNapomenaDefault: string,
  dodatnaNapomenaSezonsko: string
) {
  // Funkcija za generiranje radnog vremena za svaki dan
  const generateDailyHours = (raspored: any) => {
    return Object.keys(raspored).map((day) => {
      const dayData = raspored[day];
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1), // Prvi znak velikim slovom
        opens: dayData.opens,
        closes: dayData.closes,
      };
    });
  };

  // Provjera sezonskog radnog vremena
  const isSeasonal = aktivatorDatuma?.vrijediOdSezonskoRadnoVrijeme && aktivatorDatuma?.vrijediDoSezonskoRadnoVrijeme;

  // Generiranje radnog vremena (default i sezonsko)
  const defaultHours = generateDailyHours(defaultRadno);
  const seasonalHours = isSeasonal ? generateDailyHours(sezonskoRadno) : [];

  // Generiranje datuma za sezonsko radno vrijeme
  const seasonalValidFrom = isSeasonal
    ? dayjs(aktivatorDatuma.vrijediOdSezonskoRadnoVrijeme).format('DD.MM.YYYY')
    : null;
  const seasonalValidTo = isSeasonal ? dayjs(aktivatorDatuma.vrijediDoSezonskoRadnoVrijeme).format('DD.MM.YYYY') : null;

  // Generiranje schema.org objekta
  const schemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sutra Mastodont',
    openingHoursSpecification: [
      ...defaultHours,
      ...(isSeasonal
        ? seasonalHours.map((hours) => ({
            ...hours,
            validFrom: seasonalValidFrom,
            validThrough: seasonalValidTo,
          }))
        : []),
    ],
    description: isSeasonal ? dodatnaNapomenaSezonsko : dodatnaNapomenaDefault,
    // Dodatni kontakt podaci
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+385 1 2345 678',
      contactType: 'Customer Service',
      areaServed: 'HR',
      availableLanguage: ['hr', 'en'],
    },
    // Lokacija poslovnice
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ulica Nešto 123',
      addressLocality: 'Zagreb',
      postalCode: '10000',
      addressCountry: 'HR',
    },
    url: 'https://scalar-web.vercel.app',
    sameAs: ['https://www.facebook.com/sutramastodont', 'https://www.instagram.com/sutramastodont'],
  };

  return JSON.stringify(schemaOrgData, null, 2);
}

export default async function RadnaVremena({
  params: { lang },
  searchParams: { tag },
}: {
  params: { lang: string };
  searchParams: { tag: string };
}) {
  const getAllSeasonalVremena = await fetch(`${process.env.CMS_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getSezonskoRadnoVrijemeQuery(lang),
    }),
  });

  const parseData = await getAllSeasonalVremena.json();

  const dataShorthandSezonsko = parseData.data.allSezonskoRadnoVrijeme.edges[0].node;

  const getDefaultRadnaVremena = await fetch(`${process.env.CMS_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getAllRadnoVrijemeQuery(lang),
    }),
  });

  const parseDefaultData = await getDefaultRadnaVremena.json();

  const defaultShorthand = parseDefaultData.data.allRadnoVrijeme.edges[0].node;

  const getTjedniRaspored = await fetch(`${process.env.CMS_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getTjedniRasporedQuery(lang),
    }),
  });

  const parseTjedniRasporedData = await getTjedniRaspored.json();
  const dataShorthandTjedni = parseTjedniRasporedData.data.allTjedniRaspored.edges[0].node;

  const getWorkingHoursSchema = await fetch(`${process.env.CMS_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getWorkingHoursSchemaQuery(),
    }),
  });

  const parseSchema = await getWorkingHoursSchema.json();

  const schemaShorthand = parseSchema.data.allRadnaVremenaTraziliceSeo.edges[0].node;

  const schemaOrgData = generateSchemaOrg(
    schemaShorthand.sezonskoRadnoVrijemeAktivatorDatuma,
    schemaShorthand.tjedniRasporedSezonskoRadnoVrijemeGoogleSeo.tjedniRasporedGoogleSeoSezonskoRadnoVrijeme,
    schemaShorthand.tjedniRasporedRadnoVrijemeGoogleSeo.tjedniRasporedGoogleSeo,
    schemaShorthand.tjedniRasporedRadnoVrijemeGoogleSeo.dodatnaNapomenaTjedniRasporedHr,
    schemaShorthand.tjedniRasporedSezonskoRadnoVrijemeGoogleSeo
      .noteDodatnaNapomenaTjedniRasporedSezonskoRadnoVrijemeGoogleSeo
  );

  return (
    <main className='w-full min-h-screen pb-12 dark:bg-primary-dark'>
      {dataShorthandSezonsko && (
        <LazyContent
          defaultRadno={defaultShorthand}
          lang={lang}
          pageContent={dataShorthandSezonsko}
          tjedniRaspored={dataShorthandTjedni}
        />
      )}
      {schemaShorthand && (
        <Script
          id='opening-hours-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: schemaOrgData,
          }}
        />
      )}
    </main>
  );
}
