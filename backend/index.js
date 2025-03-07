const db = require('./db');

db.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Lỗi truy vấn:', err);
    } else {
        console.log('✅ MySQL hoạt động bình thường!');
    }
    process.exit();
});
