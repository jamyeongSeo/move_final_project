package kr.co.iei.booking.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BookingDao {

	List selectMovieList();

	List selectDateList();

	List selectSchedule(int movieNo);

}
