export const translations = {
  es: {
    nav: { about: "Acerca", work: "Trabajo", contact: "Contacto" },
    hero: {
      missionReady: "Misión Lista",
      tagline:
        "Ingeniero de software full stack. Diseño y construyo aplicaciones web con React, Next.js y NestJS, desde la interfaz hasta la API, y las llevo a producción.",
      pilot: "Piloto",
      destination: "Destino",
      status: "Estado",
      destinationValue: "Universo del Software",
      statusValue: "Exploración Iniciada",
      beginDescent: "Iniciar descenso",
    },
    about: {
      badge: "Estación Orbital",
      subtext: "Manifiesto de tripulación",
      heading: "Resumen.",
      paragraph:
        "Soy ingeniero de software full stack, especializado en construir aplicaciones web con React, Next.js y NestJS. Abordo cada proyecto como una expedición: analizo el problema a fondo, diseño una arquitectura sólida y entrego soluciones eficientes, robustas y fáciles de usar. Exploremos juntos qué podemos construir.",
      panel: "Panel",
    },
    tech: {
      badge: "Sistemas de a Bordo",
      heading: "Instrumentos.",
      subtext: "Cada estrella es una tecnología de mi arsenal.",
      systemsOnline: "Todos los sistemas en línea",
    },
    experience: {
      badge: "Constelación de Carrera",
      subtext: "Trayectoria trazada",
      heading: "Experiencia.",
      star: "Estrella",
      emptyBadge: "Mapeo de Constelación",
      emptyTitle: "Se están trazando nuevas estrellas.",
      emptyBody:
        "Esta constelación está bajo estudio activo. Pronto se trazarán aquí las coordenadas completas de mi carrera.",
    },
    works: {
      badge: "Estudio Planetario",
      heading: "Proyectos.",
      planet: "Planeta",
      scanning: "Escaneando órbita — acércate a un planeta",
      viewLive: "Ver en producción →",
      goToPlanet: (n) => `Ir al planeta ${n}`,
      defaultNote: "Aún no está en producción",
    },
    contact: {
      badge: "Destino Final",
      heading: "Transmisión.",
      callerId: "Identificación",
      namePlaceholder: "Tu nombre",
      returnFrequency: "Frecuencia de Retorno",
      emailPlaceholder: "tu@email.com",
      messagePayload: "Carga del Mensaje",
      messagePlaceholder: "¿Qué quieres transmitir?",
      sending: "Transmitiendo...",
      send: "Enviar Transmisión",
      successTitle: "TRANSMISIÓN EXITOSA",
      successSubtitle: "Misión Completa",
      error: "Señal perdida. Intenta la transmisión de nuevo.",
    },
    footer: {
      credit: "Modelos bajo licencia CC BY 4.0",
      by: "por",
      halcon: "Halcón Milenario",
      planet: "Planeta estilizado",
      station: "Estación Espacial 3",
    },
    confirm: {
      cancel: "Cancelar",
      cv: {
        title: "Descargar CV",
        message: "Se descargará mi hoja de vida en PDF a tu dispositivo.",
        confirm: "Descargar",
      },
      whatsapp: {
        title: "Abrir WhatsApp",
        message:
          "Se abrirá una pestaña nueva con WhatsApp para escribirme directamente.",
        confirm: "Abrir WhatsApp",
      },
      email: {
        title: "Enviar transmisión",
        message: "¿Enviar este mensaje a Mauro por correo?",
        confirm: "Enviar",
      },
      demo: {
        title: (name) => `Aproximación a ${name}`,
        message:
          "Se abrirá el sitio en producción en una pestaña nueva.",
        confirm: "Conectar",
      },
    },
  },
  en: {
    nav: { about: "About", work: "Work", contact: "Contact" },
    hero: {
      missionReady: "Mission Ready",
      tagline:
        "Full stack software engineer. I design and build web apps with React, Next.js and NestJS, from interface to API, and ship them to production.",
      pilot: "Pilot",
      destination: "Destination",
      status: "Status",
      destinationValue: "Software Universe",
      statusValue: "Exploration Started",
      beginDescent: "Begin descent",
    },
    about: {
      badge: "Orbital Station",
      subtext: "Crew manifest",
      heading: "Overview.",
      paragraph:
        "I'm a full stack software engineer, specialized in building web applications with React, Next.js, and NestJS. I approach every project like an expedition: I dig into the problem, design a solid architecture, and ship efficient, robust, user-friendly solutions. Let's explore what we can build together.",
      panel: "Panel",
    },
    tech: {
      badge: "Onboard Systems",
      heading: "Instruments.",
      subtext: "Every star is a technology in my arsenal.",
      systemsOnline: "All systems online",
    },
    experience: {
      badge: "Career Constellation",
      subtext: "Charted trajectory",
      heading: "Experience.",
      star: "Star",
      emptyBadge: "Constellation Mapping",
      emptyTitle: "New stars are being charted.",
      emptyBody:
        "This constellation is under active survey. Full career coordinates will be plotted here soon.",
    },
    works: {
      badge: "Planetary Survey",
      heading: "Projects.",
      planet: "Planet",
      scanning: "Scanning orbit — approach a planet",
      viewLive: "View live →",
      goToPlanet: (n) => `Go to planet ${n}`,
      defaultNote: "Not live yet",
    },
    contact: {
      badge: "Final Destination",
      heading: "Transmission.",
      callerId: "Caller ID",
      namePlaceholder: "Your name",
      returnFrequency: "Return Frequency",
      emailPlaceholder: "your@email.com",
      messagePayload: "Message Payload",
      messagePlaceholder: "What do you want to transmit?",
      sending: "Transmitting...",
      send: "Send Transmission",
      successTitle: "TRANSMISSION SUCCESSFUL",
      successSubtitle: "Mission Complete",
      error: "Signal lost. Please retry the transmission.",
    },
    footer: {
      credit: "Models under CC BY 4.0 license",
      by: "by",
      halcon: "Millennium Falcon",
      planet: "Stylized planet",
      station: "Space Station 3",
    },
    confirm: {
      cancel: "Cancel",
      cv: {
        title: "Download CV",
        message: "This will download my résumé as a PDF to your device.",
        confirm: "Download",
      },
      whatsapp: {
        title: "Open WhatsApp",
        message: "This will open a new tab with WhatsApp to message me directly.",
        confirm: "Open WhatsApp",
      },
      email: {
        title: "Send transmission",
        message: "Send this message to Mauro by email?",
        confirm: "Send",
      },
      demo: {
        title: (name) => `Approaching ${name}`,
        message:
          "This will open the production site in a new tab.",
        confirm: "Connect",
      },
    },
  },
};

export const useT = (language) => translations[language] ?? translations.es;
