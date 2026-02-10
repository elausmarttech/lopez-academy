export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
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
  /** Additional text or content below the video (optional) */
  content?: string;
  /** AI Studios embed ID - optional */
  videoEmbedId?: string;
  /** Si true, usa embed simple (player, sin recorte). Si false/undefined, usa share con recorte */
  videoEmbedSimple?: boolean;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    description: 'Learn to build complete web applications from scratch. This course will take you from the fundamentals of HTML, CSS and JavaScript to modern frameworks like React and Node.js. You will build real projects to add to your professional portfolio.',
    shortDescription: 'Build modern web applications with React, Node.js and databases.',
    instructor: 'María González',
    level: 'Intermediate',
    duration: '12 weeks',
    rating: 4.8,
    students: 2543,
    image: 'https://images.unsplash.com/photo-1763568258129-3e019ef91b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHByb2dyYW1taW5nJTIwbGFwdG9wfGVufDF8fHx8MTc3MDA1MDY2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Programming',
    requirements: [
      'Basic knowledge of HTML and CSS',
      'Familiarity with JavaScript is recommended',
      'Computer with at least 8GB RAM',
      'Stable internet connection'
    ],
    whatYouLearn: [
      'Build modern interfaces with React',
      'Develop RESTful APIs with Node.js',
      'Manage SQL and NoSQL databases',
      'Implement authentication and authorization',
      'Deploy applications to production'
    ],
    lessons: [
      { id: '1-1', title: 'Introduction to modern web development', duration: '12:30', completed: false, videoEmbedId: '698b3f80bbe9649f06601db0', content: 'In this lesson we will explore the fundamentals of modern web development. We will see how technologies have evolved and what tools professionals use today.\n\n**Lesson objectives:**\n- Understand the structure of a web application\n- Get to know the current technology ecosystem\n- Set up the environment for the following lessons' },
      { id: '1-2', title: 'Development environment setup', duration: '18:45', completed: false, videoEmbedId: '698b3f80bbe9649f06601db0', videoEmbedSimple: true },
      { id: '1-3', title: 'React fundamentals', duration: '25:15', completed: false },
      { id: '1-4', title: 'Components and Props', duration: '22:00', completed: false },
      { id: '1-5', title: 'State and lifecycle', duration: '28:30', completed: false },
      { id: '1-6', title: 'React Hooks', duration: '32:10', completed: false },
      { id: '1-7', title: 'Routing with React Router', duration: '20:45', completed: false },
      { id: '1-8', title: 'Node.js and Express basics', duration: '30:20', completed: false },
      { id: '1-9', title: 'RESTful APIs', duration: '35:15', completed: false },
      { id: '1-10', title: 'Databases and MongoDB', duration: '40:00', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Strategic Digital Marketing',
    description: 'Master the digital marketing strategies used by leading companies. Learn to create effective campaigns on social media, SEO, SEM, email marketing and metrics analysis to maximize the ROI of your advertising investments.',
    shortDescription: 'Digital marketing strategies, SEO, social media and data analysis.',
    instructor: 'Carlos Rodríguez',
    level: 'Beginner',
    duration: '8 weeks',
    rating: 4.6,
    students: 1829,
    image: 'https://images.unsplash.com/photo-1682336869523-2c6859f781cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MDAyMzI0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Marketing',
    requirements: [
      'No prior experience required',
      'Account on major social networks',
      'Willingness to learn and experiment'
    ],
    whatYouLearn: [
      'Create digital marketing strategies',
      'Optimize online advertising campaigns',
      'Metrics and KPI analysis',
      'SEO and search engine positioning',
      'Effective content marketing'
    ],
    lessons: [
      { id: '2-1', title: 'Introduction to digital marketing', duration: '15:00', completed: false },
      { id: '2-2', title: 'SEO fundamentals', duration: '22:30', completed: false },
      { id: '2-3', title: 'Social media marketing', duration: '28:15', completed: false },
      { id: '2-4', title: 'Google Ads advertising', duration: '30:45', completed: false },
      { id: '2-5', title: 'Effective email marketing', duration: '20:00', completed: false },
      { id: '2-6', title: 'Metrics analysis', duration: '25:30', completed: false }
    ]
  },
  {
    id: '3',
    title: 'UX/UI Design with Figma',
    description: 'Learn to design exceptional user experiences using Figma. From user research to creating interactive prototypes, this course covers the entire professional UX/UI design process.',
    shortDescription: 'Interface and user experience design with professional Figma.',
    instructor: 'Ana Martínez',
    level: 'Intermediate',
    duration: '10 weeks',
    rating: 4.9,
    students: 3201,
    image: 'https://images.unsplash.com/photo-1632937145991-91620be68319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwd29ya3NwYWNlJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzcwMDAzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Design',
    requirements: [
      'Basic design knowledge',
      'Free Figma account',
      'Aesthetic sensibility'
    ],
    whatYouLearn: [
      'Fundamental UX/UI principles',
      'User research',
      'Wireframing and prototyping',
      'Scalable design systems',
      'Collaboration with development teams'
    ],
    lessons: [
      { id: '3-1', title: 'Introduction to UX/UI', duration: '18:00', completed: false },
      { id: '3-2', title: 'User research', duration: '25:30', completed: false },
      { id: '3-3', title: 'Basic wireframing', duration: '22:45', completed: false },
      { id: '3-4', title: 'Interface design in Figma', duration: '35:20', completed: false },
      { id: '3-5', title: 'Design systems', duration: '30:15', completed: false },
      { id: '3-6', title: 'Interactive prototyping', duration: '28:00', completed: false },
      { id: '3-7', title: 'Usability testing', duration: '24:30', completed: false }
    ]
  },
  {
    id: '4',
    title: 'Data Analysis with Python',
    description: 'Become a professional data analyst. Learn to extract, clean, analyze and visualize data using Python, Pandas, NumPy and visualization tools to make data-driven decisions.',
    shortDescription: 'Python, Pandas and data visualization for professional analysis.',
    instructor: 'Luis Fernández',
    level: 'Intermediate',
    duration: '14 weeks',
    rating: 4.7,
    students: 1654,
    image: 'https://images.unsplash.com/photo-1758519289074-9de36003622b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnRzJTIwbGFwdG9wfGVufDF8fHx8MTc3MDA1MDY2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Data',
    requirements: [
      'Basic Python knowledge',
      'High school level math',
      'Computer with Python installed'
    ],
    whatYouLearn: [
      'Data manipulation with Pandas',
      'Basic statistical analysis',
      'Data visualization',
      'Basic Machine Learning',
      'Real-world analysis projects'
    ],
    lessons: [
      { id: '4-1', title: 'Introduction to Python for data', duration: '20:00', completed: false },
      { id: '4-2', title: 'NumPy and arrays', duration: '25:15', completed: false },
      { id: '4-3', title: 'Pandas basics', duration: '30:30', completed: false },
      { id: '4-4', title: 'Data cleaning', duration: '28:45', completed: false },
      { id: '4-5', title: 'Visualization with Matplotlib', duration: '32:00', completed: false },
      { id: '4-6', title: 'Exploratory analysis', duration: '35:20', completed: false }
    ]
  },
  {
    id: '5',
    title: 'Agile Project Management',
    description: 'Learn agile methodologies like Scrum and Kanban to manage projects effectively. Ideal for project managers, team leads and anyone who wants to improve their team\'s productivity.',
    shortDescription: 'Agile methodologies, Scrum, Kanban and team leadership.',
    instructor: 'Patricia Silva',
    level: 'Beginner',
    duration: '6 weeks',
    rating: 4.5,
    students: 2103,
    image: 'https://images.unsplash.com/photo-1630487656049-6db93a53a7e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDF8fHx8MTc3MDAwNzUzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Business',
    requirements: [
      'Basic work experience',
      'Willingness to lead teams',
      'No prior management experience required'
    ],
    whatYouLearn: [
      'Agile methodology fundamentals',
      'Complete Scrum framework',
      'Remote team management',
      'Digital management tools',
      'Conflict resolution'
    ],
    lessons: [
      { id: '5-1', title: 'Introduction to Agile', duration: '16:00', completed: false },
      { id: '5-2', title: 'Scrum framework', duration: '24:30', completed: false },
      { id: '5-3', title: 'Roles in Scrum', duration: '20:15', completed: false },
      { id: '5-4', title: 'Kanban and boards', duration: '22:00', completed: false },
      { id: '5-5', title: 'Effective retrospectives', duration: '18:45', completed: false }
    ]
  },
  {
    id: '6',
    title: 'Professional Digital Photography',
    description: 'From zero to professional photographer. Learn composition, lighting, editing and how to monetize your passion for photography. Includes practical projects and personalized feedback.',
    shortDescription: 'Composition, lighting, editing and professional photography techniques.',
    instructor: 'Roberto Vega',
    level: 'Beginner',
    duration: '8 weeks',
    rating: 4.8,
    students: 1456,
    image: 'https://images.unsplash.com/photo-1760351065294-b069f6bcadc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzdHVkeWluZyUyMGxhcHRvcCUyMGNvZmZlZXxlbnwxfHx8fDE3NzAwNTA2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Creativity',
    requirements: [
      'Digital camera or smartphone',
      'No prior experience required',
      'Editing software (Lightroom recommended)'
    ],
    whatYouLearn: [
      'Fundamentals of photographic composition',
      'Natural and artificial light handling',
      'Professional editing in Lightroom',
      'Portrait and product photography',
      'How to sell your photography services'
    ],
    lessons: [
      { id: '6-1', title: 'Photography basics', duration: '19:00', completed: false },
      { id: '6-2', title: 'Exposure triangle', duration: '23:30', completed: false },
      { id: '6-3', title: 'Composition and framing', duration: '26:15', completed: false },
      { id: '6-4', title: 'Natural lighting', duration: '28:00', completed: false },
      { id: '6-5', title: 'Introduction to Lightroom', duration: '32:45', completed: false }
    ]
  }
];

export const categories = [
  'All',
  'Programming',
  'Marketing',
  'Design',
  'Data',
  'Business',
  'Creativity'
];

export const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
