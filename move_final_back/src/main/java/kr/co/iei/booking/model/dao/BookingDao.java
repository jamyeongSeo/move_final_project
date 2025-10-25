package kr.co.iei.booking.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BookingDao {

	List selectMovieList();

	List selectDateList();

	List selectSchedule(Map<String,Object> selectMap);

	List selectOneSchedule(String currentDate);

	List selectScreenSeat(int screenNo);

	List selectRowList(int screenNo);

	List selectOneRow(Map getMap);

}
