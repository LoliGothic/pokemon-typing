import { useEffect, useState } from "react";

export const useHash = (init: string) => {
  const [hash, setHash] = useState(init);

  useEffect(() => {
    const cb = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", cb);

    return () => window.removeEventListener("hashChange", cb);
  }, []);

  return hash;
};
