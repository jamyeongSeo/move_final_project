package kr.co.iei.coupon.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("coupon")
public class CouponDTO {
	private int couponNo;
	private String couponName;
	private int couponDisscount;
	private int couponValidDate;
}
