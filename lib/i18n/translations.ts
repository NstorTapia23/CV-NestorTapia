export type Lang = "es" | "en"

export const translations = {
  nav: {
    home: { es: "Inicio", en: "Home" },
    skills: { es: "Habilidades", en: "Skills" },
    experience: { es: "Experiencia", en: "Experience" },
    education: { es: "Educación", en: "Education" },
    languages: { es: "Idiomas", en: "Languages" },
    contact: { es: "Contacto", en: "Contact" },
  },
  theme: {
    toLight: { es: "Cambiar a modo claro", en: "Switch to light mode" },
    toDark: { es: "Cambiar a modo oscuro", en: "Switch to dark mode" },
  },
  hero: {
    title: {
      es: "Backend / Fullstack Junior Developer",
      en: "Backend / Fullstack Junior Developer",
    },
    aboutLabel: { es: "¿Quién soy?", en: "About Me" },
  },
  about: {
    text: {
      es: "Soy estudiante de Ingeniería Informática y desarrollador Full Stack con experiencia desarrollando proyectos completos, desde el diseño de la base de datos y la implementación de APIs hasta la creación de interfaces modernas y su despliegue. Trabajo principalmente con NestJS, Next.js, React, TypeScript, PostgreSQL y Docker, priorizando código mantenible y soluciones escalables. Actualmente busco incorporarme a un equipo donde pueda seguir creciendo y aportar.",
      en: "I am a Computer Engineering student and Full Stack developer with experience building complete projects, from database design and API implementation to creating modern interfaces and deployment. I primarily work with NestJS, Next.js, React, TypeScript, PostgreSQL, and Docker, prioritizing maintainable code and scalable solutions. I am currently looking to join a team where I can continue growing and contributing.",
    },
  },
  skills: {
    title: { es: "Habilidades Técnicas", en: "Technical Skills" },
    categories: {
      languages: { es: "Lenguajes", en: "Languages" },
      backend: { es: "Backend", en: "Backend" },
      frontend: { es: "Frontend", en: "Frontend" },
      tools: { es: "Herramientas", en: "Tools" },
      databases: { es: "Bases de Datos", en: "Databases" },
    },
  },
  experience: {
    title: { es: "Experiencia", en: "Experience" },
    items: [
      {
        role: { es: "Desarrollador Backend (Estudiante)", en: "Backend Developer (Student)" },
        company: { es: "Empresa de Tecnologías de la Información", en: "Information Technology Company" },
        period: { es: "Actualidad", en: "Present" },
        description: {
          es: "Participación en el desarrollo de aplicaciones utilizando JavaScript y NestJS. Implementación y mantenimiento de funcionalidades backend. Trabajo con bases de datos PostgreSQL y Docker. Colaboración con el equipo de desarrollo utilizando Git.",
          en: "Participation in application development using JavaScript and NestJS. Implementation and maintenance of backend functionalities. Work with PostgreSQL databases and Docker. Collaboration with the development team using Git.",
        },
        technologies: ["JavaScript", "NestJS", "PostgreSQL", "Docker", "Git"],
      },
      {
        role: { es: "Desarrollador Full Stack Freelance", en: "Full Stack Developer Freelance" },
        company: { es: "Freelance", en: "Freelance" },
        period: { es: "2025 – 2026", en: "2025 – 2026" },
        description: {
          es: "Desarrollé el backend de un sistema para la administración de asociados, pagos y gestión de información. Diseñé e implementé APIs REST utilizando NestJS y PostgreSQL. También desarrollé un sistema POS para cafetería con control de inventario, gestión de recetas y funcionalidades en tiempo real.",
          en: "Developed the backend of a system for managing associates, payments, and information management. Designed and implemented REST APIs using NestJS and PostgreSQL. Also developed a POS system for a cafeteria with inventory control, recipe management, and real-time features.",
        },
        technologies: ["NextJS", "TypeScript", "PostgreSQL", "TailwindCSS", "Prisma", "Supabase"],
      },
    ],
  },
  education: {
    title: { es: "Educación", en: "Education" },
    items: [
      {
        degree: { es: "Ingeniería Informática (3.er año)", en: "Computer Engineering (3rd year)" },
        institution: {
          es: "Universidad de Ciego de Ávila \"Máximo Gómez Báez\"",
          en: "University of Ciego de Ávila \"Máximo Gómez Báez\"",
        },
        description: {
          es: "Actualmente curso el tercer año de Ingeniería Informática, donde he fortalecido mis conocimientos en desarrollo de software (C#), estructuras de datos, bases de datos (PostgreSQL), ingeniería de software y arquitectura de computadoras. Complemento mi formación académica con el desarrollo de proyectos Full Stack utilizando tecnologías modernas (NestJS, Next.js, React), aplicando buenas prácticas de diseño y desarrollo de aplicaciones.",
          en: "I am currently in my third year of Computer Engineering, where I have strengthened my knowledge in software development (C#), data structures, databases (PostgreSQL), software engineering, and computer architecture. I complement my academic training by developing Full Stack projects using modern technologies (NestJS, Next.js, React), applying good design and application development practices.",
        },
      },
    ],
  },
  languages: {
    title: { es: "Idiomas", en: "Languages" },
    items: [
      { language: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
      { language: { es: "Inglés", en: "English" }, level: { es: "Básico-Intermedio", en: "Basic-Intermediate" } },
    ],
  },
  footer: {
    rights: { es: "Hecho con Next.js y Tailwind CSS", en: "Built with Next.js and Tailwind CSS" },
  },
  contact: {
    title: { es: "Contáctame", en: "Contact me" },
    email: "nestortapia287@gmail.com",
    phone: "+5355476330",
    location: { es: "Ciego de Ávila, Cuba", en: "Ciego de Ávila, Cuba" },
    github: "NstorTapia23",
    linkedin: "https://linkedin.com/in/néstor-tapia",
    cta: {
      es: "¿Crees que encajo en vuestro equipo?",
      en: "Do you think I'd fit in your team?",
    },
  },
}

export type TranslationKeys = typeof translations
