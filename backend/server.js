const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

const bcrypt = require('bcryptjs'); // Import bcrypt để mã hóa mật khẩu
const jwt = require('jsonwebtoken'); // Import JWT để tạo token
const SECRET_KEY = "Lecongduy25042001!"; // Đặt một khóa bí mật (có thể lưu vào .env sau)

const path = require('path');

// Cấu hình CORS để cho phép frontend kết nối
app.use(cors());
app.use(express.json()); // Hỗ trợ JSON trong request
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
app.use(express.static(path.join(__dirname, '..')));

// Kết nối đến MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lecongduy25042001!',  // Nếu bạn đã đổi mật khẩu MySQL thì sửa lại ở đây
    database: 'shopdb'
});

// Kiểm tra kết nối
db.connect(err => {
    if (err) {
        console.error('❌MySQL connection erros:', err);
    } else {
        console.log('✅MySQL connected successfully!');
    }
});

// Middleware xác thực token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Lấy token từ header

    if (!token) {
        return res.status(401).json({ error: "You need login to access!" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid Token!" });
        }
        req.user = user; // Lưu thông tin user vào request để sử dụng trong các API khác
        next();
    });
};

// Middleware kiểm tra role
function checkRole(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "You have not login yet!" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Permission restricted!" });
        }
        next();
    };
}






                                //PRODUCTS
// API lấy danh sách sản phẩm
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Product error:', err);
            res.status(500).json({ error: 'Server error' });
        } else {
            res.json(results);
        }
    });
});


// API lấy thông tin chi tiết sản phẩm theo ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Lỗi lấy sản phẩm:', err);
            res.status(500).json({ error: 'Lỗi server' });
        } else {
            res.json(result[0] || {});
        }
    });
});

// API thêm sản phẩm mới (cập nhật với color và quantity)
app.post('/products/add', checkRole('admin'), (req, res) => {
    const { name, price, image, color, quantity } = req.body;
    const sql = 'INSERT INTO products (name, price, image, color, quantity) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, price, image, color, quantity], (err, result) => {
        if (err) {
            console.error('Lỗi thêm sản phẩm:', err);
            res.status(500).json({ error: 'Lỗi server' });
        } else {
            res.json({ message: 'Thêm sản phẩm thành công!', id: result.insertId });
        }
    });
});

// API xóa sản phẩm theo ID
app.delete('/products/:id', checkRole('admin'), (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Lỗi xóa sản phẩm:', err);
            res.status(500).json({ error: 'Lỗi server' });
        } else {
            res.json({ message: 'Xóa sản phẩm thành công!' });
        }
    });
});

// API cập nhật thông tin sản phẩm (cập nhật với color và quantity)
app.put('/products/:id', checkRole('admin'),(req, res) => {
    const productId = req.params.id;
    const { name, price, image, color, quantity } = req.body;
    const sql = 'UPDATE products SET name = ?, price = ?, image = ?, color = ?, quantity = ? WHERE id = ?';
    db.query(sql, [name, price, image, color, quantity, productId], (err, result) => {
        if (err) {
            console.error('Lỗi cập nhật sản phẩm:', err);
            res.status(500).json({ error: 'Lỗi server' });
        } else {
            res.json({ message: 'Cập nhật sản phẩm thành công!' });
        }
    });
});






                                //CART
// API them sản phẩm trong giỏ hàng của user
app.post('/cart/add', (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ error: "Thiếu thông tin giỏ hàng!" });
    }

    const sql = `
        INSERT INTO cart (user_id, product_id, quantity) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE quantity = quantity + ?`;

    db.query(sql, [user_id, product_id, quantity, quantity], (err, result) => {
        if (err) {
            console.error('Lỗi thêm vào giỏ hàng:', err);
            return res.status(500).json({ error: 'Lỗi server' });
        }

        // Lấy số lượng mới sau khi thêm
        db.query("SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, rows) => {
            if (err) {
                console.error('Lỗi lấy số lượng:', err);
                return res.status(500).json({ error: 'Lỗi server' });
            }
            res.json({ message: "Thêm vào giỏ hàng thành công!", new_quantity: rows[0].quantity });
        });
    });
});

// API xóa sản phẩm khỏi giỏ hàng
app.delete('/cart/:user_id/:product_id', (req, res) => {
    const { user_id, product_id } = req.params;
    const sql = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';

    db.query(sql, [user_id, product_id], (err, result) => {
        if (err) {
            console.error('Lỗi xóa sản phẩm:', err);
            return res.status(500).json({ error: 'Lỗi server' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm trong giỏ hàng!' });
        }

        res.json({ message: 'Xóa sản phẩm thành công!' });
    });
});


// API cập nhật số lượng sản phẩm trong giỏ hàng
app.put('/cart/:user_id/:product_id', (req, res) => {
    const { user_id, product_id } = req.params;
    const { quantity } = req.body;

    if (quantity === 0) {
        const deleteSql = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';
        db.query(deleteSql, [user_id, product_id], (err, result) => {
            if (err) {
                console.error('Lỗi xóa sản phẩm:', err);
                return res.status(500).json({ error: 'Lỗi server' });
            }
            return res.json({ message: 'Sản phẩm đã bị xóa khỏi giỏ hàng do số lượng bằng 0!' });
        });
    } else {
        const updateSql = 'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?';
        db.query(updateSql, [quantity, user_id, product_id], (err, result) => {
            if (err) {
                console.error('Lỗi cập nhật số lượng:', err);
                return res.status(500).json({ error: 'Lỗi server' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Không tìm thấy sản phẩm trong giỏ hàng!' });
            }

            res.json({ message: 'Cập nhật số lượng thành công!', new_quantity: quantity });
        });
    }
});

// API lấy giỏ hàng của user
app.get('/cart/:user_id', (req, res) => {
    const { user_id } = req.params;
    const sql = `
        SELECT c.product_id, c.quantity, p.name, p.price, p.image 
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?`;

    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Lỗi lấy giỏ hàng:', err);
            return res.status(500).json({ error: 'Lỗi server' });
        }
        res.json(results);
    });
});







                                //USERS
// API đăng kí
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Kiểm tra xem có thiếu thông tin không
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill in the blank!" });
    }

    // Chuẩn hóa email (xóa khoảng trắng, chuyển về chữ thường)
    const emailTrimmed = email.trim().toLowerCase();

    // Kiểm tra email có hợp lệ không (định dạng email)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailTrimmed)) {
        return res.status(400).json({ error: "Invalid Email!" });
    }

    // Kiểm tra độ mạnh của mật khẩu (ít nhất 6 ký tự, 1 chữ hoa, 1 số)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            error: "Password must have as least 6 Characters, 1 Uppercase letters, 1 Number!"
        });
    }

    try {
        // Kiểm tra email đã tồn tại chưa
        const checkEmail = "SELECT * FROM users WHERE email = ?";
        db.query(checkEmail, [emailTrimmed], async (err, result) => {
            if (err) {
                console.error("Lỗi kiểm tra email:", err);
                return res.status(500).json({ error: "Lỗi server!" });
            }
            if (result.length > 0) {
                return res.status(400).json({ error: "This Email was already registered!" });
            }

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Lưu user vào database
            const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(sql, [name, emailTrimmed, hashedPassword], (err, result) => {
                if (err) {
                    console.error("Lỗi đăng ký:", err);
                    return res.status(500).json({ error: "Lỗi server!" });
                }
                res.json({ message: "Register successfully!" });
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server!" });
    }
});

// API đăng nhập
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please fill in the blank!" });
    }

    try {
        // Kiểm tra xem email có tồn tại không
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], async (err, result) => {
            if (err) {
                console.error("Lỗi đăng nhập:", err);
                return res.status(500).json({ error: "Lỗi server!" });
            }

            if (result.length === 0) {
                return res.status(400).json({ error: "This Email is not exsisted!" });
            }

            const user = result[0]; // Lấy user từ database

            // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid password!" });
            }

            // Tạo token JWT cho người dùng
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

            res.json({ message: "Login successfully!", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server!" });
    }
});

// API cap nhat thông tin user
app.put('/users/update', authenticateToken, (req, res) => {
    const { name, email, password } = req.body;
    const user_id = req.user.id;

    let sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    let values = [name, email, user_id];

    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
        values = [name, email, hashedPassword, user_id];
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi cập nhật thông tin:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }
        res.json({ message: "Cập nhật thông tin thành công!" });
    });
});

// API lấy thông tin người dùng
app.get('/users/profile', authenticateToken, (req, res) => {
    const user_id = req.user.id;

    const sql = "SELECT id, name, email, role FROM users WHERE id = ?";
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error("Lỗi lấy thông tin người dùng:", err);
            return res.status(500).json({ error: "Lỗi server!" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Không tìm thấy người dùng!" });
        }
        res.json(result[0]);
    });
});


// Đăng xuất (Xóa token ở frontend)
app.post("/users/logout", (req, res) => {
    res.json({ message: "Log out successfully!" });
});




                                //ORDERS
// API đặt hàng
app.post('/orders', (req, res) => {
    const { user_id, items } = req.body; // items là danh sách sản phẩm [{product_id, quantity, price}]

    if (!user_id || !items || items.length === 0) {
        return res.status(400).json({ error: "Thiếu thông tin đơn hàng!" });
    }

    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const sqlOrder = 'INSERT INTO orders (user_id, total_price) VALUES (?, ?)';
    
    db.query(sqlOrder, [user_id, totalPrice], (err, result) => {
        if (err) {
            console.error('Lỗi tạo đơn hàng:', err);
            return res.status(500).json({ error: 'Lỗi server' });
        }

        const orderId = result.insertId;
        const sqlOrderItems = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
        const values = items.map(item => [orderId, item.product_id, item.quantity, item.price]);

        db.query(sqlOrderItems, [values], (err) => {
            if (err) {
                console.error('Lỗi thêm sản phẩm vào đơn hàng:', err);
                return res.status(500).json({ error: 'Lỗi server' });
            }

            // Xóa giỏ hàng sau khi đặt hàng thành công
            db.query('DELETE FROM cart WHERE user_id = ?', [user_id], (err) => {
                if (err) {
                    console.error('Lỗi xóa giỏ hàng:', err);
                }
            });

            res.json({ message: "Đặt hàng thành công!", order_id: orderId });
        });
    });
});

// API lấy danh sách đơn hàng của user
app.get('/orders/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const sql = `
        SELECT o.id AS order_id, o.total_price, o.status, o.created_at,
               oi.product_id, p.name AS product_name, oi.quantity, oi.price
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC`;

    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Lỗi lấy đơn hàng:', err);
            return res.status(500).json({ error: 'Lỗi server' });
        }

        res.json(results);
    });
});


// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
// Đây là file server.js, chứa mã nguồn của server Express.js. Trong file này, chúng ta đã cấu hình kết nối đến MySQL và viết các API để thực hiện các thao tác CRUD với bảng products trong MySQL.