// ==================== SERMONS PAGE - PINEDA AMADOR MINISTRY ====================
// Smooth scrolling, active category highlighting, and mobile menu improvements

document.addEventListener('DOMContentLoaded', function() {
    
    // -------------------- 1. SMOOTH SCROLL FOR ALL ANCHOR LINKS --------------------
    // Select all anchor links that point to an element on the same page
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Optional: update URL without reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // -------------------- 2. ACTIVE CATEGORY HIGHLIGHT ON SCROLL --------------------
    // Highlight the jump link corresponding to the visible category section
    const categories = document.querySelectorAll('.category-archive-card');
    const jumpLinks = document.querySelectorAll('.jump-link');
    
    function updateActiveCategory() {
        let currentCategory = '';
        const scrollPosition = window.scrollY + 150; // offset for sticky header
        
        categories.forEach(category => {
            const sectionTop = category.offsetTop;
            const sectionBottom = sectionTop + category.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentCategory = '#' + category.getAttribute('id');
            }
        });
        
        jumpLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentCategory) {
                link.classList.add('active');
            }
        });
    }
    
    // Add CSS for active class (optional, but we define it here or let CSS handle)
    // Add style dynamically if not present
    if (!document.querySelector('#active-style')) {
        const style = document.createElement('style');
        style.id = 'active-style';
        style.textContent = `
            .jump-link.active {
                background: #e67e22;
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
    
    window.addEventListener('scroll', updateActiveCategory);
    window.addEventListener('load', updateActiveCategory);
    
    // -------------------- 3. HANDLE EXTERNAL LINKS SECURITY --------------------
    // All external links should open in new tab with rel="noopener"
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="pinedaamador.org"])');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // -------------------- 4. MOBILE MENU IMPROVEMENT (for category jump bar on mobile) --------------------
    // No complex menu, but we can ensure the jump bar is usable on small screens
    // Already handled by CSS, but we can add a smooth scroll when clicking jump links on mobile
    // (already covered by smooth scroll)
    
    // -------------------- 5. ADD SIMPLE CONSOLE LOG FOR DEBUGGING --------------------
    console.log('Sermons page loaded — enjoy the messages!');
});