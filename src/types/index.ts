interface Tag {
  id: string;
  title: string;
  color: string;
  emoji: string;
}

interface Task {
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

interface Settings {
  theme: 'light' | 'dark';
  hideCompleted: boolean;
  hideDeleted: boolean;
  viewMode: 'compact' | 'comfy';
}
