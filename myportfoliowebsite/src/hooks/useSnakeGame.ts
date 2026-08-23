"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const GRID_SIZE = 15;
export const INITIAL_SNAKE = [
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 },
];
export const INITIAL_DIRECTION = { x: 1, y: 0 };
export const GAME_SPEED = 150;

export type Position = { x: number; y: number };
export type Direction = { x: number; y: number };

export function generateFood(snakeBody: Position[]): Position {
  let newFood: Position;

  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    const isOnSnake = snakeBody.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );

    if (!isOnSnake) return newFood;
  }
}

export function useSnakeGame({
  enableKeyboard = true,
  onGameStateChange,
}: {
  enableKeyboard?: boolean;
  onGameStateChange?: (state: {
    score: number;
    gameOver: boolean;
    gameWon: boolean;
  }) => void;
} = {}) {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const lastDirectionRef = useRef<Direction>(INITIAL_DIRECTION);
  const inputQueueRef = useRef<Direction[]>([]);
  const isRunningRef = useRef(false);
  const foodRef = useRef<Position | null>(food);

  useEffect(() => {
    setIsMounted(true);
    const initialFood = generateFood(INITIAL_SNAKE);
    setFood(initialFood);
    foodRef.current = initialFood;
  }, []);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    onGameStateChange?.({ score, gameOver, gameWon });
  }, [score, gameOver, gameWon, onGameStateChange]);

  const restart = useCallback(() => {
    const freshSnake = INITIAL_SNAKE;

    setSnake(freshSnake);
    setFood(generateFood(freshSnake));
    setScore(0);
    setGameOver(false);
    setGameWon(false);

    directionRef.current = INITIAL_DIRECTION;
    lastDirectionRef.current = INITIAL_DIRECTION;
    inputQueueRef.current = [];

    isRunningRef.current = false;
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if ((gameOver || gameWon) && key === "r") {
        e.preventDefault();
        restart();
        return;
      }

      let desiredDirection: Direction | null = null;

      if (key === "w" || key === "arrowup") {
        desiredDirection = { x: 0, y: -1 };
      } else if (key === "s" || key === "arrowdown") {
        desiredDirection = { x: 0, y: 1 };
      } else if (key === "a" || key === "arrowleft") {
        desiredDirection = { x: -1, y: 0 };
      } else if (key === "d" || key === "arrowright") {
        desiredDirection = { x: 1, y: 0 };
      }

      if (!desiredDirection) return;

      e.preventDefault();

      if (gameOver || gameWon) return;

      if (!isRunningRef.current) {
        directionRef.current = desiredDirection;
        lastDirectionRef.current = desiredDirection;
        isRunningRef.current = true;
        setIsRunning(true);
        return;
      }

      const lastDirection =
        inputQueueRef.current.length > 0
          ? inputQueueRef.current[inputQueueRef.current.length - 1]
          : lastDirectionRef.current;

      const isReverse =
        desiredDirection.x === -lastDirection.x &&
        desiredDirection.y === -lastDirection.y;

      if (isReverse) return;

      inputQueueRef.current.push(desiredDirection);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameOver, gameWon, enableKeyboard, restart]);

  useEffect(() => {
    if (gameOver || gameWon || !isMounted || !food) return;

    gameLoopRef.current = setInterval(() => {
      if (!isRunningRef.current) return;

      setSnake((prevSnake) => {
        if (prevSnake.length === 0) return prevSnake;

        let currentDirection = directionRef.current;
        if (inputQueueRef.current.length > 0) {
          const nextDir = inputQueueRef.current.shift();
          if (nextDir) {
            currentDirection = nextDir;
            directionRef.current = nextDir;
          }
        }

        lastDirectionRef.current = currentDirection;

        const head = prevSnake[0];
        const newHead: Position = {
          x: head.x + currentDirection.x,
          y: head.y + currentDirection.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          isRunningRef.current = false;
          setIsRunning(false);
          return prevSnake;
        }

        const hitsSelf = prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        );
        if (hitsSelf) {
          setGameOver(true);
          isRunningRef.current = false;
          setIsRunning(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];
        const currentFood = foodRef.current;

        if (
          currentFood &&
          newHead.x === currentFood.x &&
          newHead.y === currentFood.y
        ) {
          const updatedSnake = newSnake;
          setScore((prev) => prev + 1);

          const maxLength = GRID_SIZE * GRID_SIZE;
          if (updatedSnake.length >= maxLength) {
            setGameWon(true);
            isRunningRef.current = false;
            setIsRunning(false);
            return updatedSnake;
          }

          const nextFood = generateFood(updatedSnake);
          setFood(nextFood);
          return updatedSnake;
        }

        return newSnake.slice(0, -1);
      });
    }, GAME_SPEED);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, gameWon, isMounted, food]);

  return {
    snake,
    food,
    gameOver,
    gameWon,
    score,
    isRunning,
    isMounted,
    restart,
  };
}
