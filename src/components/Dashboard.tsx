import type { LocalSession } from "../types";

type DashboardProps = {
  session: LocalSession;
  onReset: () => void;
};

function Dashboard({ session, onReset }: DashboardProps) {
  return (
    <div className="ritual-stack">
      <div>
        <p className="step-label">dashboard</p>
        <h2>Welcome, {session.identity.nickname}</h2>
        <p className="muted-copy">
          Your three answers are saved in this browser's local storage.
        </p>
      </div>

      <ol className="answer-summary">
        {session.answers.map((answer) => (
          <li key={answer.questionId}>
            <span>{answer.prompt}</span>
            <strong>{answer.value}</strong>
          </li>
        ))}
      </ol>

      <button className="secondary-button" onClick={onReset} type="button">
        Reset local session
      </button>
    </div>
  );
}

export default Dashboard;
