const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let index = 0;

nextBtn.addEventListener('click', () => {
  index = (index + 1) % track.children.length;
  track.style.transform = `translateX(-${index * 100}%)`;
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + track.children.length) % track.children.length;
  track.style.transform = `translateX(-${index * 100}%)`;
});
