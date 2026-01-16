'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  content: ReactNode | null;
  emotionIndex: number | null;
  openModal: (content: ReactNode, emotionIndex?: number) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [emotionIndex, setEmotionIndex] = useState<number | null>(null);

  const openModal = (modalContent: ReactNode, emotionIdx?: number) => {
    setContent(modalContent);
    setEmotionIndex(emotionIdx ?? null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
    setEmotionIndex(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, emotionIndex, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
