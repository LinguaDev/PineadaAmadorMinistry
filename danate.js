// ==================== DONATE PAGE - Pineda Amador Family Ministry ====================
// Script for donation page interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // -------------------- 1. External links security --------------------
    // Ensure all external links open in a new tab with rel="noopener"
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="pinedaamador.org"])');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // -------------------- 2. PayPal donation button feedback --------------------
    const paypalBtn = document.querySelector('.btn-paypal');
    if (paypalBtn) {
        paypalBtn.addEventListener('click', function(e) {
            // Optional: add a tracking event or simple console log
            console.log('PayPal donation button clicked. Redirecting to PayPal...');
        });
    }
    
    // -------------------- 3. Copy Western Union details (helpful for mobile users) --------------------
    // Create a small "copy" button next to each important data point? Instead, we'll add a single copy button
    // that copies the entire recipient information block.
    const wuCard = document.querySelector('.donation-card.direct-support');
    if (wuCard) {
        // Create copy button only if it doesn't exist
        if (!document.getElementById('copyWUInfo')) {
            const copyBtn = document.createElement('button');
            copyBtn.id = 'copyWUInfo';
            copyBtn.textContent = '📋 Copy Western Union Details';
            copyBtn.style.background = '#e67e22';
            copyBtn.style.color = 'white';
            copyBtn.style.border = 'none';
            copyBtn.style.padding = '0.5rem 1rem';
            copyBtn.style.borderRadius = '40px';
            copyBtn.style.cursor = 'pointer';
            copyBtn.style.fontSize = '0.85rem';
            copyBtn.style.marginTop = '0.5rem';
            copyBtn.style.width = '100%';
            copyBtn.style.fontWeight = '600';
            
            // Insert after the important-note paragraph
            const importantNote = wuCard.querySelector('.important-note');
            if (importantNote) {
                importantNote.insertAdjacentElement('afterend', copyBtn);
            } else {
                wuCard.appendChild(copyBtn);
            }
            
            copyBtn.addEventListener('click', function() {
                // Gather WU details
                const nameElem = document.querySelector('.recipient-info dt:first-child + dd');
                const phoneElem = document.querySelector('.recipient-info dt:nth-of-type(2) + dd');
                const cedulaElem = document.querySelector('.recipient-info dt:nth-of-type(3) + dd');
                const cityElem = document.querySelector('.recipient-info dt:nth-of-type(4) + dd');
                
                const name = nameElem ? nameElem.innerText : 'Juan Pineda Canales';
                const phone = phoneElem ? phoneElem.innerText : '+505 5751 4440';
                const cedula = cedulaElem ? cedulaElem.innerText : '321-220391-0001G';
                const city = cityElem ? cityElem.innerText : 'León, Nicaragua';
                
                const textToCopy = `Western Union Recipient:\nName: ${name}\nPhone: ${phone}\nID/Cédula: ${cedula}\nCity: ${city}\n\nAfter sending, email MTCN to JUANCANALES5019@GMAIL.COM`;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Change button text temporarily
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = '✅ Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                }).catch(() => {
                    alert('Unable to copy. Please select the details manually.');
                });
            });
        }
    }
    
    // -------------------- 4. Smooth scroll for "Back to Home" link (optional) --------------------
    const backLink = document.querySelector('.back-home');
    if (backLink && backLink.getAttribute('href') === 'index.html') {
        // No need to smooth, it's a page navigation. We can just add a console message.
        backLink.addEventListener('click', function(e) {
            console.log('Returning to homepage');
        });
    }
    
    // -------------------- 5. Add a simple thank you message on page load --------------------
    console.log('Donation page loaded — thank you for considering support.');
});