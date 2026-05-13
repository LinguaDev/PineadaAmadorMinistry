// ==================== MENÚ HAMBURGUESA ====================
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');
const body = document.body;

// Función para abrir el menú
function openMenu() {
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden'; // Evita scroll detrás del menú
}

// Función para cerrar el menú
function closeMenu() {
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
}

// Evento para abrir el menú (hamburguesa)
if (menuToggle) {
    menuToggle.addEventListener('click', openMenu);
}

// Evento para cerrar el menú (botón X)
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
}

// Cerrar menú al hacer clic en un enlace del menú móvil
const mobileNavLinks = document.querySelectorAll('#mobile-menu .nav-list a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Si el enlace apunta a una sección dentro de la página (#id)
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            closeMenu();
        }
        // Si es donate.html u otro enlace externo, se cierra igual (opcional)
        else {
            closeMenu();
        }
    });
});

// Cerrar menú al hacer clic fuera del menú (opcional, mejora UX)
document.addEventListener('click', (e) => {
    if (mobileMenu.getAttribute('aria-hidden') === 'false') {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    }
});

// ==================== SCROLL SUAVE PARA ENLACES INTERNOS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Actualizar URL sin recargar (opcional)
            history.pushState(null, null, targetId);
        }
    });
});

// ==================== RESALTAR ENLACE ACTIVO AL HACER SCROLL ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

function updateActiveLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 150; // offset para considerar header fijo

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ==================== OPCIÓN: CERRAR MENÚ AL REDIMENSIONAR VENTANA (SI SE PASA A DESKTOP) ====================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Si el menú está abierto y la pantalla es grande, lo cerramos
        if (mobileMenu && mobileMenu.getAttribute('aria-hidden') === 'false') {
            closeMenu();
        }
    }
});