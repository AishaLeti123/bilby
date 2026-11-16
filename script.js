document.addEventListener('DOMContentLoaded', () => {
// === Частицы на фоне ===
 const particlesContainer = document.getElementById('particles');
 for (let i = 0; i < 30; i++) {
     const particle = document.createElement('div');
     particle.className = 'particle';
     const size = Math.random() * 5 + 2;
     particle.style.width = `${size}px`;
     particle.style.height = `${size}px`;
     particle.style.left = `${Math.random() * 100}%`;
     particle.style.top = `${Math.random() * 100}%`;
     particle.style.animationDelay = `${Math.random() * 20}s`;
     particle.style.animationDuration = `${Math.random() * 20 + 15}s`;
     particlesContainer.appendChild(particle);
 }
 // === Плавная смена цвета фона ===
 const sections = document.querySelectorAll('section');
 const bgLayer = document.querySelector('.background-layer');
 const observerOptions = {
     root: null,
     threshold: 0.4
 };
 const sectionObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             const color = entry.target.getAttribute('data-color');
             if (color) {
                 bgLayer.style.background = `linear-gradient(135deg, ${color}, ${adjustColor(color, 40)})`;
             }
             // Анимация появления элементов внутри секции
             const animElements = entry.target.querySelectorAll(
                 '.story-card, .character-card, .meaning-item, .gallery-item, .fact-card'
             );
             animElements.forEach((el, index) => {
                 setTimeout(() => {
                     el.classList.add('visible');
                 }, index * 100);
             });
         }
      
     });
 }, observerOptions);
 sections.forEach(section => {
     sectionObserver.observe(section);
 });
 // Функция осветления цвета для градиента
 function adjustColor(color, amount) {
     const num = parseInt(color.replace('#', ''), 16);
     const r = Math.min(255, (num >> 16) + amount);
     const g = Math.min(255, ((num >> 8) & 0x00FF) + amount);
     const b = Math.min(255, (num & 0x0000FF) + amount);
     return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
 }
 // === Плавный скролл ===
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
             target.scrollIntoView({ behavior: 'smooth' });
             // Закрыть мобильное меню
             document.querySelector('.menu').classList.remove('active');
         }
     });
 });
 // === Мобильное меню ===
 const burger = document.getElementById('burger');
 const menu = document.querySelector('.menu');
 if (burger) {
     burger.addEventListener('click', () => {
         menu.classList.toggle('active');
     });
 }
 // === Эффект параллакса для главной ===
 const hero = document.getElementById('home');
 window.addEventListener('scroll', () => {
     if (hero) {
         const scrolled = window.pageYOffset;
         const heroContent = hero.querySelector('.hero-content');
         if (heroContent && scrolled < window.innerHeight) {
             heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
             heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
         }
     }
 });
 // === Анимация видео при появлении ===
 const video = document.getElementById('mainVideo');
 if (video) {
     const videoObserver = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
             if (!entry.isIntersecting && !video.paused) {
                 video.pause();
             }
         });
     }, { threshold: 0.5 });
     videoObserver.observe(video);
 }
 console.log('🐾 Bilby (2018) fan site loaded successfully!');
});
