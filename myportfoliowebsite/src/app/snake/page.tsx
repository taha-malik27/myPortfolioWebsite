"use client";

import { useState, useEffect, useRef } from "react";

const GRID_SIZE = 15;
const INITIAL_SNAKE = [
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 }
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

type Position = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const directionRef = useRef(INITIAL_DIRECTION);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "w") directionRef.current = { x: 0, y: -1 };
      if (key === "s") directionRef.current = { x: 0, y: 1 };
      if (key === "a") directionRef.current = { x: -1, y: 0 };
      if (key === "d") directionRef.current = { x: 1, y: 0 };
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const loop = setInterval(() => {
      setSnake(prev => {
        const head = prev[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y
        };
        return [newHead, ...prev.slice(0, -1)];
      });
    }, GAME_SPEED);

    return () => clearInterval(loop);
  }, []);

  return (
    <div style={{ width: "min(600px, 90vw)", margin: "auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          aspectRatio: 1,
          border: "2px solid #333",
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);

          return (
            <div
              key={i}
              style={{
                border: "1px solid #222",
                background: isSnake ? "#2ecc71" : "#111"
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
