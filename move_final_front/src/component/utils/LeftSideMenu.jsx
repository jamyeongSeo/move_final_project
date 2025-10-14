import { NavLink } from "react-router-dom";
import "./sideMenu.css";

const LeftSideMenu = (props) => {
  const menus = props.menus;
  return (
    <section className="content-wrap">
      <div className="side-menu">
        <ul>
          {menus.map((menu, i) => {
            return (
              <li key={"side-menu-" + i}>
                <NavLink
                  to={menu.url}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <div className="left-side-menu-content">{menu.text}</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default LeftSideMenu;
