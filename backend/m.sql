Dang ky tai khoan
Invoke-WebRequest -Uri "http://localhost:5000/register" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"} `
    -Body '{"name": "Nguyễn Văn B", "email": "nguyenvanb@gmail.com", "password": "Abc123"}' `
    -UseBasicParsing

Dang nhap
Invoke-WebRequest -Uri "http://localhost:5000/login" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"} `
    -Body '{"email": "nguyenvanb@gmail.com", "password": "Abc123"}' `
    -UseBasicParsing

Invoke-WebRequest -Uri "http://localhost:5000/cart/3" `
    -Method Get `
    -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer YOUR_TOKEN"} `
    -UseBasicParsing

$response = Invoke-WebRequest -Uri "http://localhost:5000/cart" `
    -Method Get `
    -Headers @{"Authorization"="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJuZ3V5ZW52YW5iQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQxMzM0MTE1LCJleHAiOjE3NDEzMzc3MTV9.Ke8kCnOeoZsPQGFKf1Wp3gvcJeNU07Uo2kjlwCMAuvs"} `
    -UseBasicParsing

Write-Output $response.Content


Invoke-WebRequest -Uri "http://localhost:5000/cart/add" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJuZ3V5ZW52YW5iQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQxMzM0MTE1LCJleHAiOjE3NDEzMzc3MTV9.Ke8kCnOeoZsPQGFKf1Wp3gvcJeNU07Uo2kjlwCMAuvs>"} `
    -Body '{"user_id": 3, "product_id": 1, "quantity": 2}' `
    -UseBasicParsing


Laaay token
$response = Invoke-WebRequest -Uri "http://localhost:5000/login" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"} `
    -Body '{"email": "nguyenvanb@gmail.com", "password": "Abc123"}' `
    -UseBasicParsing

# Chuyển đổi nội dung JSON
$data = $response.Content | ConvertFrom-Json
$token = $data.token  # Lấy token

Write-Output "Token của bạn: $token"



$body = @{
    user_id = 3
    product_id = 1
    quantity = 2
} | ConvertTo-Json -Depth 2

$response = Invoke-WebRequest -Uri "http://localhost:5000/cart/add" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJuZ3V5ZW52YW5iQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQxMzM0MTE1LCJleHAiOjE3NDEzMzc3MTV9.Ke8kCnOeoZsPQGFKf1Wp3gvcJeNU07Uo2kjlwCMAuvs"} `
    -Body $body `
    -UseBasicParsing

Write-Output $response.Content

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

$body = @"
{
    "user_id": 3,
    "items": [
        {"product_id": 1, "quantity": 2, "price": 300000},
        {"product_id": 2, "quantity": 1, "price": 500000}
    ]
}
"@

Invoke-WebRequest -Uri "http://localhost:5000/orders" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJuZ3V5ZW52YW5iQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQxMzM0MTE1LCJleHAiOjE3NDEzMzc3MTV9.Ke8kCnOeoZsPQGFKf1Wp3gvcJeNU07Uo2kjlwCMAuvs"} `
    -Body $body `
    -UseBasicParsing







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



cd D:\my-GradPro\backend
node server.js
