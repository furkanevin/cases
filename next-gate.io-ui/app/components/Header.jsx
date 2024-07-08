import Image from 'next/image';
import { options } from '../constants/index.jsx';
import { BsArrowDownSquare } from 'react-icons/bs';
import { TfiWorld } from 'react-icons/tfi';
import { MdNightlight } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  return (
    <header className="bg-[#0c0c0f] flex justify-between px-[24px] py-[20px] gap-[50px] text-white sticky top-0 z-[9999999]">
      <div className="max-w-[1200px] flex gap-5 items-center overflow-hidden">
        <Image
          width={120}
          height={24}
          src="/gate_logo.png"
          alt="logo"
          className="pe-[8px]"
        />

        <div className="flex items-center gap-2 text-nowrap max-md:hidden">
          <div className="flex border border-dblue text-[12px] rounded-[4px]">
            <button className="bg-dblue py-[5px] px-3 rounded-r-[4px]">
              Exchange
            </button>
            <button className="bg-gray-800 py-[5px] px-3">Web3</button>
          </div>

          <div className="flex items-center gap-5 max-lg:hidden">
            {options.map((i,index) => (
              <a
                key={index}
                href="#"
                className="hover:text-dblue text-[14px] font-semibold"
              >
                {i.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center text-nowrap gap-4 col-span-1 text-[14px] font-bold">
        <button className="max-sm:bg-dblue p-1 rounded">Log In</button>
        <button className="bg-dblue p-1 rounded max-sm:hidden">Sign Up</button>
        <div className="flex gap-3">
          <BsArrowDownSquare className="hover:text-dblue cursor-pointer text-[22px]" />
          <TfiWorld className="hover:text-dblue cursor-pointer text-[22px] max-xl:hidden" />
          <MdNightlight className="hover:text-dblue cursor-pointer text-[22px] max-xl:hidden" />
          <IoSettings className="hover:text-dblue cursor-pointer text-[22px] max-xl:hidden" />
          <CiSearch className="hover:text-dblue cursor-pointer text-[22px]" />
          <GiHamburgerMenu className="hover:text-dblue cursor-pointer text-[22px] hidden max-xl:block" />
        </div>
      </div>
    </header>
  );
};

export default Header;
