import React from 'react';

import Header from './header';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
