import "@/app/styles/global.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");

if (!container) throw new Error("Root element not found");

createRoot(container).render(
  <StrictMode>
    <div>Historic Dates</div>
  </StrictMode>
);
