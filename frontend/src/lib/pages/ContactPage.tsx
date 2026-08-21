import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <PageHero backgroundImage="/bread-slidebg-02.jpg" minHeight="h-56">
        <div />
      </PageHero>

      <div className="px-10 py-3 text-sm text-neutral-500">
        Du er her:{" "}
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        / Kontakt
      </div>

      <div className="px-10 pb-16 pt-4">
        <h1 className="text-4xl font-bold mb-3">Kontakt os</h1>
        <p className="text-neutral-600 mb-10">
          Udfyld og send formularen og vi vil hurtigst muligt besvare dine
          spørgsmål.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {submitted ? (
            <p className="text-amber-600 font-semibold">
              Tak for din besked! Vi vender tilbage hurtigst muligt.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                required
                placeholder="Indtast dit navn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-neutral-100 rounded px-5 py-4 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="email"
                required
                placeholder="Indtast din email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-100 rounded px-5 py-4 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <textarea
                required
                placeholder="Skriv en besked"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                className="bg-neutral-100 rounded px-5 py-4 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
              <button
                type="submit"
                className="self-start bg-slate-600 hover:bg-slate-500 text-white font-semibold text-sm uppercase px-8 py-3 rounded transition-colors mt-2"
              >
                Send
              </button>
            </form>
          )}

          <div className="h-80 md:h-auto rounded-lg overflow-hidden">
            <iframe
              title="Bagtanker location"
              src="https://maps.google.com/maps?q=%C3%98ster%20Uttrupvej%201%2C%209000%20Aalborg&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
