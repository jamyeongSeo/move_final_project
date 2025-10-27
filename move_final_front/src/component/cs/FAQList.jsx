import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useRecoilState } from "recoil";
import {
  authReadyState,
  loginIdState,
  memberLevelState,
} from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageNavigation from "../utils/PageNavigation";

const FAQList = () => {
  const [faqList, setFaqList] = useState([]);
  const [reqPage, setReqPage] = useState(1); //현재 페이지 값을 저장하는 state
  const [pi, setPi] = useState(null); //현재 페이지가 갖고있는 데이터 값을 저장하는 state
  const [search, setSearch] = useState(""); //검색 결과를 저장하는 state
  const [authReady, setAuthReady] = useRecoilState(authReadyState); //refresh 초기회 확인용 데이터를 저장하는 recoil
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState); //해당 recoil 계정의 memberLevel값을 갖고있는 state
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [openAnswer, setOpenAnswer] = useState(null);
  const navigate = useNavigate();
  const faqFunc = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/cs/faq?reqPage=${reqPage}&faqQuestion=${search}`
      )
      .then((res) => {
        console.log(res);
        setFaqList(res.data.faqList);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    faqFunc(reqPage);
  }, [reqPage]);
  const searchInput = () => {
    setReqPage(1);
    faqFunc(1, search);
  };

  const toggleAnswer = (i) => {
    setOpenAnswer(openAnswer === i ? null : i);
  };
  return (
    <section className="section notice-list-wrap">
      <div className="title-wrap">
        <div className="title">자주 하시는 질문</div>
        {authReady && memberLevel === 1 && (
          <div className="add-icon" onClick={() => navigate("/cs/faq/frm")}>
            <AddBoxIcon />
          </div>
        )}
      </div>
      <div className="input-wrap2">
        <input
          type="text"
          id="pqTitle"
          name="pqTitle"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="검색어를 입력하십시오"
        ></input>
        <button type="submit" onClick={searchInput}>
          입력
        </button>
      </div>
      <div className="list-wrap">
        <table className="tbl faqTbl">
          <thead>
            <tr>
              <th style={{ width: "85%" }}>질문</th>
              <th style={{ width: "15%" }}>답변보기</th>
            </tr>
          </thead>
          <tbody>
            {faqList.map((faq, i) => (
              <>
                <tr key={"faq-" + i} onClick={() => toggleAnswer(i)}>
                  <td>Q : {faq.faqQuestion}</td>
                  <td>
                    {openAnswer === i ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </td>
                </tr>
                {openAnswer === i && (
                  <tr className="faq-answer-row">
                    <td colSpan="2">
                      <div className="faq-answer">
                        A : {faq.faqAnswer && faq.faqAnswer}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div className="page-navi">
        {pi && (
          <PageNavigation pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        )}
      </div>
    </section>
  );
};
export default FAQList;
