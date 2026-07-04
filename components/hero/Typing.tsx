"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Typing({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(roles[0]);

  useEffect(() => {
    if (reduce) return;
    let roleIdx = 0;
    let charIdx = roles[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const current = roles[roleIdx];
      if (deleting) {
        charIdx--;
        if (charIdx <= 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          charIdx = 0;
        }
        setText(roles[deleting ? roleIdx : roleIdx].slice(0, Math.max(charIdx, 0)));
        timer = setTimeout(tick, 35);
      } else {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx >= current.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
        } else {
          timer = setTimeout(tick, 65);
        }
      }
    }
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [roles, reduce]);

  return (
    <span className="font-mono text-cyan" aria-live="off">
      {text}
      <span className="animate-pulse" aria-hidden>▍</span>
    </span>
  );
}
