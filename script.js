/* Active Link */
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Scroll Active Link
function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.add('active-link');
    } else {
      document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

// Aktiver Link beim Klicken
function setActiveLink() {
  navLinks.forEach(link => link.classList.remove('active-link'));
  this.classList.add('active-link');

  // Schließe das Menü nach dem Klicken
  if (navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
  }
}

navLinks.forEach(link => link.addEventListener('click', setActiveLink));

// Mobile Navigation
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/* Portfolio Filter */
let mixerProjects = mixitup('.projects__container', {
  selectors: {
    target: '.project__item'
  },
  animation: {
    duration: 300
  }
});

// Active Filter
const filterButtons = document.querySelectorAll('.category__btn');

function setActiveFilter() {
  filterButtons.forEach(btn => btn.classList.remove('active-work'));
  this.classList.add('active-work');
}

filterButtons.forEach(btn => btn.addEventListener('click', setActiveFilter));

// Scroll Header
function scrollHeader() {
  const header = document.getElementById('header');
  if (window.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}

window.addEventListener('scroll', scrollHeader);

// Contact Form
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

// EmailJS Konfiguration
emailjs.init("hUVc50LBbNzkHiW_L"); // Hier muss Ihre EmailJS User ID eingetragen werden

const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_azz0xvk', 'template_rcjwqvu', '#contact-form')
    .then(() => {
      // Erfolgsmeldung anzeigen
      contactMessage.textContent = 'Nachricht erfolgreich gesendet!';
      contactMessage.classList.add('color-light');

      // Nachricht nach 5 Sekunden entfernen
      setTimeout(() => {
        contactMessage.textContent = '';
        contactMessage.classList.remove('color-light');
      }, 5000);

      // Formular zurücksetzen
      contactForm.reset();
    })
    .catch((error) => {
      console.error('Fehler:', error);
      // Fehlermeldung anzeigen
      contactMessage.textContent = 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.';
      contactMessage.classList.add('color-dark');
    });
};

if (contactForm) {
  contactForm.addEventListener('submit', sendEmail);
}

// Scroll Animation
function scrollAnimation() {
  const elements = document.querySelectorAll('.skills__item');

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Initial Position
document.querySelectorAll('.skills__item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', scrollAnimation);
window.addEventListener('load', scrollAnimation);

/* Blog Navigation */
const blogContainer = document.querySelector('.posts__container');
const blogCards = document.querySelectorAll('.post__card');
const prevBtn = document.querySelector('.blog__nav-prev');
const nextBtn = document.querySelector('.blog__nav-next');

let currentIndex = 0;
const cardsPerView = 3;

function updateNavigation() {
  prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
  nextBtn.style.display = currentIndex >= blogCards.length - cardsPerView ? 'none' : 'flex';
}

function moveCards(direction) {
  if (direction === 'next' && currentIndex < blogCards.length - cardsPerView) {
    currentIndex++;
  } else if (direction === 'prev' && currentIndex > 0) {
    currentIndex--;
  }

  blogCards.forEach((card, index) => {
    if (index >= currentIndex && index < currentIndex + cardsPerView) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  updateNavigation();
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => moveCards('prev'));
  nextBtn.addEventListener('click', () => moveCards('next'));

  // Initial state
  moveCards('next');
  moveCards('prev');
}