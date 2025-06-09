import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [contractAddress, setContractAddress] = useState('');

  const handleLihatWarisan = () => {
    if (!contractAddress) {
      alert('Silakan masukkan alamat kontrak terlebih dahulu.');
      return;
    }
    router.push(`/bukaWarisan?kontrak=${contractAddress}`);
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: '#0f172a',
          }}
        >
          Selamat Datang di <span style={{ color: '#3b82f6' }}>Warisan Digital!</span>
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          Mengelola warisan Anda dengan aman dan terdesentralisasi.
        </p>

        <button
          onClick={() => router.push('/deploy')}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            fontWeight: 600,
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          }}
        >
          Buat Warisan Digital
        </button>

        <input
          type="text"
          placeholder="Masukkan alamat kontrak"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          style={{
            padding: '0.75rem',
            width: '100%',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            marginBottom: '1rem',
            boxSizing: 'border-box',
            fontSize: '1rem',
          }}
        />
        <button
          onClick={handleLihatWarisan}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#0ea5e9',
            color: 'white',
            fontWeight: 600,
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
          }}
        >
          Lihat Warisan
        </button>
      </div>
    </div>
  );
}
