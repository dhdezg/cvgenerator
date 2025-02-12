import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to CV Generator',
      start: 'Start',
      prevStep: 'Previous step',
      nextStep: 'Next step',
      personalInfoTitle: 'Your personal data',
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      linkedin: 'Linkedin',
      interestingLinks: 'Other interesting links',
      placeholders: {
        fullName: 'Enter your full name',
        email: 'Enter your email',
        phone: 'Enter your phone number',
        address: 'Enter your address',
        linkedin: 'Enter your Linkedin profile',
        interestingLinks: 'Your personal web, GitHub, etc.',
        tasks: 'What are your main tasks in this position?',
        position: 'Enter your position',
        companyName: 'Enter the company name',
        technologies: 'Enter used technologies',
        skill: 'Skill name',
        schoolName: 'Institution name',
        degree: 'Degree name',
        language: 'Language name',
        level: 'Language level',
        institution: 'Institution name',
        studiesTitle: 'Your studies',
      },
      studiesTitle: 'Your studies',
      workExperienceTitle: 'Work experience',
      companyName: 'Company',
      position: 'Position',
      startDate: 'Start date',
      endDate: 'End date',
      tasks: 'Tasks',
      tasksClarification:
        ' (separates with `.`, each task without line breaks)',
      technologies: 'Technologies',
      technologiesClarification: '(separates with `,` each technology)',
      addExperience: 'Add another experience',
      skillsTitle: 'Your skills',
      addSkill: 'Add another skill',
      skillName: 'Name',
      skill: 'Skill',
      skills: 'Skills',
      remove: 'Remove',
      schoolName: 'Institution name',
      degree: 'Degree name',
      study: 'Study',
      addStudy: 'Add another study',
      languageTitle: 'Your known languages',
      addLanguage: 'Add another language',
      language: 'Language',
      languages: 'Languages',
      level: 'Level',
      institution: 'Institution',
      personalInfo: 'Personal information',
      education: 'Education',
      download: 'Download resume',
      resumeTitle: 'Your resume',
      experience: 'Experience',
      footerText: 'Done with ❤️ by',
      present: 'Present',
      usedTechs: 'Used technologies',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      preview: 'Do you want a preview?',
      clickMe: 'Click here!',
      infoMessage:
        'If there are any fields that you cannot fill in, leave them empty, they will not appear on your resume!',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido a CV Generator',
      start: 'Empezar',
      prevStep: 'Paso anterior',
      nextStep: 'Siguiente paso',
      personalInfoTitle: 'Tus datos personales',
      fullName: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      address: 'Dirección',
      linkedin: 'Linkedin',
      interestingLinks: 'Otros enlaces de interés',
      placeholders: {
        fullName: 'Introduce tu nombre completo',
        email: 'Introduce tu correo electrónico',
        phone: 'Introduce tu número de teléfono',
        address: 'Introduce tu dirección',
        linkedin: 'Introduce tu perfil de LinkedIn',
        interestingLinks: 'Tu web personal, GitHub, etc.',
        tasks: '¿Cuáles son tus principales tareas en este puesto?',
        position: 'Introduce tu posición',
        companyName: 'Nombre de la empresa',
        technologies: 'Tecnologías utilizadas',
        skill: 'Nombre de la habilidad',
        studiesTitle: 'Tus estudios',
        schoolName: 'Nombre de la institución',
        degree: 'Nombre del grado',
        language: 'Nombre del idioma',
        level: 'Nivel de idioma',
        institution: 'Nombre de la institución',
      },
      workExperienceTitle: 'Experiencia laboral',
      companyName: 'Empresa',
      position: 'Posición',
      startDate: 'Fecha de inicio',
      endDate: 'Fecha de fin',
      tasks: 'Tareas',
      tasksClarification: ' (separa cada tarea con `.` sin saltos de línea)',
      technologies: 'Tecnologías',
      technologiesClarification: '(separa cada tecnología con `,`)',
      addExperience: 'Añadir otra experiencia',
      skillsTitle: 'Tus habilidades',
      addSkill: 'Añadir otra habilidad',
      skillName: 'Nombre',
      skill: 'Habilidad',
      skills: 'Habilidades',
      remove: 'Eliminar',
      studiesTitle: 'Tus estudios',
      schoolName: 'Nombre de la institución',
      degree: 'Nombre del grado',
      study: 'Estudio',
      addStudy: 'Añadir otro estudio',
      languageTitle: 'Tus idiomas',
      addLanguage: 'Añadir otro idioma',
      language: 'Idioma',
      languages: 'Idiomas',
      level: 'Nivel',
      institution: 'Institución',
      personalInfo: 'Información personal',
      education: 'Educación',
      download: 'Descargar CV',
      resumeTitle: 'Tu currículum',
      experience: 'Experiencia',
      footerText: 'Hecho con ❤️ por',
      present: 'Actualidad',
      usedTechs: 'Tecnologías utilizadas',
      months: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      preview: 'Quieres ver un adelanto?',
      clickMe: 'Pulsa aquí!',
      infoMessage:
        'Si hay campos que no puedes rellenar, déjalos vacíos, no aparecerán en tu CV!',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
