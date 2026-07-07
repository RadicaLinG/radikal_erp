const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Bağlantı hatası:', err.stack);
  } else {
    console.log('Başarılı! Veritabanı saati:', res.rows[0].now);
  }
  pool.end();
});
