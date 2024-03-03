import { useState, useEffect } from "react";

function isDefined(storageValue) {
  return storageValue !== null && storageValue !== 'undefined'
};

export default function useLocalStorageState(key, initialvalue) {
  const [state, setState] = useState (() => {
    const storedValue = localStorage.getItem(key);

    return isDefined(storedValue) ? JSON.parse(storedValue) : initialvalue
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
