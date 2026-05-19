import { useState } from "react";
import Dashboard from "./components/Dashboard";
import IdentityGate from "./components/IdentityGate";
import QuestionRitual from "./components/QuestionRitual";
import { clearLocalSession, loadLocalSession, saveLocalSession } from "./lib/storage";
import type { LocalIdentity, LocalSession, RitualAnswer } from "./types";

type AppStep = "questions" | "identity" | "dashboard";

const getInitialSession = () => loadLocalSession();

function App() {
  const [session, setSession] = useState<LocalSession | null>(getInitialSession);
  const [answers, setAnswers] = useState<RitualAnswer[]>([]);
  const [step, setStep] = useState<AppStep>(session ? "dashboard" : "questions");

  const handleQuestionsComplete = (completedAnswers: RitualAnswer[]) => {
    setAnswers(completedAnswers);
    setStep("identity");
  };

  const handleIdentityComplete = (identity: LocalIdentity) => {
    const nextSession: LocalSession = {
      identity,
      answers,
      createdAt: new Date().toISOString(),
    };

    saveLocalSession(nextSession);
    setSession(nextSession);
    setStep("dashboard");
  };

  const handleReset = () => {
    clearLocalSession();
    setSession(null);
    setAnswers([]);
    setStep("questions");
  };

  return (
    <main className="app-shell">
      <section className="terminal-panel" aria-label="Three Questions onboarding">
        <p className="eyebrow">local ritual / public build</p>
        <h1>I Am Losing My Mind</h1>

        {step === "questions" && (
          <QuestionRitual onComplete={handleQuestionsComplete} />
        )}

        {step === "identity" && (
          <IdentityGate onComplete={handleIdentityComplete} />
        )}

        {step === "dashboard" && session && (
          <Dashboard session={session} onReset={handleReset} />
        )}
      </section>
    </main>
  );
}

export default App;
