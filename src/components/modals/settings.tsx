'use client';

import { useAppStore } from '@/stores/app';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  useDisclosure,
} from '@heroui/react';
import { LayoutGrid, List, Moon, Settings, Sun } from 'lucide-react';

import { useEffect, useState } from 'react';

export function SettingsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { settings, updateSettings } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themeOptions = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
  ];

  const viewModeOptions = [
    { key: 'compact', label: 'Compact', icon: List },
    { key: 'comfy', label: 'Comfortable', icon: LayoutGrid },
  ];

  return (
    <>
      <Button
        size="md"
        onPress={onOpen}
        startContent={<Settings size={20} />}
        className="hidden md:flex"
      >
        Settings
      </Button>

      <Button size="sm" onPress={onOpen} isIconOnly className="md:hidden">
        <Settings size={18} />
      </Button>

      <Modal
        size="md"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2">
                <Settings size={20} />
                Settings
              </ModalHeader>
              <ModalBody className="py-6">
                <div className="flex flex-col gap-6">
                  {/* Theme Selection */}
                  <div className="flex items-center justify-between">
                    <span className="text-medium font-medium">Theme</span>
                    <Select
                      variant="bordered"
                      className="w-40"
                      selectedKeys={[settings.theme]}
                      onChange={(e) =>
                        updateSettings({
                          theme: e.target.value as 'light' | 'dark',
                        })
                      }
                      disallowEmptySelection
                    >
                      {themeOptions.map((option) => (
                        <SelectItem
                          key={option.key}
                          startContent={<option.icon size={16} />}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {/* Hide Completed Tasks */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-medium font-medium">
                        Hide completed tasks
                      </span>
                      <span className="text-small text-default-500">
                        Hide tasks that are marked as complete
                      </span>
                    </div>
                    <Switch
                      size="sm"
                      isSelected={settings.hideCompleted}
                      onValueChange={(hideCompleted) =>
                        updateSettings({ hideCompleted })
                      }
                    />
                  </div>

                  {/* Hide Deleted Tasks */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-medium font-medium">
                        Hide deleted tasks
                      </span>
                      <span className="text-small text-default-500">
                        Hide tasks that are in the trash
                      </span>
                    </div>
                    <Switch
                      size="sm"
                      isSelected={settings.hideDeleted}
                      onValueChange={(hideDeleted) =>
                        updateSettings({ hideDeleted })
                      }
                    />
                  </div>

                  {/* View Mode Selection */}
                  <div className="flex items-center justify-between">
                    <span className="text-medium font-medium">View Mode</span>
                    <Select
                      variant="bordered"
                      className="w-40"
                      selectedKeys={[settings.viewMode]}
                      onChange={(e) =>
                        updateSettings({
                          viewMode: e.target.value as 'compact' | 'comfy',
                        })
                      }
                      disallowEmptySelection
                    >
                      {viewModeOptions.map((option) => (
                        <SelectItem
                          key={option.key}
                          startContent={<option.icon size={16} />}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
