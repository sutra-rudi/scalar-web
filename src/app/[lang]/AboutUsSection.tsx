import Image from 'next/image';
import React from 'react';

const paragraphs = [
  'Scalar d.o.o. je tvrtka s visokokvalitetnim inženjerskim kadrom iskusnim u pružanju inženjerskih usluga u graditeljstvu. Osnivač tvrtke, Jakov Galac, je iskusan inženjer i voditelj projekata s više od 10 godina profesionalnog staža. S obzirom na svoje prethodne uloge i kao predstavnik izvođača i kao predstavnik investitora, ima iskustva iz svih faza procesa planiranja, izgradnje i održavanja objekata.',
  'Poslovna strategija tvrtke je istaknuti se u inženjerskim uslugama kao što su upravljanje projektima, stručni nadzor, tehničko savjetovanje (konzultantske usluge) i projektiranje te pružiti kvalitetnu uslugu svojim klijentima s naglaskom na stručnost, dosljednost, povjerenje i uspješno ispunjavanje zadanih ciljeva. Cilj tvrtke je pružiti klijentima potpunu uslugu uz bliski i osobni pristup tijekom realizacije različitih vrsta građevinskih projekata.',
  'Ciljana skupina klijenata su domaći i strani investitori koji, uz vlastite ciljeve uspješnog izvršenja svojih projekata, drže do očuvanja inženjerskih načela, pravila struke te važećih propisa. Od samog početka postojanja tvrtke, držimo se visokih profesionalnih standarda, bilo u kvaliteti naših usluga, bilo u odnosu koji njegujemo sa svojim klijentima i kooperantima.',
  'Za usluge u područjima stručnosti koje ne možemo ispuniti u okvirima tvrtke, imamo stalne vanjske partnere s dugogodišnjim iskustvom u svojim područjima.',
];

const AboutUsSection = () => {
  return (
    <section className='w-full'>
      <div className='flex items-start gap-24 justify-center max-w-screen-2xl mx-auto'>
        <div className='max-w-prose prose mt-12'>
          <h2>O nama</h2>
          {paragraphs.map((par, index) => (
            <p key={`${par}${index}`}>{par} </p>
          ))}
        </div>

        <Image
          src={
            'https://www.scalar.hr/img/PL__8720-%20%282023-03-24%29%204000%20x%206000%20%2885%20mm%20%29%20ISO%20100%20%201-2500%20sec%20at%20f%20-%201,8.webp'
          }
          width={596}
          height={892}
          alt='scalar man'
        />
      </div>
    </section>
  );
};

export default AboutUsSection;
