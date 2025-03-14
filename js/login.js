// JavaScript cho việc hiển thị/ẩn thanh tìm kiếm khi nhấn vào biểu tượng kính lúp
document.getElementById("search-icon").addEventListener("click", function() {
    var searchContainer = document.getElementById("search-container");
    if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
        searchContainer.style.display = "block"; // Hiển thị thanh tìm kiếm
    } else {
        searchContainer.style.display = "none"; // Ẩn thanh tìm kiếm
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const logoutBtn = document.getElementById("logout-btn");

    const API_BASE_URL = "http://localhost:5000"; // Đổi cổng nếu cần

    // Xử lý đăng ký
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value.trim();

        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Đăng ký thành công! Hãy đăng nhập.");
            showLogin();
        } else {
            alert(data.error);
        }
    });

    // Xử lý đăng nhập
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Đăng nhập thành công!");
            window.location.href = "profile.html"; // Chuyển về trang chủ sau khi đăng nhập
        } else {
            alert(data.error);
        }
    });

    // Xử lý đăng xuất
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Bạn đã đăng xuất!");
        window.location.href = "login.html"; // Quay lại trang đăng nhập
    });

    // Kiểm tra nếu đã đăng nhập, ẩn nút login
    const user = localStorage.getItem("user");
    if (user) {
        logoutBtn.style.display = "block";
    } else {
        logoutBtn.style.display = "none";
    }
});

function showRegister() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("active");

    document.getElementById("registerBox").classList.remove("hidden");
    document.getElementById("registerBox").classList.add("active");
}

function showLogin() {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("active");

    document.getElementById("loginBox").classList.remove("hidden");
    document.getElementById("loginBox").classList.add("active");
}
