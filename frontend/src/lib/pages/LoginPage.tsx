import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { login } from "../auth";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Forkert email eller adgangskode.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero backgroundImage="/bread-slidebg-01.jpg" minHeight="h-56">
        <div />
      </PageHero>

      <div className="px-10 py-3 text-sm text-neutral-500">
        Du er her:{" "}
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        / Login
      </div>

      <div className="px-10 pb-16 pt-4 max-w-md">
        <h1 className="text-4xl font-bold mb-2">Login</h1>
        <p className="text-neutral-600 mb-6">
          Indtast og send username og password for at logge ind.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            required
            placeholder="Indtast dit brugernavn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-neutral-100 rounded px-5 py-4 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="password"
            required
            placeholder="Indtast dit password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-neutral-100 rounded px-5 py-4 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="self-start bg-slate-600 hover:bg-slate-500 disabled:opacity-50 text-white font-semibold text-sm uppercase px-8 py-3 rounded transition-colors"
          >
            {submitting ? "Logger ind..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
