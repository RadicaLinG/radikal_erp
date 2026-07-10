const express = require('express');
const path = require('path');
const app = express();

// Next.js'in ürettiği statik dosyaları servis et
app.use(express.static(path.join(__dirname, 'frontend/out')));

// Hata alan '*' yerine, her isteği index.html'e yönlendiren alternatif yöntem
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'frontend/out', 'index.html'));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sunucu ${PORT} portunda başarıyla başladı.`);
});
