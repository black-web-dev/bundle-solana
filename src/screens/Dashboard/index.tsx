import React, { useEffect, useRef } from 'react';

import Button from '@/components/common/button';

import LightningIcon from '~/svg/lightning.svg';
import Logo from '~/svg/logo.svg';
import LogoColor from '~/svg/logo-color.svg';

const DashboardScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      videoRef.current?.play();
    };
  }, []);

  return (
    <div className='mx-auto lg:mb-20 flex max-w-[750px] flex-col gap-10 px-[10px] py-6'>
      <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-5 rounded-2xl border p-[25px]'>
        <div className='font-CalSans text-text-300 flex w-full flex-wrap items-baseline gap-2 text-3xl tracking-[0.01em]'>
          <div>You're subscribed to</div>
          <div className='group flex cursor-pointer items-baseline'>
            <div className='relative overflow-hidden'>
              <Logo className='absoulte h-6 w-5 transition-all fill-text-300 group-hover:-translate-y-full' />
              <LogoColor className='absolute h-6 w-5 transition-all group-hover:-translate-y-full' />
            </div>
            <span>undle</span>
          </div>
          <div>Basic!</div>
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
            <div className='text-text-100 hover:text-text-200 cursor-pointer'>
              Upgrade Plan
            </div>
          </div>
        </div>
      </div>

      <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-5 rounded-2xl border p-[25px]'>
        <div className='flex w-full items-center justify-start gap-4'>
          <div className='font-CalSans text-text-300 text-3xl font-bold tracking-[0.01em]'>
            Analytics
          </div>
          <div>Coming Soon</div>
        </div>
      </div>

      <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-5 rounded-2xl border p-[25px]'>
        <div className='font-CalSans text-text-300 w-full flex-wrap text-3xl tracking-[0.01em]'>
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
        <div className='w-full lg:w-fit'>
          <Button
            icon={<LightningIcon classnName='w-5 h-5' />}
            className='w-full justify-center text-base lg:w-fit'
          >
            Bundle
          </Button>
        </div>
      </div>

      <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-5 rounded-2xl border p-[25px]'>
        <div className='border-border-100 relative h-full w-full rounded-2xl border p-[10px]'>
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
        <div className='font-CalSans text-text-300 w-full flex-wrap text-3xl tracking-[0.01em]'>
          Create a Solana Token in Minutes.
        </div>
        <div className='flex flex-col gap-5'>
          <p>
            Easily design and deploy SPL tokens in just minutes with our
            user-friendly token generator. Transform your concepts into
            reality—quickly, effortlessly, and effectively!
          </p>
        </div>
        <div className='w-full lg:w-fit'>
          <Button
            icon={<LightningIcon classnName='w-5 h-5' />}
            className='w-full justify-center text-base lg:w-fit'
          >
            Create Token
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
