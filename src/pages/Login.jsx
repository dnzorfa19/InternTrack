
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (
      email.trim().toLowerCase() === "demo@interntrack.com" &&
      password === "intern123"
    ) {
      onLogin();
      navigate("/", { replace: true });
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="login-page">
      <div className="login-decoration login-decoration-one" />
      <div className="login-decoration login-decoration-two" />

      <section className="login-card">
        <Link to="/login" className="login-brand">
          <span className="login-brand-icon">I</span>
          <span className="login-brand-name">
            Intern<span>Track</span>
          </span>
        </Link>

        <div className="login-welcome">
          <span className="login-eyebrow">YOUR CAREER WORKSPACE</span>
          <h1>Welcome back</h1>
          <p>Sign in to stay on top of your career journey.</p>
        </div>

        {error && (
          <div className="login-error" role="alert">
            <span aria-hidden="true">!</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <div className="login-label-row">
              <label htmlFor="password">Password</label>
              <span className="login-secure-label">
                Secure sign in
              </span>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="login-submit">
            <span>Sign in to InternTrack</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <div className="login-demo">
          <div className="login-demo-icon">✦</div>
          <div className="login-demo-content">
            <strong>Demo account</strong>
            <p>
              Email: <code>demo@interntrack.com</code>
            </p>
            <p>
              Password: <code>intern123</code>
            </p>
          </div>
        </div>

        <div className="login-bottom">
          <span>InternTrack</span>
          <span>One step closer to your next opportunity.</span>
        </div>
      </section>
    </main>
  );
}

export default Login;
