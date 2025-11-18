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