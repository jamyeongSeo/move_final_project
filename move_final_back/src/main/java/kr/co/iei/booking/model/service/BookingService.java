package kr.co.iei.booking.model.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.booking.model.dao.BookingDao;
import kr.co.iei.booking.model.dto.BookingDTO;
import kr.co.iei.booking.model.dto.BookingInfoDTO;
import kr.co.iei.booking.model.dto.PayDTO;
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

	public Map selectSchedule(int movieNo) {
		Map selectMap = new HashMap<String, Object>();
		selectMap.put("movieNo", movieNo);
		
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
		
		Map seatMap = new HashMap<String, Object>();
		seatMap.put("seatList", seatList);
		seatMap.put("rowList",rowList);
		return seatMap;
	}

	public Map calcPrice(int movieNo, int adultCount, int kidCount) {
		Map priceMap = new HashMap<String, Object>();
		List<PriceDTO> priceList = bookingDao.selectMoviePrice(movieNo);
		int adultPrice = 0;
		int kidPrice = 0;
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

	public MemberDTO selectOneMember(String memberId) {
		MemberDTO m = bookingDao.selectOneMember(memberId);
		return m;
	}

	@Transactional
	public int payment(BookingInfoDTO bookingInfo) {
		int insertResult = 0;
		int seatInsertResult = 0;
		if(bookingInfo.getCouponBoxNo() != -1) {
			Map couponMap = new HashMap<String, Object>();
			couponMap.put("memberNo", bookingInfo.getMemberNo());
			couponMap.put("couponNo", bookingInfo.getCouponBoxNo());
			int updateResult = bookingDao.useCoupon(couponMap);
		}
		System.out.println("bookingService : "+bookingInfo);
		int adultPriceNo = bookingDao.getPriceNo(1); 
		int kidPriceNo = bookingDao.getPriceNo(2);
		for(int i = bookingInfo.getAdultCount(); i>0; i--) {
			bookingInfo.setPriceNo(adultPriceNo);
			insertResult += bookingDao.insertBooking(bookingInfo);
			
		}
		for(int i = bookingInfo.getKidCount(); i>0; i--) {
			bookingInfo.setPriceNo(kidPriceNo);
			insertResult += bookingDao.insertBooking(bookingInfo);
		}
		
		if(insertResult == bookingInfo.getAdultCount() + bookingInfo.getKidCount()) {
				
				ArrayList<Integer> bookNo = bookingDao.getBookNo(bookingInfo);
				System.out.println(bookNo);
				for(int i = 0; i<bookingInfo.getSelectSeatList().length; i++) {
					String selectSeat = bookingInfo.getSelectSeatList()[i];
					System.out.println(selectSeat);
					int bookOneNo = bookNo.get(i);
					char bookSeatRow = selectSeat.charAt(0);
					String bookSeatColumn = selectSeat.substring(1);
					System.out.println("bookSeatRow:"+bookSeatRow+" bookSeatColumn"+bookSeatColumn);
					Map seatMap = new HashMap<String, Object>();
					seatMap.put("bookSeatRow", bookSeatRow);
					seatMap.put("bookSeatColumn", bookSeatColumn);
					seatMap.put(bookSeatColumn, seatMap);
					int seatNo = bookingDao.getSeatNo(seatMap);
					BookingDTO b = new BookingDTO();
					b.setSeatNo(seatNo);
					b.setBookSeatColumn(bookSeatColumn);
					b.setBookSeatRow(bookSeatRow);
					b.setBookNo(bookOneNo);
					seatInsertResult += bookingDao.insertBookSeat(b);
				}
				
		}
		/*
		if(seatInsertResult == bookingInfo.getSelectSeatList().length) {
			PayDTO p = new PayDTO();
			ArrayList<Integer> seatNoList = bookingDao.getBookSeatNo() 
		    int result = bookingDao.insertPayment(bookingInfo); 
			
			
		}
		*/
		return 0;
	}

	public Map selectBookedSeat(int scheduleNo) {
		List bookedSeatList = bookingDao.selectBookedSeat(scheduleNo);
		System.out.println("bookedSeatList :"+bookedSeatList);
		return null;
	}

	

}
