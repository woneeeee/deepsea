// import localFont from 'next/font/local';
import './globals.css';
import { ModalProvider } from '@/contexts/ModalContext';
import Modal from '@/components/Modal';

export const metadata = {
  title: 'DEEPSEA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-cover bg-center bg-no-repeat">
        <ModalProvider>
          {children}
          <Modal />
        </ModalProvider>
      </body>
    </html>
  );
}
