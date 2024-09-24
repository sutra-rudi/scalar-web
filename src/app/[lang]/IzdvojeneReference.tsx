const content = [
  {
    title: 'Konzultantska usluga upravljanja projektom na projektima',
    contentBlock: [
      '- projekt izgradnje kompleksa od 9 stambenih građevina u Zagrebu, ukupne GBP površine 5.000 m2',
      '- projekt izgradnje stambeno poslovne zgrade u Zaprešiću, ukupne GBP površine 7.700 m2 s 56 stambenih jedinica i 4 poslovna prostora',
      '- projekt izgradnje stambenih zgrada u Zadru, ukupne GBP površine- podzemne 7.600 m2 i nadzemne 10.100 m2, katnosti Po-2+Po-1+P+6, sa 172 stambene jedinice',
      '- projekt izgradnje turističkog naselja koje se sastoji od devetnaest vila i jednog hotela te dvadeset bazena',
    ],
  },
  {
    title: 'Stručni nadzor na projektima',
    contentBlock: [
      '- izgradnja stambeno poslovne zgrade u Zaprešiću, ukupne GBP površine 7.700 m2 s 56 stambenih jedinica i 4 poslovna prostora',
      '- izgradnja i uređenje 2 restorana brze prehrane u sklopu benzinskih postaja Sesvete istok i Sesvete zapad',
      '- rekonstrukcija krovišta trgovačkog centra u Sisku',
      '- izgradnja i uređenje restorana brze prehrane u sklopu benzinske postaje Dragalić sjever',
      '- izgradnja 15 krovnih sunčanih fotonaponskih elektrana',
      '- više rekonstrukcija različitih unutarnjih i vanjskih prostora (uredskih, trgovačkih i logističkih)',
    ],
  },

  {
    title: 'Konzultantsko-projektantske usluge',
    contentBlock: [
      '- izrada projekata izvedenog stanja logističko distributivnih centara ukupne GBP površine 80.000 m2',
      '- procjena i izrada elaborata šteta nastalih uslijed nevremena na većem broju trgovačkih centara',
      '- pregled i kontrola provođenja ispitivanja krovnih folija na krovu trgovačkog centra u Zaboku',
      '- procjene vrijednosti raznih investicija za različite investitore',
      '- analiza podataka i izrada internih smjernica za investitora lanca trgovačkih centara',
    ],
  },
];

const IzdvojeneReference = () => {
  return (
    <section>
      <h2 className='w-full text-center text-3xl text-primary-dark py-8'>Izdvojene reference</h2>

      <div className='grid grid-cols-3 max-w-screen-2xl mx-auto pb-8'>
        {content.map((contents, index) => {
          return (
            <div key={`${contents.title}${index}`} className=''>
              <h3 className='text-primary-light text-2xl py-4'>{contents.title}</h3>
              <div className='flex flex-col items-start justify-start gap-4'>
                {contents.contentBlock.map((block) => {
                  return (
                    <p key={block} className='prose'>
                      {block}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default IzdvojeneReference;
