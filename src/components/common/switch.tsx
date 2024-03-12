import clsx from 'clsx';
import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

export interface InputProps {
  label?: string;
  afterLabel?: string;
  labelClassName?: string;
  tooltip?: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}

const Switch = (props: InputProps): JSX.Element => {
  return (
    <div className='flex w-full flex-col gap-y-[6px]'>
      {props.label && (
        <label
          htmlFor={props.label}
          className={clsx(
            'text-text-500 flex items-center gap-2 text-base capitalize xl:text-[19px]',
            props.labelClassName
          )}
        >
          <span>{props.label}</span>
          {props.tooltip && (
            <div className='group relative'>
              <AiOutlineExclamationCircle className='h-4 w-4' />
              <div className='bg-bg-200 border-border-100 absolute left-full ml-1 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border p-4 text-sm group-hover:block'>
                {props.tooltip}
              </div>
            </div>
          )}
          <div
            className={clsx(
              'relative flex h-6 w-11 cursor-pointer items-center rounded-full border p-[1px]',
              props.checked
                ? 'border-main-100 bg-main-100/20'
                : 'border-text-400 bg-bg-400'
            )}
            onClick={() => props.onChange()}
          >
            <div
              className={clsx(
                'absolute left-[1px] h-5 w-5 rounded-full transition-all',
                props.checked ? 'bg-main-100 translate-x-full' : 'bg-text-200'
              )}
            />
          </div>
          {props.afterLabel && <span>{props.afterLabel}</span>}
        </label>
      )}
      <div className='text-text-400 flex items-center text-sm'>
        {props.description}
      </div>
    </div>
  );
};

export default Switch;
