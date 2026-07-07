'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [unvan, setUnvan] = useState('');
  const [cariler, setCariler] = useState([]);

  // Backend adresini dinamik algılar
  const API_URL = typeof window !== 'undefined' ? '' : 'https://radikal-erp.onrender.com';

  const fetchCariler = async () => {
    try {
      const res = await fetch(`${API_URL}/cariler`);
      const data = await res.json();
      setCariler(data);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    }
  };

  useEffect(() => { fetchCariler(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/cariler`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cari_kodu: 'M-' + Date.now().toString().slice(-4), 
          unvan: unvan, 
          tip: 'Müşteri' 
        }),
      });
      if (res.ok) {
        setUnvan('');
        fetchCariler();
      }
    } catch (err) {
      alert('Kayıt başarısız: ' + err.message);
    }
  };

  return (
    <main style={{ padding: '20px' }}>
      <h1>Radikal ERP - Cari Yönetimi</h1>
      <form onSubmit={handleSubmit}>
        <input value={unvan} onChange={(e) => setUnvan(e.target.value)} placeholder="Ünvan girin" />
        <button type="submit">Kaydet</button>
      </form>
      <ul>
        {cariler.map(c => <li key={c.id}>{c.cari_kodu} - {c.unvan}</li>)}
      </ul>
    </main>
  );
}

