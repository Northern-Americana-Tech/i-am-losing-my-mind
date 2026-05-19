import { useState } from "react";
import type { LocalIdentity } from "../types";

type IdentityGateProps = {
  onComplete: (identity: LocalIdentity) => void;
};

function IdentityGate({ onComplete }: IdentityGateProps) {
  const [nickname, setNickname] = useState("");
  const [passphraseHint, setPassphraseHint] = useState("");
  const trimmedNickname = nickname.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedNickname) {
      return;
    }

    onComplete({
      nickname: trimmedNickname,
      passphraseHint: passphraseHint.trim() || undefined,
    });
  };

  return (
    <form className="ritual-stack" onSubmit={handleSubmit}>
      <div>
        <p className="step-label">local identity</p>
        <h2>Name the local profile</h2>
        <p className="muted-copy">
          This is only a local placeholder for this device. It is not secure
          account authentication.
        </p>
      </div>

      <label className="field-label">
        Nickname
        <input
          autoFocus
          maxLength={32}
          onChange={(event) => setNickname(event.target.value)}
          placeholder="wanderer"
          required
          value={nickname}
        />
      </label>

      <label className="field-label">
        Optional passphrase placeholder
        <input
          maxLength={64}
          onChange={(event) => setPassphraseHint(event.target.value)}
          placeholder="not real authentication"
          type="password"
          value={passphraseHint}
        />
      </label>

      <button className="primary-button" disabled={!trimmedNickname} type="submit">
        Create local profile
      </button>
    </form>
  );
}

export default IdentityGate;
