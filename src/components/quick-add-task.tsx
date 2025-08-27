'use client';

import { Button, Input } from '@heroui/react';
import { Plus } from 'lucide-react';

import { useState } from 'react';

import { useTasks } from '@/contexts/tasks';

export function QuickAddTask() {
  const { addTask } = useTasks();
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      addTask({
        text: text.trim(),
        description: '',
        priority: 'medium',
        tagIds: [],
        completed: false,
        deleted: false,
      });
      setText('');
    }
  };

  return (
    <div className="flex gap-2 p-4">
      <Input
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        className="flex-1"
      />
      <Button
        color="primary"
        onPress={handleAdd}
        startContent={<Plus size={16} />}
      >
        Add
      </Button>
    </div>
  );
}
