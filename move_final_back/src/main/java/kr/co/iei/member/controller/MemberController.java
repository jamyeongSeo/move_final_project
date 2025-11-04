package kr.co.iei.member.controller;

import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.coupon.model.dto.CouponDTO;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberMovieListDTO;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.utils.EmailSender;
import kr.co.iei.utils.JwtUtils;

@CrossOrigin("*")
@RestController
@RequestMapping("/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private EmailSender emailSender;
	
	/*-----------------------join---------------------------*/
	@GetMapping("/checkEmail")
	public ResponseEntity<Integer> checkEmail(@RequestParam String memberEmail){
		int result = memberService.checkEmail(memberEmail);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/checkId")
	public ResponseEntity<Integer> checkId(@RequestParam String memberId){
		int result = memberService.checkId(memberId);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping
	public ResponseEntity<Integer> joinMember(@RequestBody MemberDTO member){
		int result = memberService.insertMember(member);
		return ResponseEntity.ok(result);
	}
	

	/*-----------------------login---------------------------*/
	@PostMapping("/login")
	public ResponseEntity<LoginMemberDTO> login(@RequestBody MemberDTO member){
		//암호화, jwt 해야 함
		LoginMemberDTO result = memberService.login(member);
		if(result != null) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.status(404).build();
		}
	}
	
	@GetMapping(value ="/refresh")
	public ResponseEntity<LoginMemberDTO> refresh(@RequestHeader("Authorization") String token){
		LoginMemberDTO loginMember = jwtUtils.checkToken(token);
		//현시간 기준으로 다시 토큰 기간 갱신해줌
		String accessToken = jwtUtils.createAccessToken(loginMember.getMemberId(), loginMember.getMemberLevel());
		String refreshToken = jwtUtils.createRefreshToken(loginMember.getMemberId(), loginMember.getMemberLevel());
		loginMember.setAccessToken(accessToken);
		loginMember.setRefreshToken(refreshToken);
		return ResponseEntity.ok(loginMember);
	}
	
	/*-----------------------searchIdModal---------------------------*/
	@GetMapping(value="/searchId")
	public ResponseEntity<String> searchId(@RequestParam String memberName, @RequestParam String memberEmail){
		String searchId = memberService.searchId(memberName, memberEmail);
		return ResponseEntity.ok(searchId);
	}
	
	/*-----------------------searchPwModal---------------------------*/
	@GetMapping(value="/searchPw")
	public ResponseEntity<Integer> searchPw(@RequestParam String memberName, @RequestParam String memberId, @RequestParam String memberEmail){
		int result = memberService.searchPw(memberName, memberId, memberEmail);
		//회원 조회 성공
		if(result == 1) {
			String emailTitle = "I_MOVE_U 임시비밀번호 입니다.";
			
			//랜덤코드
			Random r = new Random();
			StringBuffer sb = new StringBuffer();//이건 뭐지?
			for(int i=0;i<6;i++) {
				//숫자(0~9) :  : r.nextInt(10)
				//대문자 : r.nextInt(26)+65
				//소문자 : r.nextInt(26)+97
				int type = r.nextInt(3);//0 : 숫자, 1 : 대문자, 2 : 소문자
				if(type == 0) {
					int randomCode = r.nextInt(10);
					sb.append(randomCode);
				}else if(type == 1) {
					char randomCode = (char)(r.nextInt(26)+65);
					sb.append(randomCode);
				}else if(type ==2) {
					char randomCode = (char)(r.nextInt(26)+97);
					sb.append(randomCode);
				}
			}
			
			//본문
			//로고 
			String emailContent = "<div><h1 style='color:#ff2b2b; font-style: italic;, margin-bottom: 10px;, font-weight: 700;'>I_MOVE_U </h1></div>";
			
			emailContent += "<div><h3>안녕하세요. I_MOVE_U 입니다.</h3></div>";
			
			emailContent += "<div style='border:1px solid #444444; background-color:#444444; padding:25px; margin-top:25px; border-radius:5px; max-width: 800px;'>";
			emailContent += "<div style='border:1px solid #f9f9f9; background-color:#f9f9f9; padding:20px; border-radius:5px;'>";
			emailContent += "<h2>임시비밀번호는 [";
			emailContent += "<span style='color:#25a4f3;'>";
			emailContent += sb.toString();
			emailContent += "</span>";
			emailContent += "]입니다.</h2>";
			emailContent += "</div>";
			emailContent += "</div>";
			emailSender.sendMail(emailTitle, memberEmail, emailContent);
			//System.out.println(sb.toString());
			if(sb.toString() != "" || sb.toString()!=null) {
				String memberPw = sb.toString();
				int updateResult = memberService.updatePw(memberPw, memberEmail);
				if(updateResult != 1) {
					//2:업데이트만 실패
					return ResponseEntity.ok(2);
				}else {
					//3:완전 성공
				return ResponseEntity.ok(3);
				}
			}else {
				//1메일전송 실패
				return ResponseEntity.ok(1);
			}
	}
		//-1:회원조회 실패
		return ResponseEntity.ok(-1);
	}
	
	//--------------memberMain-------------
	@GetMapping(value="/selectMember")
	public ResponseEntity<MemberDTO> selectMember(@RequestParam String memberId){
		MemberDTO m = memberService.selectMember(memberId);
		return ResponseEntity.ok(m);
	}
	//쿠폰 모달
	@GetMapping(value="/selectCoupon")
	public ResponseEntity<List<CouponDTO>> selectCoupon(@RequestParam String memberId){
		List<CouponDTO>  couponList = memberService.selectCoupon(memberId);
		return ResponseEntity.ok(couponList);
	}
	
	/*--------deleteMember----------*/
	@PostMapping(value="/searchMember")
	public ResponseEntity<Integer> searchMember(@RequestParam String memberId, @RequestParam String memberPw){
		int result = memberService.searchMember(memberId,memberPw);
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping(value = "/{memberId}")
	public ResponseEntity<Integer> deleteMember(@PathVariable String memberId){
		int result = memberService.deleteMember(memberId);
		return ResponseEntity.ok(result);
	}
	
	/*--------- updateMember ----------*/
	@PatchMapping
	public ResponseEntity<Integer> updateMember(@RequestBody MemberDTO member){
		int result = memberService.updateMember(member);
		return ResponseEntity.ok(result);
	}
	
	/*--------------- 관람 완료 영화---------------*/
	@GetMapping(value ="/watchedList")
	public ResponseEntity<Map> selectWatchedMovie(@RequestParam String memberId, @RequestParam int intervalChoice){
		Map map = memberService.selectWatchedMovie(memberId, intervalChoice);
		return ResponseEntity.ok(map);
	}
	/*------------관람 예정 영화-------------------*/
	@GetMapping(value="/bookingList")
	public ResponseEntity<Map> selectBookingMovie(@RequestParam String memberId){
		Map map = memberService.selectBookingMovie(memberId);
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value="/sendBookingMail")
	public ResponseEntity<Integer> sendBookingMail(@RequestBody MemberMovieListDTO bookingMail){
		String memberId = bookingMail.getMemberId();
		MemberDTO m = memberService.selectMember(memberId);
		String memberEmail = m.getMemberEmail();
		
		
			String emailTitle = "I_MOVE_U 예매내역 입니다.";
			
			
			//본문
			//로고 
			String emailContent = "<div><h1 style='color:#ff2b2b; font-style: italic;, margin-bottom: 10px;, font-weight: 700;'>I_MOVE_U </h1></div>";
			
			emailContent += "<div><h3>즐거운 관람 되세요.</h3></div>";
			
			emailContent += "<div style='border:1px solid #444444; background-color:#444444; padding:25px; margin-top:25px; border-radius:1px; max-width: 900px;'>";
			emailContent += "<div style='border:1px solid #f9f9f9; background-color:#f9f9f9; padding:20px; border-radius:3px; overflow: hidden'>";
			//썸네일
			emailContent += "<div style='float: left;'><img style='width: 270px;' src=' ";
			emailContent += bookingMail.getMovieThumb();
			emailContent += " '></img></div>";
			
			//본문
			emailContent += "<div style='float: left;'><ul style='list-style: none;'>";
				//제목
			emailContent += "<li><h2 style='margin-bottom: 0px;'>";
			emailContent += bookingMail.getMovieTitle();
			emailContent += "</li></h2>";
				//일시
			emailContent += "<li style='overflow:hidden; margin-bottom: 10px;'>";
			emailContent += "<p style='float: left;'>"+bookingMail.getMovieDate() + "</p><p style='margin-left:10px; float: left;'>" + bookingMail.getMovieTime()+"</p>";
			emailContent += "</li>";
				//관
			emailContent += "<li style='margin-bottom: 10px;'>";
			emailContent += bookingMail.getMovieScreen();
			emailContent += "</li>";
				//관람자 구분 및 관람 인원 + 좌석
			emailContent += "<li style='overflow:hidden;'>";
			emailContent += "<p style='float: left;'>"+bookingMail.getCount() + "</p><p style='margin-left:10px; float: left;'>["+bookingMail.getSelectSeatList()+"]</p>";
			emailContent += "</li>";
			
			emailContent += "</ul></div>";
			
			
			emailContent += "</div>";
			emailContent += "</div>";
			emailSender.sendMail(emailTitle, memberEmail, emailContent);
			
			
			return ResponseEntity.ok(1);
			}
	
	
}



















