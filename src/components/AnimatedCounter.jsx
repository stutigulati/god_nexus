import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedCounter({ value, duration = 1.5, suffix = '' }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const hasAnimated = useRef(false);

  // Extract number from string if needed
  const target = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            
            // Easing function (easeOutQuad)
            const easeProgress = progress * (2 - progress);
            
            setCount(Math.floor(easeProgress * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  // If there are alphabetical characters in the original value, preserve them (e.g. "1M+" -> target 1, suffix "M+")
  const matches = value.match(/[a-zA-Z+]+/g);
  const autoSuffix = matches ? matches.join('') : '';

  return (
    <span ref={nodeRef} className="font-mono">
      {count}
      {suffix || autoSuffix}
    </span>
  );
}
