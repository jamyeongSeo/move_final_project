package kr.co.iei.booking.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="booking")
public class BookingDTO {
	private int bookNo;
	private int seatNo;
	private int payNo; 
	private int priceNo;
	private int pricePerAge;
	private int memberNo;
	private int screenNo;
	private String screenName;
	private String bookingDate;
	private String movieThumb;
	private char bookSeatRow;
	private String bookSeatColumn;
	private String commentContent;
	private int movieGrade;
	private String movieTitle;
	private String scheduleTimeStart;
	private String scheduleTimeEnd;
	private int movieNo;
	
}
