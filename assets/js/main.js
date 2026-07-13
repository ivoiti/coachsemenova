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

// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Telegram links — placeholder until real channel URL is provided
const TG_URL = 'https://t.me/life_watch'; // канал «Внутренний мир»
document.querySelectorAll('[data-tg]').forEach(a => {
  if (TG_URL) { a.href = TG_URL; a.target = '_blank'; a.rel = 'noopener'; }
  else a.addEventListener('click', (e) => { e.preventDefault(); alert('Ссылка на Telegram-канал «Внутренний мир» будет добавлена.'); });
});
