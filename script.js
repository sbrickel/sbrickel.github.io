const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dots = document.querySelectorAll('.carousel-indicators .dot');
let index = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % track.children.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + track.children.length) % track.children.length;
  updateCarousel();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    updateCarousel();
  });
});

// Auto-play every 5 seconds
setInterval(() => {
  index = (index + 1) % track.children.length;
  updateCarousel();
}, 5000);
