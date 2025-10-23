import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const PQDetail = () => {
  const params = useParams();
  const pqNo = params.pqNo;
  const [pq, setPq] = useState(null);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  return (
    <section className="section pq-detail-wrap">
      <div className="title-wrap">
        <div className="title"></div>
      </div>
    </section>
  );
};
export default PQDetail;
