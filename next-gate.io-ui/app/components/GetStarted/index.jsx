import { getStartedData } from '@/app/constants';
import Title from './../Title';
import Image from 'next/image';

const GetStarted = () => {
  return (
    <section className="max-w-7xl mx-auto px-[24px] ">
      <Title>How to Get Started</Title>

      <div className="w-full flex gap-2 max-lg:flex-col mt-8">
        {getStartedData.map((item, i) => (
          <div
            key={i}
            className="w-full flex flex-row items-center lg:flex-col gap-3 border border-gray-300 p-3 hover:bg-gray-100 hover:shadow-xl cursor-pointer rounded-md max-md:flex-col "
          >
            <div className="w-full flex flex-row  lg:flex-col">
              <Image src={item.icon} width={72} height={72} alt="icon" />
              <div>
                <h1 className="text-lg font-bold">{item.title}</h1>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>

            <div className="flex justify-end lg:justify-start w-full gap-2">
              {item.buttons.map((text, i) => (
                <button
                  className="bg-dblue text-white font-semibold py-1 px-2 rounded-md text-nowrap max-md:w-full"
                  key={i}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetStarted;
