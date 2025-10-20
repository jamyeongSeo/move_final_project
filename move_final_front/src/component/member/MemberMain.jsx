import { useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState, memberLevelState } from "../utils/RecoilData";
import { Axis3dIcon } from "lucide-react";
import axios from "axios";

const MemberMain = () => {
  const [memberId, setmemberId] = useRecoilState(loginIdState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [member, setMember] = useState({
    memberNo: "",
    memberId: "",
    memberPw: "",
    memberEmail: "",
    memberName: "",
    memberBirth: "",
    memberGender: "",
    memberPhone: "",
    memberEnrollDate: "",
    memberDate: "",
    memberLevel: "",
    memberGrade: "",
    couponCount: "",
    watchingMovieCount: "",
  });
  const [coupon, setCoupon] = useState({
    couponBoxNo: "",
    couponNo: "",
    memberNo: "",
    useStatus: "",
  });
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
  const BackServer = import.meta.env.VITE_BACK_SERVER;
  axios
    .get(`${BackServer}/member/selectMember?memberId=${memberId}`)
    .then((res) => {
      console.log(res);
      setMember(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  /*쿠폰 버튼 클랙 시-> 모달에서 select 해올 예정
    axios.get(`${BackServer}/member/selectCoupon?memberId=${memberId}`).then((res)=>{

    })*/
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
          <h1>{member.memberName}</h1>
        </div>
        <div className="member-mypage-content-wrap">
          <div className="member-mypage-content">
            <div className="member-mypage-content-left">
              보유 쿠폰 수 : {member.couponCount} 개
            </div>
            <div className="member-mypage-content-right">
              {/*버튼 누르면 쿠폰 띄우기 */}
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
              관람한 영화 수 : {member.watchingMovieCount} 건
            </div>
          </div>

          <div className="member-mypage-content">
            <div className="member-mypage-content-left">
              아이디 : {member.memberId}
            </div>
          </div>

          <div className="member-mypage-content">
            <div className="member-mypage-content-left">
              생년월일 : {member.memberBirth}
            </div>
            <div className="member-mypage-content-right">
              성별 : {member.memberGender == 1 ? "남자" : "여자"}
            </div>
          </div>

          <div className="member-mypage-content">
            <div className="member-mypage-content-left">
              휴대폰번호 : {member.memberPhone}
            </div>
          </div>
          <div className="member-mypage-content">
            <div className="member-mypage-content-left">
              이메일 : {member.memberEmail}
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
