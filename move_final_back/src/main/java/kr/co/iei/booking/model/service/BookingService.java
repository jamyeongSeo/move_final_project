package kr.co.iei.booking.model.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.admin.model.dto.ScheduleDTO;
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
		List<MovieDTO> movieList = bookingDao.selectMovieList(); 
		
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
		String todayDate = java.time.LocalDate.now().toString();
		selectMap.put("movieNo", movieNo);
		selectMap.put("movieDate", movieDate);
		List<ScheduleDTO> oneSchedule = bookingDao.selectSchedule(selectMap);
		for(ScheduleDTO s : oneSchedule) {
			List seatList = bookingDao.getSeatList(s.getScreenNo());
			s.setSeatList(seatList);
			Map bookSeatMap = new HashMap<String , Object>();
			bookSeatMap.put("scheduleNo", s.getScheduleNo());
			bookSeatMap.put("bookingDate", movieDate);
			List bookedSeatList = bookingDao.getBookedSeatList(bookSeatMap);
			s.setBookedSeatList(bookedSeatList);
		}
		Map map = new HashMap<String, Object>();
		map.put("oneSchedule", oneSchedule);
		return map;
	}

	public Map selectScreenSeat(int screenNo, int scheduleNo, String movieDate) {
		Map rowMap = new HashMap<String,Object>();
		List seatList = new ArrayList();
		List rowList = bookingDao.selectRowList(screenNo);
		for(String row : (ArrayList<String>)rowList) {
			rowMap.put("row", row);
			rowMap.put("screenNo", screenNo);
			List oneRowList = bookingDao.selectOneRow(rowMap);
			seatList.add(oneRowList);
		}
		Map bookSeatMap = new HashMap<String , Object>();
		bookSeatMap.put("scheduleNo", scheduleNo);
		bookSeatMap.put("bookingDate", movieDate);
		List<BookingDTO> bookSeatList = bookingDao.selectBookedSeat(bookSeatMap);
		
		ArrayList<String> bookedSeatList = new ArrayList<>();
		for(BookingDTO b : bookSeatList) {
			String bookedSeat = b.getBookSeatRow() + b.getBookSeatColumn();
			bookedSeatList.add(bookedSeat);
		}
		Map seatMap = new HashMap<String, Object>();
		
		seatMap.put("bookedSeatList", bookedSeatList);
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
		int payResult =0;
		if(bookingInfo.getCouponBoxNo() != -1) {
			Map couponMap = new HashMap<String, Object>();
			couponMap.put("memberNo", bookingInfo.getMemberNo());
			couponMap.put("couponNo", bookingInfo.getCouponBoxNo());
			int updateResult = bookingDao.useCoupon(couponMap);
		}
		System.out.println("bookingService : "+bookingInfo);
		insertResult += bookingDao.insertBooking(bookingInfo);
		
		/*
		int adultPriceNo = bookingDao.getPriceNo(1); 
		int kidPriceNo = bookingDao.getPriceNo(2);
		for(int i = bookingInfo.getAdultCount(); i>0; i--) {
			bookingInfo.setPriceNo(adultPriceNo);
			
		}
		for(int i = bookingInfo.getKidCount(); i>0; i--) {
			bookingInfo.setPriceNo(kidPriceNo);
			insertResult += bookingDao.insertBooking(bookingInfo);
		}
		*/
		
		if(insertResult == 1) {
			Map map = new HashMap<String, Object>();
			map.put("bookingDate", bookingInfo.getBookingDate());
			map.put("scheduleNo", bookingInfo.getScheduleNo());
			map.put("memberNo", bookingInfo.getMemberNo());
			int bookNo = bookingDao.getBookNo(map);
			System.out.println(bookNo);
			
			PayDTO p = new PayDTO();
			
			p.setPayPrice(bookingInfo.getPayPrice());
			p.setPayTitle(bookingInfo.getMovieTitle());
			p.setMemberNo(bookingInfo.getMemberNo());
			p.setBookNo(bookNo);
		    payResult = bookingDao.insertPayment(p); 
			
			
		}
		
		if(payResult == 1) {
				Map map = new HashMap<String, Object>();
				map.put("scheduleNo", bookingInfo.getScheduleNo());
				map.put("memberNo", bookingInfo.getMemberNo());
				map.put("bookingDate", bookingInfo.getBookingDate());
				int bookNo = bookingDao.getBookNo(map);
				map.put("bookNo", bookNo);
				int payNo = bookingDao.getPayNo(map);
				System.out.println(payNo);
				for(int i = 0; i<bookingInfo.getSelectSeatList().length; i++) {
					String selectSeat = bookingInfo.getSelectSeatList()[i];
					System.out.println(selectSeat);
					
					char bookSeatRow = selectSeat.charAt(0);
					int screenNo = bookingInfo.getScreenNo();
					String bookSeatColumn = selectSeat.substring(1);
					System.out.println("bookSeatRow:"+bookSeatRow+" bookSeatColumn"+bookSeatColumn);
					Map seatMap = new HashMap<String, Object>();
					seatMap.put("bookSeatRow", bookSeatRow);
					seatMap.put("bookSeatColumn", bookSeatColumn);
					seatMap.put("screenNo", screenNo);
					int seatNo = bookingDao.getSeatNo(seatMap);
					BookingDTO b = new BookingDTO();
					b.setBookNo(bookNo);
					b.setSeatNo(seatNo);
					b.setBookSeatColumn(bookSeatColumn);
					b.setBookSeatRow(bookSeatRow);
					b.setPayNo(payNo);
					seatInsertResult += bookingDao.insertBookSeat(b);
				}
		}
		 	
		
		
		
		return seatInsertResult;
	}



	

}
