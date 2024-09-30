'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import { LuSun as SunIcon, LuMoon as MoonIcon } from 'react-icons/lu';
import { Hr, Gb, It, De } from 'react-flags-select';
import Image from 'next/image';
import { useLocalStorage } from '@uidotdev/usehooks';

import SkalarLogoBezpotVertical from '../images/scalar-logo-ver-bezpot.svg';
import SkalarLogobezpotHorizontal from '../images/scalar-logo-bezpot-horizontal.svg';

const AppHeader = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [getThemeIfAny, setThemeToStorage] = useLocalStorage('@sutra-user-crl-scheme', 'light');
  const splitPath = currentPath.split('/');
  const currentLang = splitPath[1];

  const [theme, setTheme] = React.useState(getThemeIfAny);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const langs = [
    { title: 'Hrvatski', lang: 'hr', flag: <Hr width={24} height={24} /> },
    { title: 'English', lang: 'eng', flag: <Gb width={24} height={24} /> },
    { title: 'Deutsch', lang: 'ger', flag: <De width={24} height={24} /> },
    { title: 'Italiano', lang: 'ita', flag: <It width={24} height={24} /> },
  ];

  // const navLinks = {
  //   main: [
  //     { url: `/${currentLang}`, title: 'Home' },
  //     { url: `/${currentLang}/blog`, title: 'Blog' },
  //     { url: `/${currentLang}/news`, title: 'News' },
  //     { url: `/${currentLang}/about-us`, title: 'About' },
  //     { url: `/${currentLang}/contact`, title: 'Contact' },
  //     { url: `/${currentLang}/what-to-visit`, title: 'What to visit?' },
  //   ],
  //   legal: [
  //     { url: `/${currentLang}/legal-info`, title: 'Legal info' },
  //     { url: `/${currentLang}/company-info`, title: 'Company info' },
  //     { url: `/${currentLang}/faq`, title: 'FAQ' },
  //   ],
  //   resources: [
  //     { url: `/${currentLang}/sub-page-5`, title: 'Baza tekstova 5 pasusa' },
  //     { url: `/${currentLang}/sub-page-1`, title: 'Baza tekstova 1 modul' },
  //     { url: `/${currentLang}/msg-singles`, title: 'Poruke pojedinačno' },
  //     { url: `/${currentLang}/hero-sections`, title: 'Hero kompilacija' },
  //     { url: `/${currentLang}/maps`, title: 'Mape kompilacija' },
  //     { url: `/${currentLang}/schedule`, title: 'Rasporedi' },
  //     { url: `/${currentLang}/liste-bullets`, title: 'Liste' },
  //   ],
  //   other: [
  //     { url: `/${currentLang}/360-tours`, title: 'Šetnje' },
  //     { url: `/${currentLang}/buttons-compilation`, title: 'Botuni' },
  //     { url: `/${currentLang}/radna-vremena`, title: 'Radna vremena' },
  //     { url: `/${currentLang}/social-links`, title: 'Društvene mreže' },
  //     { url: `/${currentLang}/gallery`, title: 'Galerija' },
  //     { url: `/${currentLang}/blog-news-cards`, title: 'Kartice' },
  //     { url: `/${currentLang}/locations`, title: 'Lokacije' },
  //     { url: `/${currentLang}/notifications-page`, title: 'Obavijesti' },
  //     { url: `/${currentLang}/partners`, title: 'Logo partneri' },
  //   ],
  //   visuals: [{ url: `/${currentLang}/textures-bg`, title: 'Teksture pozadine' }],
  // };

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
    <nav className='bg-almost-white dark:bg-almost-black md:relative fixed z-50 w-full top-0'>
      {/* MOBILE */}
      <div
        className={`absolute z-40 w-full h-screen bg-almost-white dark:bg-almost-black inset-0 transition-all duration-300 flex items-center flex-col lg:pt-0 gap-12 justify-between py-24  ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto select-auto' : 'opacity-0 select-none pointer-events-none'
        }`}
      >
        <div className='flex gap-2 items-center justify-start absolute top-6 left-6'>
          {langs.map((language) => (
            <button
              disabled={currentLang === language.lang}
              key={language.lang}
              className='text-sm font-medium text-gray-900 dark:text-white flex place-items-center gap-2 transition-all ease-out hover:-translate-y-1 hover:scale-110'
              onClick={() => handleLangSwitch(language.lang)}
              name='Language picker'
              aria-label={`Odaberite jezik: ${language.title}`}
            >
              {language.flag}
            </button>
          ))}
        </div>
        <ul className='flex flex-col w-max gap-4 relative'>
          <li className=' border-b border-b-primary-light/50 dark:text-almost-white/50 text-almost-black/50 font-medium pb-2 w-max'>
            Usluge
          </li>
          <li>
            <a
              href={`/${currentLang}/services-offers/projektiranje-cG9zdDo3Nzk3`}
              className='block text-primary-dark dark:text-primary-light '
              aria-label='Saznajte više o našim uslugama projektiranja'
              role='link'
            >
              Projektiranje
            </a>
          </li>
          <li>
            <a
              href={`/${currentLang}/services-offers/upravljanje-projektima-cG9zdDozMTk0`}
              className='block text-primary-dark dark:text-primary-light '
              aria-label='Saznajte više o našoj usluzi upravljanja projektima'
              role='link'
            >
              Upravljanje projektima
            </a>
          </li>
          <li>
            <a
              href={`/${currentLang}/services-offers/strucni-nadzor-nad-gradjenjem-cG9zdDozMTE0`}
              className='block text-primary-dark dark:text-primary-light '
              aria-label='Saznajte više o našoj usluzi stručnog nadzora'
              role='link'
            >
              Stručni nadzor
            </a>
          </li>
          <li>
            <a
              href={`/${currentLang}/services-offers/tehnicko-savjetovanje-konzalting-cG9zdDo3Nzk1`}
              className='block text-primary-dark dark:text-primary-light '
              aria-label='Saznajte više o našoj usluzi tehničkog savjetovanja'
              role='link'
            >
              Tehničko savjetovanje
            </a>
          </li>

          <li className='pt-4'>
            <a
              href={`/${currentLang}/contact`}
              className='flex items-center justify-between text-primary-dark dark:text-primary-light '
              aria-label='Kontaktirajte nas sa povjerenjem!'
              role='link'
            >
              Kontakt
            </a>
          </li>
        </ul>

        <div className='flex flex-col items-center justify-start gap-12'>
          <div
            aria-label={`Promijenite temu u ${theme === 'light' ? 'noćni način' : 'standardno'}`}
            role='button'
            onClick={handleTheme}
            className='z-40 cursor-pointer outline outline-1 rounded-full outline-offset-4 outline-almost-black dark:outline-almost-white transition-all duration-300 ease-linear flex items-center justify-start gap-2 py-1 px-1 w-max'
          >
            {theme === 'light' ? <SunIcon size={16} color='#181816' /> : <MoonIcon size={16} color='#F8F7F2' />}
            <span className='text-primary-dark dark:text-primary-light  text-xs'>
              {theme === 'light' ? 'standardno' : 'nočni način'}
            </span>
          </div>

          <a href={`/${currentLang}`} className='' aria-label='Povratak na početnu stranicu'>
            <Image
              src={SkalarLogoBezpotVertical}
              width={300}
              height={300}
              alt='Scalar logo'
              className='object-cover object-center block'
            />
          </a>
        </div>
      </div>
      {/* MOBILE */}

      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto lg:p-4 px-4 py-2'>
        <a
          href={`/${currentLang}`}
          className='flex items-center justify-start'
          aria-label='Povratak na početnu stranicu'
        >
          <Image
            src={SkalarLogobezpotHorizontal}
            width={222}
            height={70}
            alt='Scalar logo'
            className='object-cover object-center'
          />
        </a>
        <div className='w-min z-40 md:hidden block'>
          <Hamburger
            color={theme === 'light' ? '#181816' : theme === 'dark' && isMobileMenuOpen ? '#F8F7F2' : '#F8F7F2'}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={`${isMobileMenuOpen ? 'Zatvori' : 'Otvori'} mobilni izbornik`}
          />
        </div>
        <div className='hidden w-full md:block md:w-auto'>
          <ul className='flex items-center font-medium p-4 md:p-0  gap-4'>
            <li>
              <button
                id='dropdownNavbarLink'
                data-dropdown-toggle='dropdownNavbar'
                className='flex items-center justify-between w-full py-2 px-3 text-primary-dark dark:text-primary-light'
                onClick={toggleDropdown}
                aria-label='Otkrijte naše usluge i ponude'
              >
                Usluge
                <svg
                  className='w-2.5 h-2.5 ms-2.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 4 4 4-4'
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className='absolute bg-white dark:bg-gray-800 rounded-lg shadow mt-2  z-50'>
                  <ul className='py-2 z-50'>
                    <li>
                      <a
                        href={`/${currentLang}/services-offers/projektiranje-cG9zdDo3Nzk3`}
                        className='block px-4 py-2 text-primary-dark dark:text-primary-light  hover:bg-gray-100 dark:hover:bg-gray-600'
                        aria-label='Saznajte više o našim uslugama projektiranja'
                        role='link'
                      >
                        Projektiranje
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${currentLang}/services-offers/upravljanje-projektima-cG9zdDozMTk0`}
                        className='block px-4 py-2 text-primary-dark dark:text-primary-light  hover:bg-gray-100 dark:hover:bg-gray-600'
                        aria-label='Saznajte više o našoj usluzi upravljanja projektima'
                        role='link'
                      >
                        Upravljanje projektima
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${currentLang}/services-offers/strucni-nadzor-nad-gradjenjem-cG9zdDozMTE0`}
                        className='block px-4 py-2 text-primary-dark dark:text-primary-light  hover:bg-gray-100 dark:hover:bg-gray-600'
                        aria-label='Saznajte više o našoj usluzi stručnog nadzora'
                        role='link'
                      >
                        Stručni nadzor
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${currentLang}/services-offers/tehnicko-savjetovanje-konzalting-cG9zdDo3Nzk1`}
                        className='block px-4 py-2 text-primary-dark dark:text-primary-light  hover:bg-gray-100 dark:hover:bg-gray-600'
                        aria-label='Saznajte više o našoj usluzi tehničkog savjetovanja'
                        role='link'
                      >
                        Tehničko savjetovanje
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li>
              <a
                href={`/${currentLang}/contact`}
                className='block py-2 px-3 text-primary-dark dark:text-primary-light '
                aria-label='Kontaktirajte nas sa povjerenjem!'
                role='link'
              >
                Kontakt
              </a>
            </li>

            <li>
              <div
                onClick={handleTheme}
                aria-label={`Promijenite temu u ${theme === 'light' ? 'noćni način' : 'standardno'}`}
                role='button'
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
                  className='text-sm  flex place-items-center gap-2 transition-all ease-out hover:-translate-y-1 hover:scale-110'
                  onClick={() => handleLangSwitch(language.lang)}
                  name='Language picker'
                  aria-label={`Odaberite jezik: ${language.title}`}
                >
                  {language.flag}
                </button>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;
