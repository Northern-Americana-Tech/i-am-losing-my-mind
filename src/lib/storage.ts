import type { LocalSession } from "../types";

const SESSION_KEY = "three-questions-local-session";

const isLocalSession = (value: unknown): value is LocalSession => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as LocalSession;

  return (
    typeof session.createdAt === "string" &&
    !!session.identity &&
    typeof session.identity.nickname === "string" &&
    Array.isArray(session.answers) &&
    session.answers.length === 3
  );
};

export const loadLocalSession = (): LocalSession | null => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);

    if (!stored) {
      return null;
    }

    const parsed: unknown = JSON.parse(stored);
    return isLocalSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const saveLocalSession = (session: LocalSession) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const clearLocalSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
