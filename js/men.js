// JavaScript cho việc hiển thị/ẩn thanh tìm kiếm khi nhấn vào biểu tượng kính lúp
document.getElementById("search-icon").addEventListener("click", function() {
    var searchContainer = document.getElementById("search-container");
    if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
        searchContainer.style.display = "block"; // Hiển thị thanh tìm kiếm
    } else {
        searchContainer.style.display = "none"; // Ẩn thanh tìm kiếm
    }
});

//ANIMATION
// Hiệu ứng khi cuộn trang
document.addEventListener("DOMContentLoaded", function () {
    const productItems = document.querySelectorAll(".product-item");

    function checkScroll() {
        productItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                item.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Gọi ngay khi load trang
});


//BACK TO TOP BUTTON        

// Lấy nút bấm
const backToTopButton = document.getElementById('backToTop');

// Kiểm tra khi người dùng cuộn xuống trang
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {  // Hiển thị nút khi cuộn xuống 300px
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Khi nhấn vào nút, cuộn lên đầu trang
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // Cuộn mượt mà
    });
});
