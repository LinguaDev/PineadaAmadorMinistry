document.addEventListener('DOMContentLoaded', () => {

    /**
     * Finds the offset height of the sticky header to ensure anchor links
     * scroll correctly (not hidden behind the fixed navigation bar).
     * @returns {number} The combined height of the fixed header components.
     */
    function getHeaderOffsetHeight() {
        const headerTop = document.querySelector('.sermon-header .header-top');
        const jumpBar = document.querySelector('.category-jump-bar');
        
        // Calculate total height of the fixed elements
        let totalHeight = 0;
        if (headerTop) {
            totalHeight += headerTop.offsetHeight;
        }
        if (jumpBar) {
            totalHeight += jumpBar.offsetHeight;
        }
        
        // Add a small extra buffer for visual comfort
        return totalHeight + 10; 
    }

    /**
     * Handles smooth scrolling for all internal anchor links (like the fixed navigation).
     */
    function setupSmoothScrolling() {
        // Select all anchor tags that link to an ID on the same page
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                
                // Prevent the browser's default instant jump
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);

                // Check if a valid target element was found
                if (target) {
                    const offset = getHeaderOffsetHeight();

                    // Use the built-in ScrollTo method for smooth behavior
                    window.scrollTo({
                        // Calculate the target position minus the fixed header height
                        top: target.offsetTop - offset, 
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize the smooth scrolling feature on page load
    setupSmoothScrolling(); 

    // --- Optional: Add class to body when scrolling begins for subtle styling effects (e.g., box-shadow on header) ---
    const header = document.querySelector('.sermon-header');

    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 0) {
                // Add a class when scrolled down
                header.classList.add('scrolled');
            } else {
                // Remove the class when at the very top
                header.classList.remove('scrolled');
            }
        }
    });
});