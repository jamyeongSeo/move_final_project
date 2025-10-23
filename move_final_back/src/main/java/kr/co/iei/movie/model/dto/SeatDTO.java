package kr.co.iei.movie.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="seat")
public class SeatDTO {
	private int seatNo;
	private String seatRow;
	private int seatColumn;
	private int screenNo;
	private int seatType;
}
