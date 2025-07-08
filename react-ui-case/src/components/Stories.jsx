import { storiesData } from '../constants';

const Stories = () => {
  return (
    <div className="flex gap-4 overflow-auto">
      {storiesData.map((image) => (
        <img
          className="border-[4px] rounded-full w-[80px] h-[80px]"
          src={image}
        />
      ))}
    </div>
  );
};

export default Stories;
