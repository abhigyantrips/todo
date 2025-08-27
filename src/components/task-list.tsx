'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
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
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';

import { useState } from 'react';

import { Task } from '@/types';

import { useAppStore } from '@/stores/app';

import { sortTasks } from '@/lib/utils';

import { AnimatedTask } from '@/components/animated-task';
import { TaskCard } from '@/components/task-card';

export function TasksList() {
  const {
    tasks,
    updateTask,
    deleteTask,
    reorderTasks,
    settings,
    sortBy,
    sortOrder,
    setSorting,
  } = useAppStore();

  const [isDragging, setIsDragging] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [completedExpanded, setCompletedExpanded] = useState(false);
  const [deletedExpanded, setDeletedExpanded] = useState(false);

  // Filter and sort tasks
  const activeTasks = sortTasks(
    tasks.filter((task) => !task.deleted && !task.completed),
    sortBy,
    sortOrder
  );
  const completedTasks = tasks.filter(
    (task) => task.completed && !task.deleted
  );
  const deletedTasks = tasks.filter((task) => task.deleted);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
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

    if (over.id === 'delete-region') {
      deleteTask(active.id as string);
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = activeTasks.findIndex((task) => task.id === active.id);
      const newIndex = activeTasks.findIndex((task) => task.id === over.id);
      const reorderedActiveTasks = arrayMove(activeTasks, oldIndex, newIndex);

      // Merge with other tasks
      const otherTasks = tasks.filter((task) => task.deleted || task.completed);
      reorderTasks([...reorderedActiveTasks, ...otherTasks]);
    }
  };

  const handleRecover = (taskId: string) => {
    updateTask(taskId, { deleted: false });
  };

  const sortOptions = [
    { key: 'createdAt', label: 'Created Date' },
    { key: 'name', label: 'Name' },
    { key: 'priority', label: 'Priority' },
  ];

  return (
    <div className="space-y-4 p-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Current Tasks Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-2">
            <h2 className="text-default-600 m-0 text-sm font-bold tracking-wide uppercase">
              Current Tasks ({activeTasks.length})
            </h2>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  size="sm"
                  startContent={<ArrowUpDown size={14} />}
                  endContent={<ChevronDown size={14} />}
                >
                  {sortOptions.find((opt) => opt.key === sortBy)?.label}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort tasks"
                onAction={(key) => setSorting(key as any)}
              >
                {sortOptions.map((option) => (
                  <DropdownItem key={option.key}>{option.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </CardHeader>

          <CardBody className={`pt-0 ${activeTasks.length === 0 ? 'p-0' : ''}`}>
            <SortableContext
              items={activeTasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {activeTasks.map((task) => (
                    <AnimatedTask key={task.id} task={task} isDraggable />
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          </CardBody>
        </Card>

        {/* Completed Tasks Card */}
        {!settings.hideCompleted && completedTasks.length > 0 && (
          <Card>
            <CardHeader
              className="hover:bg-default-50 cursor-pointer"
              onClick={() => setCompletedExpanded(!completedExpanded)}
            >
              <div className="flex items-center gap-2">
                {completedExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                <h2 className="text-default-600 m-0 text-sm font-bold tracking-wide uppercase">
                  Completed Tasks ({completedTasks.length})
                </h2>
              </div>
            </CardHeader>

            <AnimatePresence>
              {completedExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <CardBody className="pt-0">
                    <div className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {completedTasks.map((task) => (
                          <AnimatedTask key={task.id} task={task} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardBody>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        )}

        {/* Deleted Tasks Card */}
        {!settings.hideDeleted && deletedTasks.length > 0 && (
          <Card>
            <CardHeader
              className="hover:bg-default-50 cursor-pointer"
              onClick={() => setDeletedExpanded(!deletedExpanded)}
            >
              <div className="flex items-center gap-2">
                {deletedExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                <h2 className="text-default-600 m-0 text-sm font-bold tracking-wide uppercase">
                  Deleted Tasks ({deletedTasks.length})
                </h2>
              </div>
            </CardHeader>

            <AnimatePresence>
              {deletedExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <CardBody className="pt-0">
                    <div className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {deletedTasks.map((task) => (
                          <AnimatedTask key={task.id} task={task} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardBody>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        )}

        {/* Delete Region */}
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

// Delete Region Component (keep existing)
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
      }`}
    >
      <Trash2 size={20} />
      <span className="font-medium">Delete</span>
    </div>
  );
}
