import axios from "axios";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const SearchPwModal = (props) => {
  const isModalPw = props.isModalPw;
  const setIsModalPw = props.setIsModalPw;
  const [member, setMember] = useState({
    memberName: "",
    memberId: "",
    memberEmail: "",
    memberPw: "",
  });
  const [searchResult, setSearchResult] = useState(0);
  const inputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };
  const modal = useRef();
  const resultModal = useRef();
  const nextModal = () => {
    if (
      member.memberName != "" &&
      member.memberId != "" &&
      member.memberEmail != ""
    ) {
      axios
        .get(
          `${import.meta.env.VITE_BACK_SERVER}/member/searchPw?memberName=${
            member.memberName
          }&&memberId=${member.memberId}&&memberEmail=${member.memberEmail}`
        )
        .then((res) => {
          if (res.data == 1) {
            //이메일로 임시비밀번로 전송
            setSearchResult(1);
            modal.current.classList.add("membersearch-none");
            resultModal.current.classList.remove("membersearchResult-none");
            axios
              .get(
                `${import.meta.env.VITE_BACK_SERVER}/email/newPw?memberEmail=${
                  member.memberEmail
                }
              `
              )
              .then((res) => {
                //이메일전송 완료 시, 새로운 비밀번호 업데이트
                setMember({ ...member, memberEmail: res.data });
                axios
                  .post(
                    `${import.meta.env.VITE_BACK_SERVER}/member/updatePw`,
                    member
                  )
                  .then((res) => {
                    console.log(res.data);
                    if (res.data == 1) {
                      setMember({
                        memberName: "",
                        memberId: "",
                        memberEmail: "",
                        memberPw: "",
                      });
                      setSearchResult(2);
                    } else {
                      setMember({
                        memberName: "",
                        memberId: "",
                        memberEmail: "",
                        memberPw: "",
                      });
                      Swal.fire({
                        title: "임시 비밀번호 업데이트 실패",
                        text: "죄송합니다. 비밀번호 찾기를 다시 진행해 주세요",
                        icon: "error",
                      });
                    }
                  })
                  .catch((err) => {
                    console.log("업데이트" + err);
                  });
              })
              .catch((err) => {
                console.log("메일발송 err" + err);
              });
          } else {
            setMember({
              memberName: "",
              memberId: "",
              memberEmail: "",
              memberPw: "",
            });
            setSearchResult(-1);
            modal.current.classList.add("membersearch-none");
            resultModal.current.classList.remove("membersearchResult-none");
          }
        })
        .catch((err) => {
          setMember({
            memberName: "",
            memberId: "",
            memberEmail: "",
            memberPw: "",
          });
          console.log("회원조회 err" + err);
        });
    } else {
      Swal.fire({
        title: "입력값 확인",
        text: "입력값을 확인하세요",
        icon: "info",
      });
    }
  };

  const closeModal = () => {
    setMember({ memberName: "", memberId: "", memberEmail: "", memberPw: "" });
    setSearchResult(0);
    setIsModalPw(false);
    resultModal.current.classList.add("membersearchResult-none");
    modal.current.classList.remove("membersearch-none");
  };
  return (
    <div className={isModalPw ? "" : "memberModal-close"}>
      <div className="memberModal">
        <div className="memberModal-wrap">
          <div className="memberModal-content-box-wrap">
            <div className="memberModal-content-box">
              <div className="memberModal-title">
                <h2>비밀번호 찾기</h2>
              </div>
              <section ref={modal}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    nextModal();
                  }}
                >
                  <div className="memberModal-content-wrap">
                    <div>
                      <input
                        style={{ width: "650px" }}
                        className="input-line"
                        type="text"
                        name="memberName"
                        id="memberName"
                        placeholder="이름 입력"
                        value={member.memberName}
                        onChange={inputData}
                      />
                    </div>
                    <div>
                      <input
                        style={{ width: "650px" }}
                        className="input-line"
                        type="text"
                        name="memberId"
                        id="memberId"
                        placeholder="아이디 입력"
                        value={member.memberId}
                        onChange={inputData}
                      />
                    </div>
                    <div>
                      <input
                        style={{ width: "650px" }}
                        className="input-line"
                        type="text"
                        name="memberEmail"
                        id="memberEmail"
                        placeholder="이메일주소 입력"
                        value={member.memberEmail}
                        onChange={inputData}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      style={{ marginRight: "10px" }}
                      type="submit"
                      className="btn-red memberModal-btn"
                    >
                      확인
                    </button>
                    <button
                      type="button"
                      className="btn-red memberModal-btn"
                      onClick={closeModal}
                    >
                      닫기
                    </button>
                  </div>
                </form>
              </section>
              <section ref={resultModal} className="membersearchResult-none">
                <SearchPwResult searchResult={searchResult}></SearchPwResult>
                <div>
                  <button
                    type="button"
                    className="btn-red memberModal-btn"
                    onClick={closeModal}
                  >
                    닫기
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchPwResult = (props) => {
  const searchResult = props.searchResult;
  return (
    <section>
      <div className="memberModal-content-wrap">
        <div className="memberModal-searchResult-box">
          <p className="memberModal-searchResult">
            {searchResult == -1
              ? "조회된 회원이 없습니다."
              : searchResult == 1
              ? "메일로 임시 비밀번호를 전송중입니다."
              : "임시 비밀번호를 발송완료 (비밀번호 변경은 마이페이지 내정보에서 진행해주세요.)"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SearchPwModal;
