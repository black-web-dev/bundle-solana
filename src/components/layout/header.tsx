import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { menus } from '@/contants';

import Wallet from '../wallet';

import { MenuType } from '@/types';

import Logo from '~/svg/logo.svg';
import LogoColor from '~/svg/logo-color.svg';

const Header = (): JSX.Element => {
  return (
    <div className='sticky top-0 mx-14 flex items-center justify-between py-5 backdrop-blur-lg'>
      <div className='group flex cursor-pointer items-baseline'>
        <div className='relative overflow-hidden'>
          <Logo className='absoulte h-9 w-7 transition-all group-hover:-translate-y-full' />
          <LogoColor className='absolute h-9 w-7 transition-all group-hover:-translate-y-full' />
        </div>
        <span className='text-text-100 font-CalSans h-0 text-[41px] font-bold'>
          undle
        </span>
      </div>
      <div className='flex items-center gap-6 text-lg font-semibold'>
        {menus.map((menu, i) => (
          <Menu key={i} menu={menu} />
        ))}
      </div>
      <div className='pr-4'>
        <Wallet />
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
