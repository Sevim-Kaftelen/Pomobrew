import { useTimer } from '../hooks/useTimer';
import type { TimerMode } from '../types';

const MODES: { label: string; value: TimerMode }[] = [
  { label: 'Work', value: 'work' },
  { label: 'Short Break', value: 'shortBreak' },
  { label: 'Long Break', value: 'longBreak' },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function Timer() {
  const { seconds, isRunning, mode, start, pause, reset, setMode } = useTimer();

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-2xl" style={{ backgroundColor: '#16213e' }}>
      {/* Mode buttons */}
      <div className="flex gap-2">
        {MODES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200"
            style={{
              backgroundColor: mode === value ? '#e94560' : 'transparent',
              color: mode === value ? '#eaeaea' : '#9ca3af',
              border: `1px solid ${mode === value ? '#e94560' : '#374151'}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Timer display */}
      <span
        className="text-8xl font-bold tracking-widest tabular-nums"
        style={{ color: '#eaeaea' }}
      >
        {formatTime(seconds)}
      </span>

      {/* Controls */}
      <div className="flex gap-4 items-center">
        <button
          onClick={isRunning ? pause : start}
          className="px-10 py-3 rounded-xl text-base font-semibold transition-opacity duration-150 hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#e94560', color: '#eaeaea' }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl text-base font-semibold transition-colors duration-150 hover:opacity-80"
          style={{
            backgroundColor: 'transparent',
            color: '#9ca3af',
            border: '1px solid #374151',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
