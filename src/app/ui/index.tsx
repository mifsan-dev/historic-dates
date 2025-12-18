import "@/app/ui/global.scss";

import { HomePage } from "@/pages";
import { IsMobileProvider } from "@/shared/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");

if (!container) throw new Error("Root element not found");

createRoot(container).render(
  <StrictMode>
    <IsMobileProvider>
      <HomePage />
    </IsMobileProvider>
  </StrictMode>
);
