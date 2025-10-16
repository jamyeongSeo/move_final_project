import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NoticeDetail = () => {
  const params = useParams();
  const noticeNo = params.noticeNo;
  const [notice, setNotice] = useState(null);
  //const [memberId, setMemberId] = useRecoilState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/cs/notice/detail/${noticeNo}`)
      .then((res) => {
        console.log(res);
        setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(notice);
  return (
    <section className="section detail-wrap">
      <div className="title-wrap">
        <div className="title"></div>
      </div>
      <div className="info-wrap">
        <div className="writer notice-writer">작성자 : admin01</div>
      </div>
    </section>
  );
};
export default NoticeDetail;
