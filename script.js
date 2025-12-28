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

    // Function to calculate heights and positions
    const updateLayout = () => {
        if (!slides.length) return;
        const slideWidth = slides[0].getBoundingClientRect().width;
        
        // Arrange slides side-by-side
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });

        // Fix the "superpuesto" (overlapping) issue by forcing container height
        const currentSlide = track.querySelector('.current-slide') || slides[0];
        const trackContainer = track.parentElement;
        trackContainer.style.height = currentSlide.querySelector('.reports-grid').offsetHeight + 'px';
    };

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        
        // Update height immediately when moving
        const trackContainer = track.parentElement;
        trackContainer.style.height = targetSlide.querySelector('.reports-grid').offsetHeight + 'px';
    };

    const updateDots = (currentDot, targetDot) => {
        if (currentDot) currentDot.classList.remove('current-indicator');
        if (targetDot) targetDot.classList.add('current-indicator');
    };

    /* --- 3. TIME TRACKER LOGIC --- */
    const setInitialMonth = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // 0 = Jan, 11 = Dec
        
        let targetIndex = 0; 

        if (currentYear === 2025) {
            if (currentMonth === 10) targetIndex = 0; // Nov
            if (currentMonth === 11) targetIndex = 1; // Dec
        } else if (currentYear === 2026) {
            if (currentMonth <= 9) {
                targetIndex = currentMonth + 2;
            } else {
                targetIndex = 11; // Post-October 2026
            }
        } else if (currentYear > 2026) {
            targetIndex = 11;
        }

        const currentSlide = slides[0];
        const targetSlide = slides[targetIndex];
        const currentDot = dotsNav.querySelector('.current-indicator');
        const targetDot = dots[targetIndex];

        updateLayout();
        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    };

    // Run layout and tracker
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

    // Handle window resizing (phone rotation)
    window.addEventListener('resize', updateLayout);

    console.log("Remastered JS loaded: Menu, Carousel Height Fix, and Time Tracker active.");
});