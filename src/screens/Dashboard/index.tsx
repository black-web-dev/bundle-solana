import React, { useEffect, useRef } from 'react';
import { BsStars } from 'react-icons/bs';
import { BsLightningCharge } from 'react-icons/bs';

import Button from '@/components/common/button';

const DashboardScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      videoRef.current?.play();
    };
  }, []);

  return (
    <div className='mx-auto mb-20 flex max-w-[750px] flex-col gap-10 py-6 text-xl'>
      <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-5 rounded-2xl border p-[25px]'>
        <div className='font-CalSans text-text-100 w-full text-3xl font-bold'>
          You're subscribed to Bundle Basic!
        </div>
        <div className='flex w-full max-w-[320px] flex-col gap-1'>
          <div className='text-text-100 font-semibold'>Your Plan Includes:</div>
          <div className='flex items-center justify-between'>
            <div>Bundles</div>
            <div>10 per month</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Remaining</div>
            <div>7</div>
          </div>
          <div className='bg-border-100 h-[1px] w-full'></div>
          <div className='flex items-center justify-between'>
            <div>Token Creations</div>
            <div>15 per month</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Remaining</div>
            <div>11</div>
          </div>
          <div className='bg-border-100 h-[1px] w-full'></div>
          <div className='flex items-center justify-between'>
            <div>Need More?</div>
            <div className='text-text-100 hover:text-text-200 cursor-pointer'>Upgrade Plan</div>
          </div>
        </div>
      </div>

      <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-5 rounded-2xl border p-[25px]'>
        <div className='flex w-full items-center justify-start gap-4'>
          <div className='font-CalSans text-text-100 text-3xl font-bold'>
            Analytics
          </div>
          <div>Comming Soon</div>
        </div>
      </div>

      <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-5 rounded-2xl border p-[25px]'>
        <div className='font-CalSans text-text-100 w-full text-3xl font-bold'>
          Buy Your Token First, Guaranteed.
        </div>
        <div className='flex flex-col gap-5'>
          <p>
            Bundling your add liquidity transaction with token swaps guarantees
            that you can buy your token before anyone else.
          </p>
          <p>
            Get the best odds for success with our easy to use bundler. Bundle
            your own contract or generate a new SPL token in our bundler Dapp.
          </p>
        </div>
        <div>
          <Button icon={<BsLightningCharge />} className='text-base'>
            Bundle
          </Button>
        </div>
      </div>

      <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-5 rounded-2xl border p-[25px]'>
        <div className='border-border-100 relative h-full w-full rounded-2xl border p-5'>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload=''
            className='rounded-2xl'
            ref={videoRef}
          >
            <source src='/videos/mint.mp4' type='video/mp4' />
          </video>
        </div>
        <div className='font-CalSans text-text-100 w-full text-3xl font-bold'>
          Create a Solana Token in Minutes.
        </div>
        <div className='flex flex-col gap-5'>
          <p>
            Easily design and deploy SPL tokens in just minutes with our
            user-friendly token generator. Transform your concepts into
            reality—quickly, effortlessly, and effectively!
          </p>
        </div>
        <div>
          <Button icon={<BsStars />} className='text-base'>
            Create Token
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
