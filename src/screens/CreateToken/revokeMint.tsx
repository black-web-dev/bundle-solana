import { useAnchorWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';

import useNotification from '@/hooks/useNotification';

import Button from '@/components/common/button';
import Copy from '@/components/common/copy';
import Input from '@/components/common/input';

import { ENV } from '@/configs';
import { shortAddress } from '@/utils';
import { Connectivity } from '@/web3';
import { web3ErrorToStr } from '@/web3/errors';
import { getPubkeyFromStr } from '@/web3/utils';

import RevokeIcon from '~/svg/revoke.svg';

const RevokeMint = (): JSX.Element => {
  const wallet = useAnchorWallet();
  const notify = useNotification();

  const [address, setAddress] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [tx, setTx] = useState<string>('');

  const handleRevokeMint = async () => {
    if (!wallet || !wallet?.publicKey)
      return notify('Please connect wallet.', 'error');

    if (!address) return setIsError(true);

    const connectivity = new Connectivity({
      wallet,
      rpcEndpoint: ENV.RPC_ENDPOINT,
    });

    setIsCreating(true);

    const mint = getPubkeyFromStr(address.trim());
    if (!mint) return notify('Invalid token address', 'error');

    connectivity
      .revokeAuthority({ mint: mint.toBase58(), minting: true })
      .then((res) => {
        if (res?.Err) {
          const errorInto = web3ErrorToStr(res.Err);
          return notify(errorInto, 'error');
        }
        if (!res || !res?.Ok) {
          return notify('Tx was failed.', 'error');
        }
        setTx(res.Ok.txSignature);
        notify('Token minting authority successfully revoked', 'success');
        setIsCreating(true);
      })
      .catch((revokeAuthorityError) => {
        setIsCreating(true);
        if (ENV.LOG_ERROR) return notify(revokeAuthorityError, 'error');
      });
  };

  useEffect(() => {
    address && setIsError(false);
  }, [address]);

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
          error={isError ? 'Please input token address' : ''}
        />
      </div>

      <div className='mt-[10px] flex items-center justify-center gap-1'>
        <div className='text-sm font-semibold'>Service Fee:</div>
        <div className='text-main-200 text-sm font-semibold'>0.1 SOL</div>
      </div>

      {tx && (
        <div className='flex flex-col gap-4 py-5 text-sm'>
          <div className='flex items-center justify-between'>
            <div className=''>Transaction Hash:</div>
            <div className='text-text-100 flex gap-2'>
              {shortAddress(tx)} <Copy toCopy={tx} />
            </div>
          </div>
        </div>
      )}

      <div className='w-full'>
        <Button
          icon={<RevokeIcon className='h-5 w-5' />}
          className='w-full justify-center !text-base !font-semibold'
          loading={isCreating}
          disabled={isCreating}
          onClick={handleRevokeMint}
        >
          Revoke Mint Authority
        </Button>
      </div>
    </div>
  );
};

export default RevokeMint;
