import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Task } from '@/types';

import { TaskCard } from '@/components/task-card';

interface SortableTaskProps {
  task: Task;
}

export function SortableTask({ task }: SortableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard task={task} dragProps={{ ...attributes, ...listeners }} />
    </div>
  );
}
