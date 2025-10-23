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
		List oneSchedule = bookingDao.selectSchedule(selectMap);
		Map map = new HashMap<String, Object>();
		map.put("oneSchedule", oneSchedule);
		return map;
	}

	public Map selectScreenSeat(int screenNo) {
		List seatList = bookingDao.selectScreenSeat(screenNo);
		Map map = new HashMap<String, Object>();
		map.put("seatList", seatList);
		return map;
	}


}
