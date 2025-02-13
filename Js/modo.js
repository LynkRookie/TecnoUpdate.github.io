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
      mobileMenu.classList.toggle("active")
    })
  
    // Close mobile menu when clicking a link
    document.querySelectorAll(".mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
      })
    })
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".mobile-menu") && !e.target.closest(".menu-btn")) {
        mobileMenu.classList.remove("active")
      }
    })
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
          mobileMenu.classList.remove("active")
        }
      })
    })
  
    // Function to set the dark mode
    const setDarkMode = (isDark) => {
      if (isDark) {
        body.classList.add("dark-mode")
        darkModeToggle.textContent = "☀️"
        localStorage.setItem("darkMode", "true")
        if (map) updateMapStyle(true)
      } else {
        body.classList.remove("dark-mode")
        darkModeToggle.textContent = "🌑"
        localStorage.setItem("darkMode", "false")
        if (map) updateMapStyle(false)
      }
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
  
    window.addEventListener("scroll", animateOnScroll)
    window.addEventListener("load", animateOnScroll)
  
    // Form submission
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
        // Add your form submission logic here
        alert("Mensaje enviado! (Este es un placeholder - implementar el envío real del formulario)")
      })
    }
  
    // Google Maps integration
    const initMap = () => {
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
                      <h3 style="margin: 0 0 4px;">TechnoCraft Ovalle</h3>
                      <p style="margin: 0;">Servicios tecnológicos profesionales</p>
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
  
    // Initialize map if Google Maps API is loaded
    if (typeof google !== "undefined") {
      initMap()
    }
  
    // Projects functionality
    const projectsData = {
      gestor: {
        title: "Gestor de Informe de Mantenimiento",
        description: "Sistema de gestión de mantenimiento",
        image: "./vista/img/gestor.png",
        technologies: ["React", "Node.js", "MongoDB"],
      },
      technocraft: {
        title: "TechnoCraft Ovalle",
        description: "Plataforma de servicios tecnológicos",
        image: "./vista/img/portafolio-1.png",
        technologies: ["Next.js", "Tailwind CSS", "Vercel"],
      },
      hacking: {
        title: "Portafolio de Hacking etico",
        description: "Blog de noticias tecnológicas",
        image: "./vista/img/portafolio_h.png",
        technologies: ["Gatsby", "GraphQL", "Netlify CMS"],
      },
      ciberseguridad: {
        title: "5 fases de ataque en ciberseguridad",
        description: "Blog de noticias tecnológicas",
        image: "./vista/img/5fases.png",
        technologies: ["Gatsby", "GraphQL", "Netlify CMS"],
      },
      mineria: {
        title: "Introduccion a la Mineria de Datos",
        description: "Blog de noticias tecnológicas",
        image: "./vista/img/mineria.png",
        technologies: ["Gatsby", "GraphQL", "Netlify CMS"],
      },
    }
  
    const featuredProject = document.getElementById("featured-project")
    const projectLinks = document.querySelectorAll(".project-link")
  
    // Function to update featured project
    const updateFeaturedProject = (projectKey) => {
      const project = projectsData[projectKey]
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
  
    // Add click handlers to project links
    projectLinks.forEach((link) => {
      link.addEventListener("click", () => {
        updateFeaturedProject(link.dataset.project)
      })
    })
  
    // Initialize with TechnoCraft Ovalle selected
    updateFeaturedProject("technocraft")
  })
  
  