// Libs
import { useEffect, useRef } from "react";

const useExplorer = (currentScroll) => {
  const holderRef = useRef(null);
  useEffect(() => {
    if (holderRef.current) {
      holderRef.current.scrollLeft =
        currentScroll * (holderRef.current.offsetWidth * 1.1);
    }
  }, [holderRef, currentScroll]);
  return holderRef;
};

export default useExplorer;
