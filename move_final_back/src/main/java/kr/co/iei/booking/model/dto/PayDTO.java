package kr.co.iei.booking.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="pay")
public class PayDTO {
	private int payNo;
	private String payTitle;
	private int payPrice;
	private Date payDate;
	private String refundStatus;
	private int memberNo;
	private int bookNo;
}
