import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "../utils/sideMenu.css";
import "./admin.css";
import "../common/default.css";
import "./adminSideMenu.css"

const AdminSideMenu = ({ menus, subMenus }) => {

  const [openMenu, setOpenMenu] = useState(null);

  const menuClick = (menuUrl) => {
    setOpenMenu((currentOpenMenu) =>
      currentOpenMenu === menuUrl ? null : menuUrl
    );
  };

  return (
    <aside className="admin-side-menu">
        <Link to="/admin/main" className="admin-side-title">
        <div>관리자 페이지</div>
        </Link>        


    
      {menus.map((menu, index) => (
        <div key={index} className="admin-menu-list">
          <div
            className={`admin-main-menu ${
              openMenu === menu.url ? "active" : ""
            }`}
            onClick={() => menuClick(menu.url)}
          >
            {menu.text}
          </div>
          <ul
            className={`sub-menu-list ${
              openMenu === menu.url ? "open" : ""
            }`}
          >
            {subMenus[menu.url]?.map((sub, i) => (
              <li key={`sub-${i}`}>
                <NavLink
                  to={sub.url}
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  {sub.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default AdminSideMenu;