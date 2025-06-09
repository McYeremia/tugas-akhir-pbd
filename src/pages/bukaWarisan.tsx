import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import WarisanDigitalAbi from '../lib/WarisanDigitalABI.json';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function BukaWarisan() {
  const router = useRouter();
  const { kontrak } = router.query;
  const { address, isConnected } = useAccount();

  const [notaris, setNotaris] = useState('');
  const [waktuBuka, setWaktuBuka] = useState(0);
  const [warisanDibuka, setWarisanDibuka] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState('');

  useEffect(() => {
    if (!kontrak || typeof kontrak !== 'string') return;

    const fetchData = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(kontrak, WarisanDigitalAbi, provider);
        const _notaris = await contract.notaris();
        const _waktuBuka = await contract.waktuBukaWarisan();
        const _warisanDibuka = await contract.warisanDibuka();

        setNotaris(_notaris);
        setWaktuBuka(Number(_waktuBuka));
        setWarisanDibuka(_warisanDibuka);
      } catch (err) {
        console.error(err);
        setPesan('❌ Gagal mengambil data kontrak.');
      }
    };

    fetchData();
  }, [kontrak]);

  const handleBukaWarisan = async () => {
    if (!kontrak || typeof kontrak !== 'string') return;

    try {
      setLoading(true);
      setPesan('');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(kontrak, WarisanDigitalAbi, signer);

      const tx = await contract.bukaWarisan();
      await tx.wait();

      setWarisanDibuka(true);
      setPesan('✅ Warisan berhasil dibuka dan token didistribusikan.');
    } catch (err: any) {
      console.error(err);
      setPesan(`❌ Gagal membuka warisan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const sudahLewatWaktu = () => Date.now() / 1000 >= waktuBuka;
  const isNotaris = () => address?.toLowerCase() === notaris.toLowerCase();

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
          🗝️ Buka Warisan Digital
        </h2>

        <ConnectButton />
        {isConnected && (
          <>
            <div style={{ marginTop: '1.5rem', lineHeight: '1.7', fontSize: '0.95rem', color: '#334155' }}>
              <p><strong>📌 Wallet Anda:</strong> {address}</p>
              <p><strong>🔏 Notaris:</strong> {notaris}</p>
              <p><strong>📅 Waktu Buka:</strong> {new Date(waktuBuka * 1000).toLocaleString()}</p>
              <p>
                <strong>🔐 Status:</strong>{' '}
                <span style={{ color: warisanDibuka ? '#10b981' : '#f59e0b', fontWeight: 600 }}>
                  {warisanDibuka ? '✅ Sudah Dibuka' : '🔒 Belum Dibuka'}
                </span>
              </p>
            </div>

            <button
              disabled={!isNotaris() || !sudahLewatWaktu() || warisanDibuka || loading}
              onClick={handleBukaWarisan}
              style={{
                marginTop: '2rem',
                width: '100%',
                padding: '0.9rem',
                backgroundColor: loading || warisanDibuka ? '#94a3b8' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: loading || warisanDibuka ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? '⏳ Memproses...' : 'Buka Warisan'}
            </button>

            {pesan && (
              <p
                style={{
                  marginTop: '1rem',
                  textAlign: 'center',
                  color: pesan.startsWith('✅') ? '#10b981' : '#ef4444',
                  fontWeight: 500,
                }}
              >
                {pesan}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
