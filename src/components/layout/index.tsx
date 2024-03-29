import React from 'react';

import Header from './header';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className='text-[19px] leading-[1.2em] tracking-normal md:text-[19px] md:leading-[1.3em] md:tracking-normal 2xl:text-[21px] 2xl:leading-[1.3em] 2xl:tracking-normal'>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
