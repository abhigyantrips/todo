'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { Download, Smartphone, X } from 'lucide-react';

import { useResponsiveModalSize } from '@/lib/hooks';

interface InstallAppModalProps {
  isOpen: boolean;
  onInstall: () => void;
  onDismiss: () => void;
  onClose: () => void;
}

export function InstallAppModal({
  isOpen,
  onInstall,
  onDismiss,
  onClose,
}: InstallAppModalProps) {
  const modalSize = useResponsiveModalSize();

  const handleInstall = () => {
    onInstall();
    onClose();
  };

  const handleDismiss = () => {
    onDismiss();
    onClose();
  };

  return (
    <Modal
      size={modalSize || 'sm'}
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      hideCloseButton
      isDismissable={false}
      isKeyboardDismissDisabled
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col items-center gap-2 pb-2">
            <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
              <Smartphone size={32} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold">Install Application</h2>
          </ModalHeader>

          <ModalBody className="text-center">
            <div className="space-y-4">
              <p className="text-default-600">
                Get quick access to your tasks right from your home screen!
              </p>

              <div className="bg-default-50 space-y-3 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-success/20 flex h-8 w-8 items-center justify-center rounded-full">
                    <Download size={16} className="text-success" />
                  </div>
                  <span className="text-sm">Works offline</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-success/20 flex h-8 w-8 items-center justify-center rounded-full">
                    <Smartphone size={16} className="text-success" />
                  </div>
                  <span className="text-sm">Native app experience</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-success/20 flex h-8 w-8 items-center justify-center rounded-full">
                    <X size={16} className="text-success" />
                  </div>
                  <span className="text-sm">No app store required</span>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="flex-col gap-2">
            <Button
              color="success"
              onPress={handleInstall}
              startContent={<Download size={16} />}
              className="w-full"
            >
              Install App
            </Button>

            <div className="flex w-full gap-2">
              <Button variant="light" onPress={onClose} className="flex-1">
                Maybe Later
              </Button>

              <Button
                variant="light"
                color="danger"
                onPress={handleDismiss}
                className="flex-1"
              >
                Don't Ask Again
              </Button>
            </div>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
