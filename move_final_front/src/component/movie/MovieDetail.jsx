import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginIdState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import Face6OutlinedIcon from "@mui/icons-material/Face6Outlined";
import Face3OutlinedIcon from "@mui/icons-material/Face3Outlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import Rating from "@mui/material/Rating";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import PageNavigation from "../utils/PageNavigation";
import Swal from "sweetalert2";
import CommentRestrictModal from "../admin/commentRestrictModal";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const MovieDetail = () => {
  const isLogin = useRecoilValue(isLoginState);
  const { movieNo } = useParams();
  const [member, setMember] = useState(null);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [movie, setMovie] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [nowTab, setNowTab] = useState("detailInfo");
  const [order, setOrder] = useState(1);
  const [movieCommentList, setMovieCommentList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [movieScore, setMovieScore] = useState(0);
  const [commentContent, setCommentContent] = useState("");
  const [alreadyComment, setAlreadyComment] = useState(false);
  const [isUpdate, setIsUpdate] = useState(null);
  const [updateContent, setUpdateContent] = useState("");
  const [updateScore, setUpdateScore] = useState(0);
  const genreName = {
    1: "액션",
    2: "애니메이션",
    3: "코미디",
    4: "공포",
    5: "스릴러",
    6: "SF",
    7: "범죄",
    8: "판타지",
  };
  const navigate = useNavigate();
  const getMovieInfo = () => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/movie/detail/${movieNo}`)
      .then((res) => {
        console.log(res);
        setMovie(res.data);
        setLikeCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAverageScore = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/movie/averageScore?movieNo=${movieNo}`
      )
      .then((res) => {
        console.log(res);
        setMovieScore(res.data || 0);
      })
      .catch((err) => {
        console.log(err);
        setMovieScore(0);
      });
  };
  const getMemberInfo = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/member/selectMember?memberId=${memberId}`
      )
      .then((res) => {
        setMember(res.data);
        getAverageScore();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getMovieInfo();
  }, [movieNo]);

  useEffect(() => {
    if (memberId) {
      getMemberInfo();
    }
  }, [memberId]);

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const getMovieCommentList = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/movie/comment/${movieNo}?reqPage=${reqPage}&order=${order}`
      )
      .then((res) => {
        console.log(res.data);
        console.log(isUpdate);
        setMovieCommentList(res.data.commentList);
        setTotalCount(res.data.totalCount);
        setPi(res.data.pi);

        let foundComment = false;
        const commentList = res.data.commentList;
        for (let i = 0; i < commentList.length; i++) {
          const comment = commentList[i];
          if (member && comment.memberNo === member.memberNo) {
            foundComment = true;
            break;
          }
        }
        setAlreadyComment(foundComment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMovieCommentList();
  }, [movieNo, reqPage, order, member]);

  const nowDate = (comment) => {
    const now = dayjs(); //현재 날짜/시간 가져오는 함수
    const target = dayjs(comment.commentDate); // 날짜를 dayjs 형식으로 변환하기
    const diffDays = now.diff(target, "day"); // 현재날짜와 지난날짜와 비교
    // 보낸날짜가 17일이면 오늘이 19일 그럼 2일전 표시이렇게 자동으로 계산
    if (diffDays >= 7) {
      return target.format("YYYY-MM-DD"); // 7일 이상이면 날짜로 변형
    }
    return target.fromNow(); //한국어로 ?? 시간전 표시하기
  };


  /* 댓글 제재 모달창 */
const { checkSuspend } = CommentRestrictModal ({memberNo: member?.memberNo});

  const submitComment = async () => {
    if (!isLogin) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 가능한 기능입니다.",
        icon: "warning",
      });
      navigate("/common/login");
      return;
    }

    //1. 제재회원인지 확인
    const restricted = await checkSuspend();
    if(restricted) return; // 정지면 여기서 막음

    //2. 제재 아니면 기존 댓글 등록 진행
    if (commentContent.trim() === "") {
      Swal.fire({
        title: "필수 입력",
        text: "댓글은 필수로 작성해야 합니다.",
        icon: "warning",
      });
      return;
    }

    if (movieScore === 0) {
      Swal.fire({
        title: "필수 입력",
        text: "평점을 입력해주세요.",
        icon: "warning",
      });
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACK_SERVER}/movie/comment/insert`, {
        movieNo: movieNo,
        memberNo: member.memberNo,
        commentContent: commentContent,
        movieScore: movieScore,
      })
      .then((res) => {
        if (res.data === 1) {
          Swal.fire({
            title: "등록 성공",
            text: "성공적으로 등록되었습니다.",
            icon: "success",
          });
          setCommentContent("");
          setMovieScore(0);
          getMovieCommentList();
          getAverageScore();
        } else {
          Swal.fire({
            title: "등록 실패",
            text: "등록에 실패했습니다.",
            icon: "warning",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hideMemberId = (memberId) => {
    if (!memberId) return "";
    const memberLength = memberId.length;
    if (memberLength <= 3) return "*".repeat(memberLength);
    return memberId.slice(0, memberLength - 3) + "***";
  };

  const reportComment = (comment) => {
    if (!isLogin) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 가능한 기능입니다.",
        icon: "warning",
      });
      navigate("/common/login");
      return;
    } else {
      axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/movie/comment/report`, {
          movieCommentNo: comment.movieCommentNo,
          memberNo: member.memberNo,
        })
        .then((res) => {
          if (res.data > 0) {
            Swal.fire({
              title: "신고 완료",
              text: "신고가 접수되었습니다.",
              icon: "success",
            });
          } else if (res.data === -1) {
            Swal.fire({
              title: "신고 제한",
              text: "한 댓글에 한번만 가능합니다.",
              icon: "warning",
            });
          } else {
            Swal.fire({
              title: "신고 실패",
              text: "신고에 실패하였습니다.",
              icon: "error",
            });
          }
        })
        .catch((err) => {});
    }
  };
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff2b2b",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  const handleCommentContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleMovieScoreChange = (event, updateValue) => {
    setMovieScore(updateValue);
  };

  const handleUpdateContentChange = (e) => {
    setUpdateContent(e.target.value);
  };

  const handleUpdateScoreChange = (event, updateValue) => {
    setUpdateScore(updateValue);
  };

  const updateComment = (comment, isSubmit = false) => {
    if (!isLogin) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 가능한 기능입니다.",
        icon: "warning",
      });
      navigate("/common/login");
      return;
    }

    if (isSubmit) {
      if (updateContent.trim() === "") {
        Swal.fire({
          title: "필수 입력",
          text: "수정할 내용을 입력해주세요.",
          icon: "warning",
        });
        return;
      }
      if (updateScore === 0) {
        Swal.fire({
          title: "필수 입력",
          text: "평점을 입력해주세요.",
          icon: "warning",
        });
        return;
      }

      axios
        .patch(`${import.meta.env.VITE_BACK_SERVER}/movie/comment`, {
          movieCommentNo: comment.movieCommentNo,
          commentContent: updateContent,
          movieScore: updateScore,
        })
        .then((res) => {
          console.log("res : " + res.data);
          if (res.data === 1) {
            Swal.fire({
              title: "수정 완료",
              text: "성공적으로 수정되었습니다.",
              icon: "success",
            });
            setIsUpdate(null);
            setUpdateContent("");
            setUpdateScore(0);
            getMovieCommentList();
            getAverageScore();
          } else if (res.data !== 1) {
            Swal.fire({
              title: "권한 없음",
              text: "수정 권한이 없습니다.",
              icon: "warning",
            });
          } else {
            Swal.fire({
              title: "수정 실패",
              text: "수정에 실패했습니다.",
              icon: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsUpdate(comment.movieCommentNo);
      setUpdateContent(comment.commentContent);
      setUpdateScore(comment.movieScore);
    }
  };

  const deleteComment = (commentNo) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제된 댓글은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff2b2b",
      cancelButtonColor: "#888",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${
              import.meta.env.VITE_BACK_SERVER
            }/movie/comment/delete/${commentNo}`
          )
          .then((res) => {
            if (res.data === 1) {
              Swal.fire({
                title: "삭제 완료",
                text: "성공적으로 삭제되었습니다.",
                icon: "success",
              });
              getMovieCommentList();
              getAverageScore();
            } else {
              Swal.fire({
                title: "삭제 실패",
                text: "삭제에 실패하었습니다.",
                icon: "warning",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };




  return (
    <>
      <section className="section movie-detail-title-section">
        <div className="movie-detail-title-info-wrap">
          <div className="title-movie-info-wrap">
            <div className="movie-info-upside-wrap">
              <div className="movie-detail-title-name">{movie.movieTitle}</div>
              <div className="movie-detail-title-runtime">
                런타임 : {movie.movieRuntime}분
              </div>
            </div>
            <div className="movie-info-downside-wrap">
              <div className="movie-middle-info-wrap">
                <div>평점 : {movieScore} 점</div>
                <div>예매율 : ? %</div>
                <div>누적관객수 : ? 명</div>
              </div>
              <div className="movie-explain">{movie.movieContent}</div>
            </div>
          </div>
          <div className="title-movie-thumb-wrap">
            <div className="title-movie-thumb">
              <img
                src={`${import.meta.env.VITE_BACK_SERVER}${movie.movieThumb}`}
                className="movie-detail-thumb"
              ></img>
            </div>
            <div className="thumb-btn-zone">
              <div className="movie-btn-zone">
                <div className="like-btn">
                  {movie.like ? (
                    <span
                      className="like-img-pushed"
                      onClick={() => {
                        if (isLogin) {
                          axios
                            .delete(
                              `${
                                import.meta.env.VITE_BACK_SERVER
                              }/movie/likeUnPush?movieNo=${
                                movie.movieNo
                              }&memberId=${memberId}`
                            )
                            .then((res) => {
                              if (res.data === 1) {
                                const likePushList = movie.map((item, i) => {
                                  return index === i
                                    ? {
                                        ...item,
                                        like: false,
                                        likeCount: Number(likeCount),
                                      }
                                    : item;
                                });
                                setLikeCount(Number(likeCount));
                                setMovie(likePushList);
                              }
                            })
                            .catch((err) => {});
                        }
                      }}
                    >
                      <FavoriteIcon sx={{ fill: "#ff2b2b" }} />
                    </span>
                  ) : (
                    <span
                      className="like-img"
                      onClick={() => {
                        if (isLogin) {
                          axios
                            .post(
                              `${
                                import.meta.env.VITE_BACK_SERVER
                              }/movie/likePush?movieNo=${
                                movie.movieNo
                              }&memberId=${memberId}`
                            )
                            .then((res) => {
                              if (res.data === 1) {
                                const likeUnPushList = movie.map((item, i) => {
                                  return index === i
                                    ? {
                                        ...item,
                                        like: true,
                                        likeCount: Number(likeCount),
                                      }
                                    : item;
                                });
                                setLikeCount(Number(likeCount));
                                setMovie(likeUnPushList);
                              }
                            })
                            .catch((err) => {});
                        }
                      }}
                    >
                      <FavoriteBorderIcon />
                    </span>
                  )}
                </div>
                <div className="like-count">{movie.likeCount}</div>
              </div>
              <div className="booking-zone">
                <button
                  className="booking-btn bookingBtn"
                  onClick={() => {
                    navigate("/booking/main");
                  }}
                >
                  예매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section movie-detail-content-section">
        <div className="detail-btn-zone">
          <button
            type="button"
            className={`detailBtn ${
              nowTab === "detailInfo" ? "btn-red" : "btn-gray"
            }`}
            onClick={() => setNowTab("detailInfo")}
          >
            주요 정보
          </button>
          <button
            type="button"
            className={`detailBtn ${
              nowTab === "comment" ? "btn-red" : "btn-gray"
            }`}
            onClick={() => setNowTab("comment")}
          >
            실 관람평
          </button>
        </div>
        {nowTab === "detailInfo" ? (
          <>
            <div className="movie-detail-info-box-wrap">
              <div className="half-info-box-wrap">
                <div className="half-info-box">
                  <span className="info-box-title">감독</span>
                  <span className="half-info-box-content">
                    {movie.movieDirector}
                  </span>
                </div>
                <div className="half-info-box">
                  <span className="info-box-title">출연진</span>
                  <span className="half-info-box-content">
                    {movie.movieActor} 등
                  </span>
                </div>
              </div>
              <div className="info-box">
                <span className="info-box-title">런타임</span>
                <AccessTimeIcon sx={{ width: "100px", height: "100px" }} />
                <span className="info-box-content">
                  {movie.movieRuntime} 분
                </span>
              </div>
              <div className="info-box">
                <span className="info-box-title">장르</span>
                <MovieOutlinedIcon sx={{ width: "100px", height: "100px" }} />
                <span className="info-box-content">
                  {genreName[movie.movieGenre]}
                </span>
              </div>
              <div className="info-box">
                <span className="info-box-title">평점</span>
                <GradeOutlinedIcon sx={{ width: "100px", height: "100px" }} />
                <span className="info-box-content">{movieScore}</span>
              </div>
            </div>
            <div className="movie-detail-info-box-wrap">
              <div className="info-box secondBox">
                <span className="info-box-title">예매율</span>
              </div>
              <div className="info-box secondBox">
                <span className="info-box-title">누적관객수</span>
              </div>
            </div>
          </>
        ) : (
          <div className="movie-detail-comment-wrap">
            <div className="movie-comment-select-div">
              <Box size="small" sx={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">정렬</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={order}
                    label="정렬"
                    onChange={handleOrderChange}
                    sx={{
                      width: "150px",
                      height: 40,
                      fontSize: "16px",
                      ".MuiSelect-select": {
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        textAlign: "center",
                      },
                    }}
                  >
                    <MenuItem value={1}>최신순</MenuItem>
                    <MenuItem value={2}>높은 평점순</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div className="movie-comment-totalCount">
                게시물 총 {totalCount}건
              </div>
            </div>
            <div className="movie-comment-list-wrap">
              <div className="movie-comment-list">
                {movieCommentList.map((comment, index) => {
                  return (
                    <div key={"comment-" + index} className="movie-comment-box">
                      {comment.memberGender === 1 ? (
                        <div className="movie-comment-box-start">
                          <Face6OutlinedIcon
                            sx={{ width: "80px", height: "80px" }}
                          />
                        </div>
                      ) : (
                        <div className="movie-comment-box-start">
                          <Face3OutlinedIcon
                            sx={{ width: "80px", height: "80px" }}
                          />
                        </div>
                      )}
                      <div className="movie-comment-title">
                        {hideMemberId(comment.memberId)}
                      </div>
                      {isUpdate === comment.movieCommentNo ? (
                        <div className="movie-comment-update-input-wrap">
                          <textarea
                            placeholder="수정할 내용을 입력해주세요."
                            value={updateContent}
                            onChange={handleUpdateContentChange}
                          />
                          <div className="comment-update-action-wrap">
                            <StyledRating
                              value={updateScore}
                              onChange={handleUpdateScoreChange}
                              sx={{ marginRight: "10px" }}
                            />
                            <button
                              className="comment-submit-btn"
                              onClick={() => updateComment(comment, true)}
                            >
                              수정
                            </button>
                            <button
                              className="comment-cancel-btn"
                              onClick={() => {
                                setIsUpdate(null);
                                setUpdateContent("");
                                setUpdateScore(0);
                              }}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="movie-comment-content">
                          {comment.commentContent}
                        </div>
                      )}
                      <div className="movie-comment-box-end">
                        <div className="movie-comment-report-btn">
                          <div className="movie-comment-date">
                            {nowDate(comment)}
                          </div>
                          {isUpdate !== comment.movieCommentNo && (
                            <div className="comment-btn-wrap">
                              {member && isUpdate !== comment.movieCommentNo ? (
                                member.memberNo === comment.memberNo ? (
                                  <>
                                    <div
                                      className="comment-edit-btn"
                                      onClick={() => updateComment(comment)}
                                    >
                                      수정
                                    </div>
                                    <div
                                      className="comment-delete-btn"
                                      onClick={() =>
                                        deleteComment(comment.movieCommentNo)
                                      }
                                    >
                                      삭제
                                    </div>
                                  </>
                                ) : (
                                  <ReportProblemOutlinedIcon
                                    onClick={() => {
                                      reportComment(comment);
                                    }}
                                  />
                                )
                              ) : null}
                            </div>
                          )}
                        </div>
                        {isUpdate !== comment.movieCommentNo && (
                          <div className="movie-comment-rate">
                            <StyledRating
                              name="read-only"
                              value={comment.movieScore}
                              readOnly
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="page-navi">
              {pi && (
                <PageNavigation
                  pi={pi}
                  reqPage={reqPage}
                  setReqPage={setReqPage}
                />
              )}
            </div>
            {!alreadyComment && isLogin && (
              <div className="movie-comment-input-wrap">
                <div className="movie-comment-input-box">
                  <textarea
                    className="comment-input"
                    placeholder="실 관람평을 입력해주세요."
                    value={commentContent}
                    onChange={handleCommentContentChange}
                  ></textarea>
                  <div className="comment-write-bottom">
                    <div className="comment-rating">
                      <span className="rating-label">평점 입력</span>
                      <StyledRating
                        name="simple-controlled"
                        value={movieScore}
                        onChange={handleMovieScoreChange}
                      />
                    </div>
                    <button
                      className="comment-submit-btn"
                      onClick={submitComment}
                    >
                      입력
                    </button>
                  </div>
                </div>
              </div>
            )}
            {alreadyComment && isLogin && (
              <div
                style={{ padding: "20px", textAlign: "center", color: "#888" }}
              >
                이미 관람평을 작성하셨습니다.
              </div>
            )}
            {!isLogin && (
              <div
                style={{ padding: "20px", textAlign: "center", color: "#888" }}
              >
                로그인 후 관람평을 작성할 수 있습니다.
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};
export default MovieDetail;
