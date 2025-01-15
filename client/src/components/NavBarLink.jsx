import { Link } from "react-router-dom";

function NavBarLink({ name, to }) {
  return (
    <li>
      <Link to={to} className="rounded-md px-3 py-1 text-sm font-medium text-teal-800 hover:bg-gray-700 hover:text-white">{name}</Link>
    </li>
  );
}

export default NavBarLink;
