document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('librarySearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');

    // --- 1. CONFIGURACIÓN DE PDF.JS ---
    // Usamos la versión de CDN para asegurar que el worker funcione correctamente
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    // Función interna para renderizar la primera página del PDF en el canvas
    const renderPdfPreview = (canvas) => {
        const url = canvas.getAttribute('data-pdf');
        const context = canvas.getContext('2d');

        pdfjsLib.getDocument(url).promise.then(pdf => {
            pdf.getPage(1).then(page => {
                // Ajustamos la escala para una buena resolución de miniatura
                const viewport = page.getViewport({ scale: 0.8 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        }).catch(err => {
            console.error("Error al generar vista previa: ", err);
            // Si el PDF no carga, podrías poner un color de fondo o un texto
            canvas.style.backgroundColor = "#ddd";
        });
    };

    // Iniciamos la carga de vistas previas para todos los libros
    document.querySelectorAll('.pdf-preview').forEach(canvas => {
        renderPdfPreview(canvas);
    });

    // --- 2. Lógica de Búsqueda ---
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        bookCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = "flex";
                card.style.animation = "fadeIn 0.4s ease forwards";
            } else {
                card.style.display = "none";
            }
        });
    });

    // --- 3. Lógica de Filtros por Categoría ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            bookCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = "flex";
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

// Estilos de animación inyectados
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .pdf-preview {
        max-width: 100%;
        height: auto;
        display: block;
    }
`;
document.head.appendChild(style);