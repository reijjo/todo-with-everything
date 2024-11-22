// hooks/useScreenWidth.ts
import { useEffect, useState } from "react";

export const useScreenWidth = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 461);
    };

    // Initial check
    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return isMobile;
};
