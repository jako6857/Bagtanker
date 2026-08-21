import { useNavigate, Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { logout } from "../auth";

const FAKE_COMMENTS = [
  { id: 1, title: "Fantastisk oplevelse!", date: "8. august 2024" },
  { id: 2, title: "Fantastisk oplevelse!", date: "8. august 2024" },
  { id: 3, title: "Fantastisk oplevelse!", date: "8. august 2024" },
  { id: 4, title: "Fantastisk oplevelse!", date: "8. august 2024" },
];

function MinSidePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
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
        / Min side
      </div>

      <div className="px-10 pb-16 pt-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Min side</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-neutral-500 hover:text-neutral-800 underline"
          >
            Log ud
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Mine kommentarer</h2>

        <table className="w-full max-w-3xl text-sm">
          <thead>
            <tr className="border-b-2 border-neutral-800 text-left">
              <th className="pb-2 font-bold">Titel</th>
              <th className="pb-2 font-bold">Dato</th>
              <th className="pb-2 font-bold">Handling</th>
            </tr>
          </thead>
          <tbody>
            {FAKE_COMMENTS.map((c) => (
              <tr key={c.id} className="border-b border-neutral-200">
                <td className="py-3">{c.title}</td>
                <td className="py-3">{c.date}</td>
                <td className="py-3">
                  <button
                    type="button"
                    className="text-green-600 hover:underline mr-4"
                  >
                    Rediger
                  </button>
                  <button
                    type="button"
                    className="text-red-600 hover:underline"
                  >
                    Slet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MinSidePage;
