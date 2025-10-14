import { useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Link } from "react-router-dom";

const MemberMain = () => {
  const [menus, setMenus] = useState([
    {
      url: [
        "/member/memberMain",
        "/member/memberUpdate",
        "/member/memberDelete",
      ],
      text: "내 정보",
    },
    { url: "/member/join", text: "내가 본 영화" },
    { url: "/member/join", text: "예약 / 결제" },
  ]);
  return (
    <div className="content-wrap">
      <section className="left-side-menu-side">
        <Link to="/member/memberMain">
          <div className="left-side-menu-title">마이페이지</div>
        </Link>
        <LeftSideMenu menus={menus}></LeftSideMenu>
      </section>

      <section className="left-side-menu-other member-mypage-wrap">
        <div className="memberMain-title">
          <h1>member.memberName</h1>
        </div>
        <div className="member-mypage-content-wrap">
          <div className="member-mypage-content">
            <div className="member-mypage-content-left">보유 쿠폰 수 : 1개</div>
            <div className="member-mypage-content-right">
              <select
                className="member-mypage-coupon"
                name="coupon"
                id="coupon"
              >
                <option value="coupon">보유쿠폰</option>
              </select>
            </div>
          </div>

          <div
            className="member-mypage-content"
            style={{ marginBottom: "60px" }}
          >
            <div className="member-mypage-content-left">
              관람한 영화 수 : 1건
            </div>
          </div>

          <div className="member-mypage-content">
            <div className="member-mypage-content-left">
              아이디 : member.memberId
            </div>
          </div>

          <div className="member-mypage-content">
            <div className="member-mypage-content-left">
              생년월일 : member.memberBirth
            </div>
            <div className="member-mypage-content-right">
              성별 : (member.memberGender == 1 ? 남자 : 여자)
            </div>
          </div>

          <div className="member-mypage-content">
            <div className="member-mypage-content-left">
              휴대폰번호 : member.memberPhone
            </div>
          </div>
          <div className="member-mypage-content">
            <div className="member-mypage-content-left">
              이메일 : member.memberEmail
            </div>
          </div>
        </div>

        <div className="member-mypage-btn-wrap">
          <Link to="/member/memberUpdate" className="btn-red member-mypage-btn">
            회원정보 수정
          </Link>
          <Link to="/member/memberDelete" className="btn-red member-mypage-btn">
            회원 탈퇴
          </Link>
        </div>
      </section>
    </div>
  );
};
export default MemberMain;
