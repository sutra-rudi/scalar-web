interface SutraTagInterface {
  size: 'small' | 'normal' | 'large';
  innerText: string;
  isAccentButton?: boolean;
  frontIcon?: React.ElementType;
  backIcon?: React.ElementType;
}

export const SutraTagBase = ({ innerText, size, isAccentButton }: SutraTagInterface) => {
  return (
    <div
      className={`${
        size === 'small'
          ? 'text-xs rounded-sutraButtonBorderRadiusSmall'
          : size === 'normal'
          ? 'text-base rounded-sutraButtonBorderRadiusBase'
          : size === 'large'
          ? 'text-lg rounded-sutraButtonBorderRadiusLarge'
          : ''
      } transition-all ease-in-out py-[0.75rem] px-[1.125rem]  hover:scale-105 active:outline active:outline-sutraButtonOutline ${
        isAccentButton
          ? 'bg-accent text-sutraButtonText hover:text-accent hover:bg-primary-dark active:outline-accent'
          : 'bg-primary-dark text-sutraButtonText  dark:bg-primary-light dark:text-primary-dark hover:bg-primary-light hover:text-primary-dark active:outline-accent dark:hover:bg-primary-dark dark:hover:text-secondary-light'
      }  `}
    >
      {innerText}
    </div>
  );
};

export const SutraButtonGradient = ({ innerText, size }: SutraTagInterface) => {
  return (
    <div
      className={`${
        size === 'small'
          ? 'text-xs rounded-sutraButtonBorderRadiusSmall'
          : size === 'normal'
          ? 'text-base rounded-sutraButtonBorderRadiusBase'
          : size === 'large'
          ? 'text-lg rounded-sutraButtonBorderRadiusLarge'
          : ''
      } transition-all ease-in-out py-[0.75rem] px-[1.125rem]  hover:scale-105 active:outline active:outline-sutraButtonOutline bg-sutraGradientButton text-sutraButtonText  dark:bg-sutraGradientButtonDark active:outline-accent hover:bg-sutraGradientButtonDark dark:hover:bg-sutraGradientButton dark:text-almost-black dark:hover:text-almost-white`}
    >
      {innerText}
    </div>
  );
};

export const SutraButtonOutlined = ({ innerText, size }: SutraTagInterface) => {
  return (
    <div
      className={`${
        size === 'small'
          ? 'text-xs rounded-sutraButtonBorderRadiusSmall'
          : size === 'normal'
          ? 'text-base rounded-sutraButtonBorderRadiusBase'
          : size === 'large'
          ? 'text-lg rounded-sutraButtonBorderRadiusLarge'
          : ''
      } transition-all ease-in-out py-[0.75rem] px-[1.125rem]  hover:scale-105 outline outline-sutraButtonOutlineAsPrim outline-primary-dark text-primary-dark hover:text-accent hover:outline-sutraButtonOutlineAsPrimHover active:outline-sutraButtonOutlineAsPrimHover dark:outline-primary-light dark:text-primary-light `}
    >
      {innerText}
    </div>
  );
};

export const SutraButtonGhost = ({ innerText, size }: SutraTagInterface) => {
  return (
    <div
      className={`${
        size === 'small'
          ? 'text-xs rounded-sutraButtonBorderRadiusSmall'
          : size === 'normal'
          ? 'text-base rounded-sutraButtonBorderRadiusBase'
          : size === 'large'
          ? 'text-lg rounded-sutraButtonBorderRadiusLarge'
          : ''
      } transition-all ease-in-out py-[0.75rem] px-[1.125rem]  hover:scale-105 outline outline-sutraButtonOutlineAsPrim outline-primary-dark text-primary-dark  active:outline-sutraButtonOutlineAsPrimHover dark:outline-primary-light dark:text-accent opacity-ghostButtonOpacity`}
    >
      {innerText}
    </div>
  );
};

export const SutraButtonLink = ({ innerText, size, isAccentButton }: SutraTagInterface) => {
  return (
    <div
      className={`${
        size === 'small'
          ? 'text-xs rounded-sutraButtonBorderRadiusSmall'
          : size === 'normal'
          ? 'text-base rounded-sutraButtonBorderRadiusBase'
          : size === 'large'
          ? 'text-lg rounded-sutraButtonBorderRadiusLarge'
          : ''
      } transition-all ease-in-out py-[0.75rem] px-[1.125rem] ${
        isAccentButton
          ? 'text-accent dark:text-accent hover:text-primary-dark dark:hover:text-primary-light active:text-primary-dark dark:active:text-primary-light'
          : ' text-primary-dark hover:text-accent dark:hover:text-accent active:text-primary-dark dark:text-primary-light dark:active:text-primary-light'
      }`}
    >
      {innerText}
    </div>
  );
};

export const SutraTagWithIcon = ({
  innerText,
  size,
  isAccentButton,
  frontIcon: FrontIcon,
  backIcon: BackIcon,
}: SutraTagInterface) => {
  return (
    <div
      className={`${
        size === 'small'
          ? 'text-xs rounded-sutraButtonBorderRadiusSmall'
          : size === 'normal'
          ? 'text-base rounded-sutraButtonBorderRadiusBase'
          : size === 'large'
          ? 'text-lg rounded-sutraButtonBorderRadiusLarge'
          : ''
      } transition-all ease-in-out py-[0.75rem] px-[1.125rem] flex items-center gap-2 bg-accent text-sutraButtonText hover:text-accent hover:bg-primary-dark active:outline-accent`}
    >
      {FrontIcon && <FrontIcon className='shrink-0' />}
      <span>{innerText}</span>
      {BackIcon && <BackIcon className='shrink-0' />}
    </div>
  );
};
