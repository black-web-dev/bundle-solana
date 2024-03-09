import React from 'react';
import { BiWallet } from 'react-icons/bi';
import Button from '../common/button';
import { WalletModalButton } from '@solana/wallet-adapter-react-ui';

const Wallet = (): JSX.Element => {
  return <Button icon={<BiWallet className='h-5 w-5' />}>
    <WalletModalButton>
      Connect
    </WalletModalButton>
  </Button>;
};

export default Wallet;
