package kr.co.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.dto.Member;
import kr.co.iei.member.model.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping("/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@GetMapping("/checkEmail")
	public ResponseEntity<Integer> checkEmail(@RequestParam String memberEmail){
		int result = memberService.checkEmail(memberEmail);
		return ResponseEntity.ok(result);
	}
	@PostMapping("/login")
	public ResponseEntity<Integer> login(@RequestBody Member member){
		System.out.println("옴");
		int result = memberService.login(member);
		return ResponseEntity.ok(result);
	}
	
}
