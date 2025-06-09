import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { deployWarisanDigital } from '../lib/deploy';
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
          borderRadius: '12px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>🚀 Deploy Warisan Digital</h2>

        <div style={{ marginBottom: '1rem' }}>
          <ConnectButton />
          {isConnected && (
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              🔐 Pemberi Waris: <strong>{address}</strong>
            </p>
          )}
        </div>

        <label>Alamat Notaris:</label>
        <input
          value={notaris}
          onChange={(e) => setNotaris(e.target.value)}
          placeholder="0x..."
          style={inputStyle}
        />

        <label>Alamat Saksi:</label>
        <input
          value={saksi}
          onChange={(e) => setSaksi(e.target.value)}
          placeholder="0x..."
          style={inputStyle}
        />

        <label>Alamat Token ERC20:</label>
        <input
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder="0x..."
          style={inputStyle}
        />

        <label>Jumlah Token:</label>
        <input
          value={jumlahToken}
          onChange={(e) => setJumlahToken(e.target.value)}
          type="number"
          placeholder="1000"
          style={inputStyle}
        />

        <label>Waktu Buka (tanggal):</label>
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
            backgroundColor: loading ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)',
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
  padding: '0.8rem',
  marginTop: '0.25rem',
  marginBottom: '1rem',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  boxSizing: 'border-box',
};
