// script.js — Pineda Amador Family Ministry

document.addEventListener('DOMContentLoaded', () => {
    // ────────────────────────────────────────────────
    // Mobile Menu Toggle
    // ────────────────────────────────────────────────
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('active');

            // Optional: trap focus inside mobile menu (accessibility improvement)
            if (!isExpanded) {
                mobileNav.querySelector('a')?.focus();
            }
        });

        // Close mobile menu when clicking any link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                mobileNav.classList.remove('active');
            });
        });

        // Close on outside click (optional but nice UX)
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mobileNav.classList.remove('active');
            }
        });
    }

    // ────────────────────────────────────────────────
    // Smooth scrolling for all anchor links
    // ────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80; // approx header height + buffer
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ────────────────────────────────────────────────
    // Carousel (Featured Ministry Videos)
    // ────────────────────────────────────────────────
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track?.querySelectorAll('.carousel-slide') || []);
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const dotsNav = document.getElementById('carouselNav');
    const dots = Array.from(dotsNav?.querySelectorAll('.indicator') || []);

    if (track && slides.length > 0 && prevButton && nextButton && dots.length === slides.length) {
        let currentIndex = 0;

        function updateCarousel() {
            // Move track
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

            // Update dots
            dots.forEach((dot, idx) => {
                dot.classList.toggle('current-indicator', idx === currentIndex);
            });

            // Disable buttons at ends (optional)
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === slides.length - 1;
        }

        // Button handlers
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        // Handle window resize (recalculate position)
        window.addEventListener('resize', updateCarousel);

        // Initial setup
        updateCarousel();
    }

    // ────────────────────────────────────────────────
    // Optional: Scroll-to-top button (uncomment if desired)
    // ────────────────────────────────────────────────
    /*
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Back to top');
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
        background: #e65100; color: white; border: none; border-radius: 50%;
        font-size: 1.6rem; cursor: pointer; opacity: 0; transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 999;
    `;

    window.addEventListener('scroll', () => {
        scrollTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
        scrollTopBtn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    */
});