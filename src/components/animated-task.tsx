'use client';

import { Variants, motion } from 'framer-motion';

import { Task } from '@/types';

import { SortableTask } from '@/components/sortable-task';
import { TaskCard } from '@/components/task-card';

interface AnimatedTaskProps {
  task: Task;
  isDraggable?: boolean;
  dragProps?: any;
}

const taskVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

export function AnimatedTask({
  task,
  isDraggable = false,
  dragProps,
}: AnimatedTaskProps) {
  return (
    <motion.div
      layout
      variants={taskVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layoutId={task.id}
    >
      {isDraggable ? (
        <SortableTask task={task} />
      ) : (
        <TaskCard task={task} dragProps={dragProps} />
      )}
    </motion.div>
  );
}
