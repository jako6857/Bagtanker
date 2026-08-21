import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row md:justify-between gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-4">Bagtanker</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Øster Uttrupvej 1
            <br />
            9000 Aalborg
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mt-4">
            Tlf: 12345678
            <br />
            Email: info@bagtanker.dk
          </p>
        </div>

        <div className="md:w-96">
          <h3 className="text-xl font-bold mb-1">
            Tilmeld dig Bagtankers nyhedsbrev
          </h3>
          <p className="text-sm text-slate-300 mb-4">
            Få vores nyheder direkte i din indbakke
          </p>

          {submitted ? (
            <p className="text-sm text-amber-300">Tak for din tilmelding!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Indtast din email"
                className="flex-1 rounded px-3 py-2 text-sm text-neutral-800 bg-neutral-200 placeholder:text-neutral-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-slate-600 hover:bg-slate-500 text-white text-sm font-semibold uppercase px-4 py-2 rounded transition-colors"
              >
                Tilmeld
              </button>
            </form>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
