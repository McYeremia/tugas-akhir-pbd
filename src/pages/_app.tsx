import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';

import { config } from '../wagmi';

// Ekstrak ulang chains dari config agar bisa dipakai
const chains = config.chains;

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;



// import '../styles/globals.css';
// import '@rainbow-me/rainbowkit/styles.css';
// import type { AppProps } from 'next/app';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { WagmiProvider } from 'wagmi';
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

// import { config } from '../wagmi';

// const client = new QueryClient();

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={client}>
//         <RainbowKitProvider>
//           <Component {...pageProps} />
//         </RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }

// export default MyApp;
