        // Banner Slider

$('.banner').slick({
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
});

// Testimonial Slider
$('.testimonial-slider').slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
    nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>',
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true // Vẫn hiển thị arrows trên mobile
            }
        }
    ]
});

// Fixed Header on Scroll
const headerBottom = document.getElementById('headerBottom');
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        headerBottom.classList.add('fixed');
    } else {
        headerBottom.classList.remove('fixed');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Animate Stats on Scroll
function animateStats() {
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach(item => {
        const numberElement = item.querySelector('.stat-number');
        const finalNumber = parseInt(numberElement.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = 20; // ms
        const increment = finalNumber / (duration / step);
        let currentNumber = 0;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        clearInterval(timer);
                        currentNumber = finalNumber;
                    }

                    if (numberElement.textContent.includes('+')) {
                        numberElement.textContent = Math.floor(currentNumber) + '+';
                    } else if (numberElement.textContent.includes('%')) {
                        numberElement.textContent = Math.floor(currentNumber) + '%';
                    } else {
                        numberElement.textContent = Math.floor(currentNumber);
                    }
                }, step);

                observer.unobserve(item);
            }
        }, { threshold: 0.5 });

        observer.observe(item);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    animateStats();
});
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    const menuCloseBtn = document.querySelector('.menu-close-btn');
    const headerBottom = document.getElementById('headerBottom');

    // Toggle mobile menu
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            mainMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu khi click nút close
        if (menuCloseBtn) {
            menuCloseBtn.addEventListener('click', function () {
                mainMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        // Close menu khi click bên ngoài
        document.addEventListener('click', function (e) {
            if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mainMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Fixed header on scroll
    if (headerBottom) {
        window.addEventListener('scroll', function () {
            headerBottom.classList.toggle('fixed', window.scrollY > 50);
        });
    }
});