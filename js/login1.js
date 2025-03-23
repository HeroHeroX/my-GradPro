// Hàm để lưu token vào cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Hàm để lấy token từ cookies
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Xử lý form đăng nhập
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Login successful!');
            setCookie('token', data.token, 7);  // Lưu token trong 7 ngày
            window.location.href = '/index.html';  // Chuyển hướng sau khi đăng nhập
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login Error:', error);
    }
});

// Xử lý form đăng ký
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const res = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Register successful! Please login.');
            showLogin();  // Quay về màn hình đăng nhập
        } else {
            alert(data.message || 'Register failed');
        }
    } catch (error) {
        console.error('Register Error:', error);
    }
});

// Chuyển đổi giữa form login và register
function showRegister() {
    document.getElementById('loginBox').classList.add('hidden');
    document.getElementById('registerBox').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('loginBox').classList.remove('hidden');
    document.getElementById('registerBox').classList.add('hidden');
}


async function logout() {
    try {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include' // Cho phép gửi cookie
        });

        if (response.ok) {
            alert("Logged out successfully!");
            window.location.href = "login.html"; // Chuyển về trang đăng nhập
        } else {
            alert("Failed to log out!");
        }
    } catch (error) {
        console.error("Error during logout:", error);
    }
}
