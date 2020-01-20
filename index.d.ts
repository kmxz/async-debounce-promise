declare function debounce<T>(fn: (...args: T[]) => Promise<void>, interval: number): (... args: T[]) => void;

export = debounce;