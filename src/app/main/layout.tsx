// import Header from '@/components/Header';

import Header from '@/components/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base bg-main">
      <Header />
      <main>{children}</main>
    </div>
  );
}
