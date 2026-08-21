import { Routes, Route } from "react-router-dom";
import HomePage from "./lib/pages/HomePage";
import ProductsPage from "./lib/pages/ProductsPage";
import ProductDetailPage from "./lib/pages/ProductDetailPage";
import NewsPage from "./lib/pages/NewsPage";
import ContactPage from "./lib/pages/ContactPage";
import LoginPage from "./lib/pages/LoginPage";
import Footer from "./lib/components/Footer";
import MinSidePage from "./lib/pages/MinSidePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/min-side" element={<MinSidePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
