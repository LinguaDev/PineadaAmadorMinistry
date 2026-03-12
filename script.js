document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. MOBILE MENU FUNCTIONALITY --- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = mobileNav.querySelectorAll('a');

    function toggleMenu() {
        mobileNav.classList.toggle('open');
        menuToggle.classList.toggle('is-active');
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

    /* --- 2. CAROUSEL & TIME TRACKER FUNCTIONALITY --- */
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const dotsNav = document.getElementById('carouselNav');
    const dots = Array.from(dotsNav.children);

    // Función actualizada para buscar .video-only-card
    const updateLayout = () => {
        if (!slides.length) return;
        const slideWidth = slides[0].getBoundingClientRect().width;
        
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });

        const currentSlide = track.querySelector('.current-slide') || slides[0];
        const trackContainer = track.parentElement;
        // Ajuste: ahora se busca .video-only-card
        trackContainer.style.height = currentSlide.querySelector('.video-only-card').offsetHeight + 'px';
    };

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        
        const trackContainer = track.parentElement;
        // Ajuste: ahora se busca .video-only-card
        trackContainer.style.height = targetSlide.querySelector('.video-only-card').offsetHeight + 'px';
    };

    const updateDots = (currentDot, targetDot) => {
        if (currentDot) currentDot.classList.remove('current-indicator');
        if (targetDot) targetDot.classList.add('current-indicator');
    };

    /* --- 3. TIME TRACKER LOGIC --- */
    const setInitialMonth = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); 
        
        let targetIndex = 0; 

        // Lógica de fechas ajustada para el nuevo número de slides (4)
        if (currentYear === 2025) {
            if (currentMonth === 10) targetIndex = 0; // Nov 2025
            else if (currentMonth === 11) targetIndex = 1; // Dec 2025
            else targetIndex = 0;
        } else if (currentYear === 2026) {
            if (currentMonth === 0) targetIndex = 2; // Jan 2026
            else if (currentMonth === 1) targetIndex = 3; // Feb 2026
            else targetIndex = 3; // Mantener en el último video si es posterior
        } else {
            targetIndex = 3;
        }

        const currentSlide = track.querySelector('.current-slide');
        const targetSlide = slides[targetIndex];
        const currentDot = dotsNav.querySelector('.current-indicator');
        const targetDot = dots[targetIndex];

        updateLayout();
        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    };

    setInitialMonth();

    /* --- 4. NAVIGATION EVENTS --- */
    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-indicator');

        if (nextSlide) {
            const targetDot = dots[slides.indexOf(nextSlide)];
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, targetDot);
        }
    });

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-indicator');

        if (prevSlide) {
            const targetDot = dots[slides.indexOf(prevSlide)];
            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, targetDot);
        }
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-indicator');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });

    window.addEventListener('resize', updateLayout);
});