import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../utils/sideMenu.css";
import "./admin.css";
import "../common/default.css";
import "./adminSideMenu.css"

const AdminSideMenu = ({ menus, subMenus }) => {
  const [openMenu, setOpenMenu] = useState(null);

  //서브메뉴가 있는 경우를 한 번 더 확인
  const menuClick = (menuUrl, hasSubMenu) => {
    if(hasSubMenu){
      setOpenMenu((currentOpenMenu) =>
        currentOpenMenu === menuUrl ? null : menuUrl
      );
    }
    
  };

  return (
    <aside className="admin-side-menu">
        <Link to="/admin/main" className="admin-side-title">
        <div>관리자 페이지</div>
        </Link>        
      {/* !! : 값을 논리형(boolean)으로 강제 변환하는 자바스크립트 */}
      {menus.map((menu, index) => {
        const hasSubMenu = !!subMenus[menu.url];
        return(
          <div key={index} className="admin-menu-list">
            {hasSubMenu ? (
              <div
                className={`admin-main-menu ${
                  openMenu === menu.url ? "active" : ""
                }`}
                onClick={() => menuClick(menu.url, hasSubMenu)}
              >
              {menu.text}
            </div>
            ) : (
              <Link to={menu.url} className="admin-main-no-submenu">
                {menu.text}
              </Link>
            )}
            {hasSubMenu && (
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
          )}
          </div>
          );
      })}
    </aside>
    );
};

export default AdminSideMenu;