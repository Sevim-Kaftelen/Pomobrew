export interface Task {
  id: string;
  title: string;
  category: string;
  completedPomodoros: number;
  createdAt: number;
}

export interface PomodoroSession {
  id: string;
  taskId: string | null;
  startTime: number;
  endTime: number;
  type: 'work' | 'shortBreak' | 'longBreak';
}

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export interface AppSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  soundEnabled: boolean;
}
