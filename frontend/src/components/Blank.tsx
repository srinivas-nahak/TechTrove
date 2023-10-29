import React, { useEffect, useRef, useState } from "react";

let interval: NodeJS.Timeout | null = null;

const Blank = () => {
  const [counter, setCounter] = useState(0);

  const ref = useRef<NodeJS.Timeout | null>(null);

  // const handleStart = () => {
  //   if (ref.current) return;
  //   ref.current = requestAnimationFrame(startHandler);
  // };

  const startHandler = () => {
    setCounter((curCounter) => curCounter + 1);
    //ref.current = requestAnimationFrame(startHandler);
    interval = setInterval(() => {
      setCounter((curCounter) => curCounter + 1);
    }, 100);
  };

  const stopCounter = () => {
    //cancelAnimationFrame(ref.current);
    //ref.current = null;
    if (interval !== null) {
      clearInterval(interval);
    }
  };

  const resetCounter = () => {
    if (interval !== null) {
      clearInterval(interval);
    }
    // cancelAnimationFrame(ref.current);
    // ref.current = null;
    setCounter(0);
  };

  return (
    <div>
      <p>{counter}</p>
      <button onClick={startHandler}>Start</button>
      <button onClick={stopCounter}>Stop</button>
      <button onClick={resetCounter}>Clear</button>
    </div>
  );
};

export default Blank;
