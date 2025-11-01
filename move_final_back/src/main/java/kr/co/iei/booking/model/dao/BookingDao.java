package kr.co.iei.booking.model.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.booking.model.dto.BookingDTO;
import kr.co.iei.booking.model.dto.BookingInfoDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.movie.model.dto.MovieDTO;

@Mapper
public interface BookingDao {

	List selectMovieList();

	List selectDateList();

	List selectSchedule(Map<String,Object> selectMap);

	List selectOneSchedule(String currentDate);

	List selectScreenSeat(int screenNo);

	List selectRowList(int screenNo);

	List selectOneRow(Map getMap);

	List selectMoviePrice(int movieNo);

	MovieDTO selectOneMovie(int movieNo);

	List selectCoupon(int memberNo);

	MemberDTO selectOneMemberNo(String memberId);

	MemberDTO selectOneMember(String memberId);

	int insertPayment(BookingInfoDTO bookingInfo);

	int useCoupon(Map couponMap);

	int getPriceNo(int i);

	int insertBooking(BookingInfoDTO bookingInfo);

	

	ArrayList<Integer> getBookNo(BookingInfoDTO bookingInfo);

	int getSeatNo(Map seatMap);

	int insertBookSeat(BookingDTO b);

	List selectBookedSeat(int scheduleNo);

}
