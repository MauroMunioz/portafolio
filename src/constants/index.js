import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  nextjs,
  nestjs,
  express,
  postgresql,
} from "../assets";

export const navLinks = [{ id: "about" }, { id: "work" }, { id: "contact" }];

const servicesContent = [
  { icon: web, es: "Desarrollador Web", en: "Web Developer" },
  {
    icon: mobile,
    es: "Desarrollador React Native",
    en: "React Native Developer",
  },
  { icon: backend, es: "Desarrollador Backend", en: "Backend Developer" },
  { icon: creator, es: "DevOps y Despliegue", en: "DevOps & Deployment" },
];

export const getServices = (lang) =>
  servicesContent.map(({ icon, es, en }) => ({
    icon,
    title: lang === "en" ? en : es,
  }));

export const technologies = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Next JS", icon: nextjs },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "NestJS", icon: nestjs },
  { name: "Express", icon: express },
  { name: "MongoDB", icon: mongodb },
  { name: "PostgreSQL", icon: postgresql },
  { name: "git", icon: git },
];

const experiencesContent = [
  {
    es: {
      title: "Desarrollo Full Stack",
      company_name: "Proyectos independientes",
      date: "2024 — Presente",
      points: [
        "Construcción de aplicaciones web full stack con React, Next.js y NestJS, incluyendo APIs REST con autenticación JWT.",
        "Sistemas en producción como Kioscos (autoservicio municipal), Chifa Global (gestión de restaurante) y Sapp Camal (gestión municipal).",
      ],
    },
    en: {
      title: "Full Stack Development",
      company_name: "Independent projects",
      date: "2024 — Present",
      points: [
        "Built full stack web applications with React, Next.js, and NestJS, including REST APIs with JWT authentication.",
        "Shipped production systems like Kioscos (municipal self-service), Chifa Global (restaurant management), and Sapp Camal (municipal management).",
      ],
    },
  },
  {
    es: {
      title: "Bases de Datos y Testing",
      company_name: "Proyectos independientes",
      date: "2024 — Presente",
      points: [
        "Diseño y gestión de bases de datos SQL (MySQL, PostgreSQL) y NoSQL (MongoDB) según las necesidades de cada sistema.",
        "Pruebas automatizadas con Jest y Supertest para asegurar la fiabilidad de las APIs.",
      ],
    },
    en: {
      title: "Databases & Testing",
      company_name: "Independent projects",
      date: "2024 — Present",
      points: [
        "Designed and consumed SQL (MySQL, PostgreSQL) and NoSQL (MongoDB) databases based on each system's needs.",
        "Wrote automated tests with Jest and Supertest to ensure API reliability.",
      ],
    },
  },
  {
    es: {
      title: "Interfaces y Despliegue",
      company_name: "Proyectos independientes",
      date: "2024 — Presente",
      points: [
        "Interfaces construidas con TypeScript y Tailwind CSS, además de aplicaciones de escritorio con Electron.",
        "Despliegue continuo en Vercel y contenedores con Docker para servicios backend.",
      ],
    },
    en: {
      title: "Interfaces & Deployment",
      company_name: "Independent projects",
      date: "2024 — Present",
      points: [
        "Built interfaces with TypeScript and Tailwind CSS, including desktop apps with Electron.",
        "Continuous deployment on Vercel and Dockerized backend services.",
      ],
    },
  },
];

export const getExperiences = (lang) =>
  experiencesContent.map((entry) => entry[lang] ?? entry.es);

const projectsContent = [
  {
    tags: [
      { name: "angular", color: "blue-text-gradient" },
      { name: "nestjs", color: "green-text-gradient" },
      { name: ".net", color: "pink-text-gradient" },
    ],
    live_demo_link: "https://kioskopago.ibarra.gob.ec/",
    es: {
      name: "Kioscos",
      description:
        "Sistema de autoservicio por kiosco para pedidos, con frontend en Angular, backend en NestJS y un cliente de escritorio en .NET.",
    },
    en: {
      name: "Kioscos",
      description:
        "Self-service kiosk ordering system, with an Angular frontend, NestJS backend, and a .NET desktop client.",
    },
  },
  {
    tags: [
      { name: "angular", color: "blue-text-gradient" },
      { name: "nestjs", color: "green-text-gradient" },
      { name: "docker", color: "pink-text-gradient" },
    ],
    live_demo_link: "https://chifaglobal.com/",
    es: {
      name: "Chifa Global",
      description:
        "Plataforma de gestión y pedidos para un restaurante chifa, desplegada en producción (chifaglobal.com), con frontend en Angular y backend en NestJS.",
    },
    en: {
      name: "Chifa Global",
      description:
        "Order and management platform for a chifa restaurant, live in production (chifaglobal.com), with an Angular frontend and NestJS backend.",
    },
  },
  {
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "typescript", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    live_demo_link: "",
    demo_note: { es: "Aún no está en producción", en: "Not live yet" },
    es: {
      name: "Plataforma de Encuestas",
      description:
        "Plataforma de encuestas con constructor de formularios, lógica de saltos condicionales entre preguntas, publicación por QR y panel de analíticas.",
    },
    en: {
      name: "Survey Platform",
      description:
        "Survey platform with a form builder, conditional branching logic between questions, QR publishing, and an analytics dashboard.",
    },
  },
  {
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "nestjs", color: "green-text-gradient" },
      { name: "postgresql", color: "pink-text-gradient" },
    ],
    live_demo_link: "https://sapp-riobamba.com/",
    es: {
      name: "Sapp Camal",
      description:
        "Sistema de gestión para un camal (planta de faenamiento) municipal, con frontend en Next.js y backend en NestJS.",
    },
    en: {
      name: "Sapp Camal",
      description:
        "Management system for a municipal slaughterhouse, with a Next.js frontend and NestJS backend.",
    },
  },
  {
    tags: [
      { name: "electron", color: "blue-text-gradient" },
      { name: "javascript", color: "green-text-gradient" },
    ],
    live_demo_link: "",
    demo_note: {
      es: "Aplicación de escritorio local",
      en: "Local desktop application",
    },
    es: {
      name: "Odontólogo",
      description:
        "Aplicación de escritorio construida con Electron para la gestión de un consultorio dental.",
    },
    en: {
      name: "Dental Clinic App",
      description:
        "Desktop application built with Electron for managing a dental practice.",
    },
  },
];

export const PROJECTS_COUNT = projectsContent.length;

export const getProjects = (lang) =>
  projectsContent.map(({ tags, live_demo_link, demo_note, es, en }) => {
    const t = lang === "en" ? en : es;
    return {
      tags,
      live_demo_link,
      demo_note: demo_note ? (demo_note[lang] ?? demo_note.es) : undefined,
      name: t.name,
      description: t.description,
    };
  });
