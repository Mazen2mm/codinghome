document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Menu Logic
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileNav = document.getElementById("mobile-nav");

    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener("click", () => {
            mobileNav.classList.toggle("active");
        });
    }

    // 2. Scroll Reveal Logic
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. 3D Tilt Hover Effect for Cards
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        const inner = card.querySelector('.card-inner');

        card.addEventListener('mousemove', (e) => {
            // Get dimensions and cursor position relative to the card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;

            // Calculate rotation values based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Adjust the multiplier (20) to make the tilt more or less intense
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;

            inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Reset the card when the mouse leaves
        card.addEventListener('mouseleave', () => {
            inner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            inner.style.transition = 'transform 0.5s ease'; // Smooth snap back
        });

        // Remove the transition while moving so it feels instant and responsive
        card.addEventListener('mouseenter', () => {
            inner.style.transition = 'none';
        });
    });
});