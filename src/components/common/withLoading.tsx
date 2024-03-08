import React, { useEffect, useState } from 'react';

import Logo from '~/svg/logo.svg';
import LogoColor from '~/svg/logo-color.svg';

const WithLoading = (Component: any) => {
  return function WithLoadingComponent({ ...props }) {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1.5 * 1000);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return (
        <div className='bg-bg-100 flex h-screen w-full items-center justify-center'>
          <div className='group flex cursor-pointer items-baseline'>
            <div className='relative overflow-hidden'>
              <Logo className='absoulte h-9 w-7 transition-all group-hover:-translate-y-full' />
              <LogoColor className='absolute h-9 w-7 transition-all group-hover:-translate-y-full' />
            </div>
            <span className='text-text-100 font-CalSans h-0 text-[41px] font-bold'>
              undle
            </span>
          </div>
        </div>
      );
    } else {
      return <Component {...props} />;
    }
  };
};

export default WithLoading;
