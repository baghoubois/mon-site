document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initEntranceAnimations(); // Pour le héros
    initScrollAnimations();     // Pour le reste de la page
    initHeroParallax();         // Effet de profondeur
    initMobileMenu();
    updateCopyrightYear();
});

// Effet "premium" sur l'en-tête au défilement
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Animations d'entrée pour le contenu du héros
function initEntranceAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    const elements = heroContent.querySelectorAll('[data-animation]');
    elements.forEach(el => {
        const delay = el.dataset.delay || '0';
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('is-visible');
    });
}

// Animations au défilement pour le reste de la page
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    if (!elementsToAnimate.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || '0';
                el.style.transitionDelay = `${delay}ms`;
                
                // Applique la classe de l'animation pour la déclencher
                const animationType = el.dataset.animation || 'fade-up';
                el.classList.add(animationType, 'is-visible');

                // Si c'est un compteur, on l'anime
                if(el.classList.contains('about-stats')) {
                    el.querySelectorAll('.stat-number').forEach(animateCounter);
                }

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Effet Parallax pour l'arrière-plan du héros
function initHeroParallax() {
    const heroBg = document.querySelector('.hero-background');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        // Le facteur 0.4 ralentit l'effet. Ajustez pour plus ou moins d'intensité.
        heroBg.style.transform = `translateY(${scrollValue * 0.4}px)`;
    });
}

// Animation des compteurs
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // Durée de 2 secondes
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3); // Fonction d'easing pour un effet plus doux
    let startTimestamp = null;

    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = easeOutCubic(progress);
        
        counter.innerText = Math.floor(easedProgress * target);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            counter.innerText = target; // Assure que la valeur finale est exacte
        }
    }

    window.requestAnimationFrame(step);
}


// Menu de navigation mobile
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (!navToggle || !mainNav) return;

    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
        });
    });
}

// Mise à jour de l'année du copyright
function updateCopyrightYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
