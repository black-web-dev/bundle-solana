import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';

import Loader from './loader';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

const VARIANTYPE = {
  fill: 'text-white hover:text-white hover:fill-white bg-main-100 hover:bg-main-200 active:scale-95',
  outline:
    'text-main-100 hover:fill-white bg-white border border-main-100 hover:bg-black/5 active:scale-95',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'fill', icon, children, className = '', loading, ...rest },
    ref
  ) => {
    function createRipple(event: React.MouseEvent) {
      const button = event.currentTarget;

      const circle = document.createElement('span');
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.backgroundColor = '#0000001c';
      circle.style.transform = 'scale(0)';
      circle.classList.add('animate-ripple'); //tailwindcss config

      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;

      const rect = button.getBoundingClientRect();
      circle.style.left = `${event.clientX - rect.left - radius}px`;
      circle.style.top = `${event.clientY - rect.top - radius}px`;

      circle.classList.add('ripple');

      const ripple = button.getElementsByClassName('ripple')[0];

      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);
    }

    return (
      <button
        ref={ref}
        className={clsx(
          'group relative flex min-h-[42px] items-center justify-start gap-1 overflow-hidden whitespace-nowrap rounded-lg px-6 py-[10px] font-bold leading-6 shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
          rest.disabled && 'cursor-not-allowed bg-[#CED8DF] text-[#4B5A67]',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore TYPE NEEDS FIXING
          VARIANTYPE[variant],
          rest.disabled && 'active:scale-100',
          className
        )}
        {...rest}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          createRipple(e);
          rest.onClick && rest.onClick(e);
        }}
      >
        {icon && icon}
        {children}
        {!!loading && (
          <div className='absolute right-2'>
            <Loader />
          </div>
        )}
      </button>
    );
  }
);

export default Button;
