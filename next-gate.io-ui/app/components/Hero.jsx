import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineMessage } from 'react-icons/ai';
import { FaGift } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { GrBitcoin } from 'react-icons/gr';
import { heroData } from '../constants/index.jsx';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-[24px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="lg:col-span-1 max-lg:w-full max-xl:w-[340px] pt-[32px]  lg:pt-[120px]">
          <div className="flex flex-col gap-2 lg:gap-4">
            <h1 className="text-[28px] lg:text-5xl font-bold">
              Gateway to Crypto
            </h1>
            <p className="font-semibold text-gray-700">
              Trade over 1,700 cryptocurrencies safely, quickly, and easily
            </p>

            <p className="flex gap-2 items-center text-gray-400">
              <FaGift />
              <span>Sign up and win up to $6666 in welcome rewards</span>
            </p>

            <div className="flex max-xl:flex-col gap-[20px]">
              <form className="group flex rounded-md overflow-hidden  max-lg:w-full">
                <input
                  className="flex-1 outline-none rounded-l-md focus:bg-white focus:border-dblue group-hover:bg-white border group-hover:border-dblue p-4 bg-gray-200"
                  placeholder="Email or Phone"
                  type="text"
                />
                <button className="bg-dblue text-white font-bold px-2 md:px-8 py-4 lg:px-4 hover:brightness-75 text-nowrap rounded-md w-full">
                  Sign Up
                </button>
              </form>

              <div className="lg:hidden flex gap-3 items-center my-4">
                <div className="flex-1 h-[0.5px] bg-gray-300" />
                <span className="text-gray-400">OR</span>
                <div className="flex-1 h-[0.5px] bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 bg-gray-200 text-2xl rounded-md flex justify-center">
                  <FaApple />
                </button>
                <button className="p-4 bg-gray-200 text-2xl rounded-md flex justify-center">
                  <FcGoogle />
                </button>
                <button className="p-4 bg-gray-200 text-2xl rounded-md flex justify-center">
                  <GrBitcoin />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5 mt-[80px] max-md:grid-cols-2 max-lg:grid-cols-4 max-xl:grid-cols-2">
            {heroData.map((i, index) => (
              <div key={index}>
                <h1 className="text-2xl font-bold">
                  {i.value}
                  {i.unit && <span className="text-sm">{i.unit}</span>}
                </h1>
                <p className="text-xs text-nowrap text-gray-500">
                  {i.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 flex max-lg:hidden">
          <img
            className="w-[573px] h-[616px] object-contain"
            src="/slide_1.png"
            alt=""
          />

          <div className="self-end pb-[100px] flex flex-col gap-2 items-center">
            <button className="p-2 bg-gray-200 text-2xl hover:bg-gray-300 rounded">
              <IoIosArrowUp />
            </button>
            <span className="text-4xl text-gray-400 font-extrabold">1</span>
            <span className="text-lg text-gray-300 font-semibold">10</span>
            <button className="p-2 bg-gray-200 text-2xl hover:bg-gray-300 rounded">
              <IoIosArrowDown />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 bg-gray-100 p-3 items-center rounded border mt-[50px] lg:mt-[100px]">
        <AiOutlineMessage />

        <div className="w-full flex gap-4">
          <p className="flex-1 line-clamp-1">
            GateLive Live Mining Program - Bonuses Distribution Announcement
            (March 4-March 10）
          </p>
          |
          <p className="flex-1 line-clamp-1">
            Gate.io Startup Free Offering: IQ50 (IQ50) and Announcement of Free
            Distribution Rules( 1,600,000,000 IQ50 free of charge)
          </p>
        </div>

        <GiHamburgerMenu />
      </div>
    </section>
  );
};

export default Hero;
