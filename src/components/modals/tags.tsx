'use client';

import { useAppStore } from '@/stores/app';
import {
  Button,
  Chip,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from '@heroui/react';
import { Edit2, Plus, Tags, Trash2 } from 'lucide-react';

import { useEffect, useState } from 'react';

// Predefined options
const EMOJI_OPTIONS = [
  { key: '📋', label: '📋 Clipboard' },
  { key: '🚀', label: '🚀 Rocket' },
  { key: '💼', label: '💼 Briefcase' },
  { key: '🎯', label: '🎯 Target' },
  { key: '⚡', label: '⚡ Lightning' },
  { key: '🔥', label: '🔥 Fire' },
  { key: '💡', label: '💡 Bulb' },
  { key: '📝', label: '📝 Note' },
  { key: '🎨', label: '🎨 Palette' },
  { key: '🏠', label: '🏠 Home' },
  { key: '💻', label: '💻 Computer' },
  { key: '📚', label: '📚 Books' },
  { key: '🛒', label: '🛒 Shopping' },
  { key: '🏋️', label: '🏋️ Exercise' },
  { key: '🍽️', label: '🍽️ Food' },
  { key: '✈️', label: '✈️ Travel' },
];

const COLOR_OPTIONS = [
  { label: 'Red', color: 'bg-red-800' },
  { label: 'Orange', color: 'bg-orange-800' },
  { label: 'Yellow', color: 'bg-yellow-800' },
  { label: 'Green', color: 'bg-green-800' },
  { label: 'Blue', color: 'bg-blue-800' },
  { label: 'Indigo', color: 'bg-indigo-800' },
  { label: 'Purple', color: 'bg-purple-800' },
  { label: 'Pink', color: 'bg-pink-800' },
  { label: 'Gray', color: 'bg-gray-800' },
  { label: 'Slate', color: 'bg-slate-800' },
];

export function TagsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { tags, addTag, updateTag, deleteTag } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New tag form state
  const [newTagTitle, setNewTagTitle] = useState('');
  const [newTagEmoji, setNewTagEmoji] = useState('📋');
  const [newTagColor, setNewTagColor] = useState('blue');

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editEmoji, setEditEmoji] = useState('');
  const [editColor, setEditColor] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAddTag = () => {
    if (newTagTitle.trim()) {
      addTag({
        title: newTagTitle.trim(),
        emoji: newTagEmoji,
        color: newTagColor,
      });
      // Reset form
      setNewTagTitle('');
      setNewTagEmoji('📋');
      setNewTagColor('blue');
    }
  };

  const startEdit = (tag: any) => {
    setEditingId(tag.id);
    setEditTitle(tag.title);
    setEditEmoji(tag.emoji);
    setEditColor(tag.color);
  };

  const saveEdit = () => {
    if (editingId && editTitle.trim()) {
      updateTag(editingId, {
        title: editTitle.trim(),
        emoji: editEmoji,
        color: editColor,
      });
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <>
      <Button size="md" onPress={onOpen} startContent={<Tags size={20} />}>
        Tags
      </Button>

      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2">
                <Tags size={20} />
                Manage Tags
              </ModalHeader>
              <ModalBody className="py-6">
                <div className="flex flex-col gap-6">
                  {/* Add New Tag Section */}
                  <div className="bg-default-50 flex flex-col gap-4 rounded-lg p-4">
                    <h3 className="text-medium font-semibold">Add New Tag</h3>

                    <div className="flex flex-col gap-3">
                      <Input
                        variant="bordered"
                        placeholder="Tag title"
                        value={newTagTitle}
                        onChange={(e) => setNewTagTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                      />

                      <div className="flex gap-3">
                        <Select
                          variant="bordered"
                          label="Emoji"
                          className="flex-1"
                          selectedKeys={[newTagEmoji]}
                          onChange={(e) => setNewTagEmoji(e.target.value)}
                          disallowEmptySelection
                        >
                          {EMOJI_OPTIONS.map((option) => (
                            <SelectItem key={option.key}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </Select>

                        <Select
                          variant="bordered"
                          label="Color"
                          className="flex-1"
                          selectedKeys={[newTagColor]}
                          onChange={(e) => setNewTagColor(e.target.value)}
                          disallowEmptySelection
                        >
                          {COLOR_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.color}
                              startContent={
                                <div
                                  className={`h-3 w-3 rounded-full ${option.color}`}
                                />
                              }
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      <Button
                        color="primary"
                        startContent={<Plus size={16} />}
                        onPress={handleAddTag}
                        isDisabled={!newTagTitle.trim()}
                      >
                        Add Tag
                      </Button>
                    </div>
                  </div>

                  {/* Existing Tags */}
                  {tags.length > 0 && (
                    <>
                      <Divider />
                      <div className="flex flex-col gap-4">
                        <h3 className="text-medium font-semibold">Your Tags</h3>

                        <div className="flex flex-col gap-3">
                          {tags.map((tag) => (
                            <div
                              key={tag.id}
                              className="border-default-200 flex items-center justify-between rounded-lg border p-3"
                            >
                              {editingId === tag.id ? (
                                // Edit Mode
                                <div className="flex flex-1 flex-col gap-3">
                                  <Input
                                    variant="bordered"
                                    size="sm"
                                    value={editTitle}
                                    onChange={(e) =>
                                      setEditTitle(e.target.value)
                                    }
                                  />

                                  <div className="flex gap-2">
                                    <Select
                                      variant="bordered"
                                      size="sm"
                                      className="flex-1"
                                      selectedKeys={[editEmoji]}
                                      onChange={(e) =>
                                        setEditEmoji(e.target.value)
                                      }
                                      disallowEmptySelection
                                    >
                                      {EMOJI_OPTIONS.map((option) => (
                                        <SelectItem key={option.key}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </Select>

                                    <Select
                                      variant="bordered"
                                      size="sm"
                                      className="flex-1"
                                      selectedKeys={[editColor]}
                                      onChange={(e) =>
                                        setEditColor(e.target.value)
                                      }
                                      disallowEmptySelection
                                    >
                                      {COLOR_OPTIONS.map((option) => (
                                        <SelectItem
                                          key={option.color}
                                          startContent={
                                            <div
                                              className={`h-3 w-3 rounded-full ${option.color}`}
                                            />
                                          }
                                        >
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </Select>
                                  </div>

                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      color="success"
                                      onPress={saveEdit}
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="light"
                                      onPress={cancelEdit}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                // View Mode
                                <>
                                  <div className="flex items-center gap-3">
                                    <Chip
                                      color={tag.color as any}
                                      variant="flat"
                                      startContent={<span>{tag.emoji}</span>}
                                    >
                                      {tag.title}
                                    </Chip>
                                  </div>

                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="light"
                                      isIconOnly
                                      onPress={() => startEdit(tag)}
                                    >
                                      <Edit2 size={14} />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="light"
                                      color="danger"
                                      isIconOnly
                                      onPress={() => deleteTag(tag.id)}
                                    >
                                      <Trash2 size={14} />
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
