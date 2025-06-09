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

  const sudahLewatWaktu = () => {
    return Date.now() / 1000 >= waktuBuka;
  };

  const isNotaris = () => {
    return address?.toLowerCase() === notaris.toLowerCase();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🗝️ Buka Warisan Digital</h1>
      <ConnectButton />

      {isConnected && (
        <>
          <p><strong>Alamat Wallet:</strong> {address}</p>
          <p><strong>Notaris:</strong> {notaris}</p>
          <p><strong>Waktu Buka:</strong> {new Date(waktuBuka * 1000).toLocaleString()}</p>
          <p><strong>Status:</strong> {warisanDibuka ? '✅ Sudah Dibuka' : '🔒 Belum Dibuka'}</p>

          <button
            disabled={!isNotaris() || !sudahLewatWaktu() || warisanDibuka || loading}
            onClick={handleBukaWarisan}
            style={{ marginTop: '1rem' }}
          >
            {loading ? 'Memproses...' : 'Buka Warisan'}
          </button>

          {pesan && <p style={{ marginTop: '1rem', color: pesan.startsWith('✅') ? 'green' : 'red' }}>{pesan}</p>}
        </>
      )}
    </div>
  );
}
