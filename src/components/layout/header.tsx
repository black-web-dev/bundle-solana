import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { menus } from '@/contants';

import Wallet from '../wallet';

import { MenuType } from '@/types';

import Logo from '~/svg/logo.svg';
import LogoColor from '~/svg/logo-color.svg';

const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='sticky top-0 z-10 w-full backdrop-blur-lg lg:h-fit'>
      <div className='mx-4 flex flex-col gap-[18px] pb-[10px] pt-5 lg:mx-[72px] lg:py-5'>
        <div className='flex items-center justify-between'>
          <div className='group flex cursor-pointer items-baseline'>
            <div className='relative overflow-hidden'>
              <Logo className='absoulte fill-text-100 h-9 w-7 transition-all group-hover:-translate-y-full' />
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
          <div className='flex items-center gap-4'>
            <div
              className='relative h-[30px] w-[30px] cursor-pointer overflow-hidden lg:hidden'
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                className={clsx(
                  'bg-text-100 absolute left-[calc(50%_-_24px_/_2)] h-[2px] w-[24px] origin-center rounded-sm transition-all',
                  isOpen
                    ? 'top-[calc(50%_-_2px_/_2)] rotate-45'
                    : 'top-[10px] transform-none'
                )}
              ></div>
              <div
                className={clsx(
                  'bg-text-100 absolute left-[calc(50%_-_24px_/_2)] h-[2px] w-[24px] origin-center rounded-sm transition-all',
                  isOpen
                    ? 'top-[calc(50%_-_2px_/_2)] -rotate-45'
                    : 'bottom-[10px] transform-none'
                )}
              ></div>
            </div>
            <Wallet />
          </div>
        </div>
        {isOpen && (
          <div className='flex items-center justify-center gap-4 lg:hidden'>
            {menus
              .filter((item) => item.sub.length === 0)
              .map((menu, i) => (
                <Menu key={i} menu={menu} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

const Menu = ({ menu }: { menu: MenuType }): JSX.Element => {
  const { pathname } = useRouter();
  return (
    <div className='group relative'>
      <Link href={menu.href}>
        <div className='flex items-center gap-2 py-2'>
          <div className={clsx('hover:text-text-400', pathname === menu.href && 'text-text-300')}>{menu.title}</div>
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
