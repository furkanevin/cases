import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <h1 className="font-bold text-2xl font-sans text-blue-500 max-sm:text-base">
        SATIŞ ETKİNLİĞİ
      </h1>

      <nav className="flex gap-2 whitespace-nowrap">
        <Link className="text-blue-400 hover:text-blue-600" to={'/'}>
          Sayfa 1
        </Link>
        <Link className="text-blue-400 hover:text-blue-600" to={'/page-two'}>
          Sayfa 2
        </Link>
        <Link className="text-blue-400 hover:text-blue-600" to={'/page-three'}>
          Sayfa 3
        </Link>
      </nav>
    </header>
  );
};

export default Header;
