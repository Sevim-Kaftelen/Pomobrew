import { useState, useEffect, useCallback } from 'react';
import { TimerMode } from '../types';

const DURATIONS: Record<TimerMode, number> = {
  work: 1500,
  shortBreak: 300,
  longBreak: 900,
};

export function useTimer() {
  const [mode, setModeState] = useState<TimerMode>('work');
  const [seconds, setSeconds] = useState(DURATIONS.work);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(DURATIONS[mode]);
  }, [mode]);

  const setMode = useCallback((newMode: TimerMode) => {
    setIsRunning(false);
    setModeState(newMode);
    setSeconds(DURATIONS[newMode]);
  }, []);

  return { seconds, isRunning, mode, start, pause, reset, setMode };
}
