import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Chain } from 'wagmi/chains';
const taranium: Chain = {
  id: 9924,
  name: 'TARANIUM',
  nativeCurrency: {
    name: 'TARAN',
    symbol: 'TARAN',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.taranium.com'],
    },
    public: {
      http: ['https://testnet-rpc.taranium.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Taranium Explorer',
      url: 'https://testnet-scan.taranium.com',
    },
  },
  testnet: true,
};
export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    taranium,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});