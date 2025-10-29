import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

const MovieDetail = () => {
  const isLogin = useRecoilValue(isLoginState);
  const { movieNo } = useParams();
  const [memberId, setMemberId] = useState("");
  const [movie, setMovie] = useState({});
  const [likeCount, setLikeCount] = useState(0);
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
          <button type="button" className="btn-red detailBtn">
            주요 정보
          </button>
          <button type="button" className="btn-gray toCommentBtn">
            실 관람평
          </button>
        </div>
      </section>
    </>
  );
};
export default MovieDetail;
