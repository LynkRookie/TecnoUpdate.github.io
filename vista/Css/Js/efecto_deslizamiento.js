document.addEventListener('wheel', function(event) {
    const contenedor = document.querySelector('.contenedor');
    const contenedor2 = document.querySelector('.contenedor_2');
  
    if (event.deltaY > 0) {
      // Si el desplazamiento es hacia abajo, agranda ambos contenedores
      if (contenedor) contenedor.classList.add('scroll-aumentado');
      if (contenedor2) contenedor2.classList.add('scroll-aumentado');
    } else {
      // Si el desplazamiento es hacia arriba, vuelve al tamaño original
      if (contenedor) contenedor.classList.remove('scroll-aumentado');
      if (contenedor2) contenedor2.classList.remove('scroll-aumentado');
    }
  });
  
  