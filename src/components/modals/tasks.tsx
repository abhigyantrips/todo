'use client';

import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@heroui/react';
import { Plus, Search, X } from 'lucide-react';

import { useMemo, useState } from 'react';

import { useAppStore } from '@/stores/app';

import { useResponsiveModalSize } from '@/lib/hooks';

interface AddTaskModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
}

const priorityOptions = [
  { key: 'low', label: 'Low', color: 'success' },
  { key: 'medium', label: 'Medium', color: 'warning' },
  { key: 'high', label: 'High', color: 'danger' },
];

export function AddTaskModal({
  isOpen,
  onOpen,
  onOpenChange,
}: AddTaskModalProps) {
  const modalSize = useResponsiveModalSize();
  const { addTask, tags } = useAppStore();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState('');

  // Filter tags based on search
  const filteredTags = useMemo(() => {
    if (!tagSearch) return tags;
    return tags.filter(
      (tag) =>
        tag.title.toLowerCase().includes(tagSearch.toLowerCase()) ||
        tag.emoji.includes(tagSearch)
    );
  }, [tags, tagSearch]);

  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id));

  const handleAddTask = () => {
    if (!title.trim()) return;

    addTask({
      text: title.trim(),
      description: description.trim(),
      priority,
      tagIds: selectedTagIds,
      completed: false,
      deleted: false,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setSelectedTagIds([]);
    setTagSearch('');

    onOpenChange(false);
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTagIds((prev) => prev.filter((id) => id !== tagId));
  };

  const handleClose = () => {
    // Reset form when closing
    setTitle('');
    setDescription('');
    setPriority('medium');
    setSelectedTagIds([]);
    setTagSearch('');
    onOpenChange(false);
  };

  return (
    <Modal
      size={modalSize || 'md'}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleClose}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <Plus size={20} />
              Add New Task
            </ModalHeader>

            <ModalBody className="py-6">
              <div className="flex flex-col gap-6">
                {/* Title Input */}
                <Input
                  label="Task Title"
                  placeholder="Enter task title..."
                  variant="bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isRequired
                  autoFocus
                />

                {/* Description Input */}
                <Textarea
                  label="Description"
                  placeholder="Add a description (optional)..."
                  variant="bordered"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minRows={3}
                  maxRows={6}
                />

                {/* Priority Selection */}
                <Select
                  label="Priority"
                  variant="bordered"
                  selectedKeys={[priority]}
                  onChange={(e) => setPriority(e.target.value as any)}
                  disallowEmptySelection
                >
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.key} textValue={option.label}>
                      <div className="flex items-center gap-2">
                        <Chip
                          size="sm"
                          color={option.color as any}
                          variant="flat"
                        >
                          {option.label}
                        </Chip>
                      </div>
                    </SelectItem>
                  ))}
                </Select>

                {/* Selected Tags Display */}
                {selectedTags.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Selected Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Chip
                          key={tag.id}
                          variant="flat"
                          startContent={<span>{tag.emoji}</span>}
                          className={`${tag.color} gap-1 px-2 py-1`}
                          endContent={
                            <button
                              className="hover:text-danger ml-1"
                              onClick={() => handleRemoveTag(tag.id)}
                            >
                              <X size={14} />
                            </button>
                          }
                        >
                          {tag.title}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tag Search and Selection */}
                {tags.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <Input
                      label="Search Tags"
                      placeholder="Search for tags to add..."
                      variant="bordered"
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                      startContent={<Search size={16} />}
                      isClearable
                      onClear={() => setTagSearch('')}
                    />

                    {/* Available Tags */}
                    {filteredTags.length > 0 && (
                      <div className="border-default-200 max-h-40 overflow-y-auto rounded-lg border p-3">
                        <div className="flex flex-wrap gap-2">
                          {filteredTags.map((tag) => {
                            const isSelected = selectedTagIds.includes(tag.id);
                            return (
                              <Chip
                                key={tag.id}
                                variant={isSelected ? 'solid' : 'flat'}
                                startContent={<span>{tag.emoji}</span>}
                                className={`cursor-pointer transition-opacity ${tag.color} text-default-900 gap-1 px-2 py-1 ${
                                  isSelected
                                    ? 'opacity-100'
                                    : 'opacity-70 hover:opacity-100'
                                }`}
                                onClick={() => handleTagToggle(tag.id)}
                              >
                                {tag.title}
                              </Chip>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {filteredTags.length === 0 && tagSearch && (
                      <p className="text-default-500 py-4 text-center text-sm">
                        No tags found matching "{tagSearch}"
                      </p>
                    )}
                  </div>
                )}

                {/* No tags message */}
                {tags.length === 0 && (
                  <div className="py-4 text-center">
                    <p className="text-default-500 text-sm">
                      No tags available. Create some tags first to organize your
                      tasks!
                    </p>
                  </div>
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={handleClose}>
                Cancel
              </Button>
              <Button
                color="success"
                onPress={handleAddTask}
                isDisabled={!title.trim()}
                startContent={<Plus size={16} />}
              >
                Add Task
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
