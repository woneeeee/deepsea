'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleBackToStart = () => {
    localStorage.clear();
    router.push('/');
    setIsMenuOpen(false);
  };

  const menuItems = [
    { icon: '/icons/backtostart.svg', onClick: handleBackToStart, closeOnClick: true },
    { icon: '/icons/bgm.svg', onClick: () => {}, closeOnClick: false },
    { icon: '/icons/about.svg', onClick: () => {}, closeOnClick: true },
    { icon: '/icons/credit.svg', onClick: () => {}, closeOnClick: true },
  ];

  return (
    <>
      <header className="flex h-[80px] items-center justify-between px-[30px]">
        <div onClick={handleBackToStart} className="flex gap-1">
          <p className="cheo mt-1.5 text-white">심해</p>
          <Image src={'/icons/header-title.svg'} width={43} height={27} alt="header" />
        </div>
        <button onClick={toggleMenu} className="cursor-pointer">
          <Image src={'/icons/gnb.svg'} width={24} height={24} alt="GNB" />
        </button>
      </header>

      <>
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={toggleMenu}
        />

        <div
          className={`fixed top-0 right-0 z-50 h-full px-[88px] py-[64px] transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ width: '400px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full flex-col gap-[48px] pt-[64px]">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  if (item.closeOnClick) {
                    setIsMenuOpen(false);
                  }
                }}
                className="flex items-center gap-4 transition-opacity hover:opacity-70"
              >
                <Image src={item.icon} alt={item.icon} width={200} height={40} />
              </button>
            ))}
          </div>
        </div>
      </>
    </>
  );
};

export default Header;
