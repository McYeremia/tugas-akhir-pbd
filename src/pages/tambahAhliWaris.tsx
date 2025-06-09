import { useRouter } from 'next/router';


import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import WarisanDigitalAbi from '../lib/WarisanDigitalABI.json';
import { useEffect } from 'react';


export default function TambahAhliWaris() {
    const { address } = useAccount();
    const { data: walletClient } = useWalletClient();
    const router = useRouter();
    const { kontrak } = router.query;
  

    const [contractAddress, setContractAddress] = useState('');
    useEffect(() => {
        if (typeof kontrak === 'string') {
            setContractAddress(kontrak);
        }
    }, [kontrak]);

    const [ahliWaris, setAhliWaris] = useState('');
    const [bagian, setBagian] = useState('');
    const [loading, setLoading] = useState(false);
    

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
        <div style={{ padding: '2rem' }}>
        <h2>Tambah Ahli Waris</h2>
        <input
            placeholder="Alamat kontrak warisan"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            style={{ width: '100%', marginBottom: '1rem' }}
        />
        <input
            placeholder="Alamat ahli waris"
            value={ahliWaris}
            onChange={(e) => setAhliWaris(e.target.value)}
            style={{ width: '100%', marginBottom: '1rem' }}
        />
        <input
            placeholder="Bagian token (dalam satuan asli token, misal 10)"
            type="number"
            value={bagian}
            onChange={(e) => setBagian(e.target.value)}
            style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button onClick={handleTambah} disabled={loading}>
            {loading ? 'Menambahkan...' : 'Tambah Ahli Waris'}
        </button>
        </div>
    );
    }
