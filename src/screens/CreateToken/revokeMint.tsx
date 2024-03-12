import React, { useState } from 'react';

import Button from '@/components/common/button';
import Input from '@/components/common/input';

import RevokeIcon from '~/svg/revoke.svg';

const RevokeMint = (): JSX.Element => {
  const [address, setAddress] = useState<string>('');

  return (
    <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-[10px] rounded-2xl border p-5'>
      <div className='flex w-full justify-start'>
        <div className='font-CalSans text-text-300 text-3xl font-bold tracking-[0.01em]'>
          Revoke Mint Authority
        </div>
      </div>
      <div>
        <span className='text-text-500'>Already have a token?</span> Use this
        panel to Revoke Mint Authority on any tokens you have created. Revoking
        Mint Authority sets a fixed supply cap by stopping further token
        minting.
      </div>
      <div className='mt-[10px] w-full'>
        <Input
          placeholder='SPL Token Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className='flex items-center justify-center gap-1 mt-[10px]'>
        <div className='text-sm font-semibold'>Service Fee:</div>
        <div className='text-main-200 text-sm font-semibold'>0.1 SOL</div>
      </div>

      <div className='w-full'>
        <Button
          icon={<RevokeIcon classnName='w-5 h-5' />}
          className='w-full justify-center !text-base !font-semibold'
        >
          Revoke Mint Authority
        </Button>
      </div>
    </div>
  );
};

export default RevokeMint;
