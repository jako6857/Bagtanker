import { useState } from "react";

type FakeComment = {
  id: number;
  name: string;
  date: string;
  comment: string;
};

const fakeComments: FakeComment[] = [
  {
    id: 1,
    name: "Benny Bomstærk",
    date: "28. juni 2024 kl. 14:52",
    comment:
      "Fantastisk opskrift! Et hit til familiens morgenbord derhjemme og vi skal bestemt prøve igen.",
  },
  {
    id: 2,
    name: "Benny Bomstærk",
    date: "28. juni 2024 kl. 14:52",
    comment:
      "Virkelig lækkert bagværk. Det blev sprødt udenpå og dejligt blødt indeni. Hele familien var begejstret.",
  },
  {
    id: 3,
    name: "Benny Bomstærk",
    date: "28. juni 2024 kl. 14:52",
    comment:
      "Nem opskrift og et rigtig godt resultat. Jeg kommer helt sikkert til at bage dem igen.",
  },
];

function CommentAvatar() {
  return (
    <div className="w-20 h-20 shrink-0 rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 64 64"
        className="w-16 h-16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="32" cy="25" r="13" fill="white" />

        <path
          d="M19 25c0-11 6-18 14-18 9 0 15 7 15 18-3-4-6-6-10-7-4 5-10 7-19 7Z"
          fill="#111"
        />

        <path d="M11 59c2-13 10-20 21-20s19 7 21 20H11Z" fill="white" />

        <path d="M27 35h10v8H27z" fill="white" />
      </svg>
    </div>
  );
}

function ProductComments() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setComment("");
  };

  return (
    <section className="mt-14 border-t border-neutral-200 pt-10">
      <div className="max-w-5xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Kommentarer
        </h2>

        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex items-center gap-2 text-sm text-neutral-700 mb-3">
            <span className="text-lg">›</span>
            <span>Skriv kommentar</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Skriv en kommentar..."
              className="flex-1 border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-600"
            />

            <button
              type="submit"
              className="bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-700 transition"
            >
              Send kommentar
            </button>
          </div>
        </form>

        {/* kommentarer */}
        <div>
          {fakeComments.map((item) => (
            <article
              key={item.id}
              className="flex gap-5 py-5 border-b border-neutral-200"
            >
              <CommentAvatar />

              <div className="pt-1">
                <h3 className="font-bold text-base text-neutral-900">
                  {item.name}
                </h3>

                <p className="text-xs text-neutral-500 mt-1">{item.date}</p>

                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  {item.comment}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductComments;
