import React from 'react';
import { BiWallet } from 'react-icons/bi';

import Button from '../common/button';

const Wallet = (): JSX.Element => {
  return <Button icon={<BiWallet className='h-5 w-5' />}>Connect</Button>;
};

export default Wallet;
