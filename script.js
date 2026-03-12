document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. GESTIÓN DEL MENÚ MÓVIL --- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            mobileNav.classList.toggle('hidden');
        });
    }

    /* --- 2. LÓGICA MODERNA DEL CARRUSEL --- */
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const navIndicators = document.getElementById('carouselNav');
    const dots = Array.from(navIndicators.children);

    // Función principal para mover el carrusel
    const moveToSlide = (targetIndex) => {
        const targetSlide = slides[targetIndex];
        const currentSlide = track.querySelector('.current-slide');
        
        // Desplazamiento mediante transform
        track.style.transform = `translateX(-${targetSlide.offsetLeft}px)`;
        
        // Actualizar estados
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        
        // Actualizar indicadores
        navIndicators.querySelector('.current-indicator').classList.remove('current-indicator');
        dots[targetIndex].classList.add('current-indicator');
    };

    // Eventos de botones
    nextBtn.addEventListener('click', () => {
        const currentIndex = slides.findIndex(s => s.classList.contains('current-slide'));
        const nextIndex = (currentIndex + 1) % slides.length; // Ciclo infinito
        moveToSlide(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
        const currentIndex = slides.findIndex(s => s.classList.contains('current-slide'));
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    });

    // Eventos de navegación por puntos
    navIndicators.addEventListener('click', (e) => {
        if (!e.target.classList.contains('indicator')) return;
        const targetIndex = dots.findIndex(dot => dot === e.target);
        moveToSlide(targetIndex);
    });

    // Ajuste responsivo automático
    window.addEventListener('resize', () => {
        const currentSlide = track.querySelector('.current-slide');
        track.style.transform = `translateX(-${currentSlide.offsetLeft}px)`;
    });
});