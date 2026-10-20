// Tiny signal so the hero waits for the preloader before playing its entrance.
let done = false;
const listeners = new Set();

export function markIntroDone() {
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onIntroDone(fn) {
  if (done) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
