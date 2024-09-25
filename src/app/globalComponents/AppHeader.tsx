'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import { LuSun as SunIcon, LuMoon as MoonIcon } from 'react-icons/lu';
import { Hr, Gb, It, De } from 'react-flags-select';
import Image from 'next/image';
import { useLocalStorage } from '@uidotdev/usehooks';
import Script from 'next/script';

const AppHeader = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [getThemeIfAny, setThemeToStorage] = useLocalStorage('@sutra-user-crl-scheme', 'light');
  const splitPath = currentPath.split('/');
  const currentLang = splitPath[1];

  const [theme, setTheme] = React.useState(getThemeIfAny);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);

  const langs = [
    { title: 'Hrvatski', lang: 'hr', flag: <Hr width={24} height={24} /> },
    { title: 'English', lang: 'eng', flag: <Gb width={24} height={24} /> },
    { title: 'Deutsch', lang: 'ger', flag: <De width={24} height={24} /> },
    { title: 'Italiano', lang: 'ita', flag: <It width={24} height={24} /> },
  ];

  const navLinks = {
    main: [
      { url: `/${currentLang}`, title: 'Home' },
      { url: `/${currentLang}/blog`, title: 'Blog' },
      { url: `/${currentLang}/news`, title: 'News' },
      { url: `/${currentLang}/about-us`, title: 'About' },
      { url: `/${currentLang}/contact`, title: 'Contact' },
      { url: `/${currentLang}/what-to-visit`, title: 'What to visit?' },
    ],
    legal: [
      { url: `/${currentLang}/legal-info`, title: 'Legal info' },
      { url: `/${currentLang}/company-info`, title: 'Company info' },
      { url: `/${currentLang}/faq`, title: 'FAQ' },
    ],
    resources: [
      { url: `/${currentLang}/sub-page-5`, title: 'Baza tekstova 5 pasusa' },
      { url: `/${currentLang}/sub-page-1`, title: 'Baza tekstova 1 modul' },
      { url: `/${currentLang}/msg-singles`, title: 'Poruke pojedinačno' },
      { url: `/${currentLang}/hero-sections`, title: 'Hero kompilacija' },
      { url: `/${currentLang}/maps`, title: 'Mape kompilacija' },
      { url: `/${currentLang}/schedule`, title: 'Rasporedi' },
      { url: `/${currentLang}/liste-bullets`, title: 'Liste' },
    ],
    other: [
      { url: `/${currentLang}/360-tours`, title: 'Šetnje' },
      { url: `/${currentLang}/buttons-compilation`, title: 'Botuni' },
      { url: `/${currentLang}/radna-vremena`, title: 'Radna vremena' },
      { url: `/${currentLang}/social-links`, title: 'Društvene mreže' },
      { url: `/${currentLang}/gallery`, title: 'Galerija' },
      { url: `/${currentLang}/blog-news-cards`, title: 'Kartice' },
      { url: `/${currentLang}/locations`, title: 'Lokacije' },
      { url: `/${currentLang}/notifications-page`, title: 'Obavijesti' },
      { url: `/${currentLang}/partners`, title: 'Logo partneri' },
    ],
    visuals: [{ url: `/${currentLang}/textures-bg`, title: 'Teksture pozadine' }],
  };

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setThemeToStorage(theme === 'dark' ? 'light' : 'dark');
  };

  React.useEffect(() => {
    getThemeIfAny === 'light'
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark');

    theme === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [theme, getThemeIfAny]);

  React.useEffect(() => {
    isMobileMenuOpen
      ? document.documentElement.classList.add('overflow-hidden')
      : document.documentElement.classList.remove('overflow-hidden');
  }, [isMobileMenuOpen]);

  const handleLangSwitch = (lang: string) => {
    // Postavi kolačić na odabrani jezik
    document.cookie = `@sutra-user-lang=${lang}; path=/; max-age=31536000`; // 1 godina

    // Preusmjeri na novu putanju
    router.push(
      `/${lang}${currentPath.replace(`/${currentLang}`, '')}${
        searchParams.toString() ? '?' + searchParams.toString() : ''
      }`
    );
  };

  return (
    <>
      {' '}
      <head>
        <link href='https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css' rel='stylesheet' />
      </head>
      <nav className='bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 md:relative fixed z-20 w-full top-0'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <a href={`/${currentLang}`} className=''>
            <Image
              src={'https://www.scalar.hr/img/v1%20scalar%20horizontal.svg'}
              width={150}
              height={150}
              alt='Scalar logo'
              className='object-cover object-center '
            />
          </a>
          <button
            data-collapse-toggle='navbar-dropdown'
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-dropdown'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
          <div className='hidden w-full md:block md:w-auto' id='navbar-dropdown'>
            <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <button
                  id='dropdownNavbarLink'
                  data-dropdown-toggle='dropdownNavbar'
                  className='flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
                >
                  Usluge{' '}
                  <svg
                    className='w-2.5 h-2.5 ms-2.5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m1 1 4 4 4-4'
                    />
                  </svg>
                </button>

                <div
                  id='dropdownNavbar'
                  className='z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'
                >
                  <ul className='py-2 text-sm text-gray-700 dark:text-gray-400' aria-labelledby='dropdownLargeButton'>
                    <li>
                      <a
                        href={`/${currentLang}/services-offers/projektiranje-cG9zdDo3Nzk3`}
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Projektiranje
                      </a>
                    </li>
                    <li>
                      <a
                        href={`${currentLang}/services-offers/upravljanje-projektima-cG9zdDozMTk0`}
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Upravljanje projektima
                      </a>
                    </li>
                    <li>
                      <a
                        href={`${currentLang}/services-offers/strucni-nadzor-nad-gradjenjem-cG9zdDozMTE0`}
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Stručni nadzor
                      </a>
                    </li>

                    <li>
                      <a
                        href={`${currentLang}/services-offers/tehnicko-savjetovanje-konzalting-cG9zdDo3Nzk1`}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                      >
                        Konzalting
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href={`/${currentLang}/contact`}
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                >
                  Kontakt
                </a>
              </li>

              <li>
                <div
                  onClick={handleTheme}
                  className='z-40 cursor-pointer outline outline-1 rounded-full outline-offset-4 outline-almost-black dark:outline-almost-white transition-all duration-300 ease-linear'
                >
                  {theme === 'light' ? <SunIcon size={24} color='#181816' /> : <MoonIcon size={24} color='#F8F7F2' />}
                </div>
              </li>

              <li className='flex gap-2 items-center justify-start'>
                {langs.map((language) => (
                  <button
                    disabled={currentLang === language.lang}
                    key={language.lang}
                    className='text-sm font-medium text-gray-900 dark:text-white flex place-items-center gap-2 transition-all ease-out hover:-translate-y-1 hover:scale-110'
                    onClick={() => handleLangSwitch(language.lang)}
                  >
                    {language.flag}
                  </button>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Script
        id='FLOWBITE JS'
        src='https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js'
        strategy='lazyOnload'
      />
    </>

    /*   <nav className='bg-white dark:bg-gray-800 antialiased relative'>
      <div className='max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='shrink-0'>
              <a href={`/${currentLang}`} title='' className='w-8 h-8 block'>
                <Image
                  className='dark:hidden block w-full h-full'
                  src='https://cms.sutra.hr/wp-content/uploads/2024/06/Sutra-profilna-slika-1.jpg'
                  alt=''
                  width={128}
                  height={128}
                />

                <Image
                  className='hidden dark:block w-full h-full'
                  src='https://cms.sutra.hr/wp-content/uploads/2024/06/Sutra-profilna-slika-1.jpg'
                  alt=''
                  width={128}
                  height={128}
                />
              </a>
            </div>

            <div
              className={`absolute z-40 w-full h-screen bg-red-300 inset-0 transition-all duration-300 flex items-center lg:justify-center justify-start flex-col lg:pt-0 pt-24  ${
                isMobileMenuOpen
                  ? 'opacity-100 pointer-events-auto select-auto'
                  : 'opacity-0 select-none pointer-events-none'
              }`}
            >
              <ul className='grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-2 w-full lg:px-6 px-2'>
                {Object.entries(navLinks).map(([category, links]) => (
                  <li key={category} className='mt-4'>
                    <h3 className='text-xl font-bold text-gray-800 dark:text-white mb-2'>{category.toUpperCase()}</h3>
                    <ul className='pl-4'>
                      {links.map((navLink) => (
                        <li key={navLink.title} className='shrink-0'>
                          <a
                            href={navLink.url}
                            className='flex xl:text-2xl lg:text-xl md:text-lg text-base font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500'
                          >
                            {navLink.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex items-center space-x-4 z-40'>
            {langs.map((language) => (
              <button
                disabled={currentLang === language.lang}
                key={language.lang}
                className='text-sm font-medium text-gray-900 dark:text-white flex place-items-center gap-2 transition-all ease-out hover:-translate-y-1 hover:scale-110'
                onClick={() => handleLangSwitch(language.lang)}
              >
                {language.flag}
              </button>
            ))}

            <div
              onClick={handleTheme}
              className='z-40 cursor-pointer outline outline-1 rounded-full outline-offset-4 outline-almost-black dark:outline-almost-white transition-all duration-300 ease-linear'
            >
              {theme === 'light' ? <SunIcon size={24} color='#181816' /> : <MoonIcon size={24} color='#F8F7F2' />}
            </div>
            <div className='w-min z-40'>
              <Hamburger
                color={theme === 'light' ? '#181816' : '#F8F7F2'}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </div>
    </nav> */
  );
};

export default AppHeader;
