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
	private int priceNo;
	private int pricePerAge;
	private int memberNo;
	private int screenNo;
	private String bookingDate;
	private String movieThumb;
	private String bookSeatRow;
	private String bookSeatColumn;
	private int adultCount;
	private int kidCount; //price_tbl 통해서 연령대 체크 예정
	private String commentContent;//관람평
}
