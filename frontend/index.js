const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/cariler', async (req, res) => {
  const { cari_kodu, unvan, tip } = req.body;
  try {
    const query = 'INSERT INTO cariler (cari_kodu, unvan, tip) VALUES ($1, $2, $3) RETURNING *';
    const values = [cari_kodu, unvan, tip];
    const yeniCari = await pool.query(query, values);
    res.status(201).json(yeniCari.rows[0]);
  } catch (err) {
    console.error("HATA:", err.message);
    res.status(500).json({ hata: err.message });
  }
});

app.listen(3000, () => {
  console.log("Backend 3000 portunda çalışıyor...");
});
