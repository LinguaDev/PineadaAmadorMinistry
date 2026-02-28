document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('librarySearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');

    // --- 1. Lógica de Búsqueda ---
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

    // --- 2. Lógica de Filtros por Categoría ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Cambiar estado activo de los botones
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

// Animación simple para que los libros no aparezcan de golpe
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);