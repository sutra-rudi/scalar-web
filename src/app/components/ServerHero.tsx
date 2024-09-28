import HeroSection from '../[lang]/HeroSection';

export default async function ServerHero({ lang }: { lang: string }) {
  return <HeroSection lang={lang} />;
}
