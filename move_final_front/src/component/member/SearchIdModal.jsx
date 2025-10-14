import { useRef, useState } from "react";

const SearchIdModal = (props) => {
  const isModalId = props.isModalId;
  console.log("isModalId: " + isModalId);
  const setIsModalId = props.setIsModalId;

  const [member, setMember] = useState({
    memberPw: "",
    memberEmail: "",
    memberName: "",
  });
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
    setIsModalId(false);
    resultModal.current.classList.add("membersearchResult-none");
    modal.current.classList.remove("membersearch-none");
  };
  return (
    <div className={isModalId ? "" : "memberModal-close"}>
      <div className="memberModal">
        <div className="memberModal-wrap">
          <div className="memberModal-content-box-wrap">
            <div className="memberModal-content-box">
              <div className="memberModal-title">
                <h2>아이디 찾기</h2>
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
                        type="password"
                        name="memberPw"
                        id="memberPw"
                        placeholder="비밀번호 입력"
                        value={member.memberPw}
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
                <SearchIdResult></SearchIdResult>
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

const SearchIdResult = () => {
  return (
    <section>
      <div className="memberModal-content-wrap">
        <div className="memberModal-searchResult-box">
          <span className="memberModal-searchResult">
            아이디 : member.memberId
          </span>
        </div>
      </div>
    </section>
  );
};

export default SearchIdModal;
