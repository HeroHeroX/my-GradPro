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
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            480: {
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

  