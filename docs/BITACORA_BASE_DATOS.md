# Bitácora de Base de Datos — López Academy

Especificación detallada del esquema de base de datos para la plataforma.

---

## 1. Diagrama de relaciones

```
┌─────────────┐       ┌──────────────────────┐       ┌─────────────┐
│   users     │──────<│  course_user_access  │>──────│   courses   │
└─────────────┘       └──────────────────────┘       └─────────────┘
       │                            │                        │
       │                            │                        │
       │              ┌─────────────┴─────────────┐          │
       │              │     course_config         │          │
       │              └───────────────────────────┘          │
       │                                                      │
       │              ┌──────────────────────┐                │
       └─────────────>│  user_enrollments    │<───────────────┘
                      └──────────────────────┘
       │
       │              ┌──────────────────────┐
       └─────────────>│ user_lesson_progress │<───────────┐
                      └──────────────────────┘            │
       │                                                    │
       │              ┌──────────────────────┐       ┌─────┴─────┐
       └─────────────>│   user_quiz_scores   │       │  lessons  │
                      └──────────────────────┘       └───────────┘
       │                                                    │
       │              ┌──────────────────────┐              │
       └─────────────>│    certificates      │              │
                      └──────────────────────┘              │
                                                            │
                      ┌──────────────────────┐       ┌──────┴──────┐
                      │lesson_content_blocks │<──────┘             │
                      └──────────┬───────────┘                     │
                                 │                                 │
                    ┌────────────┴────────────┐                    │
                    │                         │                    │
             ┌──────┴──────┐           ┌──────┴──────┐            │
             │lesson_block │           │lesson_block │            │
             │   _video    │           │   _form     │            │
             └─────────────┘           └──────┬──────┘            │
                                              │                    │
                                      ┌───────┴───────┐           │
                                      │form_questions │           │
                                      └───────┬───────┘           │
                                              │                    │
                                      ┌───────┴────────┐          │
                                      │form_question_  │          │
                                      │    options     │          │
                                      └────────────────┘          │
```

---

## 2. Definición de tablas

### 2.1 users

| Columna       | Tipo        | Nulo | Default | Descripción                |
|---------------|-------------|------|---------|----------------------------|
| id            | UUID        | No   | gen_random_uuid() | PK                      |
| name          | VARCHAR(255)| No   |         | Nombre completo            |
| email         | VARCHAR(255)| No   |         | Único, índice              |
| password_hash | VARCHAR(255)| No   |         | Hash bcrypt/argon2         |
| role          | VARCHAR(20) | No   | 'user'  | 'admin' \| 'user'          |
| enabled       | BOOLEAN     | No   | true    | Cuenta activa              |
| created_at    | TIMESTAMPTZ | No   | now()   |                            |
| updated_at    | TIMESTAMPTZ | No   | now()   |                            |

**Índices:** `UNIQUE(email)`, `INDEX(role)`, `INDEX(enabled)`

---

### 2.2 courses

| Columna          | Tipo         | Nulo | Default | Descripción              |
|------------------|--------------|------|---------|--------------------------|
| id               | UUID         | No   | gen_random_uuid() | PK                  |
| title            | VARCHAR(255) | No   |         | Título                   |
| description      | TEXT         | No   |         | Descripción larga        |
| short_description| VARCHAR(500) | Sí   |         | Una o dos líneas         |
| instructor       | VARCHAR(255) | No   |         | Nombre                   |
| level            | VARCHAR(50)  | No   |         | Principiante \| Intermedio \| Avanzado |
| duration         | VARCHAR(50)  | No   |         | Ej: "12 semanas"         |
| rating           | DECIMAL(3,2) | Sí   |         | 0–5                      |
| students         | INTEGER      | Sí   | 0       | Contador                 |
| image            | VARCHAR(500) | Sí   |         | URL imagen               |
| category         | VARCHAR(100) | No   |         | Ej: Programación         |
| requirements     | JSONB        | Sí   | '[]'    | Array de strings         |
| what_you_learn   | JSONB        | Sí   | '[]'    | Array de strings         |
| created_at       | TIMESTAMPTZ  | No   | now()   |                          |
| updated_at       | TIMESTAMPTZ  | No   | now()   |                          |

**Índices:** `INDEX(category)`, `INDEX(level)`

---

### 2.3 course_config

| Columna         | Tipo        | Nulo | Default | Descripción                    |
|-----------------|-------------|------|---------|--------------------------------|
| course_id       | UUID        | No   |         | PK, FK courses(id) ON DELETE CASCADE |
| lesson_order    | VARCHAR(20) | No   | 'sequential' | 'sequential' \| 'free'   |
| require_previous| BOOLEAN     | No   | true    | Obligar completar anterior     |
| access_type     | VARCHAR(20) | No   | 'specific' | 'all' \| 'specific'        |
| created_at      | TIMESTAMPTZ | No   | now()   |                                |
| updated_at      | TIMESTAMPTZ | No   | now()   |                                |

---

### 2.4 course_user_access

| Columna   | Tipo        | Nulo | Default | Descripción                         |
|-----------|-------------|------|---------|-------------------------------------|
| id        | UUID        | No   | gen_random_uuid() | PK                         |
| course_id | UUID        | No   |         | FK courses(id) ON DELETE CASCADE    |
| user_id   | UUID        | No   |         | FK users(id) ON DELETE CASCADE      |
| created_at| TIMESTAMPTZ | No   | now()   |                                     |

**Índices:** `UNIQUE(course_id, user_id)`, `INDEX(course_id)`, `INDEX(user_id)`

---

### 2.5 lessons

| Columna   | Tipo        | Nulo | Default | Descripción                    |
|-----------|-------------|------|---------|--------------------------------|
| id        | UUID        | No   | gen_random_uuid() | PK                     |
| course_id | UUID        | No   |         | FK courses(id) ON DELETE CASCADE |
| title     | VARCHAR(255)| No   |         |                                |
| duration  | VARCHAR(20) | No   |         | Ej: "12:30"                    |
| sort_order| INTEGER     | No   | 0       | Orden en el curso              |
| created_at| TIMESTAMPTZ | No   | now()   |                                |
| updated_at| TIMESTAMPTZ | No   | now()   |                                |

**Índices:** `INDEX(course_id)`, `INDEX(course_id, sort_order)`

---

### 2.6 lesson_content_blocks

| Columna    | Tipo        | Nulo | Default | Descripción                    |
|------------|-------------|------|---------|--------------------------------|
| id         | UUID        | No   | gen_random_uuid() | PK                     |
| lesson_id  | UUID        | No   |         | FK lessons(id) ON DELETE CASCADE |
| type       | VARCHAR(20) | No   |         | 'video' \| 'form'              |
| sort_order | INTEGER     | No   | 0       | Orden en la lección            |
| created_at | TIMESTAMPTZ | No   | now()   |                                |
| updated_at | TIMESTAMPTZ | No   | now()   |                                |

**Índices:** `INDEX(lesson_id)`, `INDEX(lesson_id, sort_order)`

---

### 2.7 lesson_block_video

| Columna   | Tipo         | Nulo | Default | Descripción                    |
|-----------|--------------|------|---------|--------------------------------|
| block_id  | UUID         | No   |         | PK, FK lesson_content_blocks(id) ON DELETE CASCADE |
| url       | VARCHAR(500) | No   |         | URL del video                  |
| title     | VARCHAR(255) | Sí   |         | Título opcional                |
| text      | TEXT         | Sí   |         | Descripción / texto asociado   |

---

### 2.8 lesson_block_form

| Columna   | Tipo         | Nulo | Default | Descripción                    |
|-----------|--------------|------|---------|--------------------------------|
| block_id  | UUID         | No   |         | PK, FK lesson_content_blocks(id) ON DELETE CASCADE |
| title     | VARCHAR(255) | Sí   |         | Título del formulario          |

---

### 2.9 form_questions

| Columna      | Tipo         | Nulo | Default | Descripción                    |
|--------------|--------------|------|---------|--------------------------------|
| id           | UUID         | No   | gen_random_uuid() | PK                     |
| form_block_id| UUID         | No   |         | FK lesson_block_form(block_id) ON DELETE CASCADE |
| type         | VARCHAR(20)  | No   |         | 'truefalse' \| 'multiple'      |
| question_text| TEXT         | No   |         | Enunciado                      |
| sort_order   | INTEGER      | No   | 0       | Orden                          |
| created_at   | TIMESTAMPTZ  | No   | now()   |                                |

**Índices:** `INDEX(form_block_id)`

---

### 2.10 form_question_options

| Columna   | Tipo         | Nulo | Default | Descripción                    |
|-----------|--------------|------|---------|--------------------------------|
| id        | UUID         | No   | gen_random_uuid() | PK                     |
| question_id| UUID        | No   |         | FK form_questions(id) ON DELETE CASCADE |
| text      | VARCHAR(500) | No   |         | Texto de la opción             |
| is_correct| BOOLEAN      | No   | false   | Respuesta correcta             |
| sort_order| INTEGER      | No   | 0       | Orden                          |

**Índices:** `INDEX(question_id)`

---

### 2.11 user_enrollments

| Columna    | Tipo        | Nulo | Default | Descripción                    |
|------------|-------------|------|---------|--------------------------------|
| id         | UUID        | No   | gen_random_uuid() | PK                     |
| user_id    | UUID        | No   |         | FK users(id) ON DELETE CASCADE |
| course_id  | UUID        | No   |         | FK courses(id) ON DELETE CASCADE |
| enrolled_at| TIMESTAMPTZ | No   | now()   |                                |

**Índices:** `UNIQUE(user_id, course_id)`, `INDEX(user_id)`, `INDEX(course_id)`

---

### 2.12 user_lesson_progress

| Columna     | Tipo        | Nulo | Default | Descripción                    |
|-------------|-------------|------|---------|--------------------------------|
| id          | UUID        | No   | gen_random_uuid() | PK                     |
| user_id     | UUID        | No   |         | FK users(id) ON DELETE CASCADE |
| lesson_id   | UUID        | No   |         | FK lessons(id) ON DELETE CASCADE |
| completed   | BOOLEAN     | No   | false   |                                |
| completed_at| TIMESTAMPTZ | Sí   |         |                                |

**Índices:** `UNIQUE(user_id, lesson_id)`, `INDEX(user_id)`, `INDEX(lesson_id)`

---

### 2.13 user_quiz_scores

| Columna      | Tipo        | Nulo | Default | Descripción                    |
|--------------|-------------|------|---------|--------------------------------|
| id           | UUID        | No   | gen_random_uuid() | PK                     |
| user_id      | UUID        | No   |         | FK users(id) ON DELETE CASCADE |
| form_block_id| UUID        | No   |         | FK lesson_block_form(block_id) ON DELETE CASCADE |
| score        | DECIMAL(5,2)| No   |         | Puntuación                    |
| answered_at  | TIMESTAMPTZ | No   | now()   |                                |

**Índices:** `INDEX(user_id)`, `UNIQUE(user_id, form_block_id)` (si solo se guarda un intento)

---

### 2.14 certificates

| Columna   | Tipo        | Nulo | Default | Descripción                    |
|-----------|-------------|------|---------|--------------------------------|
| id        | UUID        | No   | gen_random_uuid() | PK                     |
| user_id   | UUID        | No   |         | FK users(id) ON DELETE CASCADE |
| course_id | UUID        | No   |         | FK courses(id) ON DELETE CASCADE |
| issued_at | TIMESTAMPTZ | No   | now()   |                                |

**Índices:** `UNIQUE(user_id, course_id)`, `INDEX(user_id)`, `INDEX(course_id)`

---

## 3. Script SQL (PostgreSQL)

```sql
-- Extensión UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin','user')),
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(500),
  instructor VARCHAR(255) NOT NULL,
  level VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  rating DECIMAL(3,2),
  students INTEGER DEFAULT 0,
  image VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  requirements JSONB DEFAULT '[]',
  what_you_learn JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- course_config
CREATE TABLE course_config (
  course_id UUID PRIMARY KEY REFERENCES courses(id) ON DELETE CASCADE,
  lesson_order VARCHAR(20) NOT NULL DEFAULT 'sequential',
  require_previous BOOLEAN NOT NULL DEFAULT true,
  access_type VARCHAR(20) NOT NULL DEFAULT 'specific',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- course_user_access
CREATE TABLE course_user_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(course_id, user_id)
);
CREATE INDEX idx_cua_course ON course_user_access(course_id);
CREATE INDEX idx_cua_user ON course_user_access(user_id);

-- lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  duration VARCHAR(20) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_lessons_course ON lessons(course_id);

-- lesson_content_blocks
CREATE TABLE lesson_content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('video','form')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_lcb_lesson ON lesson_content_blocks(lesson_id);

-- lesson_block_video
CREATE TABLE lesson_block_video (
  block_id UUID PRIMARY KEY REFERENCES lesson_content_blocks(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  title VARCHAR(255),
  text TEXT
);

-- lesson_block_form
CREATE TABLE lesson_block_form (
  block_id UUID PRIMARY KEY REFERENCES lesson_content_blocks(id) ON DELETE CASCADE,
  title VARCHAR(255)
);

-- form_questions
CREATE TABLE form_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_block_id UUID NOT NULL REFERENCES lesson_block_form(block_id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('truefalse','multiple')),
  question_text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_fq_form ON form_questions(form_block_id);

-- form_question_options
CREATE TABLE form_question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES form_questions(id) ON DELETE CASCADE,
  text VARCHAR(500) NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_fqo_question ON form_question_options(question_id);

-- user_enrollments
CREATE TABLE user_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);
CREATE INDEX idx_ue_user ON user_enrollments(user_id);
CREATE INDEX idx_ue_course ON user_enrollments(course_id);

-- user_lesson_progress
CREATE TABLE user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);
CREATE INDEX idx_ulp_user ON user_lesson_progress(user_id);
CREATE INDEX idx_ulp_lesson ON user_lesson_progress(lesson_id);

-- user_quiz_scores
CREATE TABLE user_quiz_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  form_block_id UUID NOT NULL REFERENCES lesson_block_form(block_id) ON DELETE CASCADE,
  score DECIMAL(5,2) NOT NULL,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_uqs_user ON user_quiz_scores(user_id);
CREATE INDEX idx_uqs_form ON user_quiz_scores(form_block_id);

-- certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);
CREATE INDEX idx_cert_user ON certificates(user_id);
CREATE INDEX idx_cert_course ON certificates(course_id);
```

---

## 4. Resumen de tablas

| Tabla                  | Propósito                                      |
|------------------------|------------------------------------------------|
| users                  | Usuarios y autenticación                       |
| courses                | Catálogo de cursos                             |
| course_config          | Parámetros por curso                           |
| course_user_access     | Acceso específico por usuario                  |
| lessons                | Lecciones de cada curso                        |
| lesson_content_blocks  | Bloques de contenido (video/form)              |
| lesson_block_video     | Datos de bloques tipo video                    |
| lesson_block_form      | Datos de bloques tipo formulario               |
| form_questions         | Preguntas de formularios                       |
| form_question_options  | Opciones de cada pregunta                      |
| user_enrollments       | Inscripciones a cursos                         |
| user_lesson_progress   | Progreso por lección                           |
| user_quiz_scores       | Puntuaciones de quizzes                        |
| certificates           | Certificados emitidos                          |
