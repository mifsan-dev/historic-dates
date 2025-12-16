import "@/app/styles/global.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const container = document.getElementById("root");

if (!container) throw new Error("Root element not found");

createRoot(container).render(
  <StrictMode>
    <div>Historic Dates</div>
  </StrictMode>
);
