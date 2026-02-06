import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import AuthContextProvider from "./contexts/AuthContextProvider.jsx";
import App from "./App.jsx";
import Stories from "./pages/Stories/Stories.jsx";
import BlogLayout from "./layouts/BlogLayout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<BlogLayout />}>
            <Route path="/write" element={<App />} />
            <Route path="/stories" element={<Stories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
);
