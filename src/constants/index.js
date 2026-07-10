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
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    carrent,
    jobit,
    tripguide,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "React Native Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Content Creator",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [];

  const projects = [
    {
      name: "Kioscos",
      description:
        "Sistema de autoservicio por kiosco para pedidos, con frontend en Angular, backend en NestJS y un cliente de escritorio en .NET.",
      tags: [
        { name: "angular", color: "blue-text-gradient" },
        { name: "nestjs", color: "green-text-gradient" },
        { name: ".net", color: "pink-text-gradient" },
      ],
      image: carrent,
      source_code_link: "",
    },
    {
      name: "Chifa Global",
      description:
        "Plataforma de gestión y pedidos para un restaurante chifa, desplegada en producción (chifaglobal.com), con frontend en Angular y backend en NestJS.",
      tags: [
        { name: "angular", color: "blue-text-gradient" },
        { name: "nestjs", color: "green-text-gradient" },
        { name: "docker", color: "pink-text-gradient" },
      ],
      image: jobit,
      source_code_link: "",
    },
    {
      name: "Plataforma de Encuestas",
      description:
        "Plataforma de encuestas con constructor de formularios, lógica de saltos condicionales entre preguntas, publicación por QR y panel de analíticas.",
      tags: [
        { name: "nextjs", color: "blue-text-gradient" },
        { name: "typescript", color: "green-text-gradient" },
        { name: "tailwind", color: "pink-text-gradient" },
      ],
      image: tripguide,
      source_code_link: "",
    },
    {
      name: "Sapp Camal",
      description:
        "Sistema de gestión para un camal (planta de faenamiento) municipal, con frontend en Next.js y backend en NestJS.",
      tags: [
        { name: "nextjs", color: "blue-text-gradient" },
        { name: "nestjs", color: "green-text-gradient" },
        { name: "postgresql", color: "pink-text-gradient" },
      ],
      image: carrent,
      source_code_link: "",
    },
    {
      name: "Odontólogo",
      description:
        "Aplicación de escritorio construida con Electron para la gestión de un consultorio dental.",
      tags: [
        { name: "electron", color: "blue-text-gradient" },
        { name: "javascript", color: "green-text-gradient" },
      ],
      image: jobit,
      source_code_link: "",
    },
  ];

  export { services, technologies, experiences, projects };