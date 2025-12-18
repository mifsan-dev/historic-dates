import { PropsWithChildren, createContext, useEffect, useState } from "react";

const BREAKPOINT = 768;

export const IsMobileContext = createContext(false);

const checkIsMobile = () => {
  const mql = window.matchMedia(`(max-width: ${768 - 1}px)`);
  const isMobileUA =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return mql.matches || isMobileUA;
};

export function IsMobileProvider({ children }: PropsWithChildren) {
  const [isMobile, setIsMobile] = useState(() => checkIsMobile());

  useEffect(() => {
    const checkIsMobileListener = () => {
      setIsMobile(checkIsMobile);
    };

    const mql = window.matchMedia(`(max-width: ${BREAKPOINT - 1}px)`);
    mql.addEventListener("change", checkIsMobileListener);
    window.addEventListener("resize", checkIsMobileListener);

    return () => {
      mql.removeEventListener("change", checkIsMobileListener);
      window.removeEventListener("resize", checkIsMobileListener);
    };
  }, []);

  return (
    <IsMobileContext.Provider value={isMobile}>
      {children}
    </IsMobileContext.Provider>
  );
}
