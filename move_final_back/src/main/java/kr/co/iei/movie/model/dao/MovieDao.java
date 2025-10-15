package kr.co.iei.movie.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper
public interface MovieDao {

	List selectMovieList();
	

}
