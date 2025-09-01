import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ShoppingProvider from "./context/index.tsx";
import "./index.css";
import App from "./App.tsx";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ShoppingProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </ShoppingProvider>
  </StrictMode>
);
