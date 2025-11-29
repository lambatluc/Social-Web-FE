export const getStorage = <T = any>(
  key: string,
  defaultValue?: T
): T | null => {
  try {
    const item = localStorage.getItem(key);

    if (item === null) {
      return defaultValue ?? null;
    }

    try {
      return JSON.parse(item) as T;
    } catch {
      return item as T;
    }
  } catch (error) {
    console.error(`Error getting item from localStorage: ${key}`, error);
    return defaultValue ?? null;
  }
};

export const setStorage = <T = any>(key: string, value: T): void => {
  try {
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item in localStorage: ${key}`, error);
  }
};

export const removeStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage: ${key}`, error);
  }
};

export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage", error);
  }
};

