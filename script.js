document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Hamburger Menu Toggle Functionality ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle the 'active' class for styling and accessibility attributes
            navLinks.classList.toggle('active');
            hamburger.setAttribute(
                'aria-expanded', 
                navLinks.classList.contains('active') ? 'true' : 'false'
            );
        });

        // Close the menu when a link is clicked (common practice for mobile UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }


    // --- 2. Language Switch Functionality ---
    const languageSelect = document.getElementById('language-select');
    
    // Define the full translations map
    const translations = {
        'en': {
            // Navigation
            'nav-home': 'Home', 'nav-about': 'About Us', 'nav-ministries': 'Ministries', 
            'nav-events': 'Events', 'nav-contact': 'Contact', 'nav-give': 'Give Online',
            
            // Hero
            'hero-heading': 'Welcome to Pineda Amador Christian Ministry',
            'hero-text': 'A place where faith is nurtured, hope is restored, and love is shared with the community.',
            'hero-cta': 'Join Our Next Service',
            
            // About Us
            'about-mission-h': 'Our Mission',
            'about-mission-p': 'We are dedicated to spreading the Gospel, serving the needy, and fostering a deep, personal relationship with Christ through discipleship and community outreach.',
            'about-values-h': 'Core Values',
            'value-faith': '**Faith:** Believing in God\'s promises.',
            'value-love': '**Love:** Serving others with compassion.',
            'value-service': '**Service:** Actively engaging the community.',

            // Ministries
            'ministries-h': 'Explore Our Ministries',
            'ministry-youth-h': 'Youth Ministry',
            'ministry-youth-p': 'Equipping the next generation to live bold, faith-filled lives.',
            'ministry-outreach-h': 'Outreach Ministry',
            'ministry-outreach-p': 'Bringing hope and practical help to our local and global neighbors.',
            'ministry-worship-h': 'Worship Team',
            'ministry-worship-p': 'Leading the congregation in Spirit-filled, heartfelt worship.',
            'link-learn': 'Learn More',

            // Events
            'events-h': 'Upcoming Events & Sermons',
            'event-sunday-h': 'Sunday Worship Service',
            'event-sunday-time': 'Sunday, 10:00 AM',
            'event-sunday-p': 'Join us for a time of fellowship, worship, and an inspiring message.',
            'event-midweek-h': 'Mid-Week Prayer Meeting',
            'event-midweek-time': 'Wednesday, 7:00 PM',
            'event-midweek-p': 'A focused time of intercessory and corporate prayer.',
            'events-calendar-link': 'View Full Calendar',

            // Contact & Footer
            'contact-h': 'Get in Touch',
            'contact-address': 'Pineda Amador Christian Ministry',
            'contact-rights': '&copy; 2025 Pineda Amador Christian Ministry. All rights reserved.',
        },
        'es': {
            // Navegación
            'nav-home': 'Inicio', 'nav-about': 'Acerca de Nosotros', 'nav-ministries': 'Ministerios', 
            'nav-events': 'Eventos', 'nav-contact': 'Contacto', 'nav-give': 'Dar En Línea',
            
            // Héroe
            'hero-heading': 'Bienvenidos al Ministerio Cristiano Pineda Amador',
            'hero-text': 'Un lugar donde se nutre la fe, se restaura la esperanza y se comparte el amor con la comunidad.',
            'hero-cta': 'Únete a Nuestro Próximo Servicio',
            
            // Acerca de Nosotros
            'about-mission-h': 'Nuestra Misión',
            'about-mission-p': 'Estamos dedicados a difundir el Evangelio, servir a los necesitados y fomentar una relación personal profunda con Cristo a través del discipulado y el servicio comunitario.',
            'about-values-h': 'Valores Fundamentales',
            'value-faith': '**Fe:** Creer en las promesas de Dios.',
            'value-love': '**Amor:** Servir a los demás con compasión.',
            'value-service': '**Servicio:** Participar activamente en la comunidad.',
            
            // Ministerios
            'ministries-h': 'Explora Nuestros Ministerios',
            'ministry-youth-h': 'Ministerio Juvenil',
            'ministry-youth-p': 'Equipar a la próxima generación para vivir vidas audaces y llenas de fe.',
            'ministry-outreach-h': 'Ministerio de Alcance',
            'ministry-outreach-p': 'Llevar esperanza y ayuda práctica a nuestros vecinos locales y globales.',
            'ministry-worship-h': 'Equipo de Adoración',
            'ministry-worship-p': 'Liderar a la congregación en adoración sincera y llena del Espíritu.',
            'link-learn': 'Saber Más',
            
            // Eventos
            'events-h': 'Próximos Eventos y Sermones',
            'event-sunday-h': 'Servicio de Adoración Dominical',
            'event-sunday-time': 'Domingo, 10:00 AM',
            'event-sunday-p': 'Únete a nosotros para un tiempo de compañerismo, adoración y un mensaje inspirador.',
            'event-midweek-h': 'Reunión de Oración a Mitad de Semana',
            'event-midweek-time': 'Miércoles, 7:00 PM',
            'event-midweek-p': 'Un tiempo dedicado a la oración intercesora y corporativa.',
            'events-calendar-link': 'Ver Calendario Completo',
            
            // Contacto y Pie de Página
            'contact-h': 'Ponte en Contacto',
            'contact-address': 'Ministerio Cristiano Pineda Amador',
            'contact-rights': '&copy; 2025 Ministerio Cristiano Pineda Amador. Todos los derechos reservados.',
        }
    };

    // Universal function to apply translations
    function updateContent(lang) {
        const t = translations[lang];
        
        // 1. Loop through all elements with the 'data-i18n' attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (t[key]) {
                // Use innerHTML to handle bold markdown (**) within the text
                // It replaces **text** with <strong>text</strong>
                element.innerHTML = t[key].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            }
        });

        // 2. Set the document language
        document.documentElement.lang = lang;
    }
    
    // Event listener for the language dropdown change
    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            // Save the user's preference for persistence
            localStorage.setItem('ministryLang', selectedLang);
            updateContent(selectedLang);
        });

        // Initialization: Load content based on saved preference or default to English
        const savedLang = localStorage.getItem('ministryLang') || 'en';
        languageSelect.value = savedLang;
        updateContent(savedLang);
    }
});