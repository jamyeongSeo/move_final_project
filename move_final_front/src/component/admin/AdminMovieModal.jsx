import React from "react";
import "./adminMovieModal.css";

const AdminMovieModal = ({ movie, onClose, onStatusChange }) => {
  if (!movie) return null;

  const getButtonInfo = (status) => {
    const s = Number(status);
    switch (s) {
      case 1:
        return { text: "즉시 개봉", next: 2 };
      case 2:
        return { text: "상영 종료", next: 3 };
      case 3:
        return { text: "재개봉", next: 4 };
      case 4:
        return { text: "상영 종료", next: 3 };
      default:
        return { text: "상태 변경", next: s };
    }
  };

  const { text, next } = getButtonInfo(movie.movieStatus);


  const BACK_SERVER = import.meta.env.VITE_BACK_SERVER;


  const imageUrl = movie.movieThumb?.startsWith("http")
    ? movie.movieThumb
    : `${BACK_SERVER}${movie.movieThumb}`;

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className="admin-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="admin-modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="admin-modal-header">
          <img
            src={imageUrl}
            alt={movie.movieTitle}
            className="admin-modal-thumb"
            onError={(e) => {
              // 🔥 이미지 로딩 실패 시 대체 이미지 표시
              e.target.src = "/default-movie-thumb.png";
            }}
          />
          <div className="admin-modal-info">
            <h2>{movie.movieTitle}</h2>
            <p>감독 : {movie.movieDirector}</p>
            <p>출연 : {movie.movieActor}</p>
            <p>러닝타임 : {movie.movieRuntime}분</p>
            <p>
              개봉일 :{" "}
              {new Date(movie.movieRelease).toISOString().split("T")[0]}
            </p>
          </div>
        </div>

        <div className="admin-modal-body">
          <h3>줄거리</h3>
          <p>{movie.movieContent}</p>
        </div>

        <div className="admin-modal-footer">
          <button
            className="admin-modal-status-btn"
            onClick={() => onStatusChange(movie.movieNo, next)}
          >
            {text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMovieModal;
