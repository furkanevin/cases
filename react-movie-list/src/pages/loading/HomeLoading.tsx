import { Splide, SplideSlide } from "@splidejs/react-splide";


const HomeLoading = () => {
  const fakeCards = Array.from({ length: 2 });
  const fakeGenre = Array.from({ length: 19 });
  // console.log(fakeGenre);
  return (
    <>
      <div className="grid place-items-center grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4 p-4">
        {fakeGenre.map((_,index) => (
          <div
            key={index}
            className="cursor-pointer rounded shadow bg-gray-300 animate-pulse h-10 w-full"
          />
        ))}
      </div>
      {fakeCards.map((_,index) => (
        <Splide
          key={index}
          options={{
            type: "loop",
            perPage: 3,
            perMove: 1,
            autoplay: true,
            pagination:false,
            gap: "1rem",
            pauseOnHover: true,
            breakpoints: {
              1024: { perPage: 3 },
              768: { perPage: 2 },
              480: { perPage: 1 },
            },
          }}
          className="my-4"
        >
          {fakeCards.map((_,index) => (
            <SplideSlide key={index}>
              <div className="bg-gray-300 rounded-md animate-pulse w-full object-cover aspect-[2/3]"></div>
            </SplideSlide>
          ))}
        </Splide>
      ))}
    </>
  );
};

export default HomeLoading;
