import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";

const PQList = () => {
  const navigate = useNavigate();
  return (
    <section className="section pq-list-wrap">
      <div className="title-wrap">
        <div className="title">1:1 문의</div>
        <div className="add-icon" onClick={() => navigate("/cs/pq/frm")}>
          <AddBoxIcon />
        </div>
      </div>
    </section>
  );
};
export default PQList;
