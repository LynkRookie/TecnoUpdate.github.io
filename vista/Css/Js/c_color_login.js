function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const elementsToChange = document.querySelectorAll('[data-v0-t="card"], aside, main');
  
    // Cambiar entre 'theme-light' y 'theme-dark' en el body
    body.classList.toggle('theme-dark');
    body.classList.toggle('theme-light');
    
    // Cambiar las clases en los elementos que lo requieran
    elementsToChange.forEach(element => {
      element.classList.toggle('bg-gray-800');
      element.classList.toggle('bg-gray-80');
      element.classList.toggle('text-white');
      element.classList.toggle('bg-white');
      element.classList.toggle('text-black');
    });
  
    // Cambiar icono del botón
    if (body.classList.contains('theme-dark')) {
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1111.21 3 7.5 7.5 0 0021 12.79z"class="moon"></path>`; // Icono de luna
    } else {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="4" class="sun"></circle>
                             <path d="M12 2v2" class="sun"></path>
                             <path d="M12 20v2" class="sun"></path>
                             <path d="m4.93 4.93 1.41 1.41" class="sun"></path>
                             <path d="m17.66 17.66 1.41 1.41" class="sun"></path>
                             <path d="M2 12h2" class="sun"></path>
                             <path d="M20 12h2" class="sun"></path>
                             <path d="m6.34 17.66-1.41 1.41"class="sun"></path>
                             <path d="m19.07 4.93-1.41 1.41"class="sun"></path>`; // Icono de sol
    }
  }
  