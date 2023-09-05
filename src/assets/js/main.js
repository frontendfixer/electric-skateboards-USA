//===========================================
//======================= Navviagation Menu
const navMenuOpener = document.querySelector("[data-menu='open']");
const navMenuCloser = document.querySelector("[data-menu='close']");
const headerNavbar = document.querySelector('.header__navbar');
const backdrop = document.querySelector('.backdrop');

const openMenu = function () {
  headerNavbar.classList.add('open');
  setTimeout(() => {
    backdrop.classList.remove('hidden');
  }, 500);
};

const closeMenu = function () {
  headerNavbar.classList.remove('open');

  backdrop.classList.add('hidden');
};

navMenuOpener.addEventListener('click', openMenu);
navMenuCloser.addEventListener('click', closeMenu);
backdrop.addEventListener('click', closeMenu);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && headerNavbar.classList.contains('open'))
    closeMenu();
});

//===========================================
//======================= Sticky Navbar
const header = document.querySelector('.header');
const navHeight = headerNavbar.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting)
    headerNavbar.closest('.container').classList.add('nav-fixed');
  else headerNavbar.closest('.container').classList.remove('nav-fixed');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//===========================================
//======================= Smooth Scrolling
headerNavbar.addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains('nav-link')) {
    const id = target.getAttribute('href').slice(1);
    if (!id) return;
    const el = document.querySelector(`#${id}`);
    el.style.scrollMarginTop = `${20 + navHeight}px`;
    el.scrollIntoView({ behaviour: 'smooth' });
  }
});

//===========================================
//======================= Caraousel Slider
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translate(${100 * (i - slide) - 50}% , -50%)`;
  });
};

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

// Previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};

const init = function () {
  goToSlide(Math.trunc(maxSlide / 2));
};
init();

btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);
