import axios from "axios";
import { DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import Swal from "sweetalert2";

const NoticeDetail = () => {
  const params = useParams();
  const noticeNo = params.noticeNo;
  const [notice, setNotice] = useState(null);
  const [memberId, setMemberId] = useRecoilState(loginIdState);

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
  const navigate = useNavigate();
  const deleteNotice = () => {
    Swal.fire({
      title: "삭제",
      text: "해당 공지를 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소",
    }).then((confirm) => {
      if (confirm.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_BACK_SERVER}/cs/notice/delete/${noticeNo}`
          )
          .then((res) => {
            console.log(res);
            if (res.data === 1) {
              navigate("/cs/notice");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <section className="section detail-wrap">
      {notice && (
        <>
          <div className="title-wrap detailWrap">
            <div className="title">{notice.noticeTitle}</div>
          </div>
          <div className="info-wrap">
            <div className="writer notice-writer">
              작성자 : {notice.memberId}
            </div>
            <div className="date notice-date">{notice.noticeDate}</div>
          </div>
          <div className="input-title">첨부파일</div>
          <div className="file-zone">
            {notice.noticeFileList.map((file, index) => {
              return <FileItem key={"file-" + index} file={file} />;
            })}
          </div>
          <div className="input-title">내용</div>
          <div
            className="notice-content-wrap"
            dangerouslySetInnerHTML={{ __html: notice.noticeContent }}
          ></div>
          {memberId === notice.memberId && (
            <div className="btn-zone">
              <Link to={`/cs/notice/update/${noticeNo}`} className="btn-red">
                수정
              </Link>
              <button type="button" className="btn-gray" onClick={deleteNotice}>
                삭제
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

const FileItem = (props) => {
  const file = props.file;
  const fileDown = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/cs/notice/file/${file.filepath}`,
        { responseType: "blob" }
      )
      .then((res) => {
        console.log(res);

        const blob = new Blob([res.data]);
        const fileUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = fileUrl;
        link.style.display = "none";
        link.download = file.filename;

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="notice-file">
      <DownloadIcon onClick={fileDown} />
      <span className="file-name">{file.filename}</span>
    </div>
  );
};
export default NoticeDetail;
