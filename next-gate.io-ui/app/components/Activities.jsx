'use client';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { sliderData } from '../constants/index.jsx';
import Title from './Title';
import Image from 'next/image';

const Activities = () => {
  return (
    <section className="max-w-7xl mx-auto px-[24px] mt-[80px] mb-[50px]">
      <div className="flex justify-between items-center mb-8">
        <Title>Activities</Title>
        <button className="bg-gray-100 p-2 rounded-md hover:text-dblue">
          More Activites
        </button>
      </div>

      <Swiper loop={true} slidesPerView="auto" spaceBetween={50}>
        {sliderData.map((item, i) => (
          <SwiperSlide
            key={i}
            className="  !w-fit group cursor-pointer select-none"
          >
            <Image
              width={350}
              height={160}
              className="rounded-md"
              src={item}
              alt="ad"
            />
            <div className="hidden max-lg:hidden transition-all duration-300 relative opacity-0 top-[-70px] group-hover:top-0 group-hover:opacity-100 shadow p-1 text-sm rounded-md">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus,
              dignissimos?
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Activities;
