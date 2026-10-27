/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.site-nav');

    if (nav) {
        let lastScrollY = window.scrollY;
        let accumulatedDelta = 0;

        window.addEventListener('scroll', () => {
            const currentScrollY = Math.max(0, window.scrollY);
            const delta = currentScrollY - lastScrollY;

            if (currentScrollY <= 20) {
                accumulatedDelta = 0;
                nav.classList.remove('is-hidden');
                nav.inert = false;
                document.body.classList.remove('nav-hidden');
            } else {
                if (Math.sign(delta) !== Math.sign(accumulatedDelta)) {
                    accumulatedDelta = 0;
                }

                accumulatedDelta += delta;

                if (accumulatedDelta > 8 && !nav.classList.contains('is-hidden')) {
                    nav.classList.add('is-hidden');
                    nav.inert = true;
                    document.body.classList.add('nav-hidden');
                } else if (accumulatedDelta < -8 && nav.classList.contains('is-hidden')) {
                    nav.classList.remove('is-hidden');
                    nav.inert = false;
                    document.body.classList.remove('nav-hidden');
                }
            }

            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    // Lógica del Acordeón y Click en Botones
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

    // Scroll Spy (Detectar en qué bloque está el usuario para abrir el texto en desktop)
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