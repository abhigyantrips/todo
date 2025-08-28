import { Task } from '@/types';

export const sortTasks = (
  tasks: Task[],
  sortBy: 'name' | 'priority' | 'createdAt' | 'custom',
  sortOrder: 'asc' | 'desc'
): Task[] => {
  // If custom sorting, maintain the current order
  if (sortBy === 'custom') {
    return tasks;
  }

  const priorityValues = { low: 1, medium: 2, high: 3 };

  return [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.text.localeCompare(b.text);
        break;
      case 'priority':
        comparison = priorityValues[a.priority] - priorityValues[b.priority];
        break;
      case 'createdAt':
        comparison = a.createdAt - b.createdAt;
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });
};
