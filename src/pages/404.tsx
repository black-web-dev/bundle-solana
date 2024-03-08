import * as React from 'react';

import Logo from '~/svg/logo.svg';
import LogoColor from '~/svg/logo-color.svg';

export default function NotFoundPage() {
  return (
    <div className='flex min-h-[calc(100vh_-_64px)] flex-auto items-center justify-center'>
      <div className='flex flex-col'>
        <div className='mb-4 flex items-center justify-between font-semibold text-white'>
          <div className='group flex cursor-pointer items-baseline'>
            <div className='relative overflow-hidden'>
              <Logo className='absoulte h-9 w-7 transition-all group-hover:-translate-y-full' />
              <LogoColor className='absolute h-9 w-7 transition-all group-hover:-translate-y-full' />
            </div>
            <span className='text-text-100 font-CalSans h-0 text-[41px] font-bold'>
              undle
            </span>
          </div>
          <p>404 error</p>
        </div>
        <div className='my-2 text-center text-5xl font-bold text-white'>
          <p>We can't find that page</p>
        </div>
        <div className='my-2 text-center text-base text-white'>
          <p>
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
    </div>
  );
}
