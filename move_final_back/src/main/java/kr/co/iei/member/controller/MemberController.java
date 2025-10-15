package kr.co.iei.member.controller;

import java.util.Random;

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
import kr.co.iei.util.EmailSender;

@CrossOrigin("*")
@RestController
@RequestMapping("/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private EmailSender emailSender;
	
	@GetMapping("/checkEmail")
	public ResponseEntity<Integer> checkEmail(@RequestParam String memberEmail){
		int result = memberService.checkEmail(memberEmail);
		return ResponseEntity.ok(result);
	}
	@PostMapping("/login")
	public ResponseEntity<Integer> login(@RequestBody Member member){
		//암호화, jwt 해야 함
		int result = memberService.login(member);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/sendEmail")
	public ResponseEntity<String> sendEmail(@RequestParam String memberEmail){
		//제목
		String emailTitle = "I_MOVE_U 인증메일입니다.";
		
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
		String emailContent = "<h1>안녕하세요. I_MOVE_U 입니다.</h1>";
		
		emailContent += "<div style='border:1px solid #444444; background-color:#444444; padding:25px; margin-top:25px; border-radius:5px;'>";
		emailContent += "<div style='border:1px solid #f9f9f9; background-color:#f9f9f9; padding:20px; border-radius:5px;'>";
		emailContent += "<h2>인증번호는 [";
		emailContent += "<span style='color:#25a4f3;'>";
		emailContent += sb.toString();
		emailContent += "</span>";
		emailContent += "]입니다.</h2>";
		emailContent += "</div>";
		emailContent += "</div>";
		emailSender.sendMail(emailTitle, memberEmail, emailContent);
		
		return ResponseEntity.ok(sb.toString());
	}
	
}
