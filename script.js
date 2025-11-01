/* 
========================================
TABLE DES MATIÈRES JAVASCRIPT
========================================
1. Initialisation générale
2. Comportement de l'en-tête au défilement
3. Animations à l'apparition (Intersection Observer)
4. Animation des compteurs
5. Menu de navigation mobile
6. Mise à jour dynamique de l'année du copyright
========================================
*/

// 1. Initialisation générale
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialise toutes les fonctionnalités après le chargement du DOM
    initHeaderScroll();
    initScrollAnimations();
    initMobileMenu();
    updateCopyrightYear();

});

// 2. Comportement de l'en-tête au défilement
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* 
   Ajoutez ceci à votre CSS (style.css) pour l'effet de défilement :
   .main-header.scrolled {
       padding: 0.5rem 0;
       background-color: rgba(255, 255, 255, 0.98);
   }
*/


// 3. Animations à l'apparition (Intersection Observer)
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    if (!elementsToAnimate.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Si l'élément est un compteur, lancez l'animation du compteur
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Optionnel : arrête d'observer l'élément une fois qu'il est visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
    });

    elementsToAnimate.forEach(element => {
        // Applique l'observateur aux compteurs également
        if(element.classList.contains('about-stats')) {
            element.querySelectorAll('.stat-number').forEach(stat => observer.observe(stat));
        } else {
            observer.observe(element);
        }
    });
}

// 4. Animation des compteurs
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // Durée de l'animation en millisecondes
    const stepTime = 20; // Intervalle de mise à jour
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            counter.innerText = target;
        } else {
            counter.innerText = Math.ceil(current);
        }
    }, stepTime);
}

// 5. Menu de navigation mobile
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!navToggle || !mainNav) return;

    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });

    // Optionnel : fermer le menu en cliquant sur un lien
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('nav-open')) {
                document.body.classList.remove('nav-open');
            }
        });
    });
}

/*
   Ajoutez ceci à votre CSS (style.css) pour le menu mobile.
   Placez-le dans la section responsive (@media).

   @media (max-width: 768px) {
        .main-nav {
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 70%;
            background-color: var(--color-primary);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        }
        
        body.nav-open .main-nav {
            transform: translateX(0);
        }

        .main-nav ul {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
        }
        
        .main-nav a {
            color: var(--color-white);
            font-size: 1.5rem;
        }

        .nav-toggle {
            display: block;
            z-index: 1001; // Pour être au-dessus du menu
        }

        // Styles pour l'icône du hamburger (croix)
        .nav-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            background-color: var(--color-primary);
            margin: 5px 0;
            transition: all 0.3s;
        }

        body.nav-open .nav-toggle span { background-color: var(--color-primary); }
        body.nav-open .nav-toggle span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        body.nav-open .nav-toggle span:nth-child(2) { opacity: 0; }
        body.nav-open .nav-toggle span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
   }
*/

// 6. Mise à jour dynamique de l'année du copyright
function updateCopyrightYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
