export type ActionType = {
  type: string;
  payload?: any;//контролирую тип пейлоада в action.creator
};

export type UserType = {
  id: number;
  username: string;
  role: string;
};

export type CommentType = {
  id: number;
  content: string;
};

export type MarkType = {
  id: number;
  type: 'like' | 'dislike';
};

export type StatisticType = {
  snippetsCount: number | null;
  rating: number | null;
  commentsCount: number | null;
  likesCount: number | null;
  dislikesCount: number | null;
  questionsCount: number | null;
  correctAnswersCount: number | null;
  regularAnswersCount: number | null;
}

export type UserProfileType = {
  id: number | null;
  username: string | null;
  role: string | null;
  statistic: StatisticType;
};


export type SnippetType = {
  id:number;
  language:string;
  code: string;
  comments: Comment[];
  marks: MarkType[];
  user: UserType;
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
