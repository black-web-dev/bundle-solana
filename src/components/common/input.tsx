import clsx from 'clsx';
import React, { InputHTMLAttributes, ReactNode } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  password?: string;
  afterPrefix?: string | ReactNode;
  required?: boolean;
  tooltip?: string;
}

const Input = (props: InputProps): JSX.Element => {
  return (
    <div className='flex w-full flex-col gap-y-[6px]'>
      {props.label && (
        <label
          htmlFor={props.label}
          className={clsx(
            'text-text-500 text-base xl:text-[19px] flex items-center capitalize',
            props.labelClassName
          )}
        >
          <span>{props.label}</span>
          {props.required && <span className='text-main-100'>*</span>}
          {props.tooltip && (
            <div className='group relative'>
              <AiOutlineExclamationCircle className='ml-1 h-4 w-4' />
              <div className='bg-bg-200 absolute left-full text-sm ml-1 -translate-y-1/2 border-border-100 hidden rounded-lg border p-4 group-hover:block whitespace-nowrap'>
                {props.tooltip}
              </div>
            </div>
          )}
        </label>
      )}
      <div className='flex items-center'>
        <input
          className='bg-bg-400 font-ClashDisplay text-text-100 block w-full rounded-lg border-none p-[15px] text-base leading-none tracking-normal placeholder:text-[#1d1d1d] focus:outline-0 focus:ring-0'
          {...props}
        />
        {props.afterPrefix && (
          <div className='text-text-500'>{props.afterPrefix}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
