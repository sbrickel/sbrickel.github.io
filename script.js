document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = track.children;
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const dots = carousel.querySelectorAll('.carousel-indicators .dot');
  let index = 0;
  let autoplay;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (dots.length) {
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // Controls
  nextBtn?.addEventListener('click', nextSlide);
  prevBtn?.addEventListener('click', prevSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      updateCarousel();
    });
  });

  // Autoplay every 10s
  function startAutoplay() {
    autoplay = setInterval(nextSlide, 10000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Init
  updateCarousel();
  startAutoplay();
});
