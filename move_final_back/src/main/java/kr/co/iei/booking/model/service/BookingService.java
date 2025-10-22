package kr.co.iei.booking.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.booking.model.dao.BookingDao;

@Service
public class BookingService {
	
	@Autowired
	BookingDao bookingDao;
	
	public Map selectMovieList() {
		List movieList = bookingDao.selectMovieList(); 
		Map map = new HashMap<String, Object>();
		map.put("bookingMovieList", movieList);
		return map;
	}

	public Map selectDateList() {
		List dateList = bookingDao.selectDateList();
		Map map = new HashMap<String, Object>();
		
		map.put("dateList", dateList);
		return map;
	}

	public Map selectSchedule(int movieNo, String movieDate) {
		Map selectMap = new HashMap<String, Object>();
		selectMap.put("movieNo", movieNo);
		selectMap.put("movieDate", movieDate);
		System.out.println("서비스 movie_no : " +movieNo);
		System.out.println("서비스 movie_date : " +movieDate);
		List oneSchedule = bookingDao.selectSchedule(selectMap);
		System.out.println("서비스 oneSchedule:"+oneSchedule);
		Map map = new HashMap<String, Object>();
		map.put("oneSchedule", oneSchedule);
		return map;
	}


}
