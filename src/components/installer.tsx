'use client';

import { useEffect, useState } from 'react';

import { usePWAInstall } from '@/lib/hooks';

import { InstallAppModal } from '@/components/modals/install';

export function PWAInstallManager() {
  const { isInstallable, installApp, dismissInstallPrompt } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isInstallable) {
      // Show modal after a short delay to not overwhelm the user immediately
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000); // 3 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isInstallable]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleInstall = () => {
    installApp();
    setShowModal(false);
  };

  const handleDismiss = () => {
    dismissInstallPrompt();
    setShowModal(false);
  };

  return (
    <InstallAppModal
      isOpen={showModal}
      onInstall={handleInstall}
      onDismiss={handleDismiss}
      onClose={handleClose}
    />
  );
}
