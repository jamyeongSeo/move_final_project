package kr.co.iei.admin.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import kr.co.iei.movie.model.dto.MovieDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="schedule")
public class ScheduleDTO {
	private int scheduleNo;
	private int movieNo;
	private String screenNo;
	private String movieTitle;
	private String scheduleTimeStart;
	private String scheduleTimeEnd;
	private String scheduleOpen;
	private String scheduleClose;
}
