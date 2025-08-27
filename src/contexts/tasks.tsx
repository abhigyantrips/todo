'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

import { storage } from '@/lib/storage';

export interface Task {
  id: string;
  text: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  tagIds: string[];
  completed: boolean;
  deleted: boolean;
  createdAt: number;
  updatedAt: number;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, taskData: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => storage.getTasks());

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now();
    const newTask: Task = {
      ...taskData,
      id: String(now),
      createdAt: now,
      updatedAt: now,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
  };

  const updateTask = (id: string, taskData: Partial<Omit<Task, 'id'>>) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...taskData, updatedAt: Date.now() } : task
    );
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, deleted: true, updatedAt: Date.now() } : task
    );
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
  };

  const reorderTasks = (reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
    storage.saveTasks(reorderedTasks);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        reorderTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
