/**
 * Script principal para el portafolio
 * Este archivo contiene todas las funcionalidades interactivas del sitio
 */
document.addEventListener("DOMContentLoaded", () => {
  // Selección de elementos del DOM
  const header = document.querySelector("header")
  const menuBtn = document.querySelector(".menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const darkModeToggle = document.getElementById("dark-mode-toggle")
  const body = document.body
  let map

  /**
   * Efecto de scroll en el header
   * Añade una clase cuando se hace scroll para cambiar su apariencia
   */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled")
    } else {
      header?.classList.remove("scrolled")
    }
  })

  /**
   * Alternar menú móvil
   * Muestra u oculta el menú en dispositivos móviles
   */
  menuBtn?.addEventListener("click", () => {
    menuBtn.classList.toggle("active")
    mobileMenu?.classList.toggle("active")
  })

  /**
   * Cerrar menú móvil al hacer clic en un enlace
   * Mejora la experiencia de usuario en dispositivos móviles
   */
  document.querySelectorAll(".mobile-nav-item").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu?.classList.remove("active")
      menuBtn?.classList.remove("active")
    })
  })

  /**
   * Cerrar menú móvil al hacer clic fuera de él
   * Proporciona una forma intuitiva de cerrar el menú
   */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".mobile-menu") && !e.target.closest(".menu-btn")) {
      mobileMenu?.classList.remove("active")
      menuBtn?.classList.remove("active")
    }
  })

  /**
   * Desplazamiento suave para enlaces de anclaje
   * Mejora la navegación dentro de la página
   */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = document.querySelector("header")?.offsetHeight || 0
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = targetPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
        mobileMenu?.classList.remove("active")
        menuBtn?.classList.remove("active")
      }
    })
  })

  /**
   * Función para establecer el modo oscuro
   * Cambia la apariencia del sitio y guarda la preferencia del usuario
   */
  const setDarkMode = (isDark) => {
    if (isDark) {
      body.classList.add("dark-mode")
      darkModeToggle.textContent = "☀️"
      localStorage.setItem("darkMode", "true")
    } else {
      body.classList.remove("dark-mode")
      darkModeToggle.textContent = "🌑"
      localStorage.setItem("darkMode", "false")
    }
    if (map) updateMapStyle(isDark)
  }

  /**
   * Verificar preferencia de modo oscuro guardada o preferencia del sistema
   * Respeta las preferencias del usuario
   */
  const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  const savedMode = localStorage.getItem("darkMode")

  if (savedMode === "true" || (savedMode === null && prefersDarkMode)) {
    setDarkMode(true)
  }

  /**
   * Alternar modo oscuro
   * Permite al usuario cambiar entre modo claro y oscuro
   */
  darkModeToggle.addEventListener("click", () => {
    setDarkMode(!body.classList.contains("dark-mode"))
  })

  /**
   * Escuchar cambios en el esquema de color del sistema
   * Actualiza el modo si cambia la preferencia del sistema
   */
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem("darkMode") === null) {
      setDarkMode(e.matches)
    }
  })

  /**
   * Animar elementos al hacer scroll
   * Añade efectos visuales al desplazarse por la página
   */
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 50) {
        element.classList.add("animated")
      }
    })
  }

  /**
   * Agregar clase animate-on-scroll a los elementos
   * Prepara las secciones para ser animadas
   */
  const addAnimationClasses = () => {
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      if (!section.classList.contains("hero")) {
        section.classList.add("animate-on-scroll")
      }
    })
  }

  addAnimationClasses()
  window.addEventListener("scroll", animateOnScroll)
  window.addEventListener("load", animateOnScroll)

  /**
   * Animar barras de habilidades al hacer scroll
   * Muestra el progreso de las habilidades de forma visual
   */
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll(".progress-fill")
    skillBars.forEach((bar) => {
      const barTop = bar.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (barTop < windowHeight - 50) {
        bar.style.width = bar.style.width || bar.getAttribute("style")?.split("width:")[1]?.trim() || "0"
      } else {
        bar.style.width = "0"
      }
    })
  }

  window.addEventListener("scroll", animateSkillBars)
  window.addEventListener("load", animateSkillBars)

  /**
   * Manejo del formulario de contacto
   * Validación en tiempo real de los campos y envío mediante AJAX
   */
  const form = document.querySelector("#contact-form")
  const formInputs = document.querySelectorAll("[data-form-input]")
  const formBtn = document.querySelector("[data-form-btn]")
  const successMessage = document.getElementById("success-message")
  const errorMessage = document.getElementById("error-message")

  // Verificar validación del formulario en la entrada
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled")
      } else {
        formBtn.setAttribute("disabled", "")
      }
    })
  }

  // Manejar el envío del formulario
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault() // Prevenir el envío normal del formulario

      // Ocultar mensajes previos
      successMessage.style.display = "none"
      errorMessage.style.display = "none"

      // Deshabilitar el botón durante el envío
      formBtn.setAttribute("disabled", "")
      formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Enviando...</span>'

      // Crear un objeto FormData con los datos del formulario
      const formData = new FormData(form)

      // Enviar los datos usando fetch
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Mostrar mensaje de éxito
            successMessage.style.display = "block"
            // Limpiar el formulario
            form.reset()
            // Desplazarse al mensaje
            successMessage.scrollIntoView({ behavior: "smooth", block: "center" })

            // Ocultar el mensaje después de 5 segundos
            setTimeout(() => {
              successMessage.style.display = "none"
            }, 5000)
          } else {
            throw new Error("Error en el envío del formulario")
          }
        })
        .catch((error) => {
          // Mostrar mensaje de error
          errorMessage.style.display = "block"
          // Desplazarse al mensaje
          errorMessage.scrollIntoView({ behavior: "smooth", block: "center" })

          // Ocultar el mensaje después de 5 segundos
          setTimeout(() => {
            errorMessage.style.display = "none"
          }, 5000)
        })
        .finally(() => {
          // Restaurar el botón
          formBtn.removeAttribute("disabled")
          formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Enviar Mensaje</span>'
        })
    })
  }

  /**
   * Integración de Google Maps
   * Muestra un mapa interactivo con la ubicación
   */
  window.initMap = () => {
    // Asegurarse de que google esté definido (cargado por la API de Google Maps)
    if (typeof google === "undefined") {
      console.error("Google Maps API no está cargada correctamente")
      return
    }

    const technoCraft = { lat: -30.6015, lng: -71.2086 } // Coordenadas de Ovalle, Chile

    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: technoCraft,
      styles: body.classList.contains("dark-mode") ? darkMapStyle : lightMapStyle,
      disableDefaultUI: true,
    })

    const marker = new google.maps.Marker({
      position: technoCraft,
      map: map,
      title: "TechnoCraft Ovalle",
    })

    // Ventana de información
    const infoWindow = new google.maps.InfoWindow({
      content: `
       <div style="padding: 8px;">
         <h3 style="margin: 0 0 4px; font-family: 'Poppins', sans-serif;">TechnoCraft Ovalle</h3>
         <p style="margin: 0; font-family: 'Poppins', sans-serif;">Servicios tecnológicos profesionales</p>
       </div>
     `,
    })

    marker.addListener("click", () => {
      infoWindow.open(map, marker)
    })
  }

  /**
   * Actualizar estilo del mapa según el modo (claro/oscuro)
   * Adapta el mapa al tema del sitio
   */
  const updateMapStyle = (isDark) => {
    if (map) {
      map.setOptions({ styles: isDark ? darkMapStyle : lightMapStyle })
    }
  }

  // Estilos del mapa
  const lightMapStyle = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#f5f5f5" }],
    },
  ]

  const darkMapStyle = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#242f3e" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }],
    },
  ]

  /**
   * Funcionalidad de proyectos
   * Datos de los proyectos a mostrar
   */
  const projectsData = {
    gestor: {
      title: "Gestor de Informe de Mantenimiento",
      description:
        "Sistema completo para la gestión y seguimiento de mantenimientos preventivos y correctivos. Incluye generación de informes, asignación de tareas y notificaciones automáticas.",
      image: "./vista/img/gestor.png",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
    },
    technocraft: {
      title: "TechnoCraft Ovalle",
      description:
        "Plataforma de servicios tecnológicos profesionales con sistema de reservas, catálogo de productos y blog informativo sobre tecnología.",
      image: "./vista/img/portafolio-1.png",
      technologies: ["Next.js", "Tailwind CSS", "Vercel", "Supabase"],
    },
    hacking: {
      title: "Portafolio de Hacking Ético",
      description:
        "Proyecto educativo sobre seguridad informática y hacking ético, con demostraciones prácticas y recursos para aprender sobre ciberseguridad.",
      image: "./vista/img/portafolio_h.png",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP"],
    },
    ciberseguridad: {
      title: "5 Fases de Ataque en Ciberseguridad",
      description:
        "Guía interactiva que explica las cinco fases principales de un ataque informático: reconocimiento, escaneo, acceso, mantenimiento del acceso y eliminación de huellas.",
      image: "./vista/img/5fases.png",
      technologies: ["React", "Three.js", "Firebase", "Framer Motion"],
    },
    mineria: {
      title: "Introducción a la Minería de Datos",
      description:
        "Plataforma educativa sobre minería de datos con ejemplos prácticos, visualizaciones interactivas y ejercicios para aprender técnicas de análisis de datos.",
      image: "./vista/img/mineria.png",
      technologies: ["Python", "Django", "Pandas", "D3.js"],
    },
  }

  const featuredProject = document.getElementById("featured-project")
  const projectLinks = document.querySelectorAll(".project-link")

  /**
   * Función para actualizar el proyecto destacado
   * Muestra el proyecto seleccionado en la sección destacada
   */
  const updateFeaturedProject = (projectKey) => {
    const project = projectsData[projectKey]
    if (featuredProject && project) {
      featuredProject.innerHTML = `
       <div class="project-card">
         <img src="${project.image}" alt="${project.title}" class="project-image">
         <div class="project-content">
           <h3>${project.title}</h3>
           <p>${project.description}</p>
           <div class="project-tech">
             ${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}
           </div>
         </div>
       </div>
     `

      // Actualizar estado activo de los enlaces de proyectos
      projectLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.project === projectKey)
      })
    }
  }

  /**
   * Agregar manejadores de clic a los enlaces de proyectos
   * Permite cambiar entre proyectos al hacer clic
   */
  projectLinks.forEach((link) => {
    link.addEventListener("click", () => {
      updateFeaturedProject(link.dataset.project)
    })
  })

  // Inicializar con TechnoCraft Ovalle seleccionado
  if (featuredProject) {
    updateFeaturedProject("technocraft")
  }

  /**
   * Función para alternar elementos
   * Utilidad para mostrar/ocultar elementos
   */
  const elementToggleFunc = (elem) => {
    elem.classList.toggle("active")
  }

  // Variables de la barra lateral
  const sidebar = document.querySelector("[data-sidebar]")
  const sidebarBtn = document.querySelector("[data-sidebar-btn]")

  /**
   * Funcionalidad de alternancia de la barra lateral para móvil
   * Permite expandir/contraer la barra lateral
   */
  sidebarBtn?.addEventListener("click", () => {
    elementToggleFunc(sidebar)
  })

  // Variables de navegación de página
  const navLinks = document.querySelectorAll("[data-nav-link]")
  const pages = document.querySelectorAll("[data-page]")

  /**
   * Agregar evento a todos los enlaces de navegación
   * Gestiona la navegación entre secciones
   */
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const targetPage = this.textContent.toLowerCase()

      pages.forEach((page) => {
        if (page.getAttribute("data-page").toLowerCase() === targetPage) {
          page.classList.add("active")
        } else {
          page.classList.remove("active")
        }
      })

      navLinks.forEach((navLink) => {
        if (navLink === this) {
          navLink.classList.add("active")
        } else {
          navLink.classList.remove("active")
        }
      })

      // Cerrar el menú móvil si está abierto
      const sidebar = document.querySelector("[data-sidebar]")
      if (sidebar) {
        sidebar.classList.remove("active")
      }
    })
  })

  // Asegurar que la primera pestaña esté activa por defecto
  if (pages.length > 0 && navLinks.length > 0) {
    pages[0].classList.add("active")
    navLinks[0].classList.add("active")
  }

  /**
   * Funcionalidad de filtro de portafolio
   * Permite filtrar proyectos por categoría
   */
  const filterBtns = document.querySelectorAll("[data-filter-btn]")
  const filterItems = document.querySelectorAll("[data-filter-item]")
  const filterSelectBox = document.querySelector("[data-select]")
  const selectItems = document.querySelectorAll("[data-select-item]")
  const selectValue = document.querySelector("[data-selecct-value]")

  // Filtrar elementos al hacer clic en el botón
  let lastClickedBtn = filterBtns[0]

  for (let i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", function () {
      const selectedValue = this.textContent.toLowerCase()
      if (selectValue) selectValue.textContent = this.textContent
      filterFunc(selectedValue)

      lastClickedBtn?.classList.remove("active")
      this.classList.add("active")
      lastClickedBtn = this
    })
  }

  // Filtrar elementos al cambiar la selección
  filterSelectBox?.addEventListener("click", () => {
    elementToggleFunc(filterSelectBox)
  })

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      const selectedValue = this.textContent.toLowerCase()
      if (selectValue) selectValue.textContent = this.textContent
      filterFunc(selectedValue)
      if (filterSelectBox) elementToggleFunc(filterSelectBox)
    })
  }

  /**
   * Función de filtro
   * Muestra u oculta elementos según el filtro seleccionado
   */
  const filterFunc = (selectedValue) => {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "todos") {
        filterItems[i].classList.add("active")
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active")
      } else {
        filterItems[i].classList.remove("active")
      }
    }
  }

  /**
   * Alternancia de Certificados y Experiencia Laboral
   * Permite cambiar entre ver certificados o experiencia
   */
  const certificadosSection = document.getElementById("certificados")
  if (certificadosSection) {
    const experienciaBtn = certificadosSection.querySelector(".filter-list .filter-item:nth-child(1) button")
    const certificacionesBtn = certificadosSection.querySelector(".filter-list .filter-item:nth-child(2) button")

    // Crear contenedores para experiencia y certificaciones
    const timelineList = certificadosSection.querySelector(".timeline-list")

    // Datos de experiencia laboral
    const experienciaItems = [
      {
        title: "Desarrollador Web en TechnoCraft",
        periodo: "2022 - Presente",
        descripcion:
          "Desarrollo de aplicaciones web y mantenimiento de sistemas existentes. Implementación de nuevas funcionalidades y mejoras de rendimiento.",
      },
      {
        title: "Técnico en Soporte IT",
        periodo: "2020 - 2022",
        descripcion:
          "Soporte técnico a usuarios, mantenimiento de equipos y redes. Resolución de incidencias y configuración de sistemas.",
      },
      {
        title: "Pasante en Desarrollo Web",
        periodo: "2019 - 2020",
        descripcion:
          "Desarrollo de componentes frontend y colaboración en proyectos de diseño web. Aprendizaje de tecnologías modernas.",
      },
    ]

    // Datos de certificaciones (usar los existentes del HTML)
    const certificacionesItems = Array.from(timelineList.children).map((item) => {
      return {
        element: item.cloneNode(true),
      }
    })

    /**
     * Función para mostrar experiencia laboral
     * Actualiza la sección para mostrar la experiencia
     */
    const mostrarExperiencia = () => {
      // Activar botón
      experienciaBtn.classList.add("active")
      certificacionesBtn.classList.remove("active")

      // Limpiar lista
      timelineList.innerHTML = ""

      // Agregar items de experiencia
      experienciaItems.forEach((item) => {
        const li = document.createElement("li")
        li.className = "timeline-item"
        li.innerHTML = `
         <h4 class="h4 timeline-item-title">${item.title}</h4>
         <span>${item.periodo}</span>
         <p class="timeline-text">
           ${item.descripcion}
         </p>
       `
        timelineList.appendChild(li)
      })
    }

    /**
     * Función para mostrar certificaciones
     * Actualiza la sección para mostrar las certificaciones
     */
    const mostrarCertificaciones = () => {
      // Activar botón
      certificacionesBtn.classList.add("active")
      experienciaBtn.classList.remove("active")

      // Limpiar lista
      timelineList.innerHTML = ""

      // Agregar items de certificaciones
      certificacionesItems.forEach((item) => {
        timelineList.appendChild(item.element.cloneNode(true))
      })
    }

    // Asignar eventos a los botones
    experienciaBtn.addEventListener("click", mostrarExperiencia)
    certificacionesBtn.addEventListener("click", mostrarCertificaciones)

    // Por defecto, mostrar certificaciones (que es lo que ya está en el HTML)
    mostrarCertificaciones()
  }
})

