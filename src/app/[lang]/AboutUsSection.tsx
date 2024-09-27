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
      <div className='flex items-start gap-24 justify-center max-w-screen-2xl mx-auto md:flex-nowrap flex-wrap  px-4'>
        <div className='max-w-prose prose mt-12'>
          <h2 className='dark:text-primary-light text-primary-dark font-bold text-3xl'>O nama</h2>
          {paragraphs.map((par, index) => (
            <p key={`${par}${index}`} className='lg:text-base text-sm text-primary-dark dark:text-primary-light'>
              {par}{' '}
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
          className='object-cover aspect-[9/16] object-center'
        />
      </div>
    </section>
  );
};

export default AboutUsSection;
