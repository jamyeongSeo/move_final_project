package kr.co.iei.booking.model.dto;





import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="bookingInfo")
public class BookingInfoDTO {
		private int scheduleNo;
		private int memberNo;
		private int movieNo;
		private int priceNo;
		private Date bookingDate;
		private int screenNo;
		private int payPrice;
		private String[] selectSeatList;
		private String movieTitle;
		private int kidCount;
		private int adultCount;
		private int couponBoxNo;
		private String payTitle;
		private String bookDate;
	}

