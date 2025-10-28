package kr.co.iei.booking.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

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

}
