'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { Download, Smartphone } from 'lucide-react';

import { useEffect, useState } from 'react';

import { useResponsiveModalSize } from '@/lib/hooks';

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const modalSize = useResponsiveModalSize();

  useEffect(() => {
    // Check if user previously dismissed
    const isDismissed =
      localStorage.getItem('pwa-install-dismissed') === 'true';
    setDismissed(isDismissed);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);

      // Show modal after 3 seconds if not dismissed
      if (!isDismissed) {
        setTimeout(() => setShowModal(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      const { outcome } = await (deferredPrompt as any).userChoice;
      setDeferredPrompt(null);
      setIsInstallable(false);
      setShowModal(false);
      console.log(`User response to the install prompt: ${outcome}`);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', 'true');
    setDismissed(true);
    setShowModal(false);
  };

  return (
    <Modal
      size={modalSize || 'sm'}
      isOpen={showModal && isInstallable && !dismissed}
      onClose={() => setShowModal(false)}
      placement="center"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col items-center gap-2">
            <Smartphone size={32} className="text-primary" />
            <h2 className="text-lg font-bold">Install TaskMaster 5000</h2>
          </ModalHeader>

          <ModalBody className="text-center">
            <p className="text-default-600">
              Install our app for quick access and offline usage!
            </p>
          </ModalBody>

          <ModalFooter className="flex-col gap-2">
            <Button
              color="success"
              onPress={handleInstallClick}
              startContent={<Download size={16} />}
              className="w-full"
            >
              Install App
            </Button>

            <div className="flex w-full gap-2">
              <Button
                variant="light"
                onPress={() => setShowModal(false)}
                className="flex-1"
              >
                Later
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
