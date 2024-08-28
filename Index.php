<html>
<head>
  <meta charset="UTF-8">
  <title>TecnoUpdate</title>
  <link href="Css/Generated.css" type="text/css" rel="stylesheet" media="screen">
  <link href="Css/cambio_tema.css" type="text/css" rel="stylesheet" media="screen">
  <link href="Css/sidebars.css" type="text/css" rel="stylesheet" media="screen">
  <link href="globals.css" type="text/css" rel="stylesheet" media="screen">
  <link class="logo" rel="website icon" type="png" href="img/newlogo_t.png">
</head>
<body class="theme-light">
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside id="sidebar" class="flex flex-col items-center w-20 bg-gray-900 text-white p-4 transition-width duration-300">
      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <img class="aspect-square h-full w-full" alt="User Avatar" src="img/1.png" />
      </span>
      <nav class="mt-4 space-y-4">
        <!-- Botón de inicio -->
        <button class="sidebar-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span class="sidebar-text">Inicio</span>
        </button>
        <!-- Botón de archivos -->
        <button class="sidebar-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
          </svg>
          <span class="sidebar-text">Archivos</span>
        </button>
        <!-- Botón de configuración -->
        <button class="sidebar-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span class="sidebar-text">Configuración</span>
        </button>
      </nav>
      <!-- Modo claro/oscuro -->
      <div class="mt-auto space-y-4" style="margin-top: 30px;">
        <button id="theme-toggle" onclick="toggleTheme()" class="sidebar-button">
          <svg id="theme-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
          <span class="sidebar-text">Modo Claro/Oscuro</span>
        </button>
      </div>
      <!-- Botón de sidebar -->
      <div id="sidebar-toggle" class="mt-auto space-y-4" style="margin-top: 30px;">
        <button id="sidebar-button" onclick="toggleSidebar()" class="sidebar-button fixed top-4 left-4 z-50 bg-gray-700 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="sidebar-icon" class="w-6 h-6">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
            <path d="m16 15-3-3 3-3"></path>
          </svg>
        </button>
      </div>
    </aside>
    <!-- Main content -->
    <main id="main-content" class="flex-1 p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white transition-padding duration-300">
      <h1 class="text-4xl font-bold mb-6">Inicio</h1>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border shadow-sm bg-gray-800 text-white p-6">
          <h3 class="whitespace-nowrap text-2xl font-semibold">Datos Sobre Mí</h3>
          <p class="mt-4">Soy un entusiasta de la tecnología con una pasión por aprender y desarrollar nuevas habilidades. Me encanta explorar nuevos horizontes en el ámbito de la informática y siempre busco estar al tanto de las últimas tendencias y avances en el mundo digital.</p>
        </div>
        <div class="rounded-lg border shadow-sm bg-gray-800 text-white p-6">
          <h3 class="whitespace-nowrap text-2xl font-semibold">Mis Proyectos</h3>
          <p class="mt-4">He trabajado en diversos proyectos que van desde el desarrollo web hasta la automatización de procesos. Mi enfoque es siempre crear soluciones que sean eficientes, escalables y fáciles de usar.</p>
        </div>
        <div class="rounded-lg border shadow-sm bg-gray-800 text-white p-6">
          <h3 class="whitespace-nowrap text-2xl font-semibold">Contacto</h3>
          <p class="mt-4">Puedes contactarme a través de mi correo electrónico o seguirme en mis redes sociales para estar al tanto de mis últimos proyectos y publicaciones.</p>
        </div>
      </div>
    </main>
  </div>
  <script src="otros_archivos/cambio_color.js"></script>
  <script src="otros_archivos/ExpandirSidebars.js"></script>
</body>
</html>
