/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del Menú Hamburguesa
    const menuBtn = document.getElementById('menu-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuOverlay.classList.toggle('active');
            hamburgerIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    // 2. Comportamiento del Header al hacer Scroll
    // script.js
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('hidden');
            return;
        }

        if (currentScroll > lastScroll && !nav.classList.contains('hidden')) {
            nav.classList.add('hidden');
        } else if (currentScroll < lastScroll && nav.classList.contains('hidden')) {
            nav.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
});

    // 3. Lógica del Acordeón y Click en Botones
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const btn = item.querySelector('.accordion-btn');
        btn.addEventListener('click', () => {
            // Cerrar todos
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0px';
                }
            });

            // Alternar estado del actual
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                content.style.maxHeight = '0px';
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // 4. Scroll Spy (Detectar en qué bloque está el usuario para abrir el texto en desktop)
    const blockRows = document.querySelectorAll('.block-row[id]');
    
    if (blockRows.length > 0 && window.innerWidth > 600) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const correspondingItem = document.querySelector(`.accordion-item[data-target="${id}"]`);
                    
                    if (correspondingItem && !correspondingItem.classList.contains('active')) {
                        // Simular click para abrir y cerrar los demás fluidamente
                        const btn = correspondingItem.querySelector('.accordion-btn');
                        btn.click();
                    }
                }
            });
        }, observerOptions);

        blockRows.forEach(row => observer.observe(row));
    }
});