require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Lecongduy25042001!',
    database: process.env.DB_NAME || 'shopdb'
});

connection.connect(err => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err);
        return;
    }
    console.log('✅ Đã kết nối MySQL thành công!');
});

module.exports = connection;
