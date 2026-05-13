// ==================== UKBI DIGITAL LIBRARY ====================
// Handles PDF preview rendering, category filtering, and search functionality

// Configure PDF.js worker (required for rendering)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// ==================== RENDER PDF PREVIEWS ====================
// Renders first page of each PDF as thumbnail on canvas
async function renderPdfPreviews() {
    const canvases = document.querySelectorAll('.pdf-preview');
    
    for (const canvas of canvases) {
        const pdfUrl = canvas.getAttribute('data-pdf');
        if (!pdfUrl) continue;
        
        try {
            // Load the PDF document
            const loadingTask = pdfjsLib.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;
            
            // Get the first page
            const page = await pdf.getPage(1);
            
            // Calculate scale to fit canvas width (max 120px width for thumbnail)
            const viewport = page.getViewport({ scale: 1.0 });
            const maxWidth = 120;
            const scale = maxWidth / viewport.width;
            const scaledViewport = page.getViewport({ scale });
            
            // Set canvas dimensions
            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;
            
            // Render PDF page into canvas context
            const context = canvas.getContext('2d');
            const renderContext = {
                canvasContext: context,
                viewport: scaledViewport
            };
            await page.render(renderContext).promise;
            
        } catch (error) {
            console.error(`Error loading PDF ${pdfUrl}:`, error);
            // Draw an error placeholder on canvas
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#f0e9dc';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#e67e22';
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText('Preview unavailable', 10, 40);
        }
    }
}

// ==================== FILTERING & SEARCH ====================
let currentFilter = 'all';
let currentSearchTerm = '';

function filterAndSearchBooks() {
    const bookCards = document.querySelectorAll('.book-card');
    let visibleCount = 0;
    
    bookCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
        const description = card.querySelector('p')?.innerText.toLowerCase() || '';
        
        // Check category filter
        const matchesCategory = (currentFilter === 'all' || category === currentFilter);
        
        // Check search term
        const matchesSearch = currentSearchTerm === '' || 
                              title.includes(currentSearchTerm) || 
                              description.includes(currentSearchTerm);
        
        if (matchesCategory && matchesSearch) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Optional: show "no results" message if needed
    let noResultsMsg = document.querySelector('.no-results-message');
    if (visibleCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.textContent = 'No books match your search criteria. Try a different keyword or category.';
            noResultsMsg.style.textAlign = 'center';
            noResultsMsg.style.padding = '2rem';
            noResultsMsg.style.color = '#666';
            document.querySelector('.books-grid').after(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', async () => {
    // Render PDF previews first
    await renderPdfPreviews();
    
    // Set up filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update current filter
            currentFilter = btn.getAttribute('data-filter');
            filterAndSearchBooks();
        });
    });
    
    // Set up search input
    const searchInput = document.getElementById('librarySearch');
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                currentSearchTerm = e.target.value.trim().toLowerCase();
                filterAndSearchBooks();
            }, 300);
        });
    }
    
    // Initial filter
    filterAndSearchBooks();
});

// ==================== FALLBACK FOR MISSING PDF WORKER ====================
// If the CDN worker fails, try to use a local fallback (optional)
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'SCRIPT' && e.target.src?.includes('pdf.worker')) {
        console.warn('PDF worker failed to load, thumbnails may not render.');
    }
});