import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Settings, Tag, Task } from '@/types';

interface AppStore {
  // State
  tasks: Task[];
  tags: Tag[];
  settings: Settings;
  sortBy: 'name' | 'priority' | 'createdAt' | 'custom';
  sortOrder: 'asc' | 'desc';

  // Task actions
  addTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, taskData: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;

  // Tag actions
  addTag: (tagData: Omit<Tag, 'id'>) => void;
  updateTag: (id: string, tagData: Partial<Omit<Tag, 'id'>>) => void;
  deleteTag: (id: string) => void;

  // Settings actions
  updateSettings: (newSettings: Partial<Settings>) => void;
  setSorting: (
    sortBy: 'name' | 'priority' | 'createdAt' | 'custom',
    sortOrder?: 'asc' | 'desc'
  ) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      tasks: [
        {
          text: 'Go to Gym',
          description: 'Today is a PUSH day.',
          priority: 'medium',
          tagIds: ['1756357013759'],
          completed: false,
          deleted: true,
          id: '1756357046899',
          createdAt: 1756357046899,
          updatedAt: 1756357046899,
        },
        {
          text: 'Try Out Recipe',
          description: 'This is that biryani we saw on Zomato.',
          priority: 'medium',
          tagIds: ['1756357002285'],
          completed: false,
          deleted: false,
          id: '1756357066678',
          createdAt: 1756357066678,
          updatedAt: 1756357066678,
        },
        {
          text: 'ToDo Application',
          description: 'Built for the Ofofo frontend interview.',
          priority: 'medium',
          tagIds: ['1756356980941', '1756357084841'],
          completed: false,
          deleted: false,
          id: '1756357110325',
          createdAt: 1756357110325,
          updatedAt: 1756357110325,
        },
        {
          text: 'Complete Interview',
          description: 'For Ofofo.ai.',
          priority: 'medium',
          tagIds: ['1756356980941'],
          completed: true,
          deleted: false,
          id: '1756357390734',
          createdAt: 1756357390734,
          updatedAt: 1756357392476,
        },
      ],
      tags: [
        {
          title: 'Work',
          emoji: '💼',
          color: 'bg-orange-800',
          id: '1756356980941',
        },
        {
          title: 'Cooking',
          emoji: '🍽️',
          color: 'bg-green-800',
          id: '1756357002285',
        },
        {
          title: 'Gym',
          emoji: '🏋️',
          color: 'bg-indigo-800',
          id: '1756357013759',
        },
        {
          title: 'Goals',
          emoji: '🎯',
          color: 'bg-pink-800',
          id: '1756357084841',
        },
      ],
      settings: {
        theme: 'system',
        hideCompleted: false,
        hideDeleted: true,
        viewMode: 'comfy',
      },
      sortBy: 'createdAt',
      sortOrder: 'desc',

      // Task actions
      addTask: (taskData) => {
        const now = Date.now();
        const newTask: Task = {
          ...taskData,
          id: String(now),
          createdAt: now,
          updatedAt: now,
        };
        set({ tasks: [...get().tasks, newTask] });
      },

      updateTask: (id, taskData) => {
        set({
          tasks: get().tasks.map((task) =>
            task.id === id
              ? { ...task, ...taskData, updatedAt: Date.now() }
              : task
          ),
        });
      },

      deleteTask: (id) => {
        set({
          tasks: get().tasks.map((task) =>
            task.id === id
              ? { ...task, deleted: true, updatedAt: Date.now() }
              : task
          ),
        });
      },

      reorderTasks: (tasks) => set({ tasks }),

      // Tag actions
      addTag: (tagData) => {
        const newTag: Tag = {
          ...tagData,
          id: String(Date.now()),
        };
        set({ tags: [...get().tags, newTag] });
      },

      updateTag: (id, tagData) => {
        set({
          tags: get().tags.map((tag) =>
            tag.id === id ? { ...tag, ...tagData } : tag
          ),
        });
      },

      deleteTag: (id) => {
        set({ tags: get().tags.filter((tag) => tag.id !== id) });
      },

      // Settings actions
      updateSettings: (newSettings) => {
        const updated = { ...get().settings, ...newSettings };
        set({ settings: updated });
      },

      setSorting: (sortBy, sortOrder) => {
        const currentSortBy = get().sortBy;
        const newSortOrder =
          sortOrder ||
          (currentSortBy === sortBy
            ? get().sortOrder === 'asc'
              ? 'desc'
              : 'asc'
            : 'desc');
        set({ sortBy, sortOrder: newSortOrder });
      },
    }),
    { name: 'taskmaster-app' }
  )
);
