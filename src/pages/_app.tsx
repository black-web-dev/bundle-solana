import '@/styles/globals.css';
import '@/styles/colors.css';

import Base from '@/components/common/base';
import WithLoading from '@/components/common/withLoading';
import WithWalletAdapter from '@/components/web3/walletAdapterContext';
require('@solana/wallet-adapter-react-ui/styles.css');
export default WithWalletAdapter(WithLoading(Base))
