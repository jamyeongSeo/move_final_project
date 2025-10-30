package kr.co.iei.movie.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import kr.co.iei.movie.model.dto.MovieDTO;

@Mapper
public interface MovieDao {

	List selectMovieList();

	int likePush(Map map);

	int isLike(Map map);

	int likeUnPush(Map map);

	MovieDTO selectOneMovie(int movieNo);

	int totalLike(int movieNo);
	
	/*------Main------*/
	List<MovieDTO> selectBoxOffice();

	List selectSchedule(int dateSchedule);
	/*------Main 끝------*/

	int selectCommentCount();

	List selectMovieCommentList(Map<String, Object> commentListMap);

	int insertReport(Map<String, Object> reportMap);

	

	

}
