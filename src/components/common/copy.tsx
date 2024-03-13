import React from 'react';

import useCopyClipboard from '@/hooks/useCopyClipboard';
import useNotification from '@/hooks/useNotification';

import CopyIcon from '~/svg/copy.svg';
import CopyCheckIcon from '~/svg/copy-check.svg';

export default function Copy(props: {
  toCopy: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const [isCopied, setCopied] = useCopyClipboard();
  const notification = useNotification();

  return (
    <div
      className={`${props.className || ''} cursor-pointer`}
      onClick={() => {
        setCopied(props.toCopy);
        notification('Copied on clipboard.', 'success');
      }}
    >
      {isCopied ? (
        <div className='flex items-center'>
          <CopyCheckIcon className='h-4 w-4 fill-text-200' />
          {props.children || null}
        </div>
      ) : (
        <div className='flex items-center'>
          <CopyIcon className='h-4 w-4 fill-text-100' />
          {props.children || null}
        </div>
      )}
    </div>
  );
}
