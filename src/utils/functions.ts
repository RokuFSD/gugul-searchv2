function bounceFunction(cb: (...args: never[]) => void, timeout: number) {
  let timer: NodeJS.Timeout;
  return (...args: never[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, timeout);
  };
}

export default bounceFunction;
