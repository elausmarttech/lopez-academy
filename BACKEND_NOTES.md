# Backend notes for López Academy frontend

Instructions you can share with your backend developer.

---

## Lesson sections (1.1, 1.2, 1.3 …)

A lesson can be **with sections** (e.g. "1. Welcome to …" with sub-parts 1.1, 1.2, 1.3, each with title, video, content) or **without sections** (only the lesson’s title, video, and content). The API always sends a **lesson_sections** array on lesson payloads.

### Learner API – include `lesson_sections`

- **GET /courses/:id** – Each `course_items` entry that is a lesson should include **lesson_sections**: array of `{ id, position, title, content, video }` (ordered by position).
- **GET /courses/:id/current_item** – If the current item is a lesson, **item** includes **lesson_sections** (same shape).
- **GET /courses/:course_id/lessons/:id** – Response includes **lesson_sections** (same shape).

**Section shape:** `{ id: number, position: number, title: string, content: string, video?: string }`

- If **lesson_sections** is empty or missing → frontend treats the lesson as a single block (lesson title + lesson video + lesson content only).
- If **lesson_sections** has items → frontend shows lesson title, then for each section (ordered by position) "1.1", "1.2", "1.3" with section title, video (iframe), content.

### Admin API – manage sections

- **GET /admin/courses/:course_id/lessons/:lesson_id/lesson_sections**  
  Returns array of sections: `{ id, lesson_id, position, title, content, video, created_at, updated_at }`.

- **POST /admin/courses/:course_id/lessons/:lesson_id/lesson_sections**  
  Body: `{ "lesson_section": { "position": 0, "title": "...", "content": "...", "video": "https://..." } }`  
  **video** is optional (backend can have a default).

- **PATCH /admin/courses/:course_id/lessons/:lesson_id/lesson_sections/:id**  
  Body: `{ "lesson_section": { "position"?, "title"?, "content"?, "video"? } }`.

- **DELETE /admin/courses/:course_id/lessons/:lesson_id/lesson_sections/:id**

Admin lesson responses (list, show, create, update) should also include **lesson_sections** for that lesson so the admin UI can show and edit sections without an extra request.
