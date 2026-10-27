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
    /* Reemplaza el bloque 2 en script.js por este código optimizado */
let lastScrollTop = 0;
const headerBackdrop = document.getElementById('header-backdrop');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 50) {
        headerBackdrop.classList.add('hidden-scroll');
        document.body.classList.add('header-closed');
    } else if (scrollTop < lastScrollTop) {
        headerBackdrop.classList.remove('hidden-scroll');
        document.body.classList.remove('header-closed');
    }
    
    lastScrollTop = Math.max(0, scrollTop);
}, { passive: true });

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