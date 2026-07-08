const express = require('express');
const path = require('path');
const app = express();

// Next.js'in 'npm run build' ile oluşturduğu dosyaları sunar
app.use(express.static(path.join(__dirname, 'frontend/out')));

// Ana sayfa isteği geldiğinde index.html'i gönder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out', 'index.html'));
});

// Portu Render'dan al veya 3000 kullan
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sunucu ${PORT} portunda başarıyla başladı.`);
});
