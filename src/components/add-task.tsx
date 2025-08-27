'use client';

import { Button, useDisclosure } from '@heroui/react';
import { Plus } from 'lucide-react';

import { AddTaskModal } from '@/components/modals/tasks';

export function AddTaskButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="success"
        size="lg"
        onPress={onOpen}
        startContent={<Plus size={20} />}
        className="absolute right-8 bottom-8 z-10 hidden rounded-full px-4 py-3 shadow-lg md:flex"
      >
        Add New Task
      </Button>

      <Button
        color="success"
        isIconOnly
        onPress={onOpen}
        className="absolute right-6 bottom-6 z-10 rounded-full shadow-lg md:hidden"
      >
        <Plus size={20} />
      </Button>

      <AddTaskModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
