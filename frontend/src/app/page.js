import { createClient } from '@supabase/supabase-js';

// Supabase bilgilerin
const SUPABASE_URL = 'https://dkqzpesyvaxabskvrmha.supabase.co';
const SUPABASE_KEY = 'sb_publishable_2gwZZ6pTgZH3I1zEEzYjxw_tLO8vam5';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function Home() {
  // Verileri çekmeye çalış
  const { data: cariler, error } = await supabase.from('cariler').select('*');

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Radikal ERP - Cari Listesi</h1>
      
      {error && (
        <div style={{ color: 'red' }}>
          <h3>Veri çekme hatası:</h3>
          <p>{error.message}</p>
        </div>
      )}
      
      {!cariler || cariler.length === 0 ? (
        <p>Henüz kayıtlı cari yok. Supabase üzerinden tabloya veri ekleyebilirsin.</p>
      ) : (
        <ul>
          {cariler.map((cari) => (
            <li key={cari.id} style={{ marginBottom: '10px' }}>
              <strong>{cari.unvan}</strong> (Kod: {cari.cari_kodu})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
