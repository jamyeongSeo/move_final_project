import { useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Route, Routes } from "react-router-dom";
import NoticeList from "./NoticeList";
import "./cs.css";
import NoticeWrite from "./NoticeWrite";
import NoticeDetail from "./NoticeDetail";
import NoticeUpdate from "./NoticeUpdate";

const CSMain = () => {
  const [menus, setMenus] = useState([
    { url: "/cs/notice", text: "공지사항" },
    { url: "/cs/faq", text: "FAQ" },
    { url: "/cs/pq", text: "1:1 문의" },
  ]);
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
          </Routes>
        </section>
      </div>
    </div>
  );
};
export default CSMain;
