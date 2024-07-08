'use client';
import { cardData, startupData } from '../../constants';
import Card from './Card';
import Title from '../Title';
import { useState } from 'react';
import { SlArrowRight } from 'react-icons/sl';

const Startup = () => {
  const [index, setIndex] = useState(1);

  return (
    <section className="bg-black mt-[120px] text-white">
      <div className="max-w-7xl mx-auto px-[24px] py-[40px]">
        <div className="flex overflow-auto w-full lg:w-fit mx-auto bg-gray-800 p-2 rounded-md text-gray-400">
          {startupData.map((text, i) => (
            <button
              className={`${
                i == 0 && 'bg-gray-700 text-white'
              } rounded-md font-bold px-3 py-2 text-nowrap hover:text-dblue`}
            >
              {text}
            </button>
          ))}
        </div>

        <div className="flex max-lg:flex-col-reverse  pt-[110px] lg:gap-20">
          <div className="justify-center flex-1 flex flex-col gap-5">
            <Title>Startup</Title>

            <p className="text-gray-400">
              Launchpad for new crypto projects. Be the earliest to receive
              crypto airdrops via Gate Startup
            </p>

            <div className="bg-zinc-900 p-6 rounded-md">
              <h3 className="font-bold mb-4">ATH ROI</h3>
              <div className="flex max-xl:flex-col gap-6">
                <div>
                  <p className="text-green-500 font-bold text-2xl">8833.8%</p>
                  <p className="text-sm text-gray-500">PixeVerse(PIXEL)</p>
                </div>

                <div>
                  <p className="text-green-500 font-bold text-2xl">8600.0%</p>
                  <p className="text-sm text-gray-500">Defi Land(DEFILAND)</p>
                </div>

                <div>
                  <p className="text-green-500 font-bold text-2xl">8250.0%</p>
                  <p className="text-sm text-gray-500">PixeVerse(PIXEL)</p>
                </div>
              </div>
            </div>

            <button className="w-fit bg-dblue  py-2 px-5 font-bold rounded-md hover:bg-blue-700 max-lg:w-full">
              Claim Free Airdrops
            </button>
          </div>

          <div className="w-full flex-1 cards-wrapper p-5 max-lg:flex max-lg:overflow-auto max-lg:gap-10 max-lg:mb-10">
            {cardData.map((item, i) => (
              <Card key={i} item={item} active={i + 1 === index} />
            ))}
          </div>

          <button
            className="h-fit m-auto bg-gray-500 text-white p-2 rounded-md max-lg:hidden"
            onClick={() => setIndex(index === 3 ? 1 : index + 1)}
          >
            <SlArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Startup;
