document.addEventListener('wheel', function(event) {
        // Manejo de agrandamiento de contenedores al hacer scroll
        const contenedor = document.querySelector('.contenedor');
        const contenedor2 = document.querySelector('.contenedor_2');
        if (event.deltaY > 0) {
            // Si el desplazamiento es hacia abajo, agranda ambos contenedores
            if (contenedor) contenedor.classList.add('scroll-aumentado');
        } else {
            // Si el desplazamiento es hacia arriba, agranda los elementos con la clase debuelta_mause
            if (contenedor) contenedor.classList.remove('scroll-aumentado');
            // Opcional: Eliminar la clase scroll-aumentado después de un tiempo si se requiere
            setTimeout(() => {
                debueltaMauseElements.forEach(element => element.classList.remove('scroll-aumentado'));
            }, 500); // Ajusta el tiempo si es necesario
        }
        if(event.deltaY > 0){
             if (contenedor2) contenedor2.classList.add('scroll-aumentado');
        }else{
             if (contenedor2) contenedor2.classList.remove('scroll-aumentado'); 
        }
    }
);
  // Manejo de agrandamiento de imágenes en certificados al pasar el mouse
  document.addEventListener('mouseover', function(event) {
    if (event.target.closest('.cursos1')) {
      event.target.closest('.cursos1').classList.add('hovers-aumentado');
    }
  });
  
  document.addEventListener('mouseout', function(event) {
    if (event.target.closest('.cursos1')) {
      event.target.closest('.cursos1').classList.remove('hovers-aumentado');
    }
  });
  