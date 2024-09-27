export const maxDuration = 60;

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getAllBlogsQuery } from '../queries/getAllBlogsQuery';
import { getAllBrojcaniciQuery } from '../queries/getAllBrojcaniciQuery';
import { getAllUslugeQuery } from '../queries/getAllUslugeQuery';
import { getAllLogotipiPartneraQuery } from '../queries/getAllLogotipiPartnera';
import { getAllCarouselBaseQuery } from '../queries/getAllCarouselBase';
import { getAllIskustvaKlijenataQuery } from '../queries/getAllIskustvaKlijenataQuery';
import { getWhyUsQuery } from '../queries/getAllWhyUsQuery';
import { getObavijestiNaStraniciQuery } from '../queries/getAllObavijestiQuery';
import { getDokumentikataloziQuery } from '../queries/getAllDocumentsQuery';
import { getCategoriesQuery } from '../queries/getAllBlogCategoriesQuery';
import { getTagsQuery } from '../queries/getAllTagsQuery';
import { getAdminCtaSelectionQuery } from '../queries/getAdminCtaSelectionQuery';

// const BlogSection = dynamic(() => import('./BlogSection'), { loading: () => <Loading /> });
// const BrojcaniciSection = dynamic(() => import('./BrojcaniciSection'), { loading: () => <Loading /> });
const UslugeSection = dynamic(() => import('./UslugeSection'));
// const PartnersSection = dynamic(() => import('./PartnersSection'), { loading: () => <Loading /> });
// const CarouselBase = dynamic(() => import('./CarouselBase'), { loading: () => <Loading /> });
// const TestimonialsSection = dynamic(() => import('./TestimonialsSection'), { loading: () => <Loading /> });
// const WhyUsSection = dynamic(() => import('./WhyUsSection'), { loading: () => <Loading /> });
// const DocumentsCatalogsSection = dynamic(() => import('./DocumentsCatalogsSection'), { loading: () => <Loading /> });
const HeroSection = dynamic(() => import('./HeroSection'));
const AboutUsSection = dynamic(() => import('./AboutUsSection'));
const BannerSectionContact = dynamic(() => import('./BannerSectionContact'));
const IzdvojeneReference = dynamic(() => import('./IzdvojeneReference'));

// const NewsTrack = dynamic(() => import('../components/NewsTrack'), { loading: () => <Loading /> });

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
    const queries = [
      getAllBlogsQuery(lang),
      getAllBrojcaniciQuery(lang),
      getAllUslugeQuery(lang),
      getAllLogotipiPartneraQuery(),
      getAllCarouselBaseQuery(),
      getAllIskustvaKlijenataQuery(lang),
      getWhyUsQuery(lang),
      getObavijestiNaStraniciQuery(lang),
      getDokumentikataloziQuery(lang),
      getCategoriesQuery(lang),
      getTagsQuery(lang),
      getAdminCtaSelectionQuery(),
    ];

    const results = await Promise.all([
      fetchData(queries[0]),
      fetchData(queries[1]),
      fetchData(queries[2]),
      fetchData(queries[3]),
      fetchData(queries[4]),
      fetchData(queries[5]),
      fetchData(queries[6]),
      fetchData(queries[7]),
      fetchData(queries[8]),
      fetchData(queries[9]),
      fetchData(queries[10]),
      fetchData(queries[11]),
    ]);

    const [
      getAllBlogs,
      getAllBrojcanici,
      getAllUsluge,
      getAllPartnersLogos,
      getAllCarouselBase,
      getAllIskustvaKlijenata,
      getAllWhyUs,
      getAllObavijesti,
      getAllDocuments,
      getAllCategories,
      getAllTags,
      getAllAdminCtaSelection,
    ] = results;

    // const blogDataArrayShorthand = getAllBlogs?.data?.allBlog?.edges || [];
    // const brojcaniciDataArrayShorthand = getAllBrojcanici?.data?.allBrojcanici?.edges || [];
    const uslugeDataArrayShorthand = getAllUsluge?.data?.allUsluge?.edges || [];
    // const logotipiPartneraDataArrayShorthand = getAllPartnersLogos?.data?.logotipiPartneraKlijenata?.edges || [];
    // const baseCarouselDataShorthand = getAllCarouselBase?.data?.karuselNaslovnica?.edges[0]?.node || null;
    // const iskustvaKlijenataShorthand = getAllIskustvaKlijenata?.data?.allIskustvaKlijenata?.edges || [];
    // const whyUsDataShorthand = getAllWhyUs?.data?.allWhyus?.edges || [];
    // const obavijestiNaStraniciDataShorthand = getAllObavijesti?.data?.allObavijestiNaStranici?.edges || [];
    // const dokumentiKataloziDataShorthand = getAllDocuments?.data?.dokumentikatalozi?.edges || [];
    // const kategorijeDataShorthand = getAllCategories?.data?.categories?.edges || [];
    // const tagsDataShorthand = getAllTags?.data?.tags?.edges || [];
    // const adminCtaSelection = getAllAdminCtaSelection?.data?.adminSetupArea.edges[0]?.node || null;

    return (
      <Suspense>
        <main className='relative w-full dark:bg-almost-black '>
          <HeroSection lang={lang} />

          {/* {blogDataArrayShorthand.length > 0 && (
            <BlogSection
              pageContent={blogDataArrayShorthand}
              lang={lang}
              categoriesList={kategorijeDataShorthand}
              tagsList={tagsDataShorthand}
              blogCtaKey={adminCtaSelection ? adminCtaSelection.adminGlobalniSelektorCta.blogSekcijaCta[0] : ''}
              blogTableKey={process.env.BLOG_AIRTABLE_CTA_ID!}
            />
          )} */}

          {/* {brojcaniciDataArrayShorthand.length > 0 && (
            <BrojcaniciSection pageContent={brojcaniciDataArrayShorthand} lang={lang} />
          )} */}

          <AboutUsSection />

          {uslugeDataArrayShorthand.length > 0 && <UslugeSection pageContent={uslugeDataArrayShorthand} lang={lang} />}
          {/* {logotipiPartneraDataArrayShorthand.length > 0 && (
            <PartnersSection pageContent={logotipiPartneraDataArrayShorthand} />
          )} */}
          {/* {baseCarouselDataShorthand && <CarouselBase imageArray={baseCarouselDataShorthand} />} */}
          <BannerSectionContact lang={lang} />
          <IzdvojeneReference params={{ lang }} />
          {/* {iskustvaKlijenataShorthand.length > 0 && (
            <TestimonialsSection pageContent={iskustvaKlijenataShorthand} lang={lang} />
          )} */}
          {/* {whyUsDataShorthand.length > 0 && <WhyUsSection pageContent={whyUsDataShorthand} lang={lang} />} */}
          {/* {dokumentiKataloziDataShorthand.length > 0 && (
            <DocumentsCatalogsSection pageContent={dokumentiKataloziDataShorthand} lang={lang} />
          )} */}
          {/* {obavijestiNaStraniciDataShorthand.length > 0 && (
            <NewsTrack pageContent={obavijestiNaStraniciDataShorthand} lang={lang} />
          )} */}
        </main>
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading page content:', error);
    return <h2>Error loading content. Please try again later. {JSON.stringify(`Error: ${error}`)}</h2>;
  }
}
