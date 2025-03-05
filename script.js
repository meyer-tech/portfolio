
// Hamburger Menü Toggle mit Animation und Hintergrundüberlagerung
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    const body = document.querySelector("body");
    navLinks.classList.toggle("show");
    body.classList.toggle("menu-open");
}

// Füge Event Listener zu jedem Menü-Link hinzu, damit das Menü nach dem Klicken schließt
const menuLinks = document.querySelectorAll('.menu-link');

// Bei Seitenladen den gespeicherten Dark-Mode-Zustand einlesen
if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
}

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector(".nav-links");
        const body = document.querySelector("body");
        navLinks.classList.remove("show"); // Menü schließt sich
        body.classList.remove("menu-open"); // Hintergrund wird wieder klar
    });
});

// Intersection Observer API für Scroll-Animationen
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Animiert das Element
            observer.unobserve(entry.target); // Stoppt die Beobachtung
        }
    });
}, { threshold: 0.5 });

fadeInElements.forEach(element => {
    observer.observe(element);
});

// Smooth Scroll für alle Navigation-Links
document.querySelectorAll('.menu-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
