"use client";
import { useState, useEffect } from 'react';

export default function Page() {
  const [unvan, setUnvan] = useState('');
  const [cariler, setCariler] = useState([]);

  // Veritabanındaki carileri çeken fonksiyon
  const fetchCariler = async () => {
    try {
      const res = await fetch('http://localhost:3000/cariler');
      const data = await res.json();
      setCariler(data);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    }
  };

  // Sayfa ilk yüklendiğinde listeyi getir
  useEffect(() => {
    fetchCariler();
  }, []);

  // Yeni cari ekleme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3000/cariler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cari_kodu: 'M-' + Date.now().toString().slice(-4), 
          unvan: unvan, 
          tip: 'Müşteri' 
        }),
      });
      setUnvan('');
      fetchCariler(); // Kayıt sonrası listeyi tazele
    } catch (err) {
      alert('Kayıt sırasında hata oluştu!');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Radikal ERP - Cari Yönetimi</h1>
      
      {/* Cari Ekleme Formu */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <input 
          style={{ padding: '10px', width: '250px', color: '#000', borderRadius: '4px' }}
          placeholder="Cari Ünvanı giriniz" 
          value={unvan}
          onChange={(e) => setUnvan(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Kaydet
        </button>
      </form>

      {/* Cari Listesi Tablosu */}
      <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #555' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Kod</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Ünvan</th>
          </tr>
        </thead>
        <tbody>
          {cariler.map((cari) => (
            <tr key={cari.id} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '10px' }}>{cari.cari_kodu}</td>
              <td style={{ padding: '10px' }}>{cari.unvan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

