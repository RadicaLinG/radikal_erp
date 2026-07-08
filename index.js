const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// API Örnek Rota
app.get('/cariler', (req, res) => {
  res.json([{ id: 1, cari_kodu: 'C-001', unvan: 'Test Cari' }]);
});

// Frontend'i servis et
app.use(express.static(path.join(__dirname, 'frontend/out')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor!`));

