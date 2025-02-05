import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const trailCount = 5;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursor.style.transform = `translate(${clientX - 10}px, ${clientY - 10}px)`;

      // Update trails with delay
      trailsRef.current.forEach((trail, index) => {
        if (!trail) return;
        setTimeout(() => {
          trail.style.transform = `translate(${clientX - 5}px, ${clientY - 5}px)`;
        }, index * 50);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      {Array.from({ length: trailCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => el && (trailsRef.current[i] = el)}
          className="cursor-trail"
          style={{ opacity: 1 - i * 0.2 }}
        />
      ))}
    </>
  );
};

export default CustomCursor;