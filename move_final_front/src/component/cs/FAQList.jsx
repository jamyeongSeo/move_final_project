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
import { Collapse } from "@mui/material";
import Swal from "sweetalert2";

const FAQList = () => {
  const [faqList, setFaqList] = useState([]);
  const [reqPage, setReqPage] = useState(1); //현재 페이지 값을 저장하는 state
  const [pi, setPi] = useState(null); //현재 페이지가 갖고있는 데이터 값을 저장하는 state
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState(""); //검색 결과를 저장하는 state
  const [authReady, setAuthReady] = useRecoilState(authReadyState); //refresh 초기회 확인용 데이터를 저장하는 recoil
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState); //해당 recoil 계정의 memberLevel값을 갖고있는 state
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [openAnswer, setOpenAnswer] = useState(null); //사용자가 클릭했을 때의 상태값을 저장하는 state
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
        setTotalCount(res.data.totalCount);
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

  const deleteFaq = (faqNo) => {
    Swal.fire({
      title: "FAQ 삭제",
      text: "삭제하시겠습니까?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_BACK_SERVER}/cs/faq/${faqNo}`)
          .then((res) => {
            console.log(res);
            if (res.data === 1) {
              Swal.fire({
                title: "삭제 완료",
                text: "FAQ가 삭제되었습니다.",
                icon: "success",
              });
              faqFunc();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
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
      <div className="input-wrap">
        <div className="list-count">전체 : {totalCount}건</div>
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
      </div>
      <div className="list-wrap">
        <table className="tbl faqTbl">
          <thead>
            <tr>
              <th
                style={{
                  width: authReady && memberLevel === 1 ? "70%" : "85%",
                }}
              >
                질문
              </th>
              <th style={{ width: "15%" }}>답변보기</th>
              {authReady && memberLevel === 1 && (
                <th style={{ width: "15%" }}>삭제하기</th>
              )}
            </tr>
          </thead>
          <tbody>
            {faqList.map((faq, i) => {
              const colSpanValue = authReady && memberLevel === 1 ? 3 : 2;

              return (
                <>
                  <tr
                    key={"faq-" + i}
                    onClick={() => toggleAnswer(i)}
                    className="faq-row"
                  >
                    <td>Q : {faq.faqQuestion}</td>
                    <td>
                      {openAnswer === i ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </td>
                    {authReady && memberLevel === 1 && (
                      <td>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFaq(faq.faqNo);
                          }}
                          className="faq-delete-btn"
                        >
                          삭제
                        </button>
                      </td>
                    )}
                  </tr>

                  {openAnswer === i && (
                    <tr className="faq-answer-row">
                      <td colSpan={colSpanValue}>
                        <div className="faq-answer">A : {faq.faqAnswer}</div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
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
