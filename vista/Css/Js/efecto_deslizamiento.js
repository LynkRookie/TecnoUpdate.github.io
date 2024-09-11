// Función para controlar la aparición de las secciones "features" y "proyect" al hacer scroll
document.addEventListener('scroll', function () {
  const featuresSection = document.getElementById('features');
  const proyectSection = document.getElementById('proyect');
  const scrollY = window.scrollY;

  [featuresSection, proyectSection].forEach(section => {
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

// Efecto de agrandamiento al hacer scroll SOLO en las secciones features y proyect
document.addEventListener('scroll', function () {
  const contenedor = document.querySelector('#features .contenedor');
  const contenedor2 = document.querySelector('#proyect .contenedor_2');

  if (window.scrollY > 200) {
      if (contenedor) contenedor.classList.add('scroll-aumentado');
      if (contenedor2) contenedor2.classList.add('scroll-aumentado_2');
  } else {
      if (contenedor) contenedor.classList.remove('scroll-aumentado');
      if (contenedor2) contenedor2.classList.remove('scroll-aumentado_2');
  }
});

// Manejo del hover para las imágenes de certificados en las secciones
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
