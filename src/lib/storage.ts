const STORAGE_KEYS = {
  TASKS: 'taskmaster-tasks',
  TAGS: 'taskmaster-tags',
  SETTINGS: 'taskmaster-settings',
} as const;

class LocalStorageManager {
  // Tasks
  getTasks(): Task[] {
    return this.getItem(STORAGE_KEYS.TASKS, []);
  }

  saveTasks(tasks: Task[]): void {
    this.setItem(STORAGE_KEYS.TASKS, tasks);
  }

  // Tags
  getTags(): Tag[] {
    return this.getItem(STORAGE_KEYS.TAGS, []);
  }

  saveTags(tags: Tag[]): void {
    this.setItem(STORAGE_KEYS.TAGS, tags);
  }

  // Settings
  getSettings(): Settings {
    return this.getItem(STORAGE_KEYS.SETTINGS, {
      theme: 'light',
      hideCompleted: false,
      hideDeleted: true,
      viewMode: 'comfy',
    });
  }

  saveSettings(settings: Settings): void {
    this.setItem(STORAGE_KEYS.SETTINGS, settings);
  }

  // QR Export/Import
  exportData() {
    return {
      tasks: this.getTasks(),
      tags: this.getTags(),
      exportedAt: Date.now(),
    };
  }

  importData(data: { tasks: Task[]; tags: Tag[] }): void {
    this.saveTasks(data.tasks);
    this.saveTags(data.tags);
  }

  // Private helpers
  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
    }
  }
}

export const storage = new LocalStorageManager();
