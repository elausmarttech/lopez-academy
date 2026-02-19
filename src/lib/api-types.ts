/** API response/request types matching the Rails backend */

// --- Learner API ---

/**
 * Current user from GET /users/me (or GET /profile, GET /users/current).
 * Auth: Authorization: Bearer <token>.
 * Response may be wrapped as { user: CurrentUser } or direct. role: 0 = Learner, 1 = Admin.
 */
export interface CurrentUser {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string | number;
}

export interface CourseListItem {
  id: number;
  title: string;
  description: string;
  default?: boolean;
  progress?: { completed: number; total: number };
  header_image_url?: string | null;
}

export interface CourseItemRef {
  id: number;
  position: number;
  item_type: 'Lesson' | 'Quiz';
  item_id: number;
  title: string;
  completed: boolean;
  content?: string; // Lesson content (for lessons only, included in course show response)
  video?: string; // Lesson video URL (when item_type is Lesson)
  /** When item_type is Lesson: sub-parts 1.1, 1.2, … (from GET /courses/:id, current_item, or GET lessons/:id) */
  lesson_sections?: LessonSection[];
  /** When item_type is Lesson and has sections: lesson_section ids the current user has completed (from backend) */
  completed_section_ids?: number[];
}

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  default?: boolean;
  header_image_url?: string | null;
  course_items: CourseItemRef[];
  next_item: {
    id: number;
    item_type: 'Lesson' | 'Quiz';
    item_id: number;
    title: string;
  } | null;
}

/** Section within a lesson (1.1, 1.2, …). Used when lesson_sections.length > 0. */
export interface LessonSection {
  id: number;
  position: number;
  title: string;
  content: string;
  video?: string;
}

export interface LessonItem {
  id: number;
  title: string;
  content: string;
  video?: string; // Video URL (e.g. H5P embed)
  /** Sub-parts 1.1, 1.2, …; empty or missing = single block (lesson title, video, content only) */
  lesson_sections?: LessonSection[];
}

export interface QuizItemRef {
  id: number;
  title: string;
}

export interface CurrentItemLesson {
  id: number;
  course_id: number;
  position: number;
  item_type: 'Lesson';
  item_id: number;
  item: LessonItem;
}

export interface CurrentItemQuiz {
  id: number;
  course_id: number;
  position: number;
  item_type: 'Quiz';
  item_id: number;
  item: QuizItemRef;
}

export type CurrentItemPayload = CurrentItemLesson | CurrentItemQuiz;

export interface CurrentItemComplete {
  message: string;
  course_complete: true;
}

export interface QuizQuestion {
  id: number;
  position: number;
  body: string;
  question_type: 'multiple_choice' | 'true_false';
  options: Record<string, string>;
}

export interface QuizDetail {
  id: number;
  title: string;
  questions: QuizQuestion[];
  /** When quiz is completed, GET /quizzes/:id may include this for green/red review. */
  question_results?: QuizQuestionResult[];
}

export interface QuizSubmitPayload {
  answers: Record<string, string>;
}

/** Per-question result from POST /quizzes/:id/submit or GET /quizzes/:id (when completed). */
export interface QuizQuestionResult {
  question_id: number;
  correct: boolean;
  correct_answer: string;
  /** Set when from GET /quizzes/:id so frontend can show which option the user chose. */
  user_answer?: string;
}

export interface QuizSubmitResponse {
  score: number;
  passed: boolean;
  message: string;
  next_item: { id: number; item_type: string; item_id: number; title: string } | null;
  course_complete: boolean;
  /** When present, frontend can show correct/incorrect highlighting per question. */
  question_results?: QuizQuestionResult[];
}

export interface CompleteLessonResponse {
  message: string;
  next_item: CurrentItemPayload | null;
  course_complete: boolean;
}

/** Response from POST /courses/:course_id/complete_lesson_section */
export interface CompleteLessonSectionResponse {
  /** Next section in the same lesson, or null if lesson complete or no more sections */
  next_section: { id: number; position: number; title: string } | null;
  /** True when the lesson was just finished (all sections completed) */
  lesson_complete: boolean;
  /** Next course item when lesson_complete (or when no sections); null if course complete */
  next_item: { id: number; item_type: string; item_id: number; title: string } | null;
  course_complete: boolean;
}

// --- Admin API ---

/** Option from GET /admin/course-header-images for course card/header image selector. */
export interface CourseHeaderImageOption {
  id: number;
  google_drive_file_id?: string;
  label: string;
  url: string;
}

export interface AdminUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
  assigned_course_ids?: number[];
}

export interface AdminCourse {
  id: number;
  title: string;
  description: string;
  default?: boolean;
  created_at: string;
  updated_at: string;
  /** Number of lessons (when returned by list endpoint) */
  lessons_count?: number;
  /** Number of quizzes (when returned by list endpoint) */
  quizzes_count?: number;
  /** Number of students enrolled/assigned to this course (when returned by list endpoint) */
  students_count?: number;
  header_image_id?: number | null;
  header_image_url?: string | null;
}

export interface AdminCourseWithItems extends AdminCourse {
  course_items: AdminCourseItem[];
}

export interface AdminCourseItem {
  id: number;
  position: number;
  item_type: 'Lesson' | 'Quiz';
  item_id: number;
  item: { title: string; type: string };
}

/** Admin API: section of a lesson (1.1, 1.2, …) */
export interface AdminLessonSection {
  id: number;
  lesson_id: number;
  position: number;
  title: string;
  content: string;
  video?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AdminLesson {
  id: number;
  title: string;
  content: string;
  video_url?: string;
  position?: number;
  lesson_sections?: AdminLessonSection[];
}

export interface AdminQuiz {
  id: number;
  title: string;
}

export interface AdminQuestion {
  id: number;
  position: number;
  body: string;
  question_type: 'multiple_choice' | 'true_false';
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
  correct_answer: string;
}

// --- Error responses ---

export interface ApiErrorBody {
  error?: string;
  errors?: string[];
}
