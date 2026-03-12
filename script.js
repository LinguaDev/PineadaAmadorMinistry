document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. MOBILE MENU FUNCTIONALITY --- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = mobileNav.querySelectorAll('a');

    function toggleMenu() {
        mobileNav.classList.toggle('open');
        // Ocultar/Mostrar el menú al alternar
        if (mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('hidden');
        } else {
            // Se puede añadir un pequeño delay si se desea una transición de cierre
            mobileNav.classList.add('hidden');
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* --- 2. CAROUSEL FUNCTIONALITY --- */
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const dotsNav = document.getElementById('carouselNav');
    const dots = Array.from(dotsNav.children);

    const updateLayout = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
    };

    const moveToSlide = (targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        
        const currentSlide = track.querySelector('.current-slide');
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (targetDot) => {
        const currentDot = dotsNav.querySelector('.current-indicator');
        currentDot.classList.remove('current-indicator');
        targetDot.classList.add('current-indicator');
    };

    // Inicializar layout
    updateLayout();
    window.addEventListener('resize', updateLayout);

    // Eventos de botones
    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        if (nextSlide) {
            moveToSlide(nextSlide);
            updateDots(dots[slides.indexOf(nextSlide)]);
        }
    });

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        if (prevSlide) {
            moveToSlide(prevSlide);
            updateDots(dots[slides.indexOf(prevSlide)]);
        }
    });

    // Eventos de puntos de navegación
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;
        
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];
        
        moveToSlide(targetSlide);
        updateDots(targetDot);
    });
});