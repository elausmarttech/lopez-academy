export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  enabled: boolean;
  enrolledCourses: string[];
  progress: { courseId: string; lessonsCompleted: string[]; quizScores: Record<string, number>; overallScore: number }[];
  certificates: unknown[];
}

export const users: User[] = [
  {
    id: 'admin-1',
    name: 'Administrador',
    email: 'admin@empresa.com',
    password: 'admin123', // En producción, esto debe estar hasheado
    role: 'admin',
    enabled: true,
    enrolledCourses: [],
    progress: [],
    certificates: []
  },
  {
    id: 'user-1',
    name: 'Juan Pérez',
    email: 'juan.perez@empresa.com',
    password: 'user123',
    role: 'user',
    enabled: true,
    enrolledCourses: ['1', '2'],
    progress: [
      {
        courseId: '1',
        lessonsCompleted: ['1-1', '1-2'],
        quizScores: {},
        overallScore: 0
      }
    ],
    certificates: []
  },
  {
    id: 'user-2',
    name: 'María García',
    email: 'maria.garcia@empresa.com',
    password: 'user123',
    role: 'user',
    enabled: true,
    enrolledCourses: ['3'],
    progress: [],
    certificates: []
  }
];
