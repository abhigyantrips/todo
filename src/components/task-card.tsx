import { Card, CardBody, Checkbox, Chip } from '@heroui/react';

import { useSettings } from '@/contexts/settings';
import { useTags } from '@/contexts/tags';
import { Task } from '@/contexts/tasks';
import { useTasks } from '@/contexts/tasks';

interface TaskCardProps {
  task: Task;
  dragProps?: any;
}

export function TaskCard({ task, dragProps }: TaskCardProps) {
  const { updateTask } = useTasks();
  const { tags } = useTags();
  const { settings } = useSettings();

  const taskTags = tags.filter((tag) => task.tagIds.includes(tag.id));

  const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'danger',
  };

  return (
    <Card className="w-full">
      <CardBody
        className={`cursor-grab p-4 active:cursor-grabbing ${
          settings.viewMode === 'compact' ? 'py-3' : 'py-4'
        }`}
        {...dragProps}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox - prevent drag when clicked */}
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              size="lg"
              isSelected={task.completed}
              onChange={(checked) =>
                updateTask(task.id, { completed: checked.target.checked })
              }
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3
                className={`font-semibold ${
                  task.completed ? 'text-default-400 line-through' : ''
                }`}
              >
                {task.text}
              </h3>
              <Chip
                size="sm"
                color={priorityColors[task.priority] as any}
                variant="flat"
              >
                {task.priority}
              </Chip>
            </div>

            {task.description && settings.viewMode === 'comfy' && (
              <p
                className={`text-default-600 text-sm ${
                  task.completed ? 'text-default-400 line-through' : ''
                }`}
              >
                {task.description}
              </p>
            )}

            {taskTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {taskTags.map((tag) => (
                  <Chip
                    key={tag.id}
                    size="sm"
                    color={tag.color as any}
                    variant="flat"
                    startContent={<span>{tag.emoji}</span>}
                  >
                    {tag.title}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
