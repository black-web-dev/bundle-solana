import { useAnchorWallet } from '@solana/wallet-adapter-react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import * as Yup from 'yup';

import useNotification from '@/hooks/useNotification';

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Switch from '@/components/common/switch';
import TextArea from '@/components/common/textarea';

import { ENV } from '@/configs';
import { exploreLink, shortAddress } from '@/utils';
import { Connectivity, CreateTokenInput } from '@/web3';
import { deployDataToIPFS } from '@/web3/base/utils';
import { web3ErrorToStr } from '@/web3/errors';

import LightningIcon from '~/svg/lightning.svg';
import LinkIcon from '~/svg/link.svg';
import SolanaIcon from '~/svg/solana.svg';
import UploadIcon from '~/svg/upload.svg';

const TokenInformation = (): JSX.Element => {
  const wallet = useAnchorWallet();
  const notify = useNotification();

  const inputRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File>();

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isLogoUrl, setIsLogoUrl] = useState<boolean>(false);
  const [isIpfs, setIsIpfs] = useState<boolean>(false);
  const [isLink, setIsLink] = useState<boolean>(false);
  const [createTokenInfo, setCreateTokenInfo] = useState<{
    address: string;
    tx: string;
  }>();

  const [inputData, _] = useState<CreateTokenInput>({
    name: '',
    symbol: '',
    image: '',
    description: '',
    decimals: 9,
    supply: 0,
    immutable: false,
    revokeMint: false,
    revokeFreeze: false,
    socialLinks: {
      discord: '',
      telegram: '',
      twitter: '',
      website: '',
    },
  });

  const SocialLinksSchema = Yup.object().shape({
    discord: Yup.string().default(''),
    telegram: Yup.string().default(''),
    twitter: Yup.string().default(''),
    website: Yup.string().default(''),
  });

  const validationSchema: Yup.Schema<CreateTokenInput> = Yup.object().shape({
    name: Yup.string().required('Token name is required.'),
    symbol: Yup.string().required('Token name is required.'),
    image: Yup.string().default(''),
    description: Yup.string().default(''),
    decimals: Yup.number()
      .min(1, 'Decimals should be above 0')
      .max(18, 'Decimals should be below 18')
      .default(9),
    supply: Yup.number()
      .required('Supply is required')
      .min(1, 'Supply should be above 0'),
    immutable: Yup.boolean().default(false),
    revokeMint: Yup.boolean().default(false),
    revokeFreeze: Yup.boolean().default(false),
    socialLinks: SocialLinksSchema,
  });

  const handleCreateToken = useCallback(
    async (value: CreateTokenInput) => {
      if (!wallet || !wallet?.publicKey)
        return notify('Please connect wallet.', 'error');

      const connectivity = new Connectivity({
        wallet,
        rpcEndpoint: ENV.RPC_ENDPOINT,
      });

      setIsCreating(true);

      if (logoFile) {
        const formData = new FormData();
        formData.append('file', logoFile);

        const ipfsHash = await deployDataToIPFS(formData, 'File');
        if (ipfsHash)
          value.image = `https://${ENV.PINATA_DOMAIN}/ipfs/${ipfsHash}`;
      }

      connectivity
        .createToken(value)
        .then((res) => {
          if (res?.Err) {
            const errorInto = web3ErrorToStr(res.Err);
            return notify(errorInto, 'error');
          }
          if (!res || !res?.Ok) {
            return notify('Tx was failed.', 'error');
          }

          setCreateTokenInfo({
            address: res.Ok.tokenAddress,
            tx: res.Ok.txSignature,
          });

          notify('Token successfully created', 'success');
          setIsCreating(false);
        })
        .catch((createTokenError) => {
          if (ENV.LOG_ERROR) console.log({ createTokenError });
          setIsCreating(false);
        })
        .finally(() => {
          setIsCreating(false);
        });
    },
    [logoFile, notify, wallet]
  );

  const openFileBrowser = (e: React.MouseEvent<HTMLElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
    e.stopPropagation();
  };

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    file && setLogoFile(file);
  };

  const formik = useFormik({
    initialValues: inputData,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleCreateToken,
  });

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
        <p>
          Easily create and mint your own SPL Token without any coding.
          Customize the metadata, supply, and add logo. Try it out for free on
          Solana testnet and devnet!
        </p>
        <div className='flex items-center justify-between text-sm xl:hidden'>
          <div>Only Need to Revoke Authorities?</div>
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

        <form
          onSubmit={formik.handleSubmit}
          className='flex w-full flex-col gap-2'
        >
          <div className='grid grid-cols-1 gap-x-10 gap-y-8 xl:grid-cols-2'>
            <Input
              label='Token Name'
              placeholder='Solana'
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue('name', e.target.value)}
              error={formik.errors.name}
            />
            <Input
              label='Token Symbol'
              placeholder='SOL'
              value={formik.values.symbol}
              onChange={(e) => formik.setFieldValue('symbol', e.target.value)}
              error={formik.errors.symbol}
            />
            <Input
              label='Decimals'
              placeholder='9'
              value={formik.values.decimals}
              onChange={(e) => formik.setFieldValue('decimals', e.target.value)}
              error={formik.errors.decimals}
              tooltip='Decimals'
            />
            <Input
              label='Token Supply'
              placeholder='1000 000 000'
              value={formik.values.supply}
              onChange={(e) => formik.setFieldValue('supply', e.target.value)}
              error={formik.errors.supply}
              tooltip='Token Supply'
            />
          </div>
          <div className='w-ful h-[10px]'></div>
          <div className='grid grid-cols-1 gap-x-10 gap-y-8 xl:grid-cols-2'>
            <Switch
              label='Revoke Mint'
              description='Revoking Mint Authority sets a fixed supply cap by stopping further token minting.'
              checked={!!formik.values.revokeMint}
              onChange={() =>
                formik.setFieldValue('revokeMint', !formik.values.revokeMint)
              }
            />
            <Switch
              label='Revoke Freeze'
              description='Revoking Freeze Authority prevents locking token transfers.'
              checked={!!formik.values.revokeFreeze}
              onChange={() =>
                formik.setFieldValue(
                  'revokeFreeze',
                  !formik.values.revokeFreeze
                )
              }
            />
            <Switch
              label='Immutable'
              description='If toggled on, it means you will not be able to update your token metadata.'
              checked={!!formik.values.immutable}
              onChange={() =>
                formik.setFieldValue('immutable', !formik.values.immutable)
              }
            />
            <Switch
              label='IPFS MetaData'
              tooltip='IPFS MetaData'
              description='Upload metadata to IPFS (recommended)'
              checked={!!isIpfs}
              onChange={() => setIsIpfs(!isIpfs)}
            />
            <div className='flex flex-col xl:pb-10'>
              <Switch
                label='Logo Upload'
                afterLabel='Logo URL'
                description='Upload Your Logo:  Choose to upload a file directly or enter an image URL'
                checked={isLogoUrl}
                onChange={() => setIsLogoUrl(!isLogoUrl)}
              />
            </div>
            {isLogoUrl ? (
              <Input
                placeholder='Enter image URL'
                value={formik.values.image}
                onChange={(e) => formik.setFieldValue('image', e.target.value)}
              />
            ) : (
              <div className='flex items-center justify-center'>
                <div className='bg-bg-400 border-border-100 group relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-2xl border p-[3px]'>
                  {logoFile && (
                    <Image
                      className='rounded-2xl'
                      src={URL.createObjectURL(logoFile)}
                      fill
                      alt='logo'
                    />
                  )}
                  <div
                    className={clsx(
                      'absolute flex h-full w-full items-center justify-center rounded-2xl transition-all hover:bg-[#6b6b6bc4]',
                      logoFile && 'hidden group-hover:flex'
                    )}
                    onClick={openFileBrowser}
                  >
                    <UploadIcon className='text-bg-100 h-[50px] w-[50px]' />
                  </div>
                  <input
                    ref={inputRef}
                    style={{ display: 'none' }}
                    accept='.jpg, .jpeg, .png'
                    type='file'
                    name='file'
                    onChange={handleAddFile}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <TextArea
              label='Description'
              placeholder='Write something about your token.'
              value={formik.values.description}
              onChange={(v) => formik.setFieldValue('description', v)}
            />
          </div>

          <div className='w-ful h-[10px]'></div>

          <div>
            <Switch
              label='Add Social Links'
              checked={isLink}
              onChange={() => setIsLink(!isLink)}
            />
            {isLink && (
              <div className='grid grid-cols-1 gap-x-10 gap-y-4 xl:grid-cols-2'>
                <Input
                  label='Website'
                  labelclassname='!text-sm !text-text-200'
                  placeholder='www.'
                  value={formik.values.socialLinks?.website}
                  onChange={(v) =>
                    formik.setFieldValue('socialLinks', {
                      ...formik.values.socialLinks,
                      website: v.target.value,
                    })
                  }
                />
                <Input
                  label='Twitter'
                  labelclassname='!text-sm !text-text-200'
                  placeholder='twitter.com/'
                  value={formik.values.socialLinks?.twitter}
                  onChange={(v) =>
                    formik.setFieldValue('socialLinks', {
                      ...formik.values.socialLinks,
                      twitter: v.target.value,
                    })
                  }
                />
                <Input
                  label='Telegram'
                  labelclassname='!text-sm !text-text-200'
                  placeholder='t.me/'
                  value={formik.values.socialLinks?.telegram}
                  onChange={(v) =>
                    formik.setFieldValue('socialLinks', {
                      ...formik.values.socialLinks,
                      telegram: v.target.value,
                    })
                  }
                />
                <Input
                  label='Discord'
                  labelclassname='!text-sm !text-text-200'
                  placeholder='discord.gg/'
                  value={formik.values.socialLinks?.discord}
                  onChange={(v) =>
                    formik.setFieldValue('socialLinks', {
                      ...formik.values.socialLinks,
                      discord: v.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>

          <div className='mt-5 flex items-center justify-center gap-1'>
            <div className='text-sm font-semibold'>Service Fee:</div>
            <div className='text-main-200 text-sm font-semibold'>0.4 SOL</div>
          </div>

          {createTokenInfo && (
            <div className='flex flex-col gap-4 py-5 text-sm'>
              <div className='flex items-center justify-between'>
                <div className=''>Token Address:</div>
                <div className='text-text-100 flex gap-2 items-center hover:text-main-100'>
                  <Link href={exploreLink(createTokenInfo.address, 'token')} target='_blank'>{shortAddress(createTokenInfo.address)}</Link>
                  <LinkIcon className='stroke-text-200' />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className=''>Transaction Hash:</div>
                <div className='text-text-100 flex gap-2 items-center hover:text-main-100'>
                  <Link href={exploreLink(createTokenInfo.tx, 'tx')} target='_blank'>{shortAddress(createTokenInfo.tx)}</Link>
                  <LinkIcon className='stroke-text-200' />
                </div>
              </div>
            </div>
          )}

          <div className='w-full'>
            <Button
              type='submit'
              icon={<LightningIcon className='h-5 w-5' />}
              className='w-full justify-center !text-base !font-semibold'
              loading={isCreating}
              disabled={isCreating}
            >
              Create Token
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TokenInformation;
