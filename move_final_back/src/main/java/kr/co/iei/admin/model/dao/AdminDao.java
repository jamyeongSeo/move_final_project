package kr.co.iei.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.utils.PageInfo;

@Mapper
public interface AdminDao {

	int totalSearchTitle();

	int totalCount();

	List<MovieDTO> adminMovieList(PageInfo pi);

	List<MovieDTO> searchMovieTitle(int reqPage);

	int getMovieNo();

	int insertMovieInfo(MovieDTO movie);





}
