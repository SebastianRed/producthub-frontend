import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/ProductListPage";
import CategoryListPage from "../pages/CategoryListPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/categories" element={<CategoryListPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;