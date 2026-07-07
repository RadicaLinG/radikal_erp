const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// API Rotaları
app.get('/cariler', (req, res) => { /* veritabanı sorgun */ });
app.post('/cariler', (req, res) => { /* veritabanı ekleme */ });

// ÖNEMLİ: Frontend'i render et
app.use(express.static(path.join(__dirname, 'frontend/dist'))); // veya build

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda!`));

