import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zkSync,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, zkSync],
    [
      publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
  appName: 'ERC20 Approve',
  projectId: 'ecc67d501387ee336c175d07ea7c5009',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function App({ Component, pageProps }: AppProps) {
  return (
      <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
                <Component {...pageProps} />
          </RainbowKitProvider>
      </WagmiConfig>
    )
}