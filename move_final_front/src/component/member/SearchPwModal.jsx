import { useRef, useState } from "react";

const SearchPwModal = (props) => {
  const isModalPw = props.isModalPw;
  const setIsModalPw = props.setIsModalPw;
  const [member, setMember] = useState({
    memberName: "",
    memberId: "",
    memberEmail: "",
  });
  const [memberPw, setMemberPw] = useState("");
  const inputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };
  const modal = useRef();
  const resultModal = useRef();
  const nextModal = () => {
    modal.current.classList.add("membersearch-none");
    resultModal.current.classList.remove("membersearchResult-none");
  };

  const closeModal = () => {
    setMember({ memberName: "", memberId: "", memberEmail: "" });
    setMemberPw("");
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
                <SearchPwResult></SearchPwResult>
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

const SearchPwResult = () => {
  return (
    <section>
      <div className="memberModal-content-wrap">
        <div className="memberModal-searchResult-box">
          <span className="memberModal-searchResult">
            메일로 임시 비밀번호를 발송했습니다
          </span>
        </div>
      </div>
    </section>
  );
};

export default SearchPwModal;
