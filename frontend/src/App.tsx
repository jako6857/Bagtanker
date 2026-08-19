import { Routes, Route } from "react-router-dom";
import HomePage from "./lib/pages/HomePage";
import ProductsPage from "./lib/pages/ProductsPage";
import NewsPage from "./lib/pages/NewsPage";
import ContactPage from "./lib/pages/ContactPage";
import LoginPage from "./lib/pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
