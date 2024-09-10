document.addEventListener('wheel', function(event) {
    const contenedor = document.querySelector('.contenedor');
    if (event.deltaY > 0) {
      // Si el desplazamiento es hacia abajo, agranda el contenedor
      contenedor.classList.add('scroll-aumentado');
    } else {
      // Si el desplazamiento es hacia arriba, vuelve al tamaño original
      contenedor.classList.remove('scroll-aumentado');
    }
  });
  