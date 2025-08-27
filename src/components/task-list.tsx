'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Trash2 } from 'lucide-react';

import { useState } from 'react';

import { useSettings } from '@/contexts/settings';
import { Task, useTasks } from '@/contexts/tasks';

import { SortableTask } from '@/components/sortable-task';
import { TaskCard } from '@/components/task-card';

export function TasksList() {
  const { tasks, deleteTask, reorderTasks } = useTasks();
  const { settings } = useSettings();
  const [isDragging, setIsDragging] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Filter tasks based on settings
  const activeTasks = tasks.filter((task) => !task.deleted && !task.completed);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    const activeTaskData = activeTasks.find(
      (task) => task.id === event.active.id
    );
    setActiveTask(activeTaskData || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    // Check if dropped on delete region
    if (over.id === 'delete-region') {
      deleteTask(active.id as string);
      return;
    }

    // Handle reordering within the list
    if (active.id !== over.id) {
      const oldIndex = activeTasks.findIndex((task) => task.id === active.id);
      const newIndex = activeTasks.findIndex((task) => task.id === over.id);

      const reorderedTasks = arrayMove(activeTasks, oldIndex, newIndex);

      // Merge back with other tasks (completed, deleted) maintaining their positions
      const otherTasks = tasks.filter(
        (task) =>
          task.deleted ||
          task.completed ||
          (task.deleted && settings.hideDeleted) ||
          (task.completed && settings.hideCompleted)
      );

      reorderTasks([...reorderedTasks, ...otherTasks]);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Main Tasks Container */}
        <div className="flex-1 p-4">
          <SortableContext
            items={activeTasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {activeTasks.map((task) => (
                <SortableTask key={task.id} task={task} />
              ))}
            </div>
          </SortableContext>
        </div>

        {/* Delete Region - Only shows when dragging */}
        {isDragging && <DeleteRegion />}

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask && (
            <div className="opacity-80">
              <TaskCard task={activeTask} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// Delete Region Component
function DeleteRegion() {
  const { useDroppable } = require('@dnd-kit/core');
  const { isOver, setNodeRef } = useDroppable({
    id: 'delete-region',
  });

  return (
    <div
      ref={setNodeRef}
      className={`fixed bottom-6 left-1/2 flex -translate-x-1/2 transform items-center gap-2 rounded-xl border-2 border-dashed px-6 py-4 transition-colors ${
        isOver
          ? 'border-danger bg-danger/20 text-danger'
          : 'border-default-300 bg-background/80 backdrop-blur-sm'
      } `}
    >
      <Trash2 size={20} />
      <span className="font-medium">Drop to delete</span>
    </div>
  );
}
