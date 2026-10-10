document.body.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) closeMenu();
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('main > .section').forEach((section) => {
    section.classList.add('reveal');
    revealObserver.observe(section);
  });
}

const canTrackPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canTrackPointer && !reduceMotion) {
  const cursorPoint = document.createElement('span');
  cursorPoint.className = 'cursor-point';
  cursorPoint.setAttribute('aria-hidden', 'true');
  document.body.append(cursorPoint);

  document.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') {
      cursorPoint.classList.remove('is-visible');
      return;
    }
    const element = event.target instanceof Element ? event.target : event.target.parentElement;
    const interactive = element?.closest('a, button, summary, [data-brand], .project-card, .skill-card, .portrait-card');
    cursorPoint.classList.toggle('is-visible', Boolean(interactive));
    cursorPoint.classList.toggle('is-violet', Boolean(interactive?.closest('.button-secondary, .button-quiet, .project-card:nth-child(even)')));
    cursorPoint.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  }, { passive: true });

  document.addEventListener('pointerout', (event) => {
    if (!event.relatedTarget) cursorPoint.classList.remove('is-visible');
  });
}
