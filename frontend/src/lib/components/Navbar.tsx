import { useState } from "react";
import { Link } from "react-router-dom";
import { getStoredTokens } from "../auth";

const BASE_LINKS = [
  { label: "Forside", to: "/" },
  { label: "Produkter", to: "/products" },
  { label: "Nyheder", to: "/news" },
  { label: "Kontakt", to: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = !!getStoredTokens().accessToken;
  const authLink = isLoggedIn
    ? { label: "Min side", to: "/min-side" }
    : { label: "Login", to: "/login" };

  const navLinks = [...BASE_LINKS, authLink];

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6">
        <Link to="/">
          <img
            src="/Logo-1.png"
            alt="Bagtanker"
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="text-white"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          <nav className="relative w-72 bg-neutral-900/95 h-full flex flex-col px-8 py-6">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="self-end text-white mb-10"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>

            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-lg hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
