import React, { useEffect, useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState, memberLevelState } from "../utils/RecoilData";
import axios from "axios";
import { Box, Modal } from "@mui/material";
import NoMemberInfo from "./NoMemberInfo";

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
    { url: "/member/memberMain", text: "내 정보" },
    { url: "/member/watchedMovieList", text: "내가 본 영화" },
    { url: "/member/bookingMovieList", text: "예약 / 결제" },
  ]);

  const BackServer = import.meta.env.VITE_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${BackServer}/member/selectMember?memberId=${memberId}`)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {memberId === "" ? (
        <NoMemberInfo></NoMemberInfo>
      ) : (
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
                  <CouponModal memberId={memberId}></CouponModal>
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
                  성별 :{" "}
                  {member.memberGender == 1
                    ? "남자"
                    : member.memberGender == 2 && "여자"}
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
              <Link
                style={{
                  padding: "5px 60px",
                }}
                to="/member/memberUpdate"
                className="btn-red member-mypage-btn"
              >
                회원정보 수정
              </Link>
              <Link
                to="/member/memberDelete"
                className="btn-red member-mypage-btn"
              >
                회원 탈퇴
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

const CouponModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 670,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const memberId = props.memberId;
  const [couponBox, setCouponBox] = useState([]);

  const BackServer = import.meta.env.VITE_BACK_SERVER;

  useEffect(() => {
    axios
      .get(`${BackServer}/member/selectCoupon?memberId=${memberId}`)
      .then((res) => {
        setCouponBox(res.data);
        console.log(couponBox);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div
        onClick={handleOpen}
        style={{
          border: "3px solid var(--gray5)",
          backgroundColor: "var(--main3)",
        }}
        className="btn-gray"
      >
        보유 쿠폰
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="memberMain-coupon-modal">
          <div className="memberMain-coupon-wrap">
            {couponBox ? (
              couponBox.map((coupon, index) => {
                return (
                  <div
                    key={"coupon-" + index}
                    style={{ marginTop: "65px" }}
                    className="memberMain-coupon-box"
                  >
                    <img
                      src="/image/free-icon-ticket-7937886.png"
                      className="memberMain-coupon-img"
                    ></img>
                    <div>
                      <ul>
                        <li style={{ marginBottom: "7px" }}>
                          <h3>{coupon.couponName}</h3>
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                          할인금액 : {coupon.couponDisscount}
                        </li>
                        <li>
                          유효기간 : {coupon.couponBoxIssueDt} ~{" "}
                          {coupon.couponBoxExpireDt}
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="memberMain-coupon-box memberMain-noCoupon-info">
                보유 쿠폰이 없습니다
              </div>
            )}
          </div>
          <div
            style={{
              justifySelf: "center",
              color: "var(--main5)",
            }}
          >
            창을 닫으려면 배경 클릭
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MemberMain;
