import { NavLink } from "react-router-dom";
import "../utils/sideMenu.css";
import { useEffect, useState } from "react";


const AdminSideMenu = (props) => {
    const menus = props.menus;
    const subMenus = props.subMenus;
    
    const menuOpen = (sub) =>{
        const [openMenu, setOpenMenu] = useState(null);
        console.log(subMenus); 
    } 

}

/*
<NavLink
                  to={menu.url}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                ><ul>
                  <div className="left-side-menu-content" onClick={menuOpen(menu.url)}>{menu.text}
                  </div>
                  </ul>
                </NavLink>
                */
export default AdminSideMenu;
