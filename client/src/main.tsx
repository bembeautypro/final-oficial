// client/src/main.tsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js?v=3').catch(() => {});
// }
