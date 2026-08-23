"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { GRID_SIZE, useSnakeGame } from "@/hooks/useSnakeGame";

/**
 * TV primitive in Scene/Models, plus the Display_ mesh in tvModel.glb.
 * Parenting the screen to the same transform keeps it glued to the panel
 * in every viewport — unlike drei Html CSS 3D, which drifted in production.
 */
const TV_POSITION: [number, number, number] = [9.745, 2.95, -0.5];
const TV_ROTATION: [number, number, number] = [0, 0, 0.2];
const TV_SCALE = 0.1;

const TV_NODE_TRANSLATION = {
  x: 2.254547119140625,
  y: 15.17595100402832,
  z: 2.388364315032959,
};

const DISPLAY_MIN = {
  x: -0.13454784452915192,
  y: -14.090202331542969,
  z: -22.160320281982422,
};
const DISPLAY_MAX = {
  x: 0.586067795753479,
  y: 12.410639762878418,
  z: 22.18977928161621,
};

const DISPLAY_CENTER: [number, number, number] = [
  TV_NODE_TRANSLATION.x + (DISPLAY_MIN.x + DISPLAY_MAX.x) / 2,
  TV_NODE_TRANSLATION.y + (DISPLAY_MIN.y + DISPLAY_MAX.y) / 2,
  TV_NODE_TRANSLATION.z + (DISPLAY_MIN.z + DISPLAY_MAX.z) / 2,
];

const DISPLAY_SIZE: [number, number] = [
  DISPLAY_MAX.z - DISPLAY_MIN.z,
  DISPLAY_MAX.y - DISPLAY_MIN.y,
];

// Sit just in front of Display_ (smaller local X faces the room camera)
const DISPLAY_FRONT_X = TV_NODE_TRANSLATION.x + DISPLAY_MIN.x - 0.08;

const CANVAS_WIDTH = 1674;
const CANVAS_HEIGHT = 1000;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawSnakeScreen(
  ctx: CanvasRenderingContext2D,
  state: {
    snake: { x: number; y: number }[];
    food: { x: number; y: number } | null;
    score: number;
    gameOver: boolean;
    gameWon: boolean;
    isRunning: boolean;
  }
) {
  const { snake, food, score, gameOver, gameWon, isRunning } = state;
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, w, h);

  const pad = Math.round(h * 0.04);
  const scoreH = Math.round(h * 0.1);
  const availableW = w - pad * 2;
  const availableH = h - pad * 2 - scoreH;
  const gridPx = Math.min(availableW, availableH);
  const gridX = (w - gridPx) / 2;
  const gridY = pad + scoreH;

  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(gridX, pad, gridPx, scoreH);
  ctx.strokeStyle = "#333333";
  ctx.lineWidth = 3;
  ctx.strokeRect(gridX + 1.5, pad + 1.5, gridPx - 3, scoreH - 1.5);

  ctx.font = `bold ${Math.round(scoreH * 0.42)}px "Courier New", monospace`;
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${score}`, gridX + 24, pad + scoreH / 2);

  ctx.textAlign = "right";
  if (gameWon) {
    ctx.fillStyle = "#44ff44";
    ctx.fillText("YOU WIN!", gridX + gridPx - 24, pad + scoreH / 2);
  } else if (gameOver) {
    ctx.fillStyle = "#ff4444";
    ctx.fillText("GAME OVER", gridX + gridPx - 24, pad + scoreH / 2);
  }

  const cell = gridPx / GRID_SIZE;
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(gridX, gridY, gridPx, gridPx);
  ctx.strokeStyle = "#333333";
  ctx.strokeRect(gridX + 1.5, gridY, gridPx - 3, gridPx - 1.5);

  const snakeSet = new Set(snake.map((seg) => `${seg.x}-${seg.y}`));
  const head = snake[0];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const px = gridX + x * cell;
      const py = gridY + y * cell;
      const isHead = head && head.x === x && head.y === y;
      const isSnake = snakeSet.has(`${x}-${y}`);

      ctx.fillStyle = isHead ? "#44ff44" : isSnake ? "#2ecc71" : "#1a1a1a";
      if (isHead) {
        roundRect(ctx, px + 2, py + 2, cell - 4, cell - 4, 4);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(px + cell * 0.32, py + cell * 0.32, cell * 0.08, 0, Math.PI * 2);
        ctx.arc(px + cell * 0.68, py + cell * 0.32, cell * 0.08, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(px, py, cell, cell);
        ctx.strokeStyle = "#2a2a2a";
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, cell, cell);
      }

      if (food && food.x === x && food.y === y) {
        ctx.fillStyle = "#ff4444";
        ctx.beginPath();
        ctx.arc(px + cell / 2, py + cell / 2, cell * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  if (gameOver || gameWon) {
    const label = "Press R to restart";
    ctx.font = `bold ${Math.round(h * 0.045)}px "Courier New", monospace`;
    const textW = ctx.measureText(label).width;
    const btnW = textW + 48;
    const btnH = Math.round(h * 0.08);
    const btnX = (w - btnW) / 2;
    const btnY = gridY + gridPx / 2 - btnH / 2;

    ctx.fillStyle = "#44ff44";
    roundRect(ctx, btnX, btnY, btnW, btnH, 6);
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, w / 2, btnY + btnH / 2);
  } else if (!isRunning) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.fillRect(gridX, gridY, gridPx, gridPx);
    ctx.fillStyle = "#dddddd";
    ctx.font = `${Math.round(h * 0.04)}px "Courier New", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Press WASD or arrow keys to start", w / 2, gridY + gridPx / 2);
  }
}

export default function SnakeTvScreen({ enabled }: { enabled: boolean }) {
  const { snake, food, score, gameOver, gameWon, isRunning } = useSnakeGame({
    enableKeyboard: enabled,
  });

  const canvas = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = CANVAS_WIDTH;
    c.height = CANVAS_HEIGHT;
    return c;
  }, []);

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = 8;
    return t;
  }, [canvas]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  useEffect(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawSnakeScreen(ctx, { snake, food, score, gameOver, gameWon, isRunning });
    texture.needsUpdate = true;
  }, [canvas, texture, snake, food, score, gameOver, gameWon, isRunning]);

  return (
    <group position={TV_POSITION} rotation={TV_ROTATION} scale={TV_SCALE}>
      <mesh
        position={[DISPLAY_FRONT_X, DISPLAY_CENTER[1], DISPLAY_CENTER[2]]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.985, 0.985, 1]}
      >
        <planeGeometry args={DISPLAY_SIZE} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>
    </group>
  );
}
