import { useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Route, Routes } from "react-router-dom";
import NoticeList from "./NoticeList";
import "./cs.css";
import NoticeWrite from "./NoticeWrite";
import NoticeDetail from "./NoticeDetail";
import NoticeUpdate from "./NoticeUpdate";
import PQList from "./PQList";
import { useRecoilState } from "recoil";
import { authReadyState } from "../utils/RecoilData";
import PQDetail from "./PQDetail";
import PQWrite from "./PQWrite";

const CSMain = () => {
  const [menus, setMenus] = useState([
    { url: "/cs/notice", text: "공지사항" },
    { url: "/cs/faq", text: "FAQ" },
    { url: "/cs/pq", text: "1:1 문의" },
  ]);
  const [authReady, setAuthReady] = useRecoilState(authReadyState);
  return (
    <div className="cs-wrap">
      <div className="cs-side">
        <section className="section side-menu-box">
          <div>고객센터</div>
        </section>
        <section className="section">
          <LeftSideMenu menus={menus} />
        </section>
      </div>
      <div className="cs-content">
        <section className="section">
          <Routes>
            <Route path="notice" element={<NoticeList />} />
            <Route path="notice/frm" element={<NoticeWrite />} />
            <Route path="notice/detail/:noticeNo" element={<NoticeDetail />} />
            <Route path="notice/update/:noticeNo" element={<NoticeUpdate />} />
            <Route path="pq" element={<PQList />} />
            <Route path="pq/frm" element={<PQWrite />} />
            <Route path="pq/detail/:pqNo" element={<PQDetail />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};
export default CSMain;
