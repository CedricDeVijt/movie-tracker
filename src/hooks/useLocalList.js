import { useState, useEffect, useCallback } from "react";

function readFromStorage(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function useLocalList(key, { initial = [] } = {}) {
  const [list, setList] = useState(() => readFromStorage(key, initial));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch {}
  }, [key, list]);

  // keep state in sync across tabs
  useEffect(() => {
    function onStorage(e) {
      if (e.key === key) setList(readFromStorage(key, initial));
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, initial]);

  const add = useCallback(
    (id) => setList((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [],
  );
  const remove = useCallback(
    (id) => setList((prev) => prev.filter((x) => x !== id)),
    [],
  );
  const toggle = useCallback(
    (id) =>
      setList((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      ),
    [],
  );
  const has = useCallback((id) => list.includes(id), [list]);
  const clear = useCallback(() => setList([]), []);

  return { list, add, remove, toggle, has, clear };
}
