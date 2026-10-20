import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

export default function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}{suffix}</span>;
}
