// // import { ConnectButton } from '@rainbow-me/rainbowkit';
// // import type { NextPage } from 'next';
// // import Head from 'next/head';
// // import styles from '../styles/Home.module.css';

// // const Home: NextPage = () => {
// //   return (
// //     <div className={styles.container}>
// //       <Head>
// //         <title>Taranium Wallet Connect</title>
// //         <meta name="description" content="Connect your wallet to Taranium network" />
// //         <link rel="icon" href="/favicon.ico" />
// //       </Head>

// //       <main className={styles.main}>
// //         <h1 className={styles.title}>
// //           🔗 Connect to <span className={styles.gradient}>Taranium</span>
// //         </h1>

// //         <p className={styles.description}>
// //           Use the button below to connect your wallet and start exploring the Taranium network.
// //         </p>

// //         <div style={{ margin: '2rem 0' }}>
// //           <ConnectButton
// //             chainStatus="icon"
// //             showBalance={true}
// //             accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
// //           />
// //         </div>

// //         <div className={styles.cardsContainer}>
// //           <div className={styles.card}>
// //             <h2>Why Taranium?</h2>
// //             <p>Fast, secure, and developer-friendly blockchain for modern DApps.</p>
// //           </div>
// //           <div className={styles.card}>
// //             <h2>Tech Stack</h2>
// //             <p>Powered by Next.js, RainbowKit, wagmi, and EVM compatibility.</p>
// //           </div>
// //         </div>
// //       </main>

// //       <footer className={styles.footer}>
// //         <p>💡 Built with RainbowKit & Next.js · 2025</p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default Home;


// import { useState } from 'react';
// import { useAccount, useWalletClient } from 'wagmi';
// import { ethers } from 'ethers';
// import { deployWarisanDigital } from '../lib/deploy';

// export default function Home() {
//   const { address } = useAccount();
//   const { data: walletClient } = useWalletClient();

//   const [notaris, setNotaris] = useState('');
//   const [saksi, setSaksi] = useState('');
//   const [tokenAddress, setTokenAddress] = useState('');
//   const [jumlahToken, setJumlahToken] = useState('');
//   const [waktuBuka, setWaktuBuka] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleDeploy = async () => {
//     if (!walletClient || !window.ethereum) return alert('Wallet belum terhubung');

//     try {
//       setLoading(true);
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const jumlahTokenWei = ethers.parseUnits(jumlahToken, 18);
//       const waktuUnix = Math.floor(new Date(waktuBuka).getTime() / 1000);

//       const contractAddress = await deployWarisanDigital(
//         signer,
//         notaris,
//         saksi,
//         tokenAddress,
//         jumlahTokenWei,
//         waktuUnix
//       );

//       alert(`✅ Kontrak berhasil dideploy di: ${contractAddress}`);
//     } catch (err) {
//       console.error(err);
//       alert('❌ Gagal mendeploy kontrak');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Deploy Kontrak Warisan Digital</h1>
//       <div style={{ marginBottom: '1rem' }}>
//         <label>Alamat Notaris:</label>
//         <input value={notaris} onChange={(e) => setNotaris(e.target.value)} style={{ width: '100%' }} />
//       </div>
//       <div style={{ marginBottom: '1rem' }}>
//         <label>Alamat Saksi:</label>
//         <input value={saksi} onChange={(e) => setSaksi(e.target.value)} style={{ width: '100%' }} />
//       </div>
//       <div style={{ marginBottom: '1rem' }}>
//         <label>Alamat Token ERC20:</label>
//         <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} style={{ width: '100%' }} />
//       </div>
//       <div style={{ marginBottom: '1rem' }}>
//         <label>Jumlah Token (dalam desimal):</label>
//         <input value={jumlahToken} onChange={(e) => setJumlahToken(e.target.value)} type="number" style={{ width: '100%' }} />
//       </div>
//       <div style={{ marginBottom: '1rem' }}>
//         <label>Waktu Buka Warisan (format tanggal):</label>
//         <input value={waktuBuka} onChange={(e) => setWaktuBuka(e.target.value)} type="datetime-local" style={{ width: '100%' }} />
//       </div>
//       <button onClick={handleDeploy} disabled={loading}>
//         {loading ? 'Deploying...' : 'Deploy Warisan Digital'}
//       </button>
//     </div>
//   );
// }


import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { deployWarisanDigital } from '../lib/deploy';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [notaris, setNotaris] = useState('');
  const [saksi, setSaksi] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [jumlahToken, setJumlahToken] = useState('');
  const [waktuBuka, setWaktuBuka] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    if (!walletClient || !window.ethereum) return alert('Wallet belum terhubung');

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const jumlahTokenWei = ethers.parseUnits(jumlahToken, 18);
      const waktuUnix = Math.floor(new Date(waktuBuka).getTime() / 1000);

      const contractAddress = await deployWarisanDigital(
        signer,
        notaris,
        saksi,
        tokenAddress,
        jumlahTokenWei,
        waktuUnix
      );

      alert(`✅ Kontrak berhasil dideploy di: ${contractAddress}`);
    } catch (err) {
      console.error(err);
      alert('❌ Gagal mendeploy kontrak');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Deploy Kontrak Warisan Digital</h1>

      {/* Tombol koneksi wallet */}
      <ConnectButton />

      {isConnected && (
        <p style={{ marginTop: '1rem' }}>
          🔐 Pemberi Waris: <strong>{address}</strong>
        </p>
      )}

      <div style={{ marginTop: '2rem' }}>
        <label>Alamat Notaris:</label>
        <input value={notaris} onChange={(e) => setNotaris(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Alamat Saksi:</label>
        <input value={saksi} onChange={(e) => setSaksi(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Alamat Token ERC20:</label>
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Jumlah Token (desimal):</label>
        <input value={jumlahToken} onChange={(e) => setJumlahToken(e.target.value)} type="number" style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Waktu Buka (tanggal):</label>
        <input value={waktuBuka} onChange={(e) => setWaktuBuka(e.target.value)} type="datetime-local" style={{ width: '100%' }} />
      </div>
      <button onClick={handleDeploy} disabled={!isConnected || loading}>
        {loading ? 'Deploying...' : 'Deploy Warisan Digital'}
      </button>
    </div>
  );
}
