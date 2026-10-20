import { useEffect, useState } from 'react';

const fmt = (tz) =>
  new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: tz });

export default function LocalTime({ timezone }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <time className="mono" dateTime={now.toISOString()}>{fmt(timezone).format(now)} IST</time>;
}
