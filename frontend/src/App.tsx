import { useEffect } from "react";
import { apiFetch } from "./lib/apiClient";

function App() {
  useEffect(() => {
    apiFetch("/products")
      .then((data) => console.log("Products:", data))
      .catch((err) => console.error("API error:", err));
  }, []);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
