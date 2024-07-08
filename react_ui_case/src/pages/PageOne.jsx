import Menu from '../components/Menu';
import Stories from '../components/Stories';

const PageOne = () => {
  return (
    <div className="max-w-[1440px] mx-auto p-10">
      <Stories />

      <div className="flex max-md:flex-col gap-4 my-10">
        <section className="flex flex-col gap-4">
          <img src="https://picsum.photos/1200/350" className="rounded" />

          <div className="grid grid-cols-3 gap-4">
            <img
              className="col-span-2 rounded"
              src="https://picsum.photos/800/350"
            />
            <img className="col-span-1" src="https://picsum.photos/400/350" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <img
              className="col-span-2 rounded h-full"
              src="https://picsum.photos/800/350"
            />
            <img
              className="col-span-1 rounded h-full"
              src="https://picsum.photos/400/350"
            />
          </div>
        </section>

        <section>
          <Menu />
          <img
            className="rounded w-full my-5"
            src="https://picsum.photos/400"
          />
        </section>
      </div>
    </div>
  );
};

export default PageOne;
