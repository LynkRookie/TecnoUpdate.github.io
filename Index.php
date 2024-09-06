<!--<?php 
  session_start();
  if(isset($_GET['e'])){
    $opcion= $_GET['e'];
  }else{
    $opcion = '';  
  }
?>
-->
<!DOCTYPE html>
<html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TecnoUpdate</title>
      <link href="vista/Css/c_cambio_th_login.css" type="text/css" rel="stylesheet" media="screen">
      <link href="vista/Css/estilos.css" type="text/css" rel="stylesheet" >
      <link href="vista/Css/estilos_login.css" type="text/css" rel="stylesheet" >
      <link rel="website icon" type="png" href="vista/img/newlogo_t.png">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  </head>
  <body class=" cuerp">
    <section class="theme-light">
      <form action="controlador/validador.php" method="post">
        <div class="cuerpo fixed top-0 right-0 h-screen w-[400px] bg-background shadow-lg">
          <main class="flex h-full flex-col justify-center px-8 bg-muted  bx flex flex-col items-center 
          w-20 bg-gray-800 bg-gray-900 p-4 transition-width duration-300 text-white">
            <div class="space-y-6">
              <img class="imagen" src="vista/img/newlogo_t.png" alt="Descripción de la imagen"/>
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold">Iniciar Sesión</h2>
                <div class="mt-auto space-y-4" style="margin-top: 30px;">
                  <button type="button" id="theme-toggle" onclick="toggleTheme()" class="sidebar-button">
                    <svg id="theme-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                      <circle cx="12" cy="12" r="4" class="sun"></circle>
                      <path d="M12 2v2" class="sun"></path>
                      <path d="M12 20v2" class="sun"></path>
                      <path d="m4.93 4.93 1.41 1.41" class="sun"></path>
                      <path d="m17.66 17.66 1.41 1.41" class="sun"></path>
                      <path d="M2 12h2" class="sun"></path>
                      <path d="M20 12h2" class="sun"></path>
                      <path d="m6.34 17.66-1.41 1.41"class="sun"></path>
                      <path d="m19.07 4.93-1.41 1.41"class="sun"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <form class="space-y-4">
                <div class="space-y-2">
                  <label
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="email"
                  >
                    Correo
                  </label>
                  <input
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="SuCorreo@Gmail.com"
                    type="email" id="email" required=""value="" name="user"
                  />
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="password"
                    >
                      Contraseña
                    </label>
                    <a class="text-sm underline" href="#">
                      Olvidaste tu Contraseña?
                    </a>
                    
                  </div>
                  <div class="relative">
                    <input
                      class="flex h-10 w-full rounded-md border border-input bg-background 
                      px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent 
                      file:text-sm file:font-medium placeholder:text-muted-foreground 
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                      focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="password" required="" value="" name="password" type="password"/>
                    <button class="ojo inline-flex items-center 
                    justify-center whitespace-nowrap 
                    rounded-md text-sm font-medium 
                    ring-offset-background transition-colors focus-visible:outline-none 
                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:pointer-events-none disabled:opacity-50 hover:bg-accent 
                    hover:text-accent-foreground absolute bottom-1 right-1 h-7 w-7
                    " 
                   style="background: none;">
                      <span  id="togglePassword" class="fas fas-fwb fas-eye toggle-password " ></span>
                    </button>
                  </div>
                </div>
                <div class="  grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <button type="button" class=" palabra goo whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-5 w-5"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="4"></circle>
                      <line x1="21.17" x2="12" y1="8" y2="8"></line>
                      <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
                      <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
                    </svg>
                    Google
                  </button>
                  <button type="button" class="face whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    Facebook
                  </button>
                  <button type="button" class="correo whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-5 w-5"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    Correo
                  </button>
                </div>
                  <!--<button type="submit" name="enviar" class="co inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full" >
                    Iniciar Sesión 
                  </button>-->
                  <a class="co inline-flex items-center 
                  justify-center whitespace-nowrap rounded-md 
                  text-sm font-medium ring-offset-background 
                  transition-colors focus-visible:outline-none 
                  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground 
                  hover:bg-primary/90 h-10 px-4 py-2 w-full"href="vista/inicio.html">
                             Iniciar sesión
                        </a>
              </form>
              <div class="text-center text-sm text-muted-foreground"></div>
            </div>
          </main>
        </div>
      </form>
    </section>

    <!-- Script para alternar la visibilidad de la contraseña -->
    <script>
      const togglePassword = document.querySelector('#togglePassword');
      const password = document.querySelector('#password');

      togglePassword.addEventListener('click', function (e) {
        // Alternar el tipo de input de contraseña a texto
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        // Alternar el ícono entre ojo y ojo tachado
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
      });
    </script>
      <script src="vista/Css/Js/c_color_login.js"></script>
  </body>
</html>
