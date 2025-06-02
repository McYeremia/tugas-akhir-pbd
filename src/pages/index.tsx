import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Taranium Wallet Connect</title>
        <meta name="description" content="Connect your wallet to Taranium network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          🔗 Connect to <span className={styles.gradient}>Taranium</span>
        </h1>

        <p className={styles.description}>
          Use the button below to connect your wallet and start exploring the Taranium network.
        </p>

        <div style={{ margin: '2rem 0' }}>
          <ConnectButton
            chainStatus="icon"
            showBalance={true}
            accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
          />
        </div>

        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h2>Why Taranium?</h2>
            <p>Fast, secure, and developer-friendly blockchain for modern DApps.</p>
          </div>
          <div className={styles.card}>
            <h2>Tech Stack</h2>
            <p>Powered by Next.js, RainbowKit, wagmi, and EVM compatibility.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>💡 Built with RainbowKit & Next.js · 2025</p>
      </footer>
    </div>
  );
};

export default Home;
