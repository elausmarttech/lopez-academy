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
}

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  default?: boolean;
  course_items: CourseItemRef[];
  next_item: {
    id: number;
    item_type: 'Lesson' | 'Quiz';
    item_id: number;
    title: string;
  } | null;
}

export interface LessonItem {
  id: number;
  title: string;
  content: string;
  video?: string; // Video URL (e.g. H5P embed)
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
}

export interface QuizSubmitPayload {
  answers: Record<string, string>;
}

export interface QuizSubmitResponse {
  score: number;
  passed: boolean;
  message: string;
  next_item: { id: number; item_type: string; item_id: number; title: string } | null;
  course_complete: boolean;
}

export interface CompleteLessonResponse {
  message: string;
  next_item: CurrentItemPayload | null;
  course_complete: boolean;
}

// --- Admin API ---

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

export interface AdminLesson {
  id: number;
  title: string;
  content: string;
  video_url?: string;
  position?: number;
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
