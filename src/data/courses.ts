export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  instructor: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  duration: string;
  rating: number;
  students: number;
  image: string;
  category: string;
  lessons: Lesson[];
  requirements: string[];
  whatYouLearn: string[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  /** Texto o contenido adicional debajo del video (opcional) */
  content?: string;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Desarrollo Web Full Stack',
    description: 'Aprende a crear aplicaciones web completas desde cero. Este curso te llevará desde los fundamentos de HTML, CSS y JavaScript hasta frameworks modernos como React y Node.js. Construirás proyectos reales que podrás agregar a tu portafolio profesional.',
    shortDescription: 'Crea aplicaciones web modernas con React, Node.js y bases de datos.',
    instructor: 'María González',
    level: 'Intermedio',
    duration: '12 semanas',
    rating: 4.8,
    students: 2543,
    image: 'https://images.unsplash.com/photo-1763568258129-3e019ef91b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHByb2dyYW1taW5nJTIwbGFwdG9wfGVufDF8fHx8MTc3MDA1MDY2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Programación',
    requirements: [
      'Conocimientos básicos de HTML y CSS',
      'Familiaridad con JavaScript es recomendable',
      'Computadora con mínimo 8GB de RAM',
      'Conexión estable a internet'
    ],
    whatYouLearn: [
      'Crear interfaces modernas con React',
      'Desarrollar APIs RESTful con Node.js',
      'Gestionar bases de datos SQL y NoSQL',
      'Implementar autenticación y autorización',
      'Desplegar aplicaciones en producción'
    ],
    lessons: [
      { id: '1-1', title: 'Introducción al desarrollo web moderno', duration: '12:30', completed: false, content: 'En esta lección exploraremos los fundamentos del desarrollo web moderno. Veremos cómo han evolucionado las tecnologías y qué herramientas utilizan los profesionales hoy en día.\n\n**Objetivos de la lección:**\n- Comprender la estructura de una aplicación web\n- Conocer el ecosistema de tecnologías actual\n- Preparar el entorno para las siguientes lecciones' },
      { id: '1-2', title: 'Configuración del entorno de desarrollo', duration: '18:45', completed: false },
      { id: '1-3', title: 'Fundamentos de React', duration: '25:15', completed: false },
      { id: '1-4', title: 'Componentes y Props', duration: '22:00', completed: false },
      { id: '1-5', title: 'Estado y Ciclo de vida', duration: '28:30', completed: false },
      { id: '1-6', title: 'Hooks en React', duration: '32:10', completed: false },
      { id: '1-7', title: 'Routing con React Router', duration: '20:45', completed: false },
      { id: '1-8', title: 'Node.js y Express básico', duration: '30:20', completed: false },
      { id: '1-9', title: 'APIs RESTful', duration: '35:15', completed: false },
      { id: '1-10', title: 'Bases de datos y MongoDB', duration: '40:00', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Marketing Digital Estratégico',
    description: 'Domina las estrategias de marketing digital que utilizan las empresas líderes. Aprende a crear campañas efectivas en redes sociales, SEO, SEM, email marketing y análisis de métricas para maximizar el ROI de tus inversiones publicitarias.',
    shortDescription: 'Estrategias de marketing digital, SEO, redes sociales y análisis de datos.',
    instructor: 'Carlos Rodríguez',
    level: 'Principiante',
    duration: '8 semanas',
    rating: 4.6,
    students: 1829,
    image: 'https://images.unsplash.com/photo-1682336869523-2c6859f781cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MDAyMzI0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Marketing',
    requirements: [
      'No se requiere experiencia previa',
      'Cuenta en principales redes sociales',
      'Ganas de aprender y experimentar'
    ],
    whatYouLearn: [
      'Crear estrategias de marketing digital',
      'Optimizar campañas de publicidad online',
      'Análisis de métricas y KPIs',
      'SEO y posicionamiento en buscadores',
      'Marketing de contenidos efectivo'
    ],
    lessons: [
      { id: '2-1', title: 'Introducción al marketing digital', duration: '15:00', completed: false },
      { id: '2-2', title: 'Fundamentos de SEO', duration: '22:30', completed: false },
      { id: '2-3', title: 'Marketing en redes sociales', duration: '28:15', completed: false },
      { id: '2-4', title: 'Publicidad en Google Ads', duration: '30:45', completed: false },
      { id: '2-5', title: 'Email marketing efectivo', duration: '20:00', completed: false },
      { id: '2-6', title: 'Análisis de métricas', duration: '25:30', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Diseño UX/UI con Figma',
    description: 'Aprende a diseñar experiencias de usuario excepcionales usando Figma. Desde la investigación de usuarios hasta la creación de prototipos interactivos, este curso cubre todo el proceso de diseño UX/UI profesional.',
    shortDescription: 'Diseño de interfaces y experiencias de usuario con Figma profesional.',
    instructor: 'Ana Martínez',
    level: 'Intermedio',
    duration: '10 semanas',
    rating: 4.9,
    students: 3201,
    image: 'https://images.unsplash.com/photo-1632937145991-91620be68319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwd29ya3NwYWNlJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzcwMDAzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Diseño',
    requirements: [
      'Conocimientos básicos de diseño',
      'Cuenta gratuita de Figma',
      'Sensibilidad estética'
    ],
    whatYouLearn: [
      'Principios fundamentales de UX/UI',
      'Investigación de usuarios',
      'Wireframing y prototyping',
      'Sistemas de diseño escalables',
      'Colaboración con equipos de desarrollo'
    ],
    lessons: [
      { id: '3-1', title: 'Introducción a UX/UI', duration: '18:00', completed: false },
      { id: '3-2', title: 'Investigación de usuarios', duration: '25:30', completed: false },
      { id: '3-3', title: 'Wireframing básico', duration: '22:45', completed: false },
      { id: '3-4', title: 'Diseño de interfaces en Figma', duration: '35:20', completed: false },
      { id: '3-5', title: 'Sistemas de diseño', duration: '30:15', completed: false },
      { id: '3-6', title: 'Prototipado interactivo', duration: '28:00', completed: false },
      { id: '3-7', title: 'Testing de usabilidad', duration: '24:30', completed: false }
    ]
  },
  {
    id: '4',
    title: 'Análisis de Datos con Python',
    description: 'Conviértete en un analista de datos profesional. Aprende a extraer, limpiar, analizar y visualizar datos usando Python, Pandas, NumPy y herramientas de visualización para tomar decisiones basadas en datos.',
    shortDescription: 'Python, Pandas y visualización de datos para análisis profesional.',
    instructor: 'Luis Fernández',
    level: 'Intermedio',
    duration: '14 semanas',
    rating: 4.7,
    students: 1654,
    image: 'https://images.unsplash.com/photo-1758519289074-9de36003622b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnRzJTIwbGFwdG9wfGVufDF8fHx8MTc3MDA1MDY2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Datos',
    requirements: [
      'Conocimientos básicos de Python',
      'Matemáticas nivel secundaria',
      'Computadora con Python instalado'
    ],
    whatYouLearn: [
      'Manipulación de datos con Pandas',
      'Análisis estadístico básico',
      'Visualización de datos',
      'Machine Learning básico',
      'Proyectos reales de análisis'
    ],
    lessons: [
      { id: '4-1', title: 'Introducción a Python para datos', duration: '20:00', completed: false },
      { id: '4-2', title: 'NumPy y arrays', duration: '25:15', completed: false },
      { id: '4-3', title: 'Pandas básico', duration: '30:30', completed: false },
      { id: '4-4', title: 'Limpieza de datos', duration: '28:45', completed: false },
      { id: '4-5', title: 'Visualización con Matplotlib', duration: '32:00', completed: false },
      { id: '4-6', title: 'Análisis exploratorio', duration: '35:20', completed: false }
    ]
  },
  {
    id: '5',
    title: 'Gestión de Proyectos Ágiles',
    description: 'Aprende metodologías ágiles como Scrum y Kanban para gestionar proyectos de manera efectiva. Ideal para project managers, team leads y cualquiera que quiera mejorar la productividad de su equipo.',
    shortDescription: 'Metodologías ágiles, Scrum, Kanban y liderazgo de equipos.',
    instructor: 'Patricia Silva',
    level: 'Principiante',
    duration: '6 semanas',
    rating: 4.5,
    students: 2103,
    image: 'https://images.unsplash.com/photo-1630487656049-6db93a53a7e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDF8fHx8MTc3MDAwNzUzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Negocios',
    requirements: [
      'Experiencia laboral básica',
      'Ganas de liderar equipos',
      'No se requiere experiencia previa en gestión'
    ],
    whatYouLearn: [
      'Fundamentos de metodologías ágiles',
      'Framework Scrum completo',
      'Gestión de equipos remotos',
      'Herramientas digitales de gestión',
      'Resolución de conflictos'
    ],
    lessons: [
      { id: '5-1', title: 'Introducción a Agile', duration: '16:00', completed: false },
      { id: '5-2', title: 'Framework Scrum', duration: '24:30', completed: false },
      { id: '5-3', title: 'Roles en Scrum', duration: '20:15', completed: false },
      { id: '5-4', title: 'Kanban y tableros', duration: '22:00', completed: false },
      { id: '5-5', title: 'Retrospectivas efectivas', duration: '18:45', completed: false }
    ]
  },
  {
    id: '6',
    title: 'Fotografía Digital Profesional',
    description: 'Desde cero hasta fotógrafo profesional. Aprende composición, iluminación, edición y cómo monetizar tu pasión por la fotografía. Incluye proyectos prácticos y feedback personalizado.',
    shortDescription: 'Composición, iluminación, edición y técnicas profesionales de fotografía.',
    instructor: 'Roberto Vega',
    level: 'Principiante',
    duration: '8 semanas',
    rating: 4.8,
    students: 1456,
    image: 'https://images.unsplash.com/photo-1760351065294-b069f6bcadc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzdHVkeWluZyUyMGxhcHRvcCUyMGNvZmZlZXxlbnwxfHx8fDE3NzAwNTA2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Creatividad',
    requirements: [
      'Cámara digital o smartphone',
      'No se requiere experiencia previa',
      'Software de edición (Lightroom recomendado)'
    ],
    whatYouLearn: [
      'Fundamentos de composición fotográfica',
      'Manejo de luz natural y artificial',
      'Edición profesional en Lightroom',
      'Retrato y fotografía de producto',
      'Cómo vender tus servicios fotográficos'
    ],
    lessons: [
      { id: '6-1', title: 'Conceptos básicos de fotografía', duration: '19:00', completed: false },
      { id: '6-2', title: 'Triángulo de exposición', duration: '23:30', completed: false },
      { id: '6-3', title: 'Composición y encuadre', duration: '26:15', completed: false },
      { id: '6-4', title: 'Iluminación natural', duration: '28:00', completed: false },
      { id: '6-5', title: 'Introducción a Lightroom', duration: '32:45', completed: false }
    ]
  }
];

export const categories = [
  'Todos',
  'Programación',
  'Marketing',
  'Diseño',
  'Datos',
  'Negocios',
  'Creatividad'
];

export const levels = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
