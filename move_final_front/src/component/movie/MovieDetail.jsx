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
import Typography from "@mui/material/Typography";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const MovieDetail = () => {
  const isLogin = useRecoilValue(isLoginState);
  const { movieNo } = useParams();
  const [member, setMember] = useState({});
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
  useEffect(() => {
    getMovieInfo();
  }, [movieNo]);

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
        console.log(res);
        setMovieCommentList(res.data.commentList);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMovieCommentList();
  }, [movieNo, reqPage, order]);
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
                <div>평점 : ? 점</div>
                <div>예매율 : ? %</div>
                <div>누적관객수 : ? 명</div>
              </div>
              <div className="movie-explain">{movie.movieContent}</div>
            </div>
          </div>
          <div className="title-movie-thumb-wrap">
            <div className="title-movie-thumb">
              <img src={movie.movieThumb} className="movie-detail-thumb"></img>
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
                <button className="booking-btn bookingBtn">예매하기</button>
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
              <span className="info-box-content">{movie.movieRuntime} 분</span>
            </div>
            <div className="info-box">
              <span className="info-box-title">장르</span>
              <MovieOutlinedIcon sx={{ width: "100px", height: "100px" }} />
              <span className="info-box-content">{movie.movieGenre}</span>
            </div>
            <div className="info-box">
              <span className="info-box-title">평점</span>
              <GradeOutlinedIcon sx={{ width: "100px", height: "100px" }} />
              <span className="info-box-content">? 점</span>
            </div>
          </div>
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
            </div>
            <div className="movie-comment-list-wrap">
              <div className="movie-comment-list">
                {movieCommentList.map((comment, index) => {
                  return (
                    <div key={"comment-" + index} className="movie-comment-box">
                      {comment.memberGender === 1 ? (
                        <div className="movie-comment-box-start">
                          <Face3OutlinedIcon
                            sx={{ width: "80px", height: "80px" }}
                          />
                        </div>
                      ) : (
                        <div className="movie-comment-box-start">
                          <Face6OutlinedIcon
                            sx={{ width: "80px", height: "80px" }}
                          />
                        </div>
                      )}

                      <div className="movie-comment-title">
                        {comment.memberNo}
                      </div>
                      <div className="movie-comment-content">
                        {comment.commentContent}
                      </div>

                      <div className="movie-comment-box-end">
                        <div className="movie-comment-report-btn">
                          <ReportProblemOutlinedIcon />
                        </div>
                        <div className="movie-comment-rate">
                          <Rating
                            name="read-only"
                            value={comment.movieScore}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default MovieDetail;
