'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function LightPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/explore');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return <div className="bg-base bg-light min-h-screen"></div>;
}
