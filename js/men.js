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

                                //MODAL
// Danh sách sản phẩm
const products = {
    "1": { 
        name: "T-Shirt",
        price: "$50", 
        images: { 
            "Black": "images/men/products/t1.jpg", 
            "White": "images/men/products/t2.jpg"
        }, 
        colors: ["Black", "White"] 
    }
};

// Lấy danh sách tất cả các sản phẩm trên trang
document.querySelectorAll(".product-item").forEach(item => {
    item.addEventListener("click", function () {
        const productId = this.getAttribute("data-id"); // Lấy ID sản phẩm từ data-id
        
        if (productId in products) {
            const product = products[productId]; // Lấy thông tin sản phẩm

            // Gán thông tin sản phẩm vào modal
            const modalImage = document.getElementById("modal-product-image");
            modalImage.src = Object.values(product.images)[0]; // Lấy ảnh đầu tiên làm mặc định
            document.getElementById("modal-product-name").innerText = product.name;
            document.getElementById("modal-product-price").innerText = product.price;

            // Hiển thị danh sách màu sắc
            const colorsContainer = document.getElementById("modal-product-colors");
            colorsContainer.innerHTML = ""; // Xóa các màu trước đó
            product.colors.forEach(color => {
                let colorElement = document.createElement("span");
                colorElement.innerText = color;
                colorElement.style.margin = "5px";
                colorElement.style.padding = "5px 10px";
                colorElement.style.border = "1px solid black";
                colorElement.style.borderRadius = "5px";
                colorElement.style.background = "#f1f1f1";
                colorElement.style.display = "inline-block";
                colorElement.style.cursor = "pointer"; // Biến thành con trỏ khi di chuột vào
                colorElement.dataset.color = color; // Lưu màu vào data attribute
                
                // Thêm sự kiện click để thay đổi ảnh khi chọn màu
                colorElement.addEventListener("click", function () {
                    modalImage.src = product.images[this.dataset.color];
                });

                colorsContainer.appendChild(colorElement);
            });

            // Hiển thị modal với hiệu ứng mượt
            let modal = document.getElementById("product-modal");
            modal.style.display = "block";
            modal.style.opacity = "0";
            setTimeout(() => { modal.style.opacity = "1"; }, 50);
        }
    });
});

// Đóng modal khi bấm nút "X" hoặc bấm ra ngoài
window.onclick = function (event) {
    let modal = document.getElementById("product-modal");
    if (event.target === modal) {
        modal.style.opacity = "0";
        setTimeout(() => { modal.style.display = "none"; }, 300);
    }
};



