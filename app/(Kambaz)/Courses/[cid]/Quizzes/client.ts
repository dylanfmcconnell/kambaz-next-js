import api from "@/app/lib/api";

// ==================== TYPES ====================

export interface Choice {
  _id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string;
  title: string;
  questionText: string;
  questionType: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  points: number;
  choices?: Choice[];
  correctAnswer?: string;
  possibleAnswers?: string[];
}

export interface Quiz {
  _id: string;
  title: string;
  course: string;
  description?: string;
  quizType: "GRADED_QUIZ" | "PRACTICE_QUIZ" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
  assignmentGroup: "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";
  points: number;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  shuffleAnswers: boolean;
  showCorrectAnswers: string;
  oneQuestionAtATime: boolean;
  lockQuestionsAfterAnswering: boolean;
  accessCode: string;
  webcamRequired: boolean;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  published: boolean;
  questions: Question[];
  // Added by API for current user
  latestScore?: number | null;
  latestAttemptId?: string | null;
  attemptCount?: number;
}

export interface Answer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  pointsEarned: number;
}

export interface QuizAttempt {
  _id: string;
  quiz: string;
  user: string;
  attemptNumber: number;
  startTime: string;
  endTime?: string;
  score: number;
  totalPoints: number;
  answers: Answer[];
  submitted: boolean;
}

// ==================== QUIZ API ====================

export const fetchQuizzes = async (courseId: string): Promise<Quiz[]> => {
  const response = await api.get<Quiz[]>(`/api/courses/${courseId}/quizzes`);
  return response.data;
};

export const fetchQuiz = async (quizId: string): Promise<Quiz> => {
  const response = await api.get<Quiz>(`/api/quizzes/${quizId}`);
  return response.data;
};

export const createQuiz = async (
  courseId: string,
  quiz: Partial<Quiz>
): Promise<Quiz> => {
  const response = await api.post<Quiz>(`/api/courses/${courseId}/quizzes`, quiz);
  return response.data;
};

export const updateQuiz = async (
  quizId: string,
  updates: Partial<Quiz>
): Promise<void> => {
  await api.put(`/api/quizzes/${quizId}`, updates);
};

export const deleteQuiz = async (quizId: string): Promise<void> => {
  await api.delete(`/api/quizzes/${quizId}`);
};

export const publishQuiz = async (quizId: string): Promise<void> => {
  await api.put(`/api/quizzes/${quizId}/publish`);
};

export const unpublishQuiz = async (quizId: string): Promise<void> => {
  await api.put(`/api/quizzes/${quizId}/unpublish`);
};

// ==================== QUESTION API ====================

export const fetchQuestions = async (quizId: string): Promise<Question[]> => {
  const response = await api.get<Question[]>(`/api/quizzes/${quizId}/questions`);
  return response.data;
};

export const addQuestion = async (
  quizId: string,
  question: Partial<Question>
): Promise<Question> => {
  const response = await api.post<Question>(`/api/quizzes/${quizId}/questions`, question);
  return response.data;
};

export const updateQuestion = async (
  quizId: string,
  questionId: string,
  updates: Partial<Question>
): Promise<void> => {
  await api.put(`/api/quizzes/${quizId}/questions/${questionId}`, updates);
};

export const deleteQuestion = async (
  quizId: string,
  questionId: string
): Promise<void> => {
  await api.delete(`/api/quizzes/${quizId}/questions/${questionId}`);
};

// ==================== ATTEMPT API ====================

export const startAttempt = async (quizId: string): Promise<QuizAttempt> => {
  const response = await api.post<QuizAttempt>(`/api/quizzes/${quizId}/attempts`);
  return response.data;
};

export const fetchAttempt = async (attemptId: string): Promise<QuizAttempt> => {
  const response = await api.get<QuizAttempt>(`/api/attempts/${attemptId}`);
  return response.data;
};

export const fetchAttempts = async (quizId: string): Promise<QuizAttempt[]> => {
  const response = await api.get<QuizAttempt[]>(`/api/quizzes/${quizId}/attempts`);
  return response.data;
};

export const fetchLatestAttempt = async (quizId: string): Promise<QuizAttempt | null> => {
  const response = await api.get<QuizAttempt | null>(`/api/quizzes/${quizId}/attempts/latest`);
  return response.data;
};

export const saveAnswer = async (
  attemptId: string,
  questionId: string,
  answer: string
): Promise<{ isCorrect: boolean; pointsEarned: number }> => {
  const response = await api.put<{ isCorrect: boolean; pointsEarned: number }>(
    `/api/attempts/${attemptId}/answer`,
    { questionId, answer }
  );
  return response.data;
};

export const submitAttempt = async (attemptId: string): Promise<QuizAttempt> => {
  const response = await api.put<QuizAttempt>(`/api/attempts/${attemptId}/submit`);
  return response.data;
};
