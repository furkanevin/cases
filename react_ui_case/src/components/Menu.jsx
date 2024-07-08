import { menuData } from '../constants';
import { GiHamburgerMenu } from 'react-icons/gi';

const Menu = () => {
  return (
    <ul>
      <li className="flex justify-between px-3 py-4 border rounded-md mb-3">
        <span className="font-bold">Menü</span>
        <GiHamburgerMenu className="cursor-pointer" />
      </li>
      {menuData.map((text) => (
        <li className="border p-2 rounded my-1 text-center  transition hover:bg-gray-200 cursor-pointer">
          {text}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
