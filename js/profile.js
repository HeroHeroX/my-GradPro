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
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        alert("You have not login yet!");
        window.location.href = "login.html";
        return;
    }

    // Hiển thị thông tin người dùng
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-role").textContent = user.role || "Khách hàng";
});

// Hàm đăng xuất
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Bạn đã đăng xuất!");
    window.location.href = "login.html";
}
