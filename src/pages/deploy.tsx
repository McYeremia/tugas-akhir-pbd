import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { deployWarisanDigital } from '../lib/deploy';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/Home.module.css';

export default function DeployPage() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [notaris, setNotaris] = useState('');
  const [saksi, setSaksi] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [jumlahToken, setJumlahToken] = useState('');
  const [waktuBuka, setWaktuBuka] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
      router.push(`/tambahAhliWaris?kontrak=${contractAddress}`);
    } catch (err) {
      console.error(err);
      alert('❌ Gagal mendeploy kontrak');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '1rem',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#0f172a',
          }}
        >
          Deploy Warisan Digital
        </h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <ConnectButton />
          {isConnected && (
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#475569' }}>
              🔐 Pemberi Waris: <strong>{address}</strong>
            </p>
          )}
        </div>

        <label style={labelStyle}>Alamat Notaris:</label>
        <input
          value={notaris}
          onChange={(e) => setNotaris(e.target.value)}
          placeholder="0x..."
          style={inputStyle}
        />

        <label style={labelStyle}>Alamat Saksi:</label>
        <input
          value={saksi}
          onChange={(e) => setSaksi(e.target.value)}
          placeholder="0x..."
          style={inputStyle}
        />

        <label style={labelStyle}>Alamat Token ERC20:</label>
        <input
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder="0x..."
          style={inputStyle}
        />

        <label style={labelStyle}>Jumlah Token:</label>
        <input
          value={jumlahToken}
          onChange={(e) => setJumlahToken(e.target.value)}
          type="number"
          placeholder="Desimal, Ex: 10"
          style={inputStyle}
        />

        <label style={labelStyle}>Waktu Buka (tanggal):</label>
        <input
          value={waktuBuka}
          onChange={(e) => setWaktuBuka(e.target.value)}
          type="datetime-local"
          style={inputStyle}
        />

        <button
          onClick={handleDeploy}
          disabled={!isConnected || loading}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '0.8rem',
            background: loading
              ? '#94a3b8'
              : 'linear-gradient(to right, #3b82f6, #0ea5e9)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          {loading ? '⏳ Deploying...' : 'Deploy Warisan Digital'}
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  marginTop: '0.25rem',
  marginBottom: '1.25rem',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  boxSizing: 'border-box',
  fontSize: '1rem',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.25rem',
  color: '#334155',
  fontWeight: 500,
};
