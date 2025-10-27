export type ActionType = {
  type: string;
  [key: string]: any;
};

export type UserType = {
  id: number;
  username: string;
  role: string;
};

export type CommentType = {
  id: number;
  content: string;
  user: UserType;
  [key: string]: any;
};

export type MarkType = {
  id: number;
  type: string;
  user: UserType;
  [key: string]: any;
};

export type UserProfileType = {
  id: number | null;
  username: string | null;
  role: string | null;
  statistic: {
    snippetsCount: number | null;
    rating: number | null;
    commentsCount: number | null;
    likesCount: number | null;
    dislikesCount: number | null;
    questionsCount: number | null;
    correctAnswersCount: number | null;
    regularAnswersCount: number | null;
  };
};

export type SnippetType = {
  code: string;
  comments: Comment[];
  marks: MarkType[];
  user: UserType;
  [key: string]: any; // любые дополнительные необязательные поля
};

export type AnswerType = {
  content: string;
  questionId: number;
};

export type QuestionType = {
  id: number;
  title: string;
  description: string;
  attachedCode: string;
  user: UserType;
  answers: AnswerType[];
  isResolved: boolean;
};
