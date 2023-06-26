export const useDebounce = (callback: (arg: any) => void, timeout: number) => {
  let timer: number | undefined = undefined;

  return (arg: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(arg), timeout);
  };
};
