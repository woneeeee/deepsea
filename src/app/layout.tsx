// import localFont from 'next/font/local';
import './globals.css';

// const pretendard = localFont({
//   src: '../../public/fonts/PretendardVariable.woff2',
//   variable: '--font-pretendard',
//   display: 'swap',
// });

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
      <body className="min-h-screen bg-cover bg-center bg-no-repeat">{children}</body>
    </html>
  );
}
