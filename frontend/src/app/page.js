'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://dkqzpesyvaxabskvrmha.supabase.co', 'sb_publishable_2gwZZ6pTgZH3I1zEEzYjxw_tLO8vam5');

export default function Home() {
  const [unvan, setUnvan] = useState('');
  const [liste, setListe] = useState([]);

  // Sayfa açıldığında verileri çek
  useEffect(() => {
    fetchCariler();
  }, []);

  async function fetchCariler() {
    const { data } = await supabase.from('cariler').select('*');
    if (data) setListe(data);
  }

  async function kaydet() {
    if (!unvan) return;
    await supabase.from('cariler').insert([{ unvan, cari_kodu: 'CARI-001' }]);
    setUnvan(''); // Kutuyu temizle
    fetchCariler(); // Listeyi yenile
  }

  return (
    <main style={{ padding: '20px' }}>
      <h1>Radikal ERP - Cari Yönetimi</h1>
      <input 
        value={unvan} 
        onChange={(e) => setUnvan(e.target.value)} 
        placeholder="Ünvan girin" 
      />
      <button onClick={kaydet}>Kaydet</button>

      <ul>
        {liste.map(c => <li key={c.id}>{c.unvan}</li>)}
      </ul>
    </main>
  );
}
