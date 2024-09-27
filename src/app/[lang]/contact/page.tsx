// import { getKontaktiOsobeQuery } from '@/app/queries/getAllKontaktOsobeQuery';
// import { getKontaktiSektorQuery } from '@/app/queries/getAllKontaktSektorQuery';
// import { getSuffixFromLang } from '@/app/langUtils/getSuffixFromLang';
// import { getAdminContactFormSemanticsQuery } from '@/app/queries/getContactFormSemantics';
import ScalarContact from '@/app/components/ScalarContact';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const ClientHeader = dynamic(() => import('../../globalComponents/AppHeader'), { ssr: false });
const ClientFooter = dynamic(() => import('../../globalComponents/AppFooter'), { ssr: false });

export default async function ContactPage({ params: { lang } }: { params: { lang: string } }) {
  // const getAllContactPersons = await fetch(`${process.env.CMS_BASE_URL}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: getKontaktiOsobeQuery(lang),
  //   }),
  // });

  // const parseDataPersons = await getAllContactPersons.json();

  // const getAllContactSectors = await fetch(`${process.env.CMS_BASE_URL}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: getKontaktiSektorQuery(lang),
  //   }),
  // });

  // const getAllContactSemantics = await fetch(`${process.env.CMS_BASE_URL}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: getAdminContactFormSemanticsQuery(lang),
  //   }),
  // });

  // const parseDataSectors = await getAllContactSectors.json();

  // const parseDataContactSemantics = await getAllContactSemantics.json();

  // const dataShorthandPersons = parseDataPersons.data.kontaktiOsobe.edges;

  // const dataShorthandSectors = parseDataSectors.data.kontaktiSektor.edges;

  // const l = getSuffixFromLang(lang);

  // const contactSemanticsShorthand = parseDataContactSemantics.data.adminKontaktForme.edges[0].node ?? [];
  // const contactSemanticIntro =
  //   contactSemanticsShorthand[`adminKontaktFormaTekstovi${l}`]?.[`kontaktiBazaTekstova${l}`]
  //     .uvodniTekstoviZaKontakteGrupaPolja;

  // const contactSemanticFormContent =
  //   contactSemanticsShorthand[`adminKontaktFormaTekstovi${l}`]?.[`kontaktiBazaTekstova${l}`].tekstoviStavkiUKontaktima;

  // const contactFormGlobalIntro = contactSemanticsShorthand.kontaktFormaUvod;

  return (
    <Suspense>
      <ClientHeader />
      <main className='min-h-screen bg-sutraContactUsTempBg dark:bg-almost-black'>
        <ScalarContact isPage />
      </main>
      <ClientFooter />
    </Suspense>
  );
}
