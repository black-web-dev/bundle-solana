import React from 'react';

import Bundle from './bundle';
import TokenInformation from './information';
import RevokeFreeze from './revokeFreeze';
import RevokeMint from './revokeMint';

const CreateTokenScreen = (): JSX.Element => {
  return (
    <div className='mx-auto xl:mt-10 flex max-w-[750px] flex-col gap-10 px-[10px] py-6 lg:mb-20 lg:px-0'>
      <TokenInformation />
      <RevokeMint />
      <RevokeFreeze />
      <Bundle />
    </div>
  );
};

export default CreateTokenScreen;
