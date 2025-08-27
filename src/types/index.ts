export interface Tag {
  id: string;
  title: string;
  color: string;
  emoji: string;
}

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

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  hideCompleted: boolean;
  hideDeleted: boolean;
  viewMode: 'compact' | 'comfy';
}
