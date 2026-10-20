import { useEffect, useState } from 'react';

// Returns the id of the section currently nearest the top of the viewport.
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!enabled) return setActive('');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}
