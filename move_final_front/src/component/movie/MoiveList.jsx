import axios from "axios";
import { useEffect } from "react";

const MovieList = () => {
  useEffect(() => {
    axios.get(`$`);
  }, []);
  return (
    <div className="content">
      <div className="content-wrap">
        <div className="movie-header">
          <div className="page-title">
            <h2>영화 리스트</h2>
          </div>
        </div>
        <div className="movie-list-box"></div>
      </div>
    </div>
  );
};

export default MovieList;
