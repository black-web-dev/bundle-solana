import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useMemo } from 'react';

export const WithWalletAdapter = (Component: any) => {
    return function WithWalletAdapterContext({ ...props }) {
        const solNetwork = WalletAdapterNetwork.Devnet;
        const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
        const wallets = useMemo(
            () => [
                new SolflareWalletAdapter(),
                new PhantomWalletAdapter(),
            ],
            [solNetwork]
        );
        return (
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect={false}>
                    <WalletModalProvider>
                        <Component {...props} />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        );
    }
}
export default WithWalletAdapter