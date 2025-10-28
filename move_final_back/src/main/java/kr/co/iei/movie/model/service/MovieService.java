package kr.co.iei.movie.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.movie.model.dao.MovieDao;
import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.movie.model.dto.MovieScheduleDTO;

@Service
public class MovieService {
	@Autowired
	MovieDao movieDao;

	public Map selectMovieList(String memberId) {
		List<MovieDTO> movieList = movieDao.selectMovieList();
		Map map = new HashMap<String, Object>();
		for (MovieDTO m : movieList) {

			map.put("movieNo", m.getMovieNo());
			map.put("memberId", memberId);
			int result = movieDao.isLike(map);
			int totalLike = movieDao.totalLike(m.getMovieNo());
			m.setLikeCount(totalLike);
			if (result == 1) {
				m.setLike(true);
			} else {
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
		if (result == 1) {

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

	/*------------------Main---------------*/
	public Map selectBoxOffice(String memberId) {
		List<MovieDTO> boxOffice = movieDao.selectBoxOffice();
		Map map = new HashMap<String, Object>();
		for (MovieDTO m : boxOffice) {

			map.put("movieNo", m.getMovieNo());
			map.put("memberId", memberId);
			int result = movieDao.isLike(map);
			int totalLike = movieDao.totalLike(m.getMovieNo());
			m.setLikeCount(totalLike);
			if (result == 1) {
				m.setLike(true);
			} else {
				m.setLike(false);
			}
		}
		map.put("boxOfficeList", boxOffice);
		return map;
	}

	public Map selectSchedule(int dateSchedule) {
		List<MovieScheduleDTO> list = movieDao.selectSchedule(dateSchedule);

		List<Map<String, Object>> movieSchedule = new ArrayList<>();
		Set<String> processedTitles = new HashSet<>();
		// set contains 사용하면 중복처리 가능
		for (MovieScheduleDTO mm : list) {
			if (processedTitles.contains(mm.getMovieTitle())) {
				continue; // 이미 처리한 영화는 스킵
			}

			processedTitles.add(mm.getMovieTitle());
			Map<String,Object> content = new HashMap<String,Object>();//-> 자료형을 Map -> 관정보를 key, 리스트
			Map<String, Object> result = new HashMap<>();
			List<MovieScheduleDTO> time = new ArrayList<>();
			String movieTitle = null;
			String screen = null;
			int movieGrade = 0;
			for (MovieScheduleDTO m : list) {
				if (m.getMovieTitle().equals(mm.getMovieTitle())) {
					if (movieTitle == null) {
						movieTitle = m.getMovieTitle();
						movieGrade = m.getMovieGrade();
					}
					time.add(m);
					screen = m.getScreenName();
				}
				
			}
			System.out.println(time);
			content.put(screen, time);
			System.out.println("contetn: "+content);
			result.put("movieTitle", movieTitle);
			movieTitle = null;
			result.put("movieGrade", movieGrade);
			movieGrade = 0;
			result.put("schedules", content);
			content = null;
			// schedules.put("schedules", content);
			movieSchedule.add(result);
		}

		//

		Map map = new HashMap<String, Object>();
		map.put("movieSchedule", movieSchedule);
		return map;
	}

	/*
	 * for(MovieScheduleDTO m : list) { for(MovieScheduleDTO c : list) {
	 * if(m.getMovieTitle().equals(c.getMovieTitle())) { content.add(c);
	 * result.put("movieTitle", m.getMovieTitle()); result.put("movieGrade",
	 * m.getMovieGrade()); } } }
	 * 
	 * 
	 * }
	 */
	/*----------------Main 끝----------------*/

}
