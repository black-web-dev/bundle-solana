import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import LoadingIndicator from '@/components/common/loadingIndicator';
import Layout from '@/components/layout';

export interface IBaseProps {
  title?: string;
  description?: string | null;
  session: Session;
}

function Base<P>({
  Component,
  pageProps,
}: {
  Component: typeof React.Component;
  pageProps: P & IBaseProps;
}): JSX.Element {
  const { description, title } = pageProps;

  return (
    // <React.StrictMode>
    <>
      <Head>
        <title>{`${title ? `${title} | ` : ''} Bundle`}</title>
        {description && <meta name='description' content={description} />}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover'
        />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      </Head>
      <LoadingIndicator />

      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <SnackbarProvider
          preventDuplicate
          autoHideDuration={2000}
          dense
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </SessionProvider>

      <Analytics />
    </>
    // </React.StrictMode>
  );
}

export default Base;
