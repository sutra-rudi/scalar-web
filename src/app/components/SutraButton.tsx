interface SutraButtonBaseInterface {
  size: 'small' | 'normal' | 'large';
  innerText: string;
  isAccentButton?: boolean;
  frontIcon?: React.ElementType;
  backIcon?: React.ElementType;
  type?: any;
  onClickAction?: () => any;
  isFullCard?: boolean;
}

export const SutraButtonBase = ({
  innerText,
  size,
  isAccentButton,
  onClickAction,
  type,
  isFullCard = false,
}: SutraButtonBaseInterface) => {
  return (
    <button
      role='button'
      type={type ? type : 'button'}
      onClick={onClickAction && onClickAction}
      className={`${
        size === 'small'
          ? 'text-xs'
          : size === 'normal'
          ? 'md:text-base text-sm'
          : size === 'large'
          ? 'md:text-lg text-base'
          : ''
      } transition-all ease-in-out px-2 py-1  hover:scale-105 active:outline active:outline-sutraButtonOutline rounded-sm group-hover:scale-105 ${
        isAccentButton
          ? 'bg-accent text-sutraButtonText hover:text-accent hover:bg-primary-dark active:outline-accent'
          : 'bg-primary-dark text-sutraButtonText  dark:bg-primary-light dark:text-primary-dark hover:bg-primary-light hover:text-primary-dark active:outline-accent dark:hover:bg-primary-dark dark:hover:text-secondary-light'
      }  ${isFullCard && 'w-full'}`}
    >
      {innerText}
    </button>
  );
};

export const SutraButtonGradient = ({ innerText, size }: SutraButtonBaseInterface) => {
  return (
    <button
      role='button'
      className={`${
        size === 'small' ? 'text-xs' : size === 'normal' ? 'text-base' : size === 'large' ? 'text-lg' : ''
      } transition-all ease-in-out px-2 py-1 hover:scale-105 active:outline active:outline-sutraButtonOutline bg-sutraGradientButton text-sutraButtonText  dark:bg-sutraGradientButtonDark active:outline-accent hover:bg-sutraGradientButtonDark dark:hover:bg-sutraGradientButton dark:text-almost-black dark:hover:text-almost-white`}
    >
      {innerText}
    </button>
  );
};

export const SutraButtonOutlined = ({ innerText, size }: SutraButtonBaseInterface) => {
  return (
    <button
      role='button'
      className={`${
        size === 'small'
          ? 'text-xs'
          : size === 'normal'
          ? 'md:text-base text-sm'
          : size === 'large'
          ? 'md:text-lg text-base'
          : ''
      } transition-all ease-in-out px-3 py-2 hover:bg-accent hover:text-primary-dark  border-accent border-2 text-accent hover:border-sutraButtonBordereAsPrimHover active:border-sutraButtonBorderAsPrimHover dark:border-primary-light dark:text-primary-light rounded-sm`}
    >
      {innerText}
    </button>
  );
};

export const SutraButtonGhost = ({ innerText, size }: SutraButtonBaseInterface) => {
  return (
    <button
      role='button'
      className={`${
        size === 'small' ? 'text-xs' : size === 'normal' ? 'text-base' : size === 'large' ? 'text-lg' : ''
      } transition-all ease-in-out px-2 py-1 hover:scale-105 outline outline-sutraButtonOutlineAsPrim outline-primary-dark text-primary-dark  active:outline-sutraButtonOutlineAsPrimHover dark:outline-primary-light dark:text-accent opacity-ghostButtonOpacity`}
    >
      {innerText}
    </button>
  );
};

export const SutraButtonLink = ({ innerText, size, isAccentButton }: SutraButtonBaseInterface) => {
  return (
    <button
      role='button'
      className={`${
        size === 'small' ? 'text-xs' : size === 'normal' ? 'text-base' : size === 'large' ? 'text-lg' : ''
      } transition-all ease-in-out px-2 py-1${
        isAccentButton
          ? 'text-accent dark:text-accent hover:text-primary-dark dark:hover:text-primary-light active:text-primary-dark dark:active:text-primary-light'
          : ' text-primary-dark hover:text-accent dark:hover:text-accent active:text-primary-dark dark:text-primary-light dark:active:text-primary-light'
      }`}
    >
      {innerText}
    </button>
  );
};

export const SutraButtonWithIcon = ({
  innerText,
  size,
  isAccentButton,
  frontIcon: FrontIcon,
  backIcon: BackIcon,
}: SutraButtonBaseInterface) => {
  return (
    <button
      role='button'
      className={`${
        size === 'small' ? 'text-xs' : size === 'normal' ? 'text-base' : size === 'large' ? 'text-lg' : ''
      } transition-all ease-in-out px-2 py-1flex items-center gap-2 bg-accent text-sutraButtonText hover:text-accent hover:bg-primary-dark active:outline-accent`}
    >
      {FrontIcon && <FrontIcon className='shrink-0' />}
      <span>{innerText}</span>
      {BackIcon && <BackIcon className='shrink-0' />}
    </button>
  );
};
