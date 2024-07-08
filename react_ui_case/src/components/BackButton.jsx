import { IoIosArrowDropleft } from 'react-icons/io';
import { Link } from 'react-router-dom';

const BackButton = () => {
  return (
    <Link
      className="flex items-center gap-2 border rounded-md p-2 transition hover:shadow hover:bg-gray-100 text-gray-500"
      to={-1}
    >
      <IoIosArrowDropleft className="max-sm:text-lg" />
      <span className="max-md:text-sm max-sm:hidden">Ana Ekrana Dön</span>
    </Link>
  );
};

export default BackButton;
