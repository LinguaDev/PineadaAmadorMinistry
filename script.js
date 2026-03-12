document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. GESTIÓN DEL MENÚ MÓVIL --- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // Cambiamos el comportamiento: toggle de la clase 'hidden'
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });
    }

    /* --- 2. LÓGICA DEL CARRUSEL --- */
    const track = document.getElementById('carouselTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const navIndicators = document.getElementById('carouselNav');

    if (track && nextBtn && prevBtn && navIndicators) {
        const slides = Array.from(track.children);
        const dots = Array.from(navIndicators.children);

        const moveToSlide = (targetIndex) => {
            const currentSlide = track.querySelector('.current-slide');
            const targetSlide = slides[targetIndex];
            
            // Mover track usando el ancho de la diapositiva
            const amountToMove = targetSlide.offsetLeft;
            track.style.transform = `translateX(-${amountToMove}px)`;
            
            // Actualizar clases
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
            
            // Actualizar indicadores
            const currentDot = navIndicators.querySelector('.current-indicator');
            if (currentDot) currentDot.classList.remove('current-indicator');
            dots[targetIndex].classList.add('current-indicator');
        };

        nextBtn.addEventListener('click', () => {
            const currentIndex = slides.findIndex(s => s.classList.contains('current-slide'));
            const nextIndex = (currentIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        });

        prevBtn.addEventListener('click', () => {
            const currentIndex = slides.findIndex(s => s.classList.contains('current-slide'));
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveToSlide(prevIndex);
        });

        navIndicators.addEventListener('click', (e) => {
            if (!e.target.classList.contains('indicator')) return;
            const targetIndex = dots.indexOf(e.target);
            moveToSlide(targetIndex);
        });
    }
});