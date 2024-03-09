import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { menus } from '@/contants';

import Wallet from '../wallet';

import { MenuType } from '@/types';

import Logo from '~/svg/logo.svg';
import LogoColor from '~/svg/logo-color.svg';

const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        'top-0 z-10 w-full backdrop-blur-lg lg:h-fit',
        isOpen ? 'fixed h-full' : 'sticky'
      )}
    >
      <div className='mx-8 py-5 lg:mx-14'>
        <div className='flex items-center justify-between'>
          <div className='group flex cursor-pointer items-baseline'>
            <div className='relative overflow-hidden'>
              <Logo className='absoulte h-9 w-7 transition-all group-hover:-translate-y-full' />
              <LogoColor className='absolute h-9 w-7 transition-all group-hover:-translate-y-full' />
            </div>
            <span className='text-text-100 font-CalSans h-0 text-[41px] font-bold'>
              undle
            </span>
          </div>
          <div className='hidden items-center gap-6 text-lg font-semibold lg:flex'>
            {menus.map((menu, i) => (
              <Menu key={i} menu={menu} />
            ))}
          </div>
          <div className='flex gap-4'>
            <div className='hidden sm:block'>
              <Wallet />
            </div>
            <button
              className='text-text-100 relative inline-flex items-center justify-center rounded-lg hover:text-white focus:outline-none focus:ring-0 lg:hidden'
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className='absolute -inset-0.5' />
              <span className='sr-only'>Open main menu</span>
              {isOpen ? (
                <AiOutlineClose className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <FaBars className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className={clsx(
              'transition-all lg:hidden',
              isOpen
                ? 'max-h-full translate-y-0 opacity-100'
                : 'max-h-0 -translate-y-full opacity-0'
            )}
          >
            <div
              className={clsx(
                'flex flex-col items-start justify-between gap-4 py-5'
              )}
            >
              {menus.map((menu, i) => (
                <Menu key={i} menu={menu} />
              ))}
              <div className='sm:hidden'>
                <Wallet />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

const Menu = ({ menu }: { menu: MenuType }): JSX.Element => {
  return (
    <div className='group relative'>
      <Link href={menu.href}>
        <div className='flex items-center gap-2 py-2'>
          <div>{menu.title}</div>
          {menu.sub.length > 0 && <MdOutlineKeyboardArrowDown />}
        </div>
      </Link>
      {menu.sub.length > 0 && (
        <div className='absolute hidden w-max grid-cols-2 gap-4 rounded-lg bg-[#efefef] px-6 py-10 text-base font-semibold hover:grid group-hover:grid'>
          {menu.sub.map((submenu, i) => (
            <Menu key={i} menu={submenu} />
          ))}
        </div>
      )}
    </div>
  );
};
