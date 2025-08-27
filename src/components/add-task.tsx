'use client';

import { Button, useDisclosure } from '@heroui/react';
import { Plus } from 'lucide-react';

import { AddTaskModal } from '@/components/modals/add-task';

export function AddTaskButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        size="lg"
        onPress={onOpen}
        startContent={<Plus size={20} />}
        className="absolute right-6 bottom-6 z-10 rounded-full px-4 py-3 shadow-lg md:right-8 md:bottom-8"
      >
        Add New Task
      </Button>

      <AddTaskModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
