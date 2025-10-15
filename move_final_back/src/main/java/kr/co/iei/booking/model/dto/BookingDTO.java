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
	private int memberNo;
	private int screenNo;
}
