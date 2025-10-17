package kr.co.iei.movie.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.movie.model.dao.MovieDao;
import kr.co.iei.movie.model.dto.MovieDTO;

@Service
public class MovieService {
	@Autowired
	MovieDao movieDao;

	public Map selectMovieList(String memberId) {
		List<MovieDTO> movieList = movieDao.selectMovieList();
		Map map = new HashMap<String, Object>();
		for(MovieDTO m : movieList) {
			
			map.put("movieNo", m.getMovieNo());
			map.put("memberId", memberId);
			int result = movieDao.isLike(map);
			int totalLike = movieDao.totalLike(m.getMovieNo());
			m.setLikeCount(totalLike);
			if(result==1) {
				m.setLike(true);
			}else {
				m.setLike(false);
			}
		}
		map.put("movieList", movieList);
		return map;
	}
	
	@Transactional
	public int likePush(int movieNo, String memberId) {
		MovieDTO m = movieDao.selectOneMovie(movieNo);
		Map map = new HashMap<String, Object>();
		map.put("memberId", memberId);
		map.put("movieNo", movieNo);
		int result = movieDao.likePush(map);
		
		
		
		return result;
	}

	public boolean isLike(int movieNo, String memberId) {
		List movieList = movieDao.selectMovieList();
		Map map = new HashMap<String, Object>();
		map.put("memberId", memberId);
		map.put("movieNo", movieNo);
		int result = movieDao.isLike(map);
		if(result == 1) {
			
		}
		return false;
	}
	
	
	@Transactional
	public int likeUnPush(int movieNo, String memberId) {
		Map map = new HashMap<String, Object>();
		map.put("memberId", memberId);
		map.put("movieNo", movieNo);
		int result = movieDao.likeUnPush(map);
		System.out.println(result);
		return result;
	}
	
	
}
