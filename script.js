// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const body = document.body;

    // State
    let isMenuOpen = false;

    // Helper functions
    function openMenu() {
        if (isMenuOpen) return;
        
        isMenuOpen = true;
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileMenu.classList.add('active');
        body.classList.add('menu-open'); // prevents scrolling behind menu
        
        // Focus first link for keyboard accessibility
        setTimeout(() => {
            mobileMenu.querySelector('a')?.focus();
        }, 100);
    }

    function closeMenu() {
        if (!isMenuOpen) return;
        
        isMenuOpen = false;
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Return focus to toggle button
        menuToggle.focus();
    }

    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    // Close when clicking links inside the mobile menu
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close when clicking outside the menu
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && isMenuOpen) {
            closeMenu();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Optional: handle resize (close menu if user resizes to desktop size)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) { // adjust breakpoint to match your CSS
            closeMenu();
        }
    });
});