import { Link } from "react-router-dom";

const HeaderNavi = () => {
  return (
    <nav className="nav-menu">
      <ul>
        <li>
          <Link to="#">영화</Link>
        </li>
        <li>
          <Link to="#">예매하기</Link>
        </li>
        <li>
          <Link to="#">고객센터</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavi;
