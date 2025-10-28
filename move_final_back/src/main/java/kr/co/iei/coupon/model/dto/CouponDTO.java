package kr.co.iei.coupon.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="coupon")
public class CouponDTO {
	private int couponNo;
	private int memberNo;
	private String couponName;
	private int couponDisscount;
	private int couponValidDate;
	private int couponBoxNo;
	private String useStatus;
	private String couponBoxIssueDt;
	private String couponBoxExpireDt;
}
