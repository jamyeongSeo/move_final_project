import Swal from "sweetalert2";
import axios from "axios";

const CommentRestrictModal = ({ memberNo }) => {
  const checkSuspend = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_SERVER}/admin/memberRestrict/${memberNo}`
      );

      if (res.data && res.data.SUSPENDED_UNTIL) {
        const until = res.data.SUSPENDED_UNTIL?.substring(0, 10);
        const reason = res.data.REASON || "관리자 제재";
        const daysLeft = Math.ceil(
          (new Date(until) - new Date()) / (1000 * 60 * 60 * 24)
        );

        Swal.fire({
          title: "댓글 작성이 제한되었습니다",
          html: `
            <p><b>사유:</b> ${reason}</p>
            <p><b>기간:</b> ${until} 까지 (${daysLeft}일 남음)</p>
          `,
          icon: "warning",
          confirmButtonText: "확인",
        });
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return { checkSuspend };
};

export default CommentRestrictModal;
