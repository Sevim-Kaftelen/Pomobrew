import { useState, useEffect } from 'react';
import type { Task, PomodoroSession, AppSettings } from '../types';

const KEYS = {
  tasks: 'pomobrew_tasks',
  sessions: 'pomobrew_sessions',
  settings: 'pomobrew_settings',
};

const DEFAULT_SETTINGS: AppSettings = {
  workDuration: 1500,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  soundEnabled: true,
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useStorage() {
  const [tasks, setTasks] = useState<Task[]>(() => load<Task[]>(KEYS.tasks, []));
  const [sessions, setSessions] = useState<PomodoroSession[]>(() =>
    load<PomodoroSession[]>(KEYS.sessions, [])
  );
  const [settings, setSettings] = useState<AppSettings>(() =>
    load<AppSettings>(KEYS.settings, DEFAULT_SETTINGS)
  );

  useEffect(() => {
    localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(KEYS.settings, JSON.stringify(settings));
  }, [settings]);

  function addTask(title: string, category: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      category,
      completedPomodoros: 0,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, task]);
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function addSession(session: PomodoroSession) {
    setSessions((prev) => [...prev, session]);
  }

  function updateSettings(newSettings: Partial<AppSettings>) {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }

  return { tasks, sessions, settings, addTask, deleteTask, addSession, updateSettings };
}
