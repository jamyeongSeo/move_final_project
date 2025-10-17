package kr.co.iei.etc.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.utils.EmailSender;

@CrossOrigin("*")
@RestController
@RequestMapping("/email")
public class EmailController {
	@Autowired
	private EmailSender emailSender;
	
	//------------------join 인증코드 전송
	@GetMapping("/sendCode")
	public ResponseEntity<String> sendCode(@RequestParam String memberEmail){
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
		//로고 <div><h2 style='color:#ff2b2b; font-style: italic;'>I_MOVE_U </h2></div>
		String emailContent = "<div><h2 style='color:#ff2b2b; font-style: italic;, margin-bottom: 10px;, font-weight: 700;'>I_MOVE_U </h2></div>";
		
		emailContent += "<div><h2>안녕하세요. I_MOVE_U 입니다.</h2></div>";
		
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
	
	//------------searchPwModal 새로운 임시 비밀번호 전송
	@GetMapping(value="/newPw")
	public ResponseEntity<String> newPw(@RequestParam String memberEmail) {
		//제목
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
				String emailContent = "<div><h2 style='color:#ff2b2b; font-style: italic;, margin-bottom: 10px;, font-weight: 700;'>I_MOVE_U </h2></div>";
				
				emailContent += "<div><h2>안녕하세요. I_MOVE_U 입니다.</h2></div>";
				
				emailContent += "<div style='border:1px solid #444444; background-color:#444444; padding:25px; margin-top:25px; border-radius:5px;'>";
				emailContent += "<div style='border:1px solid #f9f9f9; background-color:#f9f9f9; padding:20px; border-radius:5px;'>";
				emailContent += "<h2>임시비밀번호는 [";
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
