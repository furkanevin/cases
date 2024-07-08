import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SearchBox = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!e.target[0].value.trim()) {
      toast.info('Please enter valid country');
    } else {
      navigate(`/detail?country=${e.target[0].value}`);
    }

    e.target.reset();
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search By Country Name"
        className="w-64 px-3 py-2 border-none bg-transparent focus:outline-none text-white shadow-md"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-600 ml-2 flex items-center justify-center shadow-md"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;
