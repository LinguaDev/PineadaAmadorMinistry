document.addEventListener('DOMContentLoaded', function() {
    // 1. Get references to the elements
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = mobileNav.querySelectorAll('a');

    // 2. Function to toggle the menu state
    function toggleMenu() {
        // Toggle the 'open' class on the mobile navigation menu
        mobileNav.classList.toggle('open');
        
        // Toggle the icon (CSS handles changing the bars to an 'X' when 'open' is present)
        // If you were using an icon font like Font Awesome, you'd toggle the icon class here.
        // Since we are using divs for bars (pure HTML), we'll let the CSS handle the transformation
        // of the bars when the 'open' class is applied to the mobileNav container.
        
        // However, we can add a class to the toggle button itself to trigger a visual change if desired:
        menuToggle.classList.toggle('is-active');
    }

    // 3. Event Listener for the Hamburger Button
    menuToggle.addEventListener('click', toggleMenu);

    // 4. Close the menu when a link is clicked (for seamless navigation)
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Check if the menu is open before closing
            if (mobileNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    console.log("Script loaded and menu functionality is active!");
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const dotsNav = document.getElementById('carouselNav');
    const dots = Array.from(dotsNav.children);

    // 1. Configurar el ancho de los slides
    const slideWidth = slides[0].getBoundingClientRect().width;
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    // 2. Función principal de movimiento
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-indicator');
        targetDot.classList.add('current-indicator');
    };

    // 3. Lógica del "Time Tracker" (Rastreador de Tiempo)
    const setInitialMonth = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // 0 = Enero, 11 = Diciembre
        
        let targetIndex = 0; // Por defecto Noviembre 2025 (índice 0)

        // Mapeo lógico basado en tu rango Nov 2025 - Oct 2026
        if (currentYear === 2025) {
            if (currentMonth === 10) targetIndex = 0; // Noviembre
            if (currentMonth === 11) targetIndex = 1; // Diciembre
        } else if (currentYear === 2026) {
            // De Enero (0) a Octubre (9) se mapean a los índices 2 al 11
            if (currentMonth <= 9) {
                targetIndex = currentMonth + 2;
            } else {
                targetIndex = 11; // Si es después de Octubre, mostrar el último
            }
        } else if (currentYear > 2026) {
            targetIndex = 11; // Si es un año posterior, mostrar último reporte
        }

        const currentSlide = track.querySelector('.current-slide');
        const targetSlide = slides[targetIndex];
        const currentDot = dotsNav.querySelector('.current-indicator');
        const targetDot = dots[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    };

    // Ejecutar rastreador al cargar
    setInitialMonth();

    // 4. Eventos de los botones (Siguiente / Anterior)
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-indicator');
        const nextDot = currentDot.previousElementSibling; // Corrección lógica para dots

        if (nextSlide) {
            const targetDot = dots[slides.indexOf(nextSlide)];
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, targetDot);
        }
    });

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-indicator');

        if (prevSlide) {
            const targetDot = dots[slides.indexOf(prevSlide)];
            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, targetDot);
        }
    });

    // 5. Eventos de los indicadores (Puntos)
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
});