// Libs
import { useEffect, useRef } from "react";

const useExplorer = (currentScroll) => {
  const holderRef = useRef(null);
  useEffect(() => {
    if (holderRef.current) {
      holderRef.current.scrollLeft =
        currentScroll * (holderRef.current.offsetWidth * 1.05);
    }
  }, [holderRef, currentScroll]);
  return holderRef;
};

export default useExplorer;
