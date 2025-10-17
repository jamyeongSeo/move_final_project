package kr.co.iei.member.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.utils.JwtUtils;

@CrossOrigin("*")
@RestController
@RequestMapping("/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private JwtUtils jwtUtils;
	
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
		System.out.println(loginMember);
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
		return ResponseEntity.ok(result);
	}
	@PostMapping(value="/updatePw")
	public ResponseEntity<Integer> updatePw(@RequestBody MemberDTO member){
		int result = memberService.updatePw(member);
		return ResponseEntity.ok(result);
	}
	
	
	
	
	
}



















