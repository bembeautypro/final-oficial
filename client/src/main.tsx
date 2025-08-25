// client/src/main.tsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);
rootEl.innerHTML = "";

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Service Worker básico opcional
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swUrl = "/sw.js?v=2";
    navigator.serviceWorker.register(swUrl).catch((err) => {
      console.warn("SW registration failed:", err);
    });
  });
}
