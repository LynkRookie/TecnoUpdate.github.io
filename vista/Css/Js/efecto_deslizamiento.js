document.addEventListener('wheel', function (event) {
    const contenedor = document.querySelector('.contenedor');
    const contenedor2 = document.querySelector('.contenedor_2');
  
    if (event.deltaY > 0) {
      // Desplazamiento hacia abajo
      if (contenedor) {
        contenedor.classList.add('scroll-aumentado');
        contenedor.classList.remove('scroll-reducido');
      }
      if (contenedor2) {
        contenedor2.classList.add('scroll-aumentado');
        contenedor2.classList.remove('scroll-reducido');
      }
    } else {
      // Desplazamiento hacia arriba
      if (contenedor) {
        contenedor.classList.remove('scroll-aumentado');
        contenedor.classList.add('scroll-reducido');
      }
      if (contenedor2) {
        contenedor2.classList.remove('scroll-aumentado');
        contenedor2.classList.add('scroll-reducido');
      }
      
      // Agrandar elementos con la clase debuel_mause1 y debuel_mause2
      const debueltaMauseElements1 = document.querySelectorAll('.debuel_mause1');
      const debueltaMauseElements2 = document.querySelectorAll('.debuel_mause2');
      
      debueltaMauseElements1.forEach(element => {
        element.classList.add('scroll-aumentado');
      });
      debueltaMauseElements2.forEach(element => {
        element.classList.add('scroll-aumentado');
      });
      
      // Reducir elementos con la clase debuel_mause1 y debuel_mause2 después de un tiempo
      setTimeout(() => {
        debueltaMauseElements1.forEach(element => {
          element.classList.remove('scroll-aumentado');
        });
        debueltaMauseElements2.forEach(element => {
          element.classList.remove('scroll-aumentado');
        });
      }, 500); // Ajusta el tiempo si es necesario
    }
  });
  
  // Manejo de agrandamiento de imágenes en certificados al pasar el mouse
document.addEventListener('mouseover', function (event) {
    if (event.target.closest('.curso1')) {
        event.target.closest('.curso1').classList.add('hover-aumentado');
    }
}
);

document.addEventListener('mouseout', function (event) {
    if (event.target.closest('.curso1')) {
        event.target.closest('.curso1').classList.remove('hover-aumentado');
    }
}
);
document.addEventListener('mouseover', function (event) {
if (event.target.closest('.curso2')) {
    event.target.closest('.curso2').classList.add('hover-aumentados');
}
}
);

document.addEventListener('mouseout', function (event) {
if (event.target.closest('.curso2')) {
    event.target.closest('.curso2').classList.remove('hover-aumentados');
}
}
);

  