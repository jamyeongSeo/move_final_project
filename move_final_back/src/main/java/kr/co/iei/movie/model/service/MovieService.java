package kr.co.iei.movie.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.movie.model.dao.MovieDao;

@Service
public class MovieService {
	@Autowired
	MovieDao movieDao;

	public Map selectMovieList() {
		List movieList = movieDao.selectMovieList();
		System.out.println(movieList);
		Map map = new HashMap<String, Object>();
		map.put("movieList", movieList);
		return map;
	}
}
