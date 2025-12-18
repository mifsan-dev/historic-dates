import { IsMobileContext } from "./IsMobileContext";
import { useContext } from "react";

export function useIsMobile() {
  const isMobile = useContext(IsMobileContext);
  return isMobile;
}
