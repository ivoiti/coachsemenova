// Header background on scroll
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Booking links — переключить на DIKIDI на следующем этапе (вставить ссылку)
const BOOK_URL = ''; // напр. 'https://dikidi.net/XXXXXXX'
if (BOOK_URL) {
  document.querySelectorAll('.js-book').forEach(a => { a.href = BOOK_URL; a.target = '_blank'; a.rel = 'noopener'; });
}

// Back to top
(function () {
  const btn = document.getElementById('toTop');
  if (!btn) return;
  const toggle = () => btn.classList.toggle('show', window.scrollY > 600);
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// Reviews carousel
(function () {
  const car = document.getElementById('revCarousel');
  if (!car) return;
  const track = car.querySelector('.rev-track');
  const slides = [...car.querySelectorAll('.rev-slide')];
  const dotsWrap = car.querySelector('.rev-dots');
  let i = 0;
  slides.forEach((_, n) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Отзыв ' + (n + 1));
    if (n === 0) b.className = 'active';
    b.addEventListener('click', () => go(n));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];
  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-i * 100) + '%)';
    dots.forEach((d, k) => d.classList.toggle('active', k === i));
  }
  car.querySelector('.rev-prev').addEventListener('click', () => go(i - 1));
  car.querySelector('.rev-next').addEventListener('click', () => go(i + 1));
  // expand / collapse long reviews
  car.querySelectorAll('.rev-more').forEach(btn => btn.addEventListener('click', () => {
    const t = btn.previousElementSibling;
    const clamped = t.classList.toggle('is-clamped');
    btn.textContent = clamped ? 'Читать полностью' : 'Свернуть';
  }));
  // touch swipe
  const vp = car.querySelector('.rev-viewport');
  let x0 = null;
  vp.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  vp.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });
})();

// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Telegram links — placeholder until real channel URL is provided
const TG_URL = 'https://t.me/life_watch'; // канал «Внутренний мир»
document.querySelectorAll('[data-tg]').forEach(a => {
  if (TG_URL) { a.href = TG_URL; a.target = '_blank'; a.rel = 'noopener'; }
  else a.addEventListener('click', (e) => { e.preventDefault(); alert('Ссылка на Telegram-канал «Внутренний мир» будет добавлена.'); });
});
