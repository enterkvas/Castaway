// ======= Mobile menu + smooth scrolling + overlay + animation =======

const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

// Add overlay (if it's not there)
let menuOverlay = menuBody?.querySelector('.menu__overlay');
if (menuBody && !menuOverlay) {
  menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu__overlay';
  menuBody.prepend(menuOverlay);
}

// --- 1. Open/close menu ---
menuIcon?.addEventListener('click', () => {
  const isActive = menuBody.classList.toggle('_active');
  menuIcon.classList.toggle('_active', isActive);
  document.body.classList.toggle('_lock', isActive);
});

// --- 2. Click on overlay (off the menu) ---
menuOverlay?.addEventListener('click', closeMenu);

// --- 3. Smooth scrolling when clicking on links ---
document.querySelectorAll('.menu__link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;

    closeMenu();

    const y = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// --- Helper function ---
function closeMenu() {
  menuIcon?.classList.remove('_active');
  menuBody?.classList.remove('_active');
  document.body.classList.remove('_lock');
}