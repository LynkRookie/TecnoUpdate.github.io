// Función para controlar la aparición de las secciones al hacer scroll
document.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section');
  const scrollY = window.scrollY;

  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Si la sección está visible en el viewport, aplica la clase de entrada
      if (scrollY >= sectionTop - sectionHeight / 2) {
          section.classList.add('scroll-entrar');
          section.classList.remove('scroll-salir');
      } else {
          section.classList.add('scroll-salir');
          section.classList.remove('scroll-entrar');
      }
  });
});

// Efecto de agrandamiento al hacer scroll
document.addEventListener('scroll', function () {
  const contenedor = document.querySelector('.contenedor');
  const contenedor2 = document.querySelector('.contenedor_2');

  if (window.scrollY > 200) {
      contenedor.classList.add('scroll-aumentado');
      contenedor2.classList.add('scroll-aumentado_2');
  } else {
      contenedor.classList.remove('scroll-aumentado');
      contenedor2.classList.remove('scroll-aumentado_2');
  }
});

// Manejo del hover para los certificados
document.addEventListener('mouseover', function (event) {
  if (event.target.closest('.curso1')) {
      event.target.closest('.curso1').classList.add('hover-aumentado');
  }
});
document.addEventListener('mouseout', function (event) {
  if (event.target.closest('.curso1')) {
      event.target.closest('.curso1').classList.remove('hover-aumentado');
  }
});
document.addEventListener('mouseover', function (event) {
  if (event.target.closest('.curso2')) {
      event.target.closest('.curso2').classList.add('hover-aumentados');
  }
});
document.addEventListener('mouseout', function (event) {
  if (event.target.closest('.curso2')) {
      event.target.closest('.curso2').classList.remove('hover-aumentados');
  }
});