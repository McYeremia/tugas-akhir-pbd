// pages/index.tsx

import { useRouter } from 'next/router';
import { useState } from 'react';

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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#111827' }}>
          Selamat Datang di Aplikasi Warisan Digital
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          Mengelola warisan Anda dengan aman dan terdesentralisasi.
        </p>

        <button
          onClick={() => router.push('/deploy')}
          style={{
            width: '100%',
            padding: '0.8rem',
            fontSize: '1rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '2rem',
            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)',
          }}
        >
          Buat Warisan Digital
        </button>

        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Masukkan alamat kontrak"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            style={{
              padding: '0.8rem',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              marginBottom: '1rem',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleLihatWarisan}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(59, 130, 246, 0.4)',
            }}
          >
            Lihat Warisan
          </button>
        </div>
      </div>
    </div>
  );
}
