export const maxDuration = 60;
import { Suspense } from 'react';
import { getAllUslugeQuery } from '../queries/getAllUslugeQuery';
import dynamic from 'next/dynamic';
import Loading from '../loading';

const HeroSection = dynamic(() => import('./HeroSection'));
const BannerSectionContact = dynamic(() => import('./BannerSectionContact'));
const IzdvojeneReference = dynamic(() => import('./IzdvojeneReference'));
const UslugeSection = dynamic(() => import('./UslugeSection'));
const AboutUsSection = dynamic(() => import('./AboutUsSection'));

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
    // const queries = [getAllUslugeQuery(lang)];

    // const results = await Promise.all([fetchData(queries[0])]);

    // const [getAllUsluge] = results;

    const getAllUsluge = await fetchData(getAllUslugeQuery(lang));

    const uslugeDataArrayShorthand = getAllUsluge?.data?.allUsluge?.edges || [];

    return (
      <main className='relative w-full bg-almost-white dark:bg-almost-black min-h-screen'>
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error('Error loading page content:', error);
    return <h2>Error loading content. Please try again later. {JSON.stringify(`Error: ${error}`)}</h2>;
  }
}
