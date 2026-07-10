const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Frontend'i servis et (Build edilmiş hali)
app.use(express.static(path.join(__dirname, 'frontend/out')));

// Hata yönetimi eklenmiş rota yönlendirmesi
app.get('*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'frontend/out', 'index.html'));
  } catch (err) {
    res.status(500).send("Sayfa yüklenirken bir hata oluştu.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sunucu ${PORT} portunda başarıyla başladı.`);
});
