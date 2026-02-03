'use client';

import { useState, useEffect, useCallback } from 'react';
import ExploreModal from '@/components/ExploreModal';

declare global {
  interface Window {
    __openExploreModal?: () => void;
  }
}

export default function ExploreModalListener() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    window.__openExploreModal = open;
    return () => {
      delete window.__openExploreModal;
    };
  }, [open]);

  return (
    <ExploreModal
      isOpen={isOpen}
      onContinue={() => setIsOpen(false)}
      onEnd={() => setIsOpen(false)}
    />
  );
}

export function openExploreModal() {
  if (typeof window !== 'undefined' && window.__openExploreModal) {
    window.__openExploreModal();
  }
}
