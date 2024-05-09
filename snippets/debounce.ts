export const debounce = (fn: (...args: any) => void, delay: number) => {
  let timeoutId: number;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
};

