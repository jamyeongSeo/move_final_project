import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import axios from "axios";
//import LeftSideMenu from "../utils/LeftSideMenu";
import "./admin.css";

const subMenus = {
  "/admin/main": [
    { text: "영화 목록", url: "/admin/movie/list" },
    { text: "영화 등록", url: "/admin/movie/regist" },
    { text: "스케줄 등록", url: "/admin/schedule/regist" },
    { text: "관객 수 조회", url: "/admin/movieGoer" },
  ],
  "admin/sales": [
    { text: "전체 매출 조회", url: "/admin/salesAll" },
    { text: "각 영화 매출 조회", url: "/admin/salesOne" },
  ],
};

{
  /* 
 
*/
}

const AdminMain = () => {
  const menus = [
    { url: "/admin/main", text: "영화 관리" },
    { url: "/admin/sales", text: "매출 관리" },
    { url: "/admin/member", text: "회원 관리" },
  ];
  const [openMenu, setOpenMenu] = useState(null);
  const menuClick = (menuUrl) => {
    setOpenMenu((prev) => (prev === menuUrl ? null : menuUrl));
  };

  //const [authReady, setAuthReady] = useRecoilState(authReadyState);
  //const [memberType, setMemberType] = useRecoilState(memberTypeState);

  const navigate = useNavigate();

  {
    /*useEffect(()=>{
        if(authReady && memberType !== 1){
            Swal.fire({
                title: "관리자페이지입니다.",
                text: "관리자만 접근이 가능합니다.",
                icon:"warning",
            }).then((res)=>{
                navigate("/");
            });
        }
    },[authReady]);
    */
  }

  return (
    <section className="admin-list-wrap">
      <div className="side-wrap">
        <section className="side-menu-box">
          <div>관리자 페이지</div>
        </section>

        {/*{menus.map((menu, index) => (
            <div key={index}>
              <div onClick={() => menuClick(menu.url)}>
              </div>
              {openMenu === menu.url && (
                <ul className="sub-menu-list">
                  {subMenus[menu.url]?.map((sub, i) => (
                    <li key={`sub-${i}`}>
                      <NavLink
                        to={subMenus.url}
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
          ))}
                      */}
      </div>
    </section>
  );
};

export default AdminMain;
