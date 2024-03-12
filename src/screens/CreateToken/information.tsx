import Image from 'next/image';
import React, { useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Switch from '@/components/common/switch';
import TextArea from '@/components/common/textarea';

import LightningIcon from '~/svg/lightning.svg';
import SolanaIcon from '~/svg/solana.svg';
import UploadIcon from '~/svg/upload.svg';

import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { Connectivity, CreateTokenInput } from '@/web3';
import { ENV } from '@/web3/constants';
import { Web3Error, web3ErrorToStr } from '@/web3/errors';

const TokenInformation = (): JSX.Element => {
  const wallet = useAnchorWallet()! //TODO: need to handle it is undefined
  const connectivity = new Connectivity({ wallet, rpcEndpoint: ENV.RPC_ENDPOINT })
  const [inputData, setInputData] = useState({
    name: '',
    symbol: '',
    decimals: 9,
    supply: '',
    revokeMint: false,
    revokeFreeze: false,
    immutable: false,
    ipfs: true,
    isLogoUrl: false,
    logoUrl: '',
    isShowSample: false,
    description: '',
    isLink: true,
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
  });

  const handleCreateToken = async () => {
    const log = console.log;
    const user = wallet?.publicKey
    if (!user) {
      //TODO: handle if wallet is not connected
      log("wallet not connected")
      return
    }
    const { name, symbol, logoUrl, decimals, description, discord, telegram, twitter, website, immutable, revokeFreeze, revokeMint } = inputData
    const supply = Number(inputData.supply)
    if (Number.isNaN(supply)) {
      //TODO: verify supply values entered by the user 
      if (ENV.LOG_ERROR) log("Invalid supply amount")
      return
    }
    if (Number.isNaN(decimals) || (decimals < 0 || decimals > 18)) {
      //TODO: verify token decimals values
      if (ENV.LOG_ERROR) log("Invalid decimals value")
      return
    }
    const input: CreateTokenInput = {
      name,
      symbol,
      image: logoUrl,
      description,
      decimals,
      supply,
      immutable,
      revokeMint,
      revokeFreeze,
      socialLinks: {
        discord,
        telegram,
        twitter,
        website
      },
    }
    const res = await connectivity.createToken(input).catch((createTokenError) => {
      if (ENV.LOG_ERROR) log({ createTokenError })
      return null
    })
    if (res?.Err) {
      const errorInto = web3ErrorToStr(res.Err)
      log({ errorInto })
      //TODO: handle error reason
      return
    }
    if (!res || !res?.Ok) {
      //TODO: handle tx failed msg(pop up like)
      return
    }
    // Success
    //TODO: success
    const { txSignature, tokenAddress } = res.Ok
    log("Token successfully created")
    log({ tokenAddress, txSignature })
  }

  return (
    <div className='border-border-100 bg-bg-300 flex flex-col items-center gap-[10px] rounded-2xl border p-[10px]'>
      <div className='border-border-100 flex w-full flex-col gap-[10px] rounded-t-2xl border px-[10px] py-[20px]'>
        <div className='flex items-center justify-between gap-5'>
          <div className='flex items-center gap-5'>
            <SolanaIcon className='fill-text-300 h-[70px] w-[70px] xl:h-10 xl:w-10' />
            <div className='font-CalSans text-text-300 text-3xl font-bold tracking-[0.01em]'>
              Solana Token Creator
            </div>
            <div className='hidden text-sm xl:block'>
              Only Need to Revoke Authorities?
            </div>
          </div>
          <div className='group hidden items-center gap-1 xl:flex'>
            <div className='text-text-300 text-sm'>Revoke</div>
            <IoChevronDownOutline className='transition-all group-hover:-rotate-180' />
          </div>
        </div>
        <p className='text-sm'>
          Easily create and mint your own SPL Token without any coding.
          Customize the metadata, supply, and add logo. Try it out for free on
          Solana testnet and devnet!
        </p>
        <div className='flex items-center justify-between'>
          <div className='text-sm xl:hidden'>
            Only Need to Revoke Authorities?
          </div>
          <div className='group flex items-center gap-1'>
            <div className='text-text-300 text-sm'>Revoke</div>
            <IoChevronDownOutline className='transition-all group-hover:-rotate-180' />
          </div>
        </div>
      </div>

      <div className='border-border-100 flex w-full flex-col gap-[10px] rounded-b-2xl border px-[10px] py-[20px]'>
        <div className='font-CalSans text-text-300 text-3xl font-bold tracking-[0.01em]'>
          Token Information
        </div>
        <div className='w-ful h-[10px]'></div>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-8'>
          <Input
            label='Token Name'
            required
            placeholder='Solana'
            value={inputData.name}
            onChange={(e) =>
              setInputData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            label='Token Symbol'
            required
            placeholder='SOL'
            value={inputData.symbol}
            onChange={(e) =>
              setInputData((prev) => ({ ...prev, symbol: e.target.value }))
            }
          />
          <Input
            label='Decimals'
            required
            placeholder='9'
            value={inputData.decimals}
            onChange={(e) =>
              setInputData((prev) => ({
                ...prev,
                decimals: Number(e.target.value),
              }))
            }
            tooltip='Decimals'
          />
          <Input
            label='Token Supply'
            required
            placeholder='1000 000 000'
            value={inputData.supply}
            onChange={(e) =>
              setInputData((prev) => ({
                ...prev,
                supply: e.target.value,
              }))
            }
            tooltip='Token Supply'
          />
        </div>
        <div className='w-ful h-[10px]'></div>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-8'>
          <Switch
            label='Revoke Mint'
            description='Revoking Mint Authority sets a fixed supply cap by stopping further token minting.'
            checked={inputData.revokeMint}
            onChange={() =>
              setInputData((prev) => ({
                ...prev,
                revokeMint: !inputData.revokeMint,
              }))
            }
          />
          <Switch
            label='Revoke Freeze'
            description='Revoking Freeze Authority prevents locking token transfers.'
            checked={inputData.revokeFreeze}
            onChange={() =>
              setInputData((prev) => ({
                ...prev,
                revokeFreeze: !inputData.revokeFreeze,
              }))
            }
          />
          <Switch
            label='Immutable'
            description='If toggled on, it means you will not be able to update your token metadata.'
            checked={inputData.immutable}
            onChange={() =>
              setInputData((prev) => ({
                ...prev,
                immutable: !inputData.immutable,
              }))
            }
          />
          <Switch
            label='IPFS MetaData'
            tooltip='IPFS MetaData'
            description='Upload metadata to IPFS (recommended)'
            checked={inputData.ipfs}
            onChange={() =>
              setInputData((prev) => ({
                ...prev,
                ipfs: !inputData.ipfs,
              }))
            }
          />
          <div className='flex flex-col xl:pb-10'>
            <Switch
              label='Logo Upload'
              afterLabel='Logo URL'
              description='Upload Your Logo:  Choose to upload a file directly or enter an image URL'
              checked={inputData.isLogoUrl}
              onChange={() =>
                setInputData((prev) => ({
                  ...prev,
                  isLogoUrl: !inputData.isLogoUrl,
                }))
              }
            />
          </div>
          {inputData.isLogoUrl ? (
            <Input
              placeholder='Enter image URL'
              value={inputData.logoUrl}
              onChange={(e) =>
                setInputData((prev) => ({ ...prev, logoUrl: e.target.value }))
              }
            />
          ) : (
            <div className='flex items-center justify-center'>
              <div className='bg-bg-400 border-border-100 relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-2xl border p-[3px] transition-all hover:bg-[#6b6b6bc4]'>
                {inputData.isShowSample && (
                  <Image
                    className='rounded-2xl'
                    src='https://framerusercontent.com/images/RWlK2O3nC476LqynY7XLRfSXhhw.png'
                    width={100}
                    height={100}
                    alt='logo'
                  />
                )}
                <div
                  className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl transition-all hover:bg-[#6b6b6bc4]'
                  onClick={() =>
                    setInputData((prev) => ({
                      ...prev,
                      isShowSample: !inputData.isShowSample,
                    }))
                  }
                >
                  <UploadIcon className='text-bg-100 h-[50px] w-[50px]' />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <TextArea
            label='Description'
            placeholder='Write something about your token.'
            value={inputData.description}
            onChange={(e) =>
              setInputData((prev) => ({ ...prev, description: e }))
            }
          />
        </div>

        <div className='w-ful h-[10px]'></div>

        <div>
          <Switch
            label='Add Social Links'
            checked={inputData.isLink}
            onChange={() =>
              setInputData((prev) => ({
                ...prev,
                isLink: !inputData.isLink,
              }))
            }
          />
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-4'>
          <Input
            label='Website'
            labelClassName='text-sm text-text-200'
            placeholder='www.'
            value={inputData.website}
            onChange={(e) =>
              setInputData((prev) => ({ ...prev, website: e.target.value }))
            }
          />
          <Input
            label='Twitter'
            labelClassName='text-sm text-text-200'
            placeholder='twitter.com/'
            value={inputData.twitter}
            onChange={(e) =>
              setInputData((prev) => ({ ...prev, twitter: e.target.value }))
            }
          />
          <Input
            label='Telegram'
            labelClassName='text-sm text-text-200'
            placeholder='t.me/'
            value={inputData.telegram}
            onChange={(e) =>
              setInputData((prev) => ({ ...prev, telegram: e.target.value }))
            }
          />
          <Input
            label='Discord'
            labelClassName='text-sm text-text-200'
            placeholder='discord.gg/'
            value={inputData.discord}
            onChange={(e) =>
              setInputData((prev) => ({ ...prev, discord: e.target.value }))
            }
          />
        </div>

        <div className='mt-5 flex items-center justify-center gap-1'>
          <div className='text-sm font-semibold'>Service Fee:</div>
          <div className='text-main-200 text-sm font-semibold'>0.4 SOL</div>
        </div>

        <div className='w-full'>
          <Button
            icon={<LightningIcon classnName='w-5 h-5' />}
            className='w-full justify-center !text-base !font-semibold'
            onClick={handleCreateToken}
          >
            Create Token
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenInformation;
