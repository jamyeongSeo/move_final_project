package kr.co.iei.booking.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="price")
public class PriceDTO {
	private int price;
	private int movieType;
	private int pricePerAge;
	private int seatType;
}
