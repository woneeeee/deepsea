import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex h-[80px] items-center justify-between px-[30px]">
      <div className="flex gap-1">
        <p className="cheo mt-1.5 text-white">심해</p>
        <Image src={'/icons/header-title.svg'} width={43} height={27} alt="header" />
      </div>
      <Image src={'/icons/gnb.svg'} width={24} height={24} alt="GNB" />
    </header>
  );
};

export default Header;
