package kr.co.iei.movie.model.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="movieSchedule")
public class MovieScheduleDTO {
	private int movieNo;
	private String movieTitle;
	private int movieGrade; //관람등급: 1=전체, 2=12세, 3=15세, 4=19세
	private int movieRuntime;
	private int movieType; //상영 타입: 1=2D, 2:=3D, 3=4DX
	private Date scheduleTimeStart; //상영 시작 시간
	private Date scheduleTimeEnd; //상영 종료 시간
	private String scheduleOpen; //상영 시작 기간
	private String scheduleClose; //상영 종료 기간
	private String screenName; //관 이름
	private int seatTotal; //관별 전체 좌석 수
	private String bookingDate; //예매 날짜(스케쥴 연동 매진 좌석 파악 위해 필요)
	private int gallerySeat; //매진 좌석

}
