import { Link } from "react-router-dom";

const NoMemberInfo = () => {
  return (
    <div className="noMemberInfo_wrap">
      <div className="memberModal-wrap">
        <div className="memberModal-content-box-wrap">
          <div className="memberModal-content-box">
            <div>
              <h2>회원전용 페이지입니다. 로그인 후 이용해주세요.</h2>
            </div>
            <Link
              to="/common/login"
              style={{ float: "right" }}
              className="input-line"
            >
              로그인 하러 가기☞
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoMemberInfo;
