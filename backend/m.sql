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
