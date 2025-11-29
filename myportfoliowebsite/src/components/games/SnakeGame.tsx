"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150; // milliseconds

type Position = { x: number; y: number };
type Direction = { x: number; y: number };

export interface SnakeGameProps {
  /** Width of the game grid. Default: "min(500px, 80vw)" */
  width?: string;
  /** Whether to show the title. Default: true */
  showTitle?: boolean;
  /** Whether to show the start instruction text. Default: true */
  showInstructions?: boolean;
  /** Custom className for the container */
  className?: string;
  /** Custom styles for the container */
  containerStyle?: React.CSSProperties;
  /** Whether keyboard controls are enabled. Default: true */
  enableKeyboard?: boolean;
  /** Callback when game state changes */
  onGameStateChange?: (state: { score: number; gameOver: boolean; gameWon: boolean }) => void;
}

function generateFood(snakeBody: Position[]): Position {
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

export default function SnakeGame({
  width = "min(500px, 80vw)",
  showTitle = true,
  showInstructions = true,
  className,
  containerStyle,
  enableKeyboard = true,
  onGameStateChange,
}: SnakeGameProps) {
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

  // queue to register fast directional changes
  const inputQueueRef = useRef<Direction[]>([]);

  const isRunningRef = useRef<boolean>(false);
  const foodRef = useRef<Position | null>(food);

  // Initialize on client mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const initialFood = generateFood(INITIAL_SNAKE);
    setFood(initialFood);
    foodRef.current = initialFood;
  }, []);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  // Notify parent of game state changes
  useEffect(() => {
    onGameStateChange?.({
      score,
      gameOver,
      gameWon,
    });
  }, [score, gameOver, gameWon, onGameStateChange]);

  // keyboard input
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Handle restart with R key when game is over or won (check this first)
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

      // prevent page scroll with arrows
      e.preventDefault();

      // if game over or won, ignore movement inputs
      if (gameOver || gameWon) return;

      // first valid move starts the game immediately
      if (!isRunningRef.current) {
        directionRef.current = desiredDirection;
        lastDirectionRef.current = desiredDirection;
        isRunningRef.current = true;
        setIsRunning(true);
        return;
      }

      // get the last direction in queue, or last applied direction
      const lastDirection =
        inputQueueRef.current.length > 0
          ? inputQueueRef.current[inputQueueRef.current.length - 1]
          : lastDirectionRef.current;

      // prevent reversing into itself
      const isReverse =
        desiredDirection.x === -lastDirection.x &&
        desiredDirection.y === -lastDirection.y;

      if (isReverse) return;

      // enqueue the new direction so fast key presses are honored
      inputQueueRef.current.push(desiredDirection);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameOver, gameWon, enableKeyboard]);

  // game loop
  useEffect(() => {
    if (gameOver || gameWon || !isMounted || !food) return;

    gameLoopRef.current = setInterval(() => {
      if (!isRunningRef.current) return;

      setSnake((prevSnake) => {
        if (prevSnake.length === 0) return prevSnake;

        // pull from queue if there is pending input
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

        // wall collision
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

        // self collision
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

        // food collision
        if (currentFood && newHead.x === currentFood.x && newHead.y === currentFood.y) {
          const updatedSnake = newSnake;
          setScore((prev) => prev + 1);
          
          // Check win condition: snake fills entire grid
          const maxLength = GRID_SIZE * GRID_SIZE;
          if (updatedSnake.length >= maxLength) {
            setGameWon(true);
            isRunningRef.current = false;
            setIsRunning(false);
            return updatedSnake;
          }
          
          const newFood = generateFood(updatedSnake);
          setFood(newFood);
          return updatedSnake;
        }

        // no food, remove tail
        return newSnake.slice(0, -1);
      });
    }, GAME_SPEED);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, gameWon, isMounted, food]);

  // restart game
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

  const gridCells = useMemo(() => {
    const snakeSet = new Set(snake.map((seg) => `${seg.x}-${seg.y}`));
    const headKey =
      snake.length > 0 ? `${snake[0].x}-${snake[0].y}` : "head-none";

    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const key = `${x}-${y}`;
        const isHead = key === headKey;
        const isSnake = snakeSet.has(key);
        const isFood = food ? food.x === x && food.y === y : false;

        let bgColor = "#1a1a1a";

        if (isHead) {
          bgColor = "#44ff44";
        } else if (isSnake) {
          bgColor = "#2ecc71";
        }

        const baseStyle: React.CSSProperties = {
          width: "100%",
          height: "100%",
          backgroundColor: bgColor,
          border: "1px solid #2a2a2a",
          boxSizing: "border-box",
          position: "relative",
        };

        // make the head visually distinct
        if (isHead) {
          Object.assign(baseStyle, {
            border: "2px solid #ffffff",
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
            borderRadius: "4px",
          });
        }

        cells.push(
          <div key={key} style={baseStyle}>
            {isFood && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "70%",
                  height: "70%",
                  backgroundColor: "#ff4444",
                  borderRadius: "50%",
                }}
              />
            )}
            {isHead && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    width: "15%",
                    height: "15%",
                    backgroundColor: "#000",
                    borderRadius: "50%",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "25%",
                    right: "25%",
                    width: "15%",
                    height: "15%",
                    backgroundColor: "#000",
                    borderRadius: "50%",
                  }}
                />
              </>
            )}
          </div>
        );
      }
    }
    return cells;
  }, [snake, food]);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        ...containerStyle,
      }}
    >
      {showTitle && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h1
            style={{
              margin: "0 0 20px 0",
              fontSize: "48px",
              fontFamily: "'Courier New', monospace",
              letterSpacing: "4px",
              fontWeight: "bold",
              textTransform: "uppercase",
              textShadow: "2px 2px 0px #000",
            }}
          >
            SNAKE GAME
          </h1>
        </div>
      )}

      <div style={{ width, marginBottom: "0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            backgroundColor: "#1a1a1a",
            border: "2px solid #333",
            borderBottom: "none",
            fontSize: "18px",
            fontFamily: "'Courier New', monospace",
          }}
        >
          <div>Score: {score}</div>
          {gameWon && (
            <div style={{ color: "#44ff44", fontWeight: "bold" }}>
              YOU WIN!
            </div>
          )}
          {gameOver && !gameWon && (
            <div style={{ color: "#ff4444", fontWeight: "bold" }}>
              GAME OVER
            </div>
          )}
        </div>
      </div>

      <div style={{ position: "relative", width }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            width: "100%",
            height: width,
            aspectRatio: "1",
            border: "2px solid #333",
            borderTop: "none",
            backgroundColor: "#1a1a1a",
          }}
        >
          {gridCells}
        </div>

        {(gameOver || gameWon) && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                padding: "12px 24px",
                fontSize: "18px",
                backgroundColor: "#44ff44",
                color: "#000",
                border: "2px solid #000",
                borderRadius: "4px",
                fontWeight: "bold",
                fontFamily: "'Courier New', monospace",
                boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
                textAlign: "center",
              }}
            >
              Press R to restart
            </div>
          </div>
        )}
      </div>

      {showInstructions && !isRunning && !gameOver && !gameWon && (
        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#888",
            fontFamily: "'Courier New', monospace",
          }}
        >
          Press WASD or arrow keys to start
        </p>
      )}
    </div>
  );
}

