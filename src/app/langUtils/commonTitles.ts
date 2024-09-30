import { UserLanguage } from '../enums/LangEnum';

const commonTitles = {
  [UserLanguage.eng]: 'Category',
  [UserLanguage.hr]: 'Kategorija',
  // [UserLanguage.ita]: 'Categoria',
  [UserLanguage.ger]: 'Kategorie',
  // [UserLanguage.esp]: 'EspCat',
  // [UserLanguage.fra]: 'FraCat',
};

export const generateCommonTitles = (lang: UserLanguage): string => {
  return commonTitles[lang] || '';
};
