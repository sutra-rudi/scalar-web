export const maxDuration = 60;

import { lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getAllUslugeQuery } from '../queries/getAllUslugeQuery';

const ClientHeader = dynamic(() => import('../globalComponents/AppHeader'), { ssr: false });
const HeroSection = lazy(() => import('./HeroSection'));
const AboutUsSection = lazy(() => import('./AboutUsSection'));
const BannerSectionContact = lazy(() => import('./BannerSectionContact'));
const IzdvojeneReference = lazy(() => import('./IzdvojeneReference'));
const UslugeSection = lazy(() => import('./UslugeSection'));
const AppFooter = lazy(() => import('./../globalComponents/AppFooter'));

async function fetchData(query: any, noCache: boolean = false) {
  try {
    const response = await fetch(`${process.env.CMS_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      cache: noCache ? 'no-store' : 'default', // Add cache control
    });

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.statusText}`);
    }

    const data = await response.json(); // Directly parse JSON
    return data;
  } catch (error) {
    console.error('Fetch data error:', error);
    return null;
  }
}

export default async function Landing({ params: { lang } }: { params: { lang: string } }) {
  try {
    const queries = [getAllUslugeQuery(lang)];

    const results = await Promise.all([fetchData(queries[0])]);

    const [getAllUsluge] = results;

    const uslugeDataArrayShorthand = getAllUsluge?.data?.allUsluge?.edges || [];

    return (
      <Suspense>
        <ClientHeader />
        <main className='relative w-full dark:bg-almost-black min-h-screen'>
          <Suspense>
            <HeroSection lang={lang} />
          </Suspense>
          <Suspense>
            <AboutUsSection />
          </Suspense>
          {uslugeDataArrayShorthand.length > 0 && (
            <Suspense>
              <UslugeSection pageContent={uslugeDataArrayShorthand} lang={lang} />
            </Suspense>
          )}
          <Suspense>
            <BannerSectionContact lang={lang} />
          </Suspense>
          <Suspense>
            <IzdvojeneReference params={{ lang }} />
          </Suspense>
        </main>
        <AppFooter />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading page content:', error);
    return <h2>Error loading content. Please try again later. {JSON.stringify(`Error: ${error}`)}</h2>;
  }
}
