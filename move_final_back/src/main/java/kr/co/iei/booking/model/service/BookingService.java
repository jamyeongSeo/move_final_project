package kr.co.iei.booking.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.booking.model.dao.BookingDao;
import kr.co.iei.booking.model.dto.PriceDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.movie.model.dto.SeatDTO;

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
		Map rowMap = new HashMap<String,Object>();
		List seatList = new ArrayList();
		List rowList = bookingDao.selectRowList(screenNo);
		for(String row : (ArrayList<String>)rowList) {
			rowMap.put("row", row);
			rowMap.put("screenNo", screenNo);
			List oneRowList = bookingDao.selectOneRow(rowMap);
			seatList.add(oneRowList);
		}
		System.out.println(seatList);
		Map map = new HashMap<String, Object>();
		map.put("seatList", seatList);
		map.put("rowList",rowList);
		return map;
	}

	public Map calcPrice(int movieNo, int adultCount, int kidCount) {
		Map priceMap = new HashMap<String, Object>();
		List<PriceDTO> priceList = bookingDao.selectMoviePrice(movieNo);
		int adultPrice = 0;
		int kidPrice = 0;
		System.out.println(priceList);
		for(PriceDTO p : priceList) {
			if(p.getPricePerAge()==1) {
				adultPrice = adultCount * p.getPrice();
			}else if(p.getPricePerAge() == 2) {
				kidPrice = kidCount * p.getPrice();
			}
		}
		int totalPrice = adultPrice + kidPrice;
		priceMap.put("totalPrice", totalPrice);
		return priceMap;
	}

	public MovieDTO selectOneMovie(int movieNo) {
		MovieDTO m = bookingDao.selectOneMovie(movieNo);
		return m;
	}

	public Map selectCoupon(String memberId) {
		MemberDTO m = bookingDao.selectOneMemberNo(memberId); 
		List couponList = bookingDao.selectCoupon(m.getMemberNo());
		Map couponMap = new HashMap<String, Object>();
		couponMap.put("couponList", couponList);
		
		return couponMap;
	}

	

}
