export type AnswerKind = "yes" | "no" | "unknown" | "extended";

export type Question = {
  id: string;
  prompt: string;
};

export type RitualAnswer = {
  questionId: string;
  prompt: string;
  kind: AnswerKind;
  value: string;
};

export type LocalIdentity = {
  nickname: string;
  passphraseHint?: string;
};

export type LocalSession = {
  identity: LocalIdentity;
  answers: RitualAnswer[];
  createdAt: string;
};
