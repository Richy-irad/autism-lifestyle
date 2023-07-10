import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState(fallbackValue);

  // handles getting the value from localstorage
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  // make sure to update the stored value whenever we change the value in our state
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export function useAddress() {
  return useLocalStorage("address", "{}");
}
