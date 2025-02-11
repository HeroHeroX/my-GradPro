// JavaScript cho việc hiển thị/ẩn thanh tìm kiếm khi nhấn vào biểu tượng kính lúp
document.getElementById("search-icon").addEventListener("click", function() {
    var searchContainer = document.getElementById("search-container");
    if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
        searchContainer.style.display = "block"; // Hiển thị thanh tìm kiếm
    } else {
        searchContainer.style.display = "none"; // Ẩn thanh tìm kiếm
    }
});

                            //SWIPER BILLBOARD
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".main-swiper", {
        slidesPerView: 3,  // Số lượng hình ảnh hiển thị trong mỗi lần
        spaceBetween: 70,  // Khoảng cách giữa các hình
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            200: {
                slidesPerView: 1,  // Màn hình nhỏ, chỉ 1 hình
            },
            768: {
                slidesPerView: 2,  // Màn hình vừa, hiển thị 2 hình
            },
            1024: {
                slidesPerView: 3,  // Màn hình lớn, hiển thị 3 hình
            },
        },
    });
});

                            //SCROLL ANIMATION

// Kiểm tra nếu phần tử nằm trong viewport
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Thêm class "show" khi phần tử vào viewport
function handleScroll() {
    const fromLeftElements = document.querySelectorAll('.from-left');
    const zoomInElements = document.querySelectorAll('.zoom-in');

    fromLeftElements.forEach((el) => {
        if (isInViewport(el)) {
            el.classList.add('show');
        }
    });

    zoomInElements.forEach((el) => {
        if (isInViewport(el)) {
            el.classList.add('show');
        }
    });
}

// Lắng nghe sự kiện scroll
window.addEventListener('scroll', handleScroll);

// Gọi hàm ngay khi tải trang
handleScroll();

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
