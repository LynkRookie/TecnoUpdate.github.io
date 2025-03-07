document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header")
  const menuBtn = document.querySelector(".menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const darkModeToggle = document.getElementById("dark-mode-toggle")
  const body = document.body
  let map

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  menuBtn?.addEventListener("click", () => {
    menuBtn.classList.toggle("active")
    mobileMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking a link
  document.querySelectorAll(".mobile-nav-item").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      menuBtn.classList.remove("active")
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".mobile-menu") && !e.target.closest(".menu-btn")) {
      mobileMenu.classList.remove("active")
      menuBtn.classList.remove("active")
    }
  })

  // Smooth scroll for anchor links
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

  // Function to set the dark mode
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

  // Check for saved dark mode preference or system preference
  const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  const savedMode = localStorage.getItem("darkMode")

  if (savedMode === "true" || (savedMode === null && prefersDarkMode)) {
    setDarkMode(true)
  }

  // Toggle dark mode
  darkModeToggle.addEventListener("click", () => {
    setDarkMode(!body.classList.contains("dark-mode"))
  })

  // Listen for changes in system color scheme
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem("darkMode") === null) {
      setDarkMode(e.matches)
    }
  })

  // Animate elements on scroll
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

  // Add animate-on-scroll class to elements
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

  // Animate skill bars on scroll
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

  // Form submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Get form data
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !message) {
        alert("Por favor, completa todos los campos")
        return
      }

      try {
        // Mostrar indicador de carga
        const formBtn = document.querySelector("[data-form-btn]")
        const originalBtnText = formBtn.innerHTML
        formBtn.disabled = true
        formBtn.innerHTML = "<span>Enviando...</span>"

        // FormSubmit will handle the form submission
        await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
        })

        alert(`Mensaje enviado con éxito. Gracias ${name}!`)
        contactForm.reset()
      } catch (error) {
        console.error("Error al enviar el mensaje:", error)
        alert("Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.")
      } finally {
        // Restaurar botón
        const formBtn = document.querySelector("[data-form-btn]")
        formBtn.disabled = false
        formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Enviar Mensaje</span>'
      }
    })
  }

  // Google Maps integration
  window.initMap = () => {
    const technoCraft = { lat: -30.6015, lng: -71.2086 } // Ovalle, Chile coordinates

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

    // Info window
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

  const updateMapStyle = (isDark) => {
    if (map) {
      map.setOptions({ styles: isDark ? darkMapStyle : lightMapStyle })
    }
  }

  // Map styles
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

  // Projects functionality
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

  // Function to update featured project
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

      // Update active state of project links
      projectLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.project === projectKey)
      })
    }
  }

  // Add click handlers to project links
  projectLinks.forEach((link) => {
    link.addEventListener("click", () => {
      updateFeaturedProject(link.dataset.project)
    })
  })

  // Initialize with TechnoCraft Ovalle selected
  if (featuredProject) {
    updateFeaturedProject("technocraft")
  }

  // element toggle function
  const elementToggleFunc = (elem) => {
    elem.classList.toggle("active")
  }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]")
  const sidebarBtn = document.querySelector("[data-sidebar-btn]")

  // sidebar toggle functionality for mobile
  sidebarBtn?.addEventListener("click", () => {
    elementToggleFunc(sidebar)
  })

  // page navigation variables
  const navLinks = document.querySelectorAll("[data-nav-link]")
  const pages = document.querySelectorAll("[data-page]")

  // add event to all nav links
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

      // Close the mobile menu if it's open
      const sidebar = document.querySelector("[data-sidebar]")
      if (sidebar) {
        sidebar.classList.remove("active")
      }
    })
  })

  // Ensure the first tab is active by default
  if (pages.length > 0 && navLinks.length > 0) {
    pages[0].classList.add("active")
    navLinks[0].classList.add("active")
  }

  // Portfolio filter functionality
  const filterBtns = document.querySelectorAll("[data-filter-btn]")
  const filterItems = document.querySelectorAll("[data-filter-item]")
  const filterSelectBox = document.querySelector("[data-select]")
  const selectItems = document.querySelectorAll("[data-select-item]")
  const selectValue = document.querySelector("[data-selecct-value]")

  // Filter items on button click
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

  // Filter items on select change
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

  // Filter function
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

  // Contact form functionality
  const form = document.querySelector("[data-form]")
  const formInputs = document.querySelectorAll("[data-form-input]")
  const formBtn = document.querySelector("[data-form-btn]")

  // Check form validation on input
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled")
      } else {
        formBtn.setAttribute("disabled", "")
      }
    })
  }

  // Certificados y Experiencia Laboral Toggle
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

    // Función para mostrar experiencia laboral
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

    // Función para mostrar certificaciones
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

