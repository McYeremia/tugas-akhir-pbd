import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import WarisanDigitalAbi from '../lib/WarisanDigitalABI.json';

export default function TambahAhliWaris() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const router = useRouter();
  const { kontrak } = router.query;

  const [contractAddress, setContractAddress] = useState('');
  const [ahliWaris, setAhliWaris] = useState('');
  const [bagian, setBagian] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof kontrak === 'string') {
      setContractAddress(kontrak);
    }
  }, [kontrak]);

  const handleTambah = async () => {
    if (!walletClient || !window.ethereum) return alert('Wallet belum terhubung');
    if (!contractAddress || !ahliWaris || !bagian) return alert('Semua field wajib diisi');

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, WarisanDigitalAbi, signer);

      const tx = await contract.tambahAhliWaris(ahliWaris, ethers.parseUnits(bagian, 18));
      await tx.wait();
      alert('✅ Ahli waris berhasil ditambahkan');
    } catch (err) {
      console.error(err);
      alert('❌ Gagal menambahkan ahli waris');
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
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>👥 Tambah Ahli Waris</h2>

        <label>Alamat Kontrak:</label>
        <input
          value={contractAddress}
          readOnly
          style={inputStyle}
        />

        <label>Alamat Ahli Waris:</label>
        <input
          placeholder="0x..."
          value={ahliWaris}
          onChange={(e) => setAhliWaris(e.target.value)}
          style={inputStyle}
        />

        <label>Bagian Token (desimal):</label>
        <input
          placeholder="Contoh: 10"
          type="number"
          value={bagian}
          onChange={(e) => setBagian(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleTambah}
          disabled={loading}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '0.9rem',
            backgroundColor: loading ? '#9ca3af' : '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
          }}
        >
          {loading ? '⏳ Menambahkan...' : 'Tambah Ahli Waris'}
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
  fontSize: '1rem',
  boxSizing: 'border-box',
};
