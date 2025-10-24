import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import axios from "axios";
import LeftSideMenu from "../utils/LeftSideMenu";
import "./admin.css";
import "../common/default.css";
import AdminSideMenu from "./AdminSideMenu";
import { authReadyState, isLoginState, loginIdState, memberLevelState } from "../utils/RecoilData";


const AdminMain = () => {
  const menus = [
    { url: "/admin/main", text: "영화 관리" },
    { url: "/admin/sales", text: "매출 관리" },
    { url: "/admin/member", text: "회원 관리" },
  ];
  const subMenus = {
    "/admin/main": [
      { text: "영화 목록", url: "movie/list" },
      { text: "영화 등록", url: "movie/regist" },
      { text : "스케줄 목록", url : "schedule/list"},
      { text: "스케줄 등록", url: "schedule/regist" },
      { text: "관객 수 조회", url: "movieGoer" },
    ],
    "/admin/sales": [
      { text: "전체 매출 조회", url: "salesAll" },
      { text: "각 영화 매출 조회", url: "salesOne" },
    ],
  };
  const [openMenu, setOpenMenu] = useState(null);
  const menuClick = (menuUrl) => {
    setOpenMenu((prev) => (prev === menuUrl ? null : menuUrl));
  };

  const [authReady, setAuthReady] = useRecoilState(authReadyState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const navigate = useNavigate();
  //const isLogin = useRecoilValue(loginIdState);

  useEffect(()=>{
        if(authReady && memberLevel !== 1){
            Swal.fire({
                title: "관리자페이지입니다.",
                text: "관리자만 접근이 가능합니다.",
                icon:"warning",
            }).then((res)=>{
                navigate("/");
            });
        }
    },[authReady]);

  return (
    <div className="admin-list-wrap">
      <AdminSideMenu menus={menus} subMenus={subMenus} />
      <div className="admin-main-content">
        {/* <AdminList /> */}
      </div>
      {/*하위 라우트 불러오는 outlet  */}
      <Outlet />
    </div>
  );
};

export default AdminMain;
