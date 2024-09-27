import Image from 'next/image';
import scalarCEO from '../images/scalar-owner.png';
const paragraphs = [
  'Scalar d.o.o. je tvrtka s visokokvalitetnim inženjerskim kadrom iskusnim u pružanju inženjerskih usluga u graditeljstvu. Osnivač tvrtke, Jakov Galac, je iskusan inženjer i voditelj projekata s više od 10 godina profesionalnog staža. S obzirom na svoje prethodne uloge i kao predstavnik izvođača i kao predstavnik investitora, ima iskustva iz svih faza procesa planiranja, izgradnje i održavanja objekata.',
  'Poslovna strategija tvrtke je istaknuti se u inženjerskim uslugama kao što su upravljanje projektima, stručni nadzor, tehničko savjetovanje (konzultantske usluge) i projektiranje te pružiti kvalitetnu uslugu svojim klijentima s naglaskom na stručnost, dosljednost, povjerenje i uspješno ispunjavanje zadanih ciljeva. Cilj tvrtke je pružiti klijentima potpunu uslugu uz bliski i osobni pristup tijekom realizacije različitih vrsta građevinskih projekata.',
  'Ciljana skupina klijenata su domaći i strani investitori koji, uz vlastite ciljeve uspješnog izvršenja svojih projekata, drže do očuvanja inženjerskih načela, pravila struke te važećih propisa. Od samog početka postojanja tvrtke, držimo se visokih profesionalnih standarda, bilo u kvaliteti naših usluga, bilo u odnosu koji njegujemo sa svojim klijentima i kooperantima.',
  'Za usluge u područjima stručnosti koje ne možemo ispuniti u okvirima tvrtke, imamo stalne vanjske partnere s dugogodišnjim iskustvom u svojim područjima.',
];

const AboutUsSection = () => {
  return (
    <section className='w-full'>
      <div className='flex items-start xl:gap-24 gap-4 justify-center w-full xl:max-w-screen-2xl mx-auto xl:flex-nowrap flex-wrap-reverse '>
        <div className='xl:max-w-prose prose xl:mt-12 w-full'>
          <h2 className='text-primary-dark dark:text-primary-light font-bold lg:text-[2rem] text-2xl  px-4'>O nama</h2>
          {paragraphs.map((par, index) => (
            <p key={`${par}${index}`} className='lg:text-base text-sm text-primary-dark dark:text-primary-light  px-4'>
              {par}
            </p>
          ))}
        </div>

        <Image
          src={scalarCEO}
          placeholder='blur'
          blurDataURL={scalarCEO.blurDataURL}
          width={596}
          height={892}
          alt='scalar man'
          className='object-cover aspect-[9/16] object-center xl:w-auto w-full'
        />
      </div>
    </section>
  );
};

export default AboutUsSection;
