# Bitácora: Especificación Backend y Base de Datos

## López Academy / AprendePlus — Interfaz Frontend

Documento de especificaciones para implementar el backend y la base de datos que sustentan la interfaz actual.

---

## 1. Resumen de la interfaz

### 1.1 Páginas y flujos

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Login (email + password) | Público |
| `/admin` | Panel admin: lista de cursos | Admin |
| `/admin/curso/nuevo` | Crear curso | Admin |
| `/admin/curso/[id]/editar` | Editar curso | Admin |
| `/admin/curso/[id]/lecciones` | Lista de lecciones del curso | Admin |
| `/admin/curso/[id]/leccion/nueva` | Crear lección | Admin |
| `/admin/curso/[id]/leccion/[lessonId]/editar` | Editar lección (con bloques: video, formulario) | Admin |
| `/admin/curso/[id]/configuracion` | Parámetros y acceso de usuarios al curso | Admin |
| `/admin/usuarios` | Gestión de usuarios | Admin |
| `/configuracion` | Configuración global (placeholder) | Admin |
| `/cursos` | Catálogo de cursos (vista usuario) | Usuario |
| `/curso/[id]` | Detalle del curso | Usuario |
| `/curso/[id]/clase/[lessonId]` | Reproductor de lección | Usuario |

### 1.2 Roles

- **admin**: Acceso al panel, cursos, usuarios, configuración.
- **user**: Acceso al catálogo, detalle de curso y lecciones (según acceso asignado).

---

## 2. Esquema de base de datos

### 2.1 Diagrama entidad-relación (resumen)

```
users
  └── enrollments (user_id, course_id)
  └── user_progress (user_id, course_id, lesson_id, completed)
  └── course_access (user_id, course_id) — acceso específico

courses
  └── lessons
        └── lesson_content_blocks (video, formulario, etc.)
              └── questions (para formularios)
                    └── options (para selección múltiple)

course_config (course_id): orden lecciones, requerir anterior, etc.
course_user_access (course_id, user_id, access_type): todos | específicos
```

### 2.2 Tablas detalladas

#### `users`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID/string | PK |
| name | string | Nombre completo |
| email | string | Único |
| password_hash | string | Hash (bcrypt/argon2) |
| role | enum('admin','user') | Rol del usuario |
| enabled | boolean | Cuenta activa |
| created_at | timestamp | |
| updated_at | timestamp | |

#### `courses`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID/string | PK |
| title | string | |
| description | text | Descripción larga |
| short_description | string | Una o dos líneas |
| instructor | string | Nombre del instructor |
| level | enum('Principiante','Intermedio','Avanzado') | |
| duration | string | Ej: "12 semanas" |
| rating | decimal | 0–5 (opcional en UI actual) |
| students | int | Contador (opcional) |
| image | string | URL de imagen |
| category | string | Ej: Programación, Diseño |
| requirements | jsonb/text[] | Lista de requisitos |
| what_you_learn | jsonb/text[] | Objetivos de aprendizaje |
| created_at | timestamp | |
| updated_at | timestamp | |

#### `course_config`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| course_id | UUID | FK courses, PK |
| lesson_order | enum('sequential','free') | Secuencial o libre |
| require_previous | boolean | Completar lección anterior |
| access_type | enum('all','specific') | Todos los usuarios o específicos |

#### `course_user_access`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| course_id | UUID | FK courses |
| user_id | UUID | FK users |
| created_at | timestamp | |

#### `lessons`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID/string | PK |
| course_id | UUID | FK courses |
| title | string | |
| duration | string | Ej: "12:30" |
| sort_order | int | Orden en el curso |
| created_at | timestamp | |
| updated_at | timestamp | |

#### `lesson_content_blocks`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| lesson_id | UUID | FK lessons |
| type | enum('video','form') | Tipo de bloque |
| sort_order | int | Orden dentro de la lección |
| created_at | timestamp | |
| updated_at | timestamp | |

#### `lesson_block_video`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| block_id | UUID | FK lesson_content_blocks, PK |
| url | string | URL del video |
| title | string | Título opcional |
| text | text | Descripción o texto asociado |

#### `lesson_block_form`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| block_id | UUID | FK lesson_content_blocks, PK |
| title | string | Título del formulario (opcional) |

#### `form_questions`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| form_block_id | UUID | FK lesson_block_form |
| type | enum('truefalse','multiple') | Verdadero/Falso o selección múltiple |
| question_text | text | Enunciado |
| sort_order | int | Orden |

#### `form_question_options`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| question_id | UUID | FK form_questions |
| text | string | Texto de la opción |
| is_correct | boolean | Respuesta correcta |
| sort_order | int | |

*Para Verdadero/Falso:* dos opciones con `is_correct` en una de ellas.

#### `user_enrollments`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| user_id | UUID | FK users |
| course_id | UUID | FK courses |
| enrolled_at | timestamp | |

#### `user_lesson_progress`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| user_id | UUID | FK users |
| lesson_id | UUID | FK lessons |
| completed | boolean | |
| completed_at | timestamp | |

#### `user_quiz_scores`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| user_id | UUID | FK users |
| form_block_id | UUID | FK lesson_block_form |
| score | decimal | Puntuación |
| answered_at | timestamp | |

#### `certificates`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| user_id | UUID | FK users |
| course_id | UUID | FK courses |
| issued_at | timestamp | |

---

## 3. Endpoints API necesarios

### 3.1 Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Body: `{ email, password }` → `{ user, token }` |
| POST | `/api/auth/logout` | Invalidar sesión/token |
| GET | `/api/auth/me` | Usuario actual (validar token) |

### 3.2 Usuarios (admin)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/users` | Listar (con filtro/búsqueda) |
| POST | `/api/users` | Crear usuario |
| GET | `/api/users/:id` | Obtener uno |
| PUT | `/api/users/:id` | Actualizar |
| DELETE | `/api/users/:id` | Eliminar (o desactivar) |
| PUT | `/api/users/:id/password` | Cambiar contraseña |
| POST | `/api/users/:id/courses` | Asignar cursos a usuario |

### 3.3 Cursos (admin)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/admin/courses` | Listar cursos |
| POST | `/api/admin/courses` | Crear curso |
| GET | `/api/admin/courses/:id` | Obtener curso con lecciones |
| PUT | `/api/admin/courses/:id` | Actualizar curso |
| DELETE | `/api/admin/courses/:id` | Eliminar curso |
| PUT | `/api/admin/courses/:id/config` | Configuración (orden, require_previous, access_type) |
| GET | `/api/admin/courses/:id/access` | Usuarios con acceso |
| PUT | `/api/admin/courses/:id/access` | Actualizar acceso (lista user_ids o “todos”) |

### 3.4 Lecciones (admin)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/admin/courses/:courseId/lessons` | Listar lecciones |
| POST | `/api/admin/courses/:courseId/lessons` | Crear lección |
| GET | `/api/admin/courses/:courseId/lessons/:lessonId` | Obtener lección con bloques |
| PUT | `/api/admin/courses/:courseId/lessons/:lessonId` | Actualizar lección (título, duración, bloques) |
| DELETE | `/api/admin/courses/:courseId/lessons/:lessonId` | Eliminar lección |
| PUT | `/api/admin/courses/:courseId/lessons/reorder` | Reordenar lecciones |

### 3.5 Bloques de contenido (admin)

Los bloques se gestionan dentro del PUT de lección, con estructura JSON:

```json
{
  "title": "...",
  "duration": "12:30",
  "blocks": [
    {
      "type": "video",
      "url": "https://...",
      "title": "...",
      "text": "..."
    },
    {
      "type": "form",
      "title": "Quiz de repaso",
      "questions": [
        {
          "type": "truefalse",
          "text": "¿Pregunta?",
          "correctAnswer": true
        },
        {
          "type": "multiple",
          "text": "¿Pregunta?",
          "options": [
            { "text": "Opción A", "isCorrect": false },
            { "text": "Opción B", "isCorrect": true }
          ]
        }
      ]
    }
  ]
}
```

### 3.6 API pública / usuario

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/courses` | Listar cursos (filtros: category, level) |
| GET | `/api/courses/:id` | Detalle del curso (si tiene acceso) |
| GET | `/api/courses/:id/lessons/:lessonId` | Contenido de la lección (si tiene acceso) |
| POST | `/api/courses/:id/enroll` | Inscribirse (si aplica) |
| POST | `/api/progress/lesson` | Marcar lección completada |
| POST | `/api/progress/quiz` | Enviar respuestas de formulario y guardar puntuación |

---

## 4. Lógica de negocio

### 4.1 Acceso a cursos

1. Si `course_config.access_type = 'all'`: cualquier usuario autenticado tiene acceso.
2. Si `access_type = 'specific'`: solo usuarios en `course_user_access` para ese curso.
3. El admin siempre tiene acceso a todo para gestionar.

### 4.2 Orden de lecciones

- **sequential**: las lecciones se muestran y desbloquean en orden; debe completarse la anterior.
- **free**: el usuario puede acceder a cualquier lección sin orden.

### 4.3 Completar lecciones

- Al marcar una lección como completada se inserta/actualiza en `user_lesson_progress`.
- Si hay formulario/test, se guarda la puntuación en `user_quiz_scores`.
- Los certificados se generan cuando se cumplan las condiciones (ej. todas las lecciones completadas).

### 4.4 Contenido de lección (bloques)

- **Video**: URL, título, texto. El frontend renderiza el reproductor y el texto.
- **Formulario**: lista de preguntas con tipo `truefalse` o `multiple`; cada pregunta tiene opciones y `is_correct`.

---

## 5. Autenticación y sesión

- **JWT** o **sesiones con cookies** (httpOnly, secure en producción).
- El login valida email + password contra `users` (password hasheado).
- Rutas `/admin/*` y `/configuracion` requieren rol `admin`.
- Rutas `/cursos`, `/curso/*` requieren usuario autenticado (admin o user) y verificación de acceso al curso.

---

## 6. Archivos y media

- **Imágenes de curso**: actualmente se usa URL externa. Alternativa: upload a almacenamiento (S3, local) y guardar URL en BD.
- **Videos**: actualmente URL. Opcional: upload o integración con YouTube/Vimeo/Wistia.

---

## 7. Tecnologías sugeridas

| Componente | Sugerencia |
|------------|------------|
| API | Node.js (Express/Fastify), o Astro + server endpoints |
| BD | PostgreSQL (recomendado) o MySQL |
| ORM | Prisma, Drizzle o TypeORM |
| Auth | JWT + bcrypt/argon2 |
| Validación | Zod, Yup |

---

## 8. Índices recomendados (PostgreSQL)

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_lessons_course ON lessons(course_id);
CREATE INDEX idx_user_progress_user_lesson ON user_lesson_progress(user_id, lesson_id);
CREATE INDEX idx_course_access_course_user ON course_user_access(course_id, user_id);
```

---

## 9. Checklist de implementación

- [ ] Modelos y migraciones de BD
- [ ] Autenticación (login, logout, middleware)
- [ ] CRUD usuarios
- [ ] CRUD cursos
- [ ] CRUD lecciones y bloques de contenido
- [ ] Configuración de curso (parámetros, acceso)
- [ ] API pública (cursos, lecciones, progreso)
- [ ] Lógica de acceso por curso
- [ ] Marcar lecciones completadas
- [ ] Guardar puntuaciones de formularios
- [ ] Integración del frontend con la API (sustituir datos estáticos)

---

*Documento generado a partir del análisis de la interfaz López Academy / AprendePlus.*
