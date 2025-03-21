cd D:\my-GradPro\backend
node server.js


CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    category ENUM('MEN', 'WOMEN', 'ACCESSORIES'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, product_id), -- Đảm bảo không có bản ghi trùng lặp
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) on DELETE CASCADE
);


DELETE FROM products WHERE id = 3;
ALTER TABLE products AUTO_INCREMENT = 1;


INSERT INTO products (name, description, price, image, category, color, quantity)
VALUES
('Product 1', 'Classic men’s jacket, perfect for winter outings.', 100.00, 'images/men/men-1.jpg', 'MEN', 'Black', 50),
('Product 2', 'Elegant formal shirt, ideal for office wear.', 120.00, 'images/men/men-2.jpg', 'MEN', 'Blue', 45),
('Product 3', 'Casual denim jeans, great for everyday use.', 90.00, 'images/men/men-3.jpg', 'MEN', 'Gray', 30),
('Product 4', 'Comfortable cotton T-shirt for daily wear.', 110.00, 'images/men/men-4.jpg', 'MEN', 'White', 20),
('Product 5', 'Lightweight summer shorts for warm weather.', 95.00, 'images/men/men-5.jpg', 'MEN', 'Green', 60),
('Product 6', 'Stylish blazer to elevate your formal look.', 130.00, 'images/men/men-6.jpg', 'MEN', 'Black', 40),
('Product 7', 'Sporty tracksuit, perfect for workouts.', 85.00, 'images/men/men-7.jpg', 'MEN', 'Blue', 35),
('Product 8', 'Slim-fit chinos, great for casual outings.', 115.00, 'images/men/men-8.jpg', 'MEN', 'Gray', 25),
('Product 9', 'Cozy hoodie for chilly days.', 105.00, 'images/men/men-9.jpg', 'MEN', 'White', 55),
('Product 10', 'Versatile polo shirt for casual elegance.', 125.00, 'images/men/men-10.jpg', 'MEN', 'Black', 50),
('Product 11', 'Durable cargo pants for adventure lovers.', 100.00, 'images/men/men-11.jpg', 'MEN', 'Green', 45),
('Product 12', 'Trendy bomber jacket for street style.', 120.00, 'images/men/men-12.jpg', 'MEN', 'Blue', 30),
('Product 13', 'Soft flannel shirt for relaxed weekends.', 90.00, 'images/men/men-13.jpg', 'MEN', 'Gray', 20),
('Product 14', 'Basic tank top, perfect for layering.', 110.00, 'images/men/men-14.jpg', 'MEN', 'White', 60),
('Product 15', 'Warm puffer jacket for winter chill.', 95.00, 'images/men/men-15.jpg', 'MEN', 'Black', 40),
('Product 16', 'Casual linen shirt, light and breathable.', 130.00, 'images/men/men-16.jpg', 'MEN', 'Blue', 35),
('Product 17', 'Stretch-fit joggers for maximum comfort.', 85.00, 'images/men/men-17.jpg', 'MEN', 'Gray', 25),
('Product 18', 'V-neck sweater, a wardrobe essential.', 115.00, 'images/men/men-18.jpg', 'MEN', 'White', 55),
('Product 19', 'Trendy denim jacket for a rugged look.', 105.00, 'images/men/men-19.jpg', 'MEN', 'Black', 50),
('Product 20', 'Classic dress pants for formal occasions.', 125.00, 'images/men/men-20.jpg', 'MEN', 'Green', 45),
('Product 21', 'Graphic print T-shirt for bold statements.', 100.00, 'images/men/men-21.jpg', 'MEN', 'Blue', 30),
('Product 22', 'Relaxed-fit cargo shorts for summer.', 120.00, 'images/men/men-22.jpg', 'MEN', 'Gray', 20),
('Product 23', 'Elegant trench coat for sophisticated style.', 90.00, 'images/men/men-23.jpg', 'MEN', 'White', 60),
('Product 24', 'Warm fleece jacket, perfect for outdoor adventures.', 110.00, 'images/men/men-24.jpg', 'MEN', 'Black', 40);







INSERT INTO products (name, description, price, image, category, color, quantity)
VALUES
('Product 25', 'Elegant women’s coat, perfect for winter.', 150.00, 'images/women/women-1.jpg', 'WOMEN', 'Black', 40),
('Product 26', 'Chic floral dress, ideal for summer parties.', 120.00, 'images/women/women-2.jpg', 'WOMEN', 'Red', 50),
('Product 27', 'Cozy knit sweater for colder days.', 90.00, 'images/women/women-3.jpg', 'WOMEN', 'White', 35),
('Product 28', 'Stylish high-waisted jeans for casual wear.', 110.00, 'images/women/women-4.jpg', 'WOMEN', 'Blue', 45),
('Product 29', 'Lightweight summer blouse with delicate details.', 100.00, 'images/women/women-5.jpg', 'WOMEN', 'Pink', 60),
('Product 30', 'Trendy leather jacket to complete your look.', 180.00, 'images/women/women-6.jpg', 'WOMEN', 'Black', 25),
('Product 31', 'Soft cotton t-shirt, perfect for daily wear.', 80.00, 'images/women/women-7.jpg', 'WOMEN', 'White', 55),
('Product 32', 'Charming midi skirt for elegant outings.', 95.00, 'images/women/women-8.jpg', 'WOMEN', 'Green', 40),
('Product 33', 'Warm puffer jacket for winter chill.', 150.00, 'images/women/women-9.jpg', 'WOMEN', 'Gray', 30),
('Product 34', 'Classic trench coat, a timeless piece.', 170.00, 'images/women/women-10.jpg', 'WOMEN', 'Beige', 20),
('Product 35', 'Sleek black leggings, perfect for workouts.', 70.00, 'images/women/women-11.jpg', 'WOMEN', 'Black', 65),
('Product 36', 'Boho-inspired maxi dress with flowy fabric.', 140.00, 'images/women/women-12.jpg', 'WOMEN', 'Purple', 35),
('Product 37', 'Elegant wrap dress for special occasions.', 160.00, 'images/women/women-13.jpg', 'WOMEN', 'Red', 25),
('Product 38', 'Casual denim jacket for everyday wear.', 120.00, 'images/women/women-14.jpg', 'WOMEN', 'Blue', 50),
('Product 39', 'Comfortable lounge set for relaxing at home.', 85.00, 'images/women/women-15.jpg', 'WOMEN', 'Gray', 70),
('Product 40', 'Classic button-up shirt, versatile for work or play.', 105.00, 'images/women/women-16.jpg', 'WOMEN', 'White', 45),
('Product 41', 'Stylish jumpsuit for a modern look.', 130.00, 'images/women/women-17.jpg', 'WOMEN', 'Black', 40),
('Product 42', 'Warm cardigan for cozy nights.', 95.00, 'images/women/women-18.jpg', 'WOMEN', 'Beige', 55),
('Product 43', 'Sporty windbreaker for outdoor adventures.', 110.00, 'images/women/women-19.jpg', 'WOMEN', 'Green', 30),
('Product 44', 'Ribbed bodycon dress for a sleek silhouette.', 145.00, 'images/women/women-20.jpg', 'WOMEN', 'Red', 20),
('Product 45', 'High-neck sweater, soft and warm.', 100.00, 'images/women/women-21.jpg', 'WOMEN', 'Gray', 60),
('Product 46', 'Trendy cropped top for summer days.', 85.00, 'images/women/women-22.jpg', 'WOMEN', 'Pink', 50),
('Product 47', 'Relaxed-fit linen pants for casual comfort.', 110.00, 'images/women/women-23.jpg', 'WOMEN', 'White', 35),
('Product 48', 'Statement blazer to elevate any outfit.', 160.00, 'images/women/women-24.jpg', 'WOMEN', 'Black', 25);








INSERT INTO products (name, description, price, image, category, color, quantity)
VALUES
('Product 49', 'Elegant leather belt to complete your outfit.', 45.00, 'images/accessory/accessory-1.jpg', 'ACCESSORY', 'Black', 100),
('Product 50', 'Stylish sunglasses for sunny days.', 60.00, 'images/accessory/accessory-2.jpg', 'ACCESSORY', 'Brown', 80),
('Product 51', 'Classic wristwatch with a sleek design.', 120.00, 'images/accessory/accessory-3.jpg', 'ACCESSORY', 'Silver', 50),
('Product 52', 'Warm woolen scarf, perfect for winter.', 35.00, 'images/accessory/accessory-4.jpg', 'ACCESSORY', 'Gray', 70),
('Product 53', 'Chic handbag for casual outings.', 90.00, 'images/accessory/accessory-5.jpg', 'ACCESSORY', 'Beige', 60),
('Product 54', 'Minimalist wallet with multiple compartments.', 50.00, 'images/accessory/accessory-6.jpg', 'ACCESSORY', 'Black', 90),
('Product 55', 'Trendy bucket hat for sunny adventures.', 40.00, 'images/accessory/accessory-7.jpg', 'ACCESSORY', 'Green', 75),
('Product 56', 'Elegant pearl necklace for formal occasions.', 150.00, 'images/accessory/accessory-8.jpg', 'ACCESSORY', 'White', 30),
('Product 57', 'Sporty backpack with ample storage.', 110.00, 'images/accessory/accessory-9.jpg', 'ACCESSORY', 'Blue', 40),
('Product 58', 'Stylish ring set to accessorize any look.', 65.00, 'images/accessory/accessory-10.jpg', 'ACCESSORY', 'Gold', 50),
('Product 59', 'Casual cap for everyday wear.', 35.00, 'images/accessory/accessory-11.jpg', 'ACCESSORY', 'Red', 85),
('Product 60', 'Leather gloves for a refined winter look.', 80.00, 'images/accessory/accessory-12.jpg', 'ACCESSORY', 'Black', 45),
('Product 61', 'Modern sunglasses with UV protection.', 70.00, 'images/accessory/accessory-13.jpg', 'ACCESSORY', 'Gray', 65),
('Product 62', 'Handcrafted bracelet with intricate details.', 55.00, 'images/accessory/accessory-14.jpg', 'ACCESSORY', 'Brown', 75),
('Product 63', 'Travel-friendly toiletry bag for essentials.', 90.00, 'images/accessory/accessory-15.jpg', 'ACCESSORY', 'Black', 40),
('Product 64', 'Elegant silk tie for formal events.', 60.00, 'images/accessory/accessory-16.jpg', 'ACCESSORY', 'Blue', 50),
('Product 65', 'Durable keychain with stylish design.', 30.00, 'images/accessory/accessory-17.jpg', 'ACCESSORY', 'Silver', 90),
('Product 66', 'Classic fedora hat to elevate your style.', 85.00, 'images/accessory/accessory-18.jpg', 'ACCESSORY', 'Black', 35),
('Product 67', 'Warm beanie, perfect for cold weather.', 40.00, 'images/accessory/accessory-19.jpg', 'ACCESSORY', 'Gray', 80),
('Product 68', 'Stylish belt bag for hands-free convenience.', 95.00, 'images/accessory/accessory-20.jpg', 'ACCESSORY', 'Beige', 25),
('Product 69', 'Chic earrings with delicate detailing.', 75.00, 'images/accessory/accessory-21.jpg', 'ACCESSORY', 'Gold', 40),
('Product 70', 'Casual crossbody bag for everyday use.', 100.00, 'images/accessory/accessory-22.jpg', 'ACCESSORY', 'Green', 30),
('Product 71', 'Sophisticated cufflinks for formal wear.', 110.00, 'images/accessory/accessory-23.jpg', 'ACCESSORY', 'Silver', 20),
('Product 72', 'Trendy anklet for beach outings.', 50.00, 'images/accessory/accessory-24.jpg', 'ACCESSORY', 'White', 70);
