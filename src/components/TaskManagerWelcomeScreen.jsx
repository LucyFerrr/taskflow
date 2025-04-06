import { useState } from "react";

function TaskManagerWelcomeScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1 && name) {
      setStep(2);
    } else if (step === 2 && email) {
      const userInfo = { name, email };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      onComplete(userInfo);
    }
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-card">
        <h1>Welcome to TaskFlow</h1>
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <h2>What may we call you?</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                autoFocus
              />
            </>
          ) : (
            <>
              <h2>Hello, {name}!</h2>
              <p>Please enter your email address:</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                autoFocus
              />
            </>
          )}
          <button type="submit">
            {step === 1 ? "Continue" : "Get Started"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskManagerWelcomeScreen;
