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
          maxWidth: '600px',
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#0f172a',
          }}
        >
          👥 Tambah Ahli Waris
        </h2>

        <label style={labelStyle}>Alamat Kontrak:</label>
        <input value={contractAddress} readOnly style={inputStyle} />

        <label style={labelStyle}>Alamat Ahli Waris:</label>
        <input
          placeholder="0x..."
          value={ahliWaris}
          onChange={(e) => setAhliWaris(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Bagian Token :</label>
        <input
          placeholder="Desimal, Ex: 10"
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
            backgroundColor: loading ? '#93c5fd' : '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            transition: 'all 0.3s ease',
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
