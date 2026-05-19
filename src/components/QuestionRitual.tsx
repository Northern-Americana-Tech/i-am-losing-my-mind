import { useMemo, useState } from "react";
import { QUESTION_BANK } from "../data/questions";
import type { AnswerKind, Question, RitualAnswer } from "../types";

const QUESTION_COUNT = 3;
const EXTENDED_ANSWER_MAX_LENGTH = 24;

const ANSWER_OPTIONS: Array<{ kind: AnswerKind; label: string }> = [
  { kind: "yes", label: "Yes" },
  { kind: "no", label: "No" },
  { kind: "unknown", label: "I don't know" },
  { kind: "extended", label: "Extended answer" },
];

type QuestionRitualProps = {
  onComplete: (answers: RitualAnswer[]) => void;
};

const pickQuestions = (questions: Question[]) => {
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, QUESTION_COUNT);
};

const getAnswerValue = (kind: AnswerKind, extendedAnswer: string) => {
  if (kind === "extended") {
    return extendedAnswer.trim();
  }

  return ANSWER_OPTIONS.find((option) => option.kind === kind)?.label ?? "";
};

function QuestionRitual({ onComplete }: QuestionRitualProps) {
  const selectedQuestions = useMemo(() => pickQuestions(QUESTION_BANK), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKind, setSelectedKind] = useState<AnswerKind | null>(null);
  const [extendedAnswer, setExtendedAnswer] = useState("");
  const [answers, setAnswers] = useState<RitualAnswer[]>([]);

  const currentQuestion = selectedQuestions[currentIndex];
  const isExtendedAnswer = selectedKind === "extended";
  const answerValue = selectedKind
    ? getAnswerValue(selectedKind, extendedAnswer)
    : "";
  const canContinue = !!selectedKind && (!isExtendedAnswer || answerValue.length > 0);

  const handleNext = () => {
    if (!selectedKind || !canContinue) {
      return;
    }

    const nextAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        prompt: currentQuestion.prompt,
        kind: selectedKind,
        value: answerValue,
      },
    ];

    if (nextAnswers.length === QUESTION_COUNT) {
      onComplete(nextAnswers);
      return;
    }

    setAnswers(nextAnswers);
    setCurrentIndex((index) => index + 1);
    setSelectedKind(null);
    setExtendedAnswer("");
  };

  return (
    <div className="ritual-stack">
      <div className="progress-row">
        <span>
          Question {currentIndex + 1} of {QUESTION_COUNT}
        </span>
        <span>{QUESTION_COUNT - currentIndex - 1} remaining</span>
      </div>

      <h2>{currentQuestion.prompt}</h2>

      <fieldset className="answer-list">
        <legend>Choose one answer</legend>
        {ANSWER_OPTIONS.map((option) => (
          <label className="answer-option" key={option.kind}>
            <input
              type="radio"
              name="ritual-answer"
              value={option.kind}
              checked={selectedKind === option.kind}
              onChange={() => setSelectedKind(option.kind)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      {isExtendedAnswer && (
        <label className="field-label">
          Short answer
          <input
            autoFocus
            maxLength={EXTENDED_ANSWER_MAX_LENGTH}
            onChange={(event) => setExtendedAnswer(event.target.value)}
            placeholder="24 characters max"
            value={extendedAnswer}
          />
          <span className="character-count">
            {extendedAnswer.length}/{EXTENDED_ANSWER_MAX_LENGTH}
          </span>
        </label>
      )}

      <button className="primary-button" disabled={!canContinue} onClick={handleNext}>
        {currentIndex + 1 === QUESTION_COUNT ? "Finish questions" : "Next question"}
      </button>
    </div>
  );
}

export default QuestionRitual;
