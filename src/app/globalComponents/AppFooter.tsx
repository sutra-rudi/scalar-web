// import { getAllSocialLinksQuery } from '../queries/getAllSocialLinksQuery';
import Image from 'next/image';
import { FaLinkedin as LinkedInIcon, FaRegEnvelope as MailIcon } from 'react-icons/fa';

export default async function AppFooter() {
  // const getAllSocialLinks = await fetch(`${process.env.CMS_BASE_URL}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: getAllSocialLinksQuery(),
  //   }),
  // });

  // const parseDataSocialLinks = await getAllSocialLinks.json();

  // const dataShorthand = parseDataSocialLinks.data.allDrustveneMrezeLinkovi.edges[0].node;

  // const socialLinks: [string, string][] = Object.entries(dataShorthand.povezniceDrustvene);

  return (
    <footer className='w-full bg-primary-dark dark:bg-primary-light py-12'>
      <div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col justify-between'>
        <div className='flex gap-16 items-start justify-start'>
          <Image src={'https://www.scalar.hr/img/vertical%20scalar.svg'} width={150} height={150} alt='app logo' />

          <div className='text-primary-light dark:text-primary-dark flex items-start justify-start flex-col'>
            <p className='text-base leading-normal font-medium pb-4'>SCALAR d.o.o. za nadzor i savjetovanje</p>
            <p className='text-base leading-normal'>Debanićeva ulica 1A, Zagreb</p>
            <p className='text-base leading-normal'>OIB: 52575580755 Erste&Steiermärkische Bank d.d.</p>
            <p className='text-base leading-normal'>IBAN: HR5224020061101147166</p>
          </div>
        </div>
        <div className='flex text-3xl gap-4'>
          <LinkedInIcon className='text-primary-light dark:text-primary-dark cursor-pointer transition-all ease-out duration-150 hover:scale-110 hover:text-accent' />
          <MailIcon className='text-primary-light dark:text-primary-dark cursor-pointer transition-all ease-out duration-150 hover:scale-110 hover:text-accent' />
        </div>
      </div>
    </footer>
  );
}
