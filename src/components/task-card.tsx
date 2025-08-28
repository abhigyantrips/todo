import { Button, Card, CardBody, Checkbox, Chip } from '@heroui/react';
import { RotateCcw } from 'lucide-react';

import { Task } from '@/types';

import { useAppStore } from '@/stores/app';

interface TaskCardProps {
  task: Task;
  dragProps?: any;
}

export function TaskCard({ task, dragProps }: TaskCardProps) {
  const { updateTask, tags, settings } = useAppStore(); // Use store instead of individual hooks

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
        style={{ touchAction: 'none' }}
        {...dragProps}
      >
        <div className="flex items-start gap-3">
          {/* Replace the existing checkbox div with this: */}
          <div onClick={(e) => e.stopPropagation()}>
            {task.deleted ? (
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                color="success"
                onPress={() => updateTask(task.id, { deleted: false })}
              >
                <RotateCcw size={16} />
              </Button>
            ) : (
              <Checkbox
                size="lg"
                isSelected={task.completed}
                onChange={(checked) =>
                  updateTask(task.id, { completed: checked.target.checked })
                }
              />
            )}
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
                    className={`${tag.color} gap-1 px-2 py-1`}
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
