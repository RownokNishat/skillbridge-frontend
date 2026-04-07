"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-6 w-6 rounded-full border border-primary/70 bg-primary/10 md:block"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-10 w-10 rounded-full bg-primary/10 md:block"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      />
    </>
  );
}
