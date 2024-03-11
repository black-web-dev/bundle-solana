import React from 'react';

import Button from '@/components/common/button';

import LightningIcon from '~/svg/lightning.svg';

const Bundle = (): JSX.Element => {
  return (
    <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-[10px] rounded-2xl border p-5'>
      <div className='flex w-full justify-start'>
        <div className='font-CalSans text-text-300 text-3xl font-bold tracking-[0.01em]'>
          Buy Your Token First, Guaranteed.
        </div>
      </div>
      <div className='flex flex-col gap-[20px]'>
        <p>
          Bundling your add liquidity transaction with token swaps guarantees
          that you can buy your token before anyone else.
        </p>
        <p>
          Get the best odds for success with our easy to use bundler. Bundle
          your own token contract or generate a new SPL token in our bundler
          Dapp.
        </p>
      </div>

      <div className='w-full mt-4'>
        <Button
          icon={<LightningIcon classnName='w-5 h-5' />}
          className='w-full justify-center !text-base !font-semibold'
        >
          Bundle Your New Token
        </Button>
      </div>
    </div>
  );
};

export default Bundle;
