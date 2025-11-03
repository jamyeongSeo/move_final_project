package kr.co.iei.admin.model.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuspendDTO {
	private int suspendNo;
	private int memberNo;
	private Date suspendDate; //정지 시작일
	private Date suspendUntil; //정지 종료일
	private int suspendDays; //정지 일수 등록
	private String suspendReason;//정지 사유
	
}
