/* ===========================================================
   BASIC JAVASCRIPT — NO FRAMEWORKS OR EXTERNAL LIBRARIES
   You can edit the timings below to change slideshow speed.
   =========================================================== */

// 1. MOBILE MENU: opens and closes when the ☰ button is clicked.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
});

// Close the mobile menu automatically when a section link is clicked.
navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  });
});

// 2. IMAGE SLIDESHOW CONFIGURATION:
// Change 4500 to 3000 for 3 seconds, or 6000 for 6 seconds.
const AUTO_SLIDE_DELAY = 4500; // 4500 milliseconds = 4.5 seconds

// Find every gallery on the page (projects AND work experience).
document.querySelectorAll('[data-gallery]').forEach(gallery => {
  const track = gallery.querySelector('.gallery-track');
  const images = track.querySelectorAll('img');
  const previous = gallery.querySelector('.gallery-prev');
  const next = gallery.querySelector('.gallery-next');
  const counter = gallery.querySelector('.gallery-counter');
  let currentImage = 0; // 0 means the first photo.

  // Function: show one image; loop from last photo back to first.
  function showImage(number) {
    currentImage = (number + images.length) % images.length;
    track.style.transform = `translateX(-${currentImage * 100}%)`;
    counter.textContent = `${String(currentImage + 1).padStart(2,'0')} / ${String(images.length).padStart(2,'0')}`;
  }

  // Function: automatically switch to the next image every few seconds.
  let autoSlide;
  function startAutoSlide() {
    if (images.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    autoSlide = setInterval(() => showImage(currentImage + 1), AUTO_SLIDE_DELAY);
  }
  function restartAutoSlide() {
    clearInterval(autoSlide); // Prevent multiple timers from running.
    startAutoSlide();
  }

  // Clicking left/right arrows manually changes images.
  previous.addEventListener('click', () => {
    showImage(currentImage - 1);
    restartAutoSlide();
  });
  next.addEventListener('click', () => {
    showImage(currentImage + 1);
    restartAutoSlide();
  });

  // Pause slideshow when mouse is hovering, resume when it leaves.
  gallery.addEventListener('mouseenter', () => clearInterval(autoSlide));
  gallery.addEventListener('mouseleave', startAutoSlide);

  // Hide buttons if there is only one image.
  if (images.length <= 1) {
    previous.hidden = true;
    next.hidden = true;
  }

  showImage(0);  // Begin with the first image.
  startAutoSlide();
});

// 3. UPDATE THE COPYRIGHT YEAR AUTOMATICALLY.
document.getElementById('year').textContent = new Date().getFullYear();
