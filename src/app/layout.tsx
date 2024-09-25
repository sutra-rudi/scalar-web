import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.scss';

import { cookies } from 'next/headers';
import { UserLanguage } from './enums/LangEnum';
import AppFooter from './globalComponents/AppFooter';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import Loading from './loading';
import { Providers } from './providers';
import { appleTouchIcons, favicons, videoResources } from './pathsUtils/mediaImportsDynamic';
import { getAdminTokensQuery } from './queries/getAdminTokens';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

import Script from 'next/script';
import CookieConsentNotification from './components/CookiesNotification';
import { getAdminTekstoviManjihKomponentiQuery } from './queries/getAdminTekstoviManjihKomponenti';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' });

import { getBasicSchemaOrgProjectQuery } from './queries/getBasicSchemaOrgProjectQuery';
import dynamic from 'next/dynamic';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Scalar',
  description: 'Vaš partner u investicijama u građevini',

  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '196x196',
      url: favicons['196x196'],
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: favicons['96x96'],
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: favicons['32x32'],
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: favicons['16x16'],
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '128x128',
      url: favicons['128x128'],
    },
    // Apple Touch Icons
    {
      rel: 'apple-touch-icon',
      sizes: '57x57',
      url: appleTouchIcons['57x57'],
    },
    {
      rel: 'apple-touch-icon',
      sizes: '114x114',
      url: appleTouchIcons['114x114'],
    },
    {
      rel: 'apple-touch-icon',
      sizes: '72x72',
      url: appleTouchIcons['72x72'],
    },
    {
      rel: 'apple-touch-icon',
      sizes: '144x144',
      url: appleTouchIcons['144x144'],
    },
    {
      rel: 'apple-touch-icon',
      sizes: '60x60',
      url: appleTouchIcons['60x60'],
    },
    {
      rel: 'apple-touch-icon',
      sizes: '120x120',
      url: appleTouchIcons['120x120'],
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      url: appleTouchIcons['76x76'],
    },
    {
      rel: 'apple-touch-icon',
      sizes: '152x152',
      url: appleTouchIcons['152x152'],
    },
  ],
};

function generateSeoSchemaOrg(data: any) {
  const companyInfo = data?.data?.seoSchemaOrg?.edges[0]?.node?.osnovneInformacijeOWebstraniciNapredniSeo;
  const contactInfo = companyInfo?.kontaktInformacijeContactPoint;
  const offerings = companyInfo?.offerings;
  const companyDetails = companyInfo?.opceniteInformacijeOTvrtkiCompanyInformation;

  if (!companyInfo || !contactInfo || !companyDetails) {
    throw new Error('Nedostaju podaci za generiranje schema.org.');
  }

  // Generiraj schema.org objekt
  const schemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyDetails.nazivTvrtke,
    legalName: companyDetails.legalName,
    description: companyDetails.opisTvrtke,
    foundingDate: companyDetails.datumOsnivanja,
    awards: companyDetails.nagradePriznanja,
    taxID: contactInfo.porezniBroj,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactInfo.adresa,
      addressLocality: 'Zagreb',
      postalCode: '10000',
      addressCountry: 'HR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactInfo.telefon,
      faxNumber: contactInfo.fax,
      email: contactInfo.email,
      contactType: 'Customer Service',
      availableLanguage: contactInfo.jeziciNaKojimaJeDostupnaUsluga.split(', ').map((lang: string) => lang.trim()),
    },
    url: contactInfo.urlWebStranice,
    sameAs: contactInfo.druptveneMrezeLinkoviNaProfil,
    makesOffer: {
      '@type': 'Offer',
      description: offerings.akcije,
      availability: offerings.dostupnost,
      priceCurrency: 'USD', // pretpostavka, može se prilagoditi
      price: parseFloat(offerings.cjenovniRaspon.replace(/[^0-9.]/g, '')).toFixed(2), // Uklanjanje valute i formatiranje cijene
      itemOffered: {
        '@type': 'Product',
        name: offerings.product,
        description: `Features: ${offerings.amenityFeature}`,
        image: videoResources.amenities.placeholder,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD', // Pretpostavka, može se prilagoditi
          price: offerings.cjenovniRaspon,
          itemCondition: 'https://schema.org/NewCondition', // Pretpostavka, može se prilagoditi
          availability: 'https://schema.org/InStock', // Pretpostavka, može se prilagoditi
        },
      },
    },
    brand: companyDetails.brendovi.split(', ').map((brand: string) => ({ '@type': 'Brand', name: brand })),
    areaServed: companyDetails.podrucjaEkspertize,
    logo: 'https://www.example.com/logo.png', // Može se dodati logo ako postoji
    additionalType: companyDetails.licenca,
  };

  return JSON.stringify(schemaOrgData, null, 2);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function fetchAdminTokens() {
    try {
      const response = await fetch(`${process.env.CMS_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getAdminTokensQuery(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Fetch error: ${response.statusText}`);
      }

      const data = await response.json();
      const adminTokenDataShorthand = data?.data?.kodoviApitokenStylebox?.edges[0]?.node;

      return adminTokenDataShorthand;
    } catch (error: any) {
      console.error('Fetch error:', error.message);
      throw error;
    }
  }

  // const adminTokenDataShorthand = await fetchAdminTokens();

  async function fetchAdminTekstoviManjihKomponenti() {
    try {
      const response = await fetch(`${process.env.CMS_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getAdminTekstoviManjihKomponentiQuery(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Fetch error: ${response.statusText}`);
      }

      const data = await response.json();
      const adminTekstoviShorthand = data?.data?.allAdminTekstoviManjihKomponenti?.edges[0]?.node;

      return adminTekstoviShorthand;
    } catch (error: any) {
      console.error('Fetch error:', error.message);
      throw error;
    }
  }

  // const adminTekstoviShorthand = await fetchAdminTekstoviManjihKomponenti();

  const getUserCookieConsent = cookies().get('@sutra-cookies-consent')?.value;

  const userEnabledAllCookies = getUserCookieConsent === 'true';

  async function fetchBasicSchemaOrg() {
    try {
      const response = await fetch(`${process.env.CMS_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getBasicSchemaOrgProjectQuery(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Fetch error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Fetch error:', error.message);
      throw error;
    }
  }

  // const parseSchemaData = await fetchBasicSchemaOrg();

  // const schemaBasicData = generateSeoSchemaOrg(parseSchemaData);

  const ClientHeader = dynamic(() => import('./globalComponents/AppHeader'), { ssr: false });

  const cookieStore = cookies();
  const lang = (cookieStore.get('@sutra-user-lang')?.value as UserLanguage) || 'hr';

  return (
    <html
      lang={lang}
      className='scrollbar scrollbar-thumb-primary-light dark:scrollbar-thumb-primary-dark  scrollbar-track-primary-dark dark:scrollbar-track-primary-light min-h-screen w-full h-full'
    >
      <head>
        <link href='https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css' rel='stylesheet' />
      </head>
      <body className={`${poppins.className} w-full h-full lg:pt-0 pt-12`}>
        {/* <CookieConsentNotification pageContent={adminTekstoviShorthand} />
        {adminTokenDataShorthand.kodoviAdminApi.googleAnalytics && userEnabledAllCookies && (
          <GoogleAnalytics gaId={adminTokenDataShorthand.kodoviAdminApi.googleAnalytics} />
        )}
        {adminTokenDataShorthand.kodoviAdminApi.googleTagManager && userEnabledAllCookies && (
          <GoogleTagManager gtmId={adminTokenDataShorthand.kodoviAdminApi.googleTagManager} />
        )} */}
        <Suspense fallback={<Loading />}>
          <ClientHeader />
          <Toaster />
          <Providers>{children}</Providers>

          <AppFooter />
        </Suspense>
        {/* {parseSchemaData && (
          <Script id='schema-org' type='application/ld+json' dangerouslySetInnerHTML={{ __html: schemaBasicData }} />
        )} */}
        {/* {adminTokenDataShorthand.kodoviAdminApi.microsoftClarity && userEnabledAllCookies && (
          <Script id='clarity-script' strategy='afterInteractive'>
            {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${adminTokenDataShorthand.kodoviAdminApi.microsoftClarity}");
          `}
          </Script>
        )} */}
        {/* {adminTokenDataShorthand.kodoviAdminApi.hotjar && userEnabledAllCookies && (
          <Script id='hotjar-snippet'>
            {`
          (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${adminTokenDataShorthand.kodoviAdminApi.hotjar},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
          </Script>
        )} */}

        {/* {adminTokenDataShorthand.kodoviAdminApi.plerdySiteHashCode &&
          adminTokenDataShorthand.kodoviAdminApi.plerdySuidSiteUniqueId &&
          userEnabledAllCookies && (
            <Script id='plerdy-script' strategy='afterInteractive'>
              {`
              var _protocol="https:"==document.location.protocol?"https://":"http://";
              var _site_hash_code = "${adminTokenDataShorthand.kodoviAdminApi.plerdySiteHashCode}";
              var _suid = ${adminTokenDataShorthand.kodoviAdminApi.plerdySuidSiteUniqueId};
              var plerdyScript=document.createElement("script");
              plerdyScript.setAttribute("defer","");
              plerdyScript.dataset.plerdymainscript="plerdymainscript";
              plerdyScript.src="https://a.plerdy.com/public/js/click/main.js?v="+Math.random();
              var plerdymainscript=document.querySelector("[data-plerdymainscript='plerdymainscript']");
              if(plerdymainscript) plerdymainscript.parentNode.removeChild(plerdymainscript);
              try {
                document.head.appendChild(plerdyScript);
              } catch(t) {
                console.log(t,"unable to add script tag");
              }
            `}
            </Script>
          )} */}

        {/* {adminTokenDataShorthand.kodoviAdminApi.inspectlet && userEnabledAllCookies && (
          <Script id='inspectlet-script' strategy='afterInteractive'>
            {`
              window.__insp = window.__insp || [];
              __insp.push(['wid', ${adminTokenDataShorthand.kodoviAdminApi.inspectlet}]);
              (function() {
                  function ldinsp() {
                      if (typeof window.__inspld != "undefined") return;
                      window.__inspld = 1;
                      var insp = document.createElement('script');
                      insp.type = 'text/javascript';
                      insp.async = true;
                      insp.id = "inspsync";
                      insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=${adminTokenDataShorthand.kodoviAdminApi.inspectlet}&r=' + Math.floor(new Date().getTime()/3600000);
                      var x = document.getElementsByTagName('script')[0];
                      x.parentNode.insertBefore(insp, x);
                  }
                  setTimeout(ldinsp, 0);
              })();
            `}
          </Script>
        )} */}

        <Script src='https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js' strategy='afterInteractive' />
      </body>
    </html>
  );
}
